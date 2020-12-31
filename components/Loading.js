import { Box, Spinner } from '@chakra-ui/react'

const Loading = () => (
  <Box pt='10rem' maxWidth='400px' mx='auto'>
    <Spinner color='white' size='xl' />
  </Box>
)

export default Loading
