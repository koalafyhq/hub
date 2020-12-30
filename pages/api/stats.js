import jwt from 'next-auth/jwt'

import prisma from 'lib/prisma'

import { JWT_SECRET } from 'utils/env'

export default async function (req, res) {
  const token = await jwt.getToken({ req, secret: JWT_SECRET })
  const userId = token.user_id

  if (!userId) {
    res.status(404).send({
      error: true,
      message: 'user_id is empty',
    })

    return
  }

  const stats = await prisma.user_stats.findUnique({
    where: {
      id: userId,
    },
  })

  const projects = await prisma.project.findMany({
    where: {
      ownerUserId: userId,
    },
  })

  res.send({
    stats: stats,
    projects: projects,
  })
}
