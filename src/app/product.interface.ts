export interface Product {
  category: string;
  imageUrl: string;
  title: string;
  priceEur?: string;
  priceCents?: string;
  oldPrice?: string;
  dateTo?: string;
  discount?: string;
  xIcons?: number;
  specImg?: {
    market?: string;
    spec?: string;
  };
  description?: string;
}

export enum enumMarketsList {
  MAXIMA = 'maxima',
  IKI = 'iki',
  RIMI = 'rimi',
}

export interface Market {
  id: number;
  name: string;
  label: string;
  marketCategories?: string[];
}

export const listOfMarkets: Market[] = [
  { id: 1, name: 'maxima', label: 'Maxima' },
  { id: 2, name: 'iki', label: 'IKI' },
  { id: 3, name: 'rimi', label: 'Rimi' },
];
