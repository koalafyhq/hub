import { Provider } from 'next-auth/client'
import { Box, ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Box bg='blue.900' minHeight='100vh'>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </Provider>
  )
}
