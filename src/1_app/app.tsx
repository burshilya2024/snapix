import type { AppProps } from 'next/app'

import React from 'react'
import { Provider } from 'react-redux'

import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react'

import Layout from './Layout/Layout'
import ToasterContext from './Providers/ToasterProvider'
import { setupStore } from './store'

const store = setupStore()

export function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <ToasterContext />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  )
}
