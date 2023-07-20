export interface Product {
  category: string;
  imageUrl: string;
  title: string;
  priceEur: string;
  priceCents: string;
  oldPrice?: string;
  dateTo?: string;
  discount?: string;
  xIcons?: number;
  specImg?: string;
}

export enum CATEGORIES {
  VAISIAI_DARZOVES = 'Vaisiai ir daržovės',
  MESA_GAMINIAI = 'Mėsa ir mėsos gaminiai',
  PIENAS_KIAUSINIAI = 'Pieno gaminiai ir kiaušiniai',
  ZUVIS = 'Žuvis ir žuvies produktai',
  KULINARIJA = 'Kulinarija',
  KONDITERIJA = 'Konditerija',
  DUONA = 'Duonos gaminiai',
  SALDYTI = 'Šaldytas maistas',
  SALDUMYNAI = 'Saldumynai',
  BAKALEJA = 'Bakalėja',
  KONSERVAI = 'Konservuotas maistas',
  KAVA_ARBATA = 'Kava, kakava, arbata',
  GERIMAI = 'Gėrimai',
  KUDIKIAI = 'Kūdikių ir vaikų prekės',
  GYVUNAMS = 'Prekės gyvūnams',
  CHEMIJA = 'Buitinė chemija',
  PRAMONE = 'Pramonės prekės',
  AUGALAI = 'Augalai ir jų priežiūros prekės',
}
