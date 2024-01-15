import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import Layout from '@/common/components/Layout/Layout'
import { setupStore } from '@/store'

import '@/styles/Globals.scss'

const store = setupStore()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
