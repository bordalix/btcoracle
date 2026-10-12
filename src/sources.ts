import { Source } from './types'

export const sources: Source[] = [
  {
    name: 'binance.com',
    extractPrice: (json) => ({
      eur: Number(json.price),
    }),
    url: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR',
  },
  {
    name: 'binance.com',
    extractPrice: (json) => ({
      usd: Number(json.price),
    }),
    url: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSD',
  },
  {
    name: 'bitstamp.net',
    extractPrice: (json) => ({
      eur: Number(json.last),
    }),
    url: 'https://www.bitstamp.net/api/v2/ticker/btceur/',
  },
  {
    name: 'bitstamp.net',
    extractPrice: (json) => ({
      usd: Number(json.last),
    }),
    url: 'https://www.bitstamp.net/api/v2/ticker/btcusd/',
  },
  {
    name: 'blockchain.info',
    extractPrice: (json) => ({
      eur: json.EUR?.last,
      usd: json.USD?.last,
    }),
    url: 'https://blockchain.info/ticker',
  },
  {
    name: 'blockchain.com',
    extractPrice: (json) => ({
      eur: json.find((i: any) => i.symbol === 'BTC-EUR').last_trade_price,
      usd: json.find((i: any) => i.symbol === 'BTC-USD').last_trade_price,
    }),
    url: 'https://api.blockchain.com/v3/exchange/tickers',
  },
  {
    name: 'bybit.com',
    extractPrice: (json) => ({
      usd: json.result?.list?.[0]?.lastPrice,
    }),
    url: 'https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCUSD',
  },
  {
    name: 'bybit.com',
    extractPrice: (json) => ({
      eur: json.result?.list?.[0]?.lastPrice,
    }),
    url: 'https://api.bybit.com/v5/market/tickers?category=spot&symbol=BTCEUR',
  },
  {
    name: 'coinbase.com',
    extractPrice: (json) => ({
      eur: json.data?.rates?.EUR,
      usd: json.data?.rates?.USD,
    }),
    url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
  },
  {
    name: 'coingecko.com',
    extractPrice: (json) => ({
      usd: json.bitcoin?.usd,
    }),
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
  },
  {
    name: 'coingecko.com',
    extractPrice: (json) => ({
      eur: json.bitcoin?.eur,
    }),
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
  },
  {
    name: 'gemini.com',
    extractPrice: (json) => ({
      usd: json.bid,
    }),
    url: 'https://api.gemini.com/v2/ticker/btcusd',
  },
  {
    name: 'gemini.com',
    extractPrice: (json) => ({
      eur: json.bid,
    }),
    url: 'https://api.gemini.com/v2/ticker/btceur',
  },
  {
    name: 'mempool.space',
    extractPrice: (json) => ({
      usd: json.USD,
      eur: json.EUR,
    }),
    url: 'https://mempool.space/api/v1/prices',
  },
  {
    name: 'kraken.com',
    extractPrice: (json) => ({
      usd: json.result?.XXBTZUSD.l[0],
      eur: json.result?.XXBTZEUR.l[0],
    }),
    url: 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD,XXBTZEUR',
  },
  {
    name: 'kucoin.com',
    extractPrice: (json) => ({
      eur: json.data?.last,
    }),
    url: 'https://api.kucoin.com/api/v1/market/stats?symbol=BTC-EUR',
  },
  {
    name: 'okx.com',
    extractPrice: (json) => ({
      eur: json.data?.find((a: any) => a.instId === 'BTC-EUR').last,
      usd: json.data?.find((a: any) => a.instId === 'BTC-USDT').last,
    }),
    url: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
  },
  {
    name: 'peachbitcoin.com',
    extractPrice: (json) => ({
      usd: json.price,
    }),
    url: 'https://api.peachbitcoin.com/v1/market/price/BTCUSD',
  },
  {
    name: 'peachbitcoin.com',
    extractPrice: (json) => ({
      eur: json.price,
    }),
    url: 'https://api.peachbitcoin.com/v1/market/price/BTCEUR',
  },
  {
    name: 'yadio.io',
    extractPrice: (json) => ({
      eur: json.rate,
    }),
    url: 'https://api.yadio.io/rate/eur/btc',
  },
  {
    name: 'yadio.io',
    extractPrice: (json) => ({
      usd: json.rate,
    }),
    url: 'https://api.yadio.io/rate/usd/btc',
  },
]
