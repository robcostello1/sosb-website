import type { AppProps } from 'next/app'
import Layout from 'components/Layout'

import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-STXJ7TCB1N" />
      <script dangerouslySetInnerHTML={{
        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-STXJ7TCB1N');
                `,
      }} />
    </Head>
    <Component {...pageProps} />
  </Layout>
}
