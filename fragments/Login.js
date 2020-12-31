import React from 'react'

import { signIn } from 'next-auth/client'
import {
  Box,
  Container,
  Center,
  Button,
  Text,
  Heading,
  Stack,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const LoginFragment = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState('')
  const [email, setEmail] = React.useState('')

  const initialRef = React.useRef()

  const closeModal = () => {
    setIsLoading(false)
    setIsEmailModalOpen(false)
    setEmail('')
  }

  const signin = (via) => {
    setIsLoading(via)

    if (via === 'prepareEmail') {
      setIsEmailModalOpen(true)

      return
    }

    signIn(via, { email })
  }

  const isEmailValid = React.useMemo(() => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    return emailRegex.test(email)
  }, [email])

  return (
    <Container>
      <Center height='100vh'>
        <Box
          bg='white'
          color='blue'
          borderRadius='3px'
          boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'
          padding='2rem'
          maxWidth='400px'
        >
          <Stack>
            <Box mb='8rem'>
              <Heading letterSpacing='-.1rem' mb='2rem'>
                edgy
              </Heading>
              <Heading size='md'>Integrasi situs anda dengan edgy</Heading>
              <Text color='grey' fontSize='sm'>
                Dapatkan SSL otomatis dari Let's Encrypt®, monitor performa dari
                Web Vitals, kompresi aset statis <Text as='em'>on-the-fly</Text>
                , dan masih banyak lagi.
              </Text>
            </Box>
            <Modal
              isOpen={isEmailModalOpen}
              onClose={closeModal}
              closeOnOverlayClick={false}
              initialFocusRef={initialRef}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Masuk dengan Email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text mb={3}>
                    Kami menggunakan pendekatan{' '}
                    <Text as='em'>Passwordless</Text> dan akan mengirim link
                    untuk masuk ke email kamu.
                  </Text>
                  <Text>
                    Pastikan juga cek folder <Text as='em'>Spam</Text> jika kamu
                    belum menerima email dari kami.
                  </Text>
                  <Box mt={4}>
                    <Input
                      ref={initialRef}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder='cth: adrin@koalafyhq.com'
                      type='email'
                    />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Stack>
                    <Button
                      colorScheme='blue'
                      onClick={() => signin('email')}
                      disabled={!isEmailValid}
                    >
                      Kirim
                    </Button>
                  </Stack>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              colorScheme='blue'
              isLoading={isLoading === 'github'}
              disabled={isLoading}
              onClick={() => signin('github')}
            >
              Mulai dengan akun GitHub
            </Button>
            <Button
              colorScheme='teal'
              disabled={isLoading}
              isLoading={isLoading === 'email'}
              onClick={() => signin('prepareEmail')}
              variant='outline'
            >
              Mulai dengan Email
            </Button>
            <Text fontSize='xs' color='grey' pt='2'>
              Dengan menekan tombol diatas, anda setuju dengan Syarat &
              Ketentuan dan Kebijakan Privasi kami
            </Text>
          </Stack>
        </Box>
      </Center>
    </Container>
  )
}

export default LoginFragment
