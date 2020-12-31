import jwt from 'next-auth/jwt'

import { JWT_SECRET, JWT_SIGNING_PRIVATE_KEY } from 'utils/env'

async function getToken(req) {
  const token = await jwt.getToken({
    req,
    secret: JWT_SECRET,
    signingKey: JWT_SIGNING_PRIVATE_KEY,
  })

  return token
}

export default getToken
