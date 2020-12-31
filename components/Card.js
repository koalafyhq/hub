import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export const StatsCard = ({ title, content }) => (
  <Box
    bg='white'
    boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'
    borderRadius='3px'
    paddingX='20px'
    paddingTop='10px'
    paddingBottom='20px'
  >
    <Stat>
      <StatLabel>{title}</StatLabel>
      <StatNumber>{content}</StatNumber>
    </Stat>
  </Box>
)
