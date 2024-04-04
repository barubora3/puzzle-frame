import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // キャストのURLを指定する
  const url = "https://warpcast.com/miin.eth/0x99f82efe";
  const seed = 547441369741335741;
  const cast = await client.lookUpCastByHashOrWarpcastUrl(
    url,
    CastParamType.Url
  );

  const recastCount = cast.cast.reactions.recasts.length;

  // Puzzle generation
  const puzzleSize = 100;
  const originalImage = "https://puzzle-frame.vercel.app/puzzle.jpg";
  const revealedPieces = recastCount;

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  const img = await loadImage(originalImage);
  ctx.drawImage(img, 0, 0, 1200, 630);

  const imgData = ctx.getImageData(0, 0, 1200, 630);
  const data = imgData.data;

  const pieces = Array.from({ length: puzzleSize }, (_, i) => i);
  const shuffledPieces = createSeededShuffle(pieces, seed);

  for (let i = 0; i < puzzleSize; i++) {
    if (i >= revealedPieces) {
      const pieceIndex = shuffledPieces[i];
      const row = Math.floor(pieceIndex / 10);
      const col = pieceIndex % 10;
      const pieceWidth = 1200 / 10;
      const pieceHeight = 630 / 10;

      for (let y = row * pieceHeight; y < (row + 1) * pieceHeight; y++) {
        for (let x = col * pieceWidth; x < (col + 1) * pieceWidth; x++) {
          const index = (y * 1200 + x) * 4;
          data[index + 3] = 0;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
}

function createSeededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(mulberry32(seed + i)() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
