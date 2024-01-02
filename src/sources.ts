import { Source } from './types';

export const sources: Source[] = [
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
    name: 'coinbase.com',
    extractPrice: (json) => ({
      eur: json.data?.rates?.EUR,
      usd: json.data?.rates?.USD,
    }),
    url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
  },
  {
    name: 'coincap.io',
    extractPrice: (json) => ({
      usd: json.data?.rateUsd,
    }),
    url: 'https://api.coincap.io/v2/rates/bitcoin',
  },
  {
    name: 'coindesk.com',
    extractPrice: (json) => ({
      eur: json.bpi?.USD?.rate?.replace(',', ''),
      usd: json.bpi?.EUR?.rate?.replace(',', ''),
    }),
    url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
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
    name: 'cryptocompare.com',
    extractPrice: (json) => ({
      usd: json.RAW?.PRICE,
    }),
    url: 'https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=coinbase',
  },

  {
    name: 'cryptocompare.com',
    extractPrice: (json) => ({
      eur: json.RAW?.PRICE,
    }),
    url: 'https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=EUR&e=coinbase',
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
    name: 'kraken.com',
    extractPrice: (json) => ({
      usd: json.result?.XXBTZUSD[0][0],
    }),
    url: 'https://api.kraken.com/0/public/Trades?pair=btcusd',
  },
  {
    name: 'kraken.com',
    extractPrice: (json) => ({
      eur: json.result?.XXBTZEUR[0][0],
    }),
    url: 'https://api.kraken.com/0/public/Trades?pair=btceur',
  },
  {
    name: 'kucoin.com',
    extractPrice: (json) => ({
      usd: json.data?.last,
    }),
    url: 'https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USD',
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
];
