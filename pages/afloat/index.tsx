import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useEffect, } from 'react';
import { NUM_TEXTURES, useLoadingStore } from '../../components/AfloatVid/state/loading';
import styles from '../../styles/Home.module.css';
import afloatStyles from './Afloat.module.css';
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps =
  async (_context) => ({ props: { host: process.env['HOST'] || null } });

const AfloatContent = dynamic(
  () => import("../../components/AfloatVid/AfloatContent"),
  { ssr: false }
);

export default function Afloat({ host }: { host: string }) {
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
        <meta name="description" content="An immersive music video" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Sounds of System Breakdown - Afloat" />
        <meta property="og:description" content="An immersive music video" />
        <meta property="og:image" content="https://sosbmusic.com/afloat-screenshot.jpg" />
        <meta property="og:url" content="https://sosbmusic.com/afloat" />
        <meta property="og:type" content="video" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sosbmusic" />
        <meta name="twitter:creator" content="@sosbmusic" />
        <meta name="twitter:title" content="Sounds of System Breakdown - Afloat" />
        <meta name="twitter:description" content="An immersive music video" />
        <meta name="twitter:image" content="https://sosbmusic.com/afloat-screenshot.jpg" />
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
