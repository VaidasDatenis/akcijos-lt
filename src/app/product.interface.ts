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

// export const maximaCategories: string[] = [
//   'Augalai ir jų priežiūros prekės',
//   'Bakalėja',
//   'Buitinė chemija',
//   'Duonos gaminiai',
//   'Gėrimai',
//   'Kava, kakava, arbata',
//   'Konditerija',
//   'Konservuotas maistas',
//   'Kulinarija',
//   'Kūdikių ir vaikų prekės',
//   'Mėsa ir mėsos gaminiai',
//   'Pieno gaminiai ir kiaušiniai',
//   'Pramonės prekės',
//   'Prekės gyvūnams',
//   'Saldumynai',
//   'Vaisiai ir daržovės',
//   'Šaldytas maistas',
//   'Žuvis ir žuvies produktai',
// ];

// export const ikiCategories: string[] = [
//   'Bakalėja',
//   'Duona ir jos gaminiai',
//   'Gėrimai, kava, arbata',
//   'Kosmetikos ir higienos prekės',
//   'Namų ūkio ir gyvūnų prekės',
//   'Pieno gaminiai ir kiaušiniai',
//   'Saldumynai ir konditerija',
//   'Šaldytas maistas ir ledai',
//   'Šviežia mėsa ir jos gaminiai',
//   'Vaisiai ir daržovės',
//   'Žuvis ir kulinarija',
// ];

// export const rimiCategories: string[] = [
//   'Alkoholiniai ir nealkoholiniai gėrimai',
//   'Bakalėja',
//   'Buitinės chemijos ir valymo priemonės',
//   'Duonos gaminiai ir konditerija',
//   'Gėrimai',
//   'Gyvūnų prekės',
//   'Kosmetika ir higiena',
//   'Mėsa, žuvys ir kulinarija',
//   'Namų ūkio, gyvūnų ir laisvalaikio prekės',
//   'Pieno produktai, kiaušiniai ir sūris',
//   'Saldumynai ir užkandžiai',
//   'Šaldytas maistas',
//   'Vaikų ir kūdikių prekės',
//   'Vaisiai, daržovės ir gėlės',
// ];

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
