export interface Source {
	name: string;
	extractPrice: (json: any) => {};
	price?: number;
	url: string;
}
