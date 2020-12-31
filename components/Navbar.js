import React from 'react'
import Link from 'next/link'

import { useSession, signOut } from 'next-auth/client'
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Box,
  Heading,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react'

const logout = () => {
  const confirm = window.confirm('are you sure?')

  if (confirm) {
    signOut()
  }
}

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
    {children}
  </Text>
)

const Header = ({ signIn, isLoggedIn, username, ...props }) => {
  const [show, setShow] = React.useState(false)
  const [session] = useSession()

  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      bg='#ff7b7b'
      mb={5}
      color='white'
      paddingY='1.5rem'
      paddingX='30px'
      {...props}
    >
      <Flex align='center' mr={10}>
        <Heading as='h1' size='lg' letterSpacing={'-.1rem'} marginTop='-10px'>
          <Link href='/'>edgy</Link>
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill='white'
          width='12px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems='center'
        flexGrow={1}
      >
        <MenuItems>
          <strong>Projects</strong>
        </MenuItems>
        <MenuItems>
          <strong>Deployments</strong>
        </MenuItems>
        <MenuItems>
          <strong>Analytics</strong>
        </MenuItems>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <div>
          <Menu color='blue'>
            <MenuButton as={Button} variant='link'>
              <Avatar
                bg='#ff7b7b'
                name={session.user.name}
                src={session.user.image}
              />
            </MenuButton>
            <MenuList bg='blue.800'>
              <MenuItem>Pengaturan</MenuItem>
              <MenuItem>Bantuan</MenuItem>
              <MenuItem>Kirim Umpan Balik</MenuItem>
              <MenuItem onClick={logout}>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </Flex>
  )
}

export default Header
