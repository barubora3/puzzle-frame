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
          content="https://frames-gilt.vercel.app/site-preview.jpg"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://tenden.ngrok.app/api/puzzle"
        />
        {/* <meta property="fc:frame:button:1" content="Start" />
        <meta property="fc:frame:post_url" content="https://frames-gilt.vercel.app/api/basic?id=1" /> */}
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Puzzle dayo</h1>
        <div>
          <img src="/api/puzzle" alt="Jigsaw Puzzle" />
        </div>
      </main>
    </>
  );
}
