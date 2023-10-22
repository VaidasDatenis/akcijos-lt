import { Product } from "./product.interface";

export const transformPrices = (euroValue: string, centValue: string) => {
  if (!euroValue && !centValue) {
    return '';
  }
  let newCents = centValue?.replaceAll('€/vnt.', '');
  let newCents2 = newCents?.replaceAll('€/kg', '');
  let newCents3 = newCents2?.replaceAll('€', '').replace(/\s/g, '');
  if (newCents3 === undefined) {
    return `${euroValue}`;
  }
  return `${euroValue}.${newCents3}`;
};

export const mapProductToCartProduct = (product: Product, marketName: string) => {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    title: product.title,
    market: marketName,
    price: transformPrices(product.priceEur, product.priceCents),
    quantity: 1,
  };
}

export const transformDateTo = (dateTo: string) => {
  const transDate = dateTo.replace('Pasiūlymas galioja', '');
  return `${transDate}`;
}
