import Decimal from 'decimal.js'

const sources = [
  {
    name: 'blockchain.info',
    extractPrice: (json) => json.USD.last,
    url: 'https://blockchain.info/ticker',
  },
  {
    name: 'blockchain.com',
    extractPrice: (json) =>
      json.find((i) => i.symbol === 'BTC-USD').last_trade_price,
    url: 'https://api.blockchain.com/v3/exchange/tickers',
  },
  {
    name: 'coinbase.com',
    extractPrice: (json) => json.data.rates.USD,
    url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
  },
  {
    name: 'coincap.io',
    extractPrice: (json) => json.data.rateUsd,
    url: 'https://api.coincap.io/v2/rates/bitcoin',
  },
  {
    name: 'coindesk.com',
    extractPrice: (json) => json.bpi.USD.rate.replace(',', ''),
    url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  },
  {
    name: 'coingecko.com',
    extractPrice: (json) => json.bitcoin.usd,
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
  },
  {
    name: 'cryptocompare.com',
    extractPrice: (json) => json.RAW.PRICE,
    url: 'https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=coinbase',
  },
  {
    name: 'gemini.com',
    extractPrice: (json) => json.bid,
    url: 'https://api.gemini.com/v2/ticker/btcusd',
  },
  {
    name: 'kraken.com',
    extractPrice: (json) => json.result.XXBTZUSD[0][0],
    url: 'https://api.kraken.com/0/public/Trades?pair=btcusd',
  },
  {
    name: 'kucoin.com',
    extractPrice: (json) => json.data.last,
    url: 'https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USD',
  },
  {
    name: 'okx.com',
    extractPrice: (json) => json.data.find((a) => a.instId === 'BTC-USDT').last,
    url: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
  },
]

const get = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  } catch (error) {
    console.log('error', error)
  }
}

const getPriceForSource = async (source) => {
  const json = await get(source.url)
  return Number(source.extractPrice(json))
}

const getPrices = async () => {
  await Promise.allSettled(
    sources.map(async (s) => (s.price = await getPriceForSource(s)))
  )
  return sources
}

const sortByPrice = (sources) =>
  sources.filter((source) => source.price).sort((a, b) => a.price - b.price)

const findMedianPrice = (sources) => {
  const arr = sortByPrice(sources)
  const odd = arr.length % 2 === 1
  if (odd) return arr[Decimal.floor(arr.length / 2).toNumber()].price // odd
  const index = Decimal.div(arr.length, 2).toNumber()
  return Decimal.div(
    Decimal.sum(arr[index - 1].price, arr[index].price),
    2
  ).toNumber()
}

const go = async () => {
  const prices = await getPrices()
  console.log('price', findMedianPrice(prices))
  console.log('sources', sources.length)
  console.log('working', sortByPrice(prices).length)
}

go()
