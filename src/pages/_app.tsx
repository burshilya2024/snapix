import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import Layout from '@/common/components/Layout/Layout'
import { setupStore } from '@/store'
import { SessionProvider } from 'next-auth/react'

import '@/styles/Globals.scss'

const store = setupStore()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}
