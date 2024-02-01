import Head from 'next/head';

import { Canvas } from '@react-three/fiber';

import Gravity from '../components/Gravity';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Gravity Test</title>
        <meta name="description" content="We are a dance band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas shadows>
          <Gravity />
        </Canvas>
      </main>
    </div>
  );
}
