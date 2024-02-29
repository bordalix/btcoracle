import { getPrices } from './prices'
import { getPubKey, sign } from './schnorr'
import { Env } from './types'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

const handleRequest = async (env: Env) => {
  const data = {
    pricefeed: await getPrices(),
    timestamp: Math.floor(Date.now() / 1000),
    publickey: getPubKey(env.PRIVATEKEY),
  }
  const signature = sign(data, env.PRIVATEKEY)
  const json = JSON.stringify({ ...data, signature })
  const response = new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.append('Vary', 'Origin')
  return response
}

async function handleOptions(request: Request) {
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS preflight requests.
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Headers':
          request.headers.get('Access-Control-Request-Headers') ?? '',
      },
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions(request)
    } else if (request.method === 'GET') {
      return handleRequest(env)
    } else {
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      })
    }
  },
}
