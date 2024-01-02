import Decimal from 'decimal.js';
import { Source, Price } from './types';
import { sources } from './sources';

const get = async (url: string): Promise<any> => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log('error', error);
  }
};

const getPriceForSource = async (source: Source): Promise<Price> => {
  const price = await get(source.url);
  const json = source.extractPrice(price);
  if (json.eur) json.eur = Number(json.eur);
  if (json.usd) json.usd = Number(json.usd);
  return json;
};

export const getPrices = async (): Promise<Source[]> => {
  await Promise.allSettled(
    sources.map(async (s) => (s.price = await getPriceForSource(s)))
  );
  return sources;
};

export const sortByPrice = (sources: Source[], coin: string): Source[] =>
  sources
    .filter((source) => source.price?.[coin])
    .sort((a, b) => a.price?.[coin]! - b.price?.[coin]!);

export const findMedianPrice = (sources: Source[], coin = 'usd'): number => {
  const arr = sortByPrice(sources, coin);
  const midIndex = Decimal.floor(arr.length / 2).toNumber();
  const odd = arr.length % 2 === 1;
  if (odd) return arr[midIndex].price?.[coin]!;
  return Decimal.div(
    Decimal.sum(arr[midIndex].price?.[coin]!, arr[midIndex + 1].price?.[coin]!),
    2
  ).toNumber();
};
