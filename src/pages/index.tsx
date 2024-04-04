import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Recast Puzzle</title>
        <meta
          property="og:image"
          content="https://puzzle-frame.vercel.app/api/puzzle"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://puzzle-frame.vercel.app/api/puzzle"
        />

        <meta
          name="fc:frame:post_url"
          content="https://puzzle-frame.vercel.app/api/frame"
        />
        <meta name="fc:frame:button:1" content="Refresh" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Puzzle</h1>
        <div>
          <img src="/api/puzzle" alt="Jigsaw Puzzle" />
        </div>
      </main>
    </>
  );
}
