import prisma from 'lib/prisma'
import getToken from 'utils/getToken'

export default async function (req, res) {
  const token = await getToken(req)
  const userId = token.userId

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
