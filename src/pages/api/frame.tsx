import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const randomParam = Math.random().toString(36).substring(7);
  const html = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
      <meta
        property="og:image"
        content="https://puzzle-frame.vercel.app/api/puzzle" />
      <meta property="fc:frame" content="vNext" />
      <meta
        property="fc:frame:image"
        content="https://puzzle-frame.vercel.app/api/puzzle?random="${randomParam} />

      <meta name="fc:frame:post_url" content="https://puzzle-frame.vercel.app" />
      <meta name="fc:frame:button:1" content="Refresh" />
      </head>
      <body>
      </body>
      </html>
    `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
