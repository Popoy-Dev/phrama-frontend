import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import store from './store'
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <ChakraProvider cssVarsRoot={undefined}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )

}
