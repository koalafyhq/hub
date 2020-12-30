import { PrismaClient } from '@prisma/client'

import { isDevelopment } from 'utils/env'

let prisma

if (isDevelopment) {
  global.prisma = global.prisma || new PrismaClient()

  prisma = global.prisma
} else {
  prisma = new PrismaClient()
}

export default prisma
