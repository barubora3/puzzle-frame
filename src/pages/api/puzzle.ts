import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from "canvas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const puzzleSize = 100;
  const originalImage = "https://tenden.ngrok.app/puzzle.jpg";
  const revealedPieces = 80;

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  const img = await loadImage(originalImage);
  ctx.drawImage(img, 0, 0, 1200, 630);

  const imgData = ctx.getImageData(0, 0, 1200, 630);
  const data = imgData.data;

  const pieces = Array.from({ length: puzzleSize }, (_, i) => i);

  for (let i = 0; i < puzzleSize; i++) {
    if (i >= revealedPieces) {
      const row = Math.floor(i / 10);
      const col = i % 10;
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
