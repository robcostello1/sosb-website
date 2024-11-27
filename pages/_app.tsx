import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
    <GoogleAnalytics gaId='G-STXJ7TCB1N' debugMode={process.env.NODE_ENV === 'development'} />
  </Layout>
}
