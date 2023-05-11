import Head from "next/head";

import { Canvas } from "@react-three/fiber";
import styles from "../styles/Home.module.css";

import HomeAnimation from "../components/HomeAnimation";
import { useEffect, useState, memo } from "react";

export default function Home() {
  const [overlayActive, setOverlayActive] = useState(true);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setTimeout(() => setFade(true), 500);
  }, []);

  return (
    <div>
      <Head>
        <title>Sounds of System Breakdown</title>
        <meta name="description" content="We are a dance band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas shadows>
          <HomeAnimation />
        </Canvas>

        {overlayActive && (
          <div
            onClick={() => setOverlayActive(false)}
            className={`${styles.overlay} ${fade ? styles.overlay__fade : ""}`}
          >
            <span className={styles["start-button"]} role="button">
              START
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
