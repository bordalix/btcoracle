export enum Coin {
  eur = 'eur',
  usd = 'usd',
}

export interface Price {
  [Coin.eur]?: number
  [Coin.usd]?: number
}

export interface Source {
  name: string
  extractPrice: (json: any) => Price
  price?: Price
  url: string
}
