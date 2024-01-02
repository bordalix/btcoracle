export type Price = Record<string, number>;

export interface Source {
  name: string;
  extractPrice: (json: any) => Price;
  price?: Price;
  url: string;
}
