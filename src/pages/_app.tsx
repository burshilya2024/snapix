import type { AppProps } from 'next/app'

import '@/src/styles/Globals.scss'
import Layout from '../components/Layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
