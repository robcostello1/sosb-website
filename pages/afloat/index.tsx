import Head from "next/head";

import { Canvas } from "@react-three/fiber";
import AfloatContent from "./AfloatContent";

import styles from "../../styles/Home.module.css";

export default function Afloat() {
  return (
    <div>
      <Head>
        <title>Sounds of System Breakdown - Afloat</title>
        <meta name="description" content="We are a dance band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas shadows gl={{ precision: "mediump" }}>
          <AfloatContent />
        </Canvas>
      </main>
    </div>
  );
}
