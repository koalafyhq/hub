import { HOSTNAME } from 'utils/env'

async function fetchWithCtx(url, context, ...opts) {
  const options = {
    headers: {
      cookie: context.req.headers.cookie,
    },
  }

  const res = await fetch(`${HOSTNAME}${url}`, { ...options, ...opts })
  const json = await res.json()

  return json
}

export default fetchWithCtx
