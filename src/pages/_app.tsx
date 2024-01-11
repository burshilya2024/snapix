import type { AppProps } from 'next/app'

import Layout from '@/common/components/Layout/Layout'

import '@/styles/Globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
