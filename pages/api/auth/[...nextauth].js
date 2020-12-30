import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { isDevelopment } from 'utils/env'

import prisma from 'lib/prisma'

const options = {
  callbacks: {
    jwt: async (token, user, account, profile) => {
      // TODO: this is half-baked!
      if (!!user) {
        token.name = profile.name
        token.picture = profile.avatar_url
        token.email = profile.email
        token.user_plan = user.active_plan
        token.user_id = user.userId
        token.github_access_token = account.accessToken
      }

      return Promise.resolve(token)
    },
    session: async (session, user) => {
      // TODO: this is half-baked!
      session.user.github_access_token = user.github_access_token
      session.user.user_id = user.user_id

      return Promise.resolve(session)
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  secret: process.env.AUTH_SECRET,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  debug: isDevelopment,
}

export default (req, res) => NextAuth(req, res, options)
