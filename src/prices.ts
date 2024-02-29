import Decimal from 'decimal.js'
import { Source, Price, Coin } from './types'
import { sources } from './sources'

const get = async (url: string): Promise<any> => {
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

const getPriceFromSource = async (source: Source): Promise<Price> => {
  const price = await get(source.url)
  const json = source.extractPrice(price)
  if (json.eur) json.eur = Number(json.eur)
  if (json.usd) json.usd = Number(json.usd)
  return json
}

const getPricesFromSources = async (): Promise<Source[]> => {
  await Promise.allSettled(
    sources.map(async (s) => (s.price = await getPriceFromSource(s)))
  )
  return sources
}

const sortByPrice = (sources: Source[], coin: Coin): Source[] =>
  sources
    .filter((source) => source.price?.[coin])
    .sort((a, b) => a.price?.[coin]! - b.price?.[coin]!)

const average = (a: number, b: number): number =>
  Decimal.div(Decimal.sum(a, b), 2).toNumber()

const findMedianPrice = (sources: Source[], coin: Coin): number => {
  const arr = sortByPrice(sources, coin)
  const midIndex = Decimal.floor(arr.length / 2).toNumber()
  const odd = arr.length % 2 === 1
  if (odd) return arr[midIndex].price?.[coin]!
  return average(arr[midIndex].price?.[coin]!, arr[midIndex + 1].price?.[coin]!)
}

export const getPrices = async (): Promise<Price> => {
  const prices = await getPricesFromSources()
  const eur = findMedianPrice(prices, Coin.eur)
  const usd = findMedianPrice(prices, Coin.usd)
  return { eur, usd }
}
