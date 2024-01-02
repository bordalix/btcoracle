import Decimal from 'decimal.js';
import { Source } from './types';
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

const getPriceForSource = async (source: Source): Promise<number> => {
	const json = await get(source.url);
	return Number(source.extractPrice(json));
};

export const getPrices = async (): Promise<Source[]> => {
	await Promise.allSettled(sources.map(async (s) => (s.price = await getPriceForSource(s))));
	return sources;
};

const sortByPrice = (sources: Source[]) => sources.filter((source) => source.price).sort((a, b) => a.price! - b.price!);

export const findMedianPrice = (sources: Source[]) => {
	const arr = sortByPrice(sources);
	const odd = arr.length % 2 === 1;
	if (odd) return arr[Decimal.floor(arr.length / 2).toNumber()].price; // odd
	const index = Decimal.div(arr.length, 2).toNumber();
	return Decimal.div(Decimal.sum(arr[index - 1].price!, arr[index].price!), 2).toNumber();
};
