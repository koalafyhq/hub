import Link from 'next/link'

import { Button, Center, Text, Box, Heading } from '@chakra-ui/react'

export const EmptyProject = () => (
  <Center mt={10} p={5}>
    <Box p={10} textAlign='center' maxWidth='666px' border='2px dashed #ccc'>
      <Heading mb={3}>Belum ada project yang dibuat.</Heading>
      <Text mb={6}>
        Buat project sekarang dan dapatkan SSL otomatis dari Let's Encrypt®,
        monitor performa dari Web Vitals, kompresi aset statis on-the-fly, dan
        masih banyak lagi.
      </Text>
      <Link href='/projects/new'>
        <Button colorScheme='black' variant='outline'>
          Buat Project
        </Button>
      </Link>
    </Box>
  </Center>
)
