import { Coin } from './types';
import { findMedianPrice, getPrices } from './utils';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const handleRequest = async () => {
  const prices = await getPrices();
  const eur = findMedianPrice(prices, Coin.eur);
  const usd = findMedianPrice(prices, Coin.usd);
  const json = JSON.stringify({ eur, usd, feed: prices });
  const response = new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.append('Vary', 'Origin');
  return response;
};

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
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    } else if (request.method === 'GET') {
      return handleRequest();
    } else {
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    }
  },
};
