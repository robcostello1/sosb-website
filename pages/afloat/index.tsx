import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import { NUM_TEXTURES, useLoadingStore } from '../../components/AfloatVid/state/loading';
import styles from '../../styles/Home.module.css';
import afloatStyles from './Afloat.module.css';

const AfloatContent = dynamic(
  () => import("../../components/AfloatVid/AfloatContent"),
  { ssr: false }
);

export default function Afloat() {
  const reset = useLoadingStore((state) => state.reset);
  const items = useLoadingStore((state) => state.items);
  const removeItems = useLoadingStore((state) => state.removeItems);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleLoad = useCallback(() => {
    removeItems(10);
  }, [removeItems]);

  const loadingPercent = ((NUM_TEXTURES - items) / NUM_TEXTURES) * 100;

  return (
    <div>
      <Head>
        <title>Sounds of System Breakdown - Afloat</title>
        <meta name="description" content="We are a dance band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loadingPercent < 100 ? (
        <div className={afloatStyles.overlay}>
          <>
            Loading
            {loadingPercent > 0 ? `: ${loadingPercent.toFixed(0)}%` : "..."}
          </>
        </div>
      ) : null}

      <main className={styles.main}>
        <AfloatContent onLoad={handleLoad} />
      </main>
    </div>
  );
}
