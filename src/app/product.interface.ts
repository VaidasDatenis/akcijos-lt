export interface Product {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
  priceEur: string;
  priceCents: string;
  oldPrice?: string;
  dateTo: string;
  discount?: string;
  xIcons?: number;
  specImg?: {
    market?: string;
    spec?: string;
  };
  description?: string;
}

export interface CartProduct {
  id: string;
  market: string;
  imageUrl: string;
  title: string;
  price: string;
  quantity: number;
}

export enum MarketListEnum {
  MAXIMA = 'maxima',
  IKI = 'iki',
  RIMI = 'rimi',
  LIDL = 'lidl',
}

export interface Market {
  id: number;
  name: string;
  label: string;
  marketCategories?: string[];
}

export const listOfMarkets: Market[] = [
  { id: 1, name: MarketListEnum.MAXIMA, label: 'Maxima' },
  { id: 2, name: MarketListEnum.IKI, label: 'IKI' },
  { id: 3, name: MarketListEnum.RIMI, label: 'Rimi' },
  { id: 4, name: MarketListEnum.LIDL, label: 'Lidl' },
];
