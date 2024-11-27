import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useEffect, } from 'react';
import { NUM_TEXTURES, useLoadingStore } from '../../components/AfloatVid/state/loading';
import styles from '../../styles/Home.module.css';
import afloatStyles from './Afloat.module.css';
import Script from 'next/script';


const AfloatContent = dynamic(
  () => import("../../components/AfloatVid/AfloatContent"),
  { ssr: false }
);

const TITLE = "Sounds of System Breakdown - Afloat";
const DESCRIPTION = "Float through a drowned city in this immersive music video";
const IMAGE = "https://sosbmusic.com/afloat-screenshot.jpg";

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
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:url" content="https://sosbmusic.com/afloat" />
        <meta property="og:type" content="video" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sosbmusic" />
        <meta name="twitter:creator" content="@sosbmusic" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />
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
