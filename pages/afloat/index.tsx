import dynamic from 'next/dynamic';
import Head from 'next/head';

import styles from '../../styles/Home.module.css';

const AfloatContent = dynamic(
  () => import("../../components/AfloatVid/AfloatContent"),
  { ssr: false }
);

export default function Afloat() {
  return (
    <div>
      <Head>
        <title>Sounds of System Breakdown - Afloat</title>
        <meta name="description" content="We are a dance band" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AfloatContent />
      </main>
    </div>
  );
}
