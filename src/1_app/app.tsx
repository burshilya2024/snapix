import type { AppProps } from 'next/app'

import React from 'react'
import { Provider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

import Layout from './Layout/Layout'
import { setupStore } from './store'
const store = setupStore()

export function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  )
}
