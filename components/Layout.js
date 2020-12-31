import { Box, Container } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

import Navbar from 'components/Navbar'
import Loading from 'components/Loading'

import LoginFragment from 'fragments/Login'

export const Content = ({ children }) => <Box p={10}>{children}</Box>

export const Layout = ({ children }) => {
  const [session, loading] = useSession()

  if (loading) {
    return <Loading />
  }

  if (!loading && !session) {
    return <LoginFragment />
  }

  return (
    <Container maxW='7xl' bg='gray.100' minHeight='100vh' paddingX='0'>
      <Navbar isLoggedIn={session} username={session.user.name} />
      {children}
    </Container>
  )
}

export default Layout
