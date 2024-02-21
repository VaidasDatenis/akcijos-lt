import { MarketListEnum, Product, listOfMarkets } from "./product.interface";
import { RecipeEnum } from "./recipe.interface";

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
  let productPriceEur = product?.priceEur?.trim();
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    title: product.title,
    market: marketName,
    price: transformPrices(productPriceEur, product.priceCents),
    quantity: 1,
  };
}

export const transformDateTo = (dateTo: string) => {
  const transDate = dateTo.replace('Pasiūlymas galioja', '');
  return `${transDate}`;
}

export function getMarketLabel(marketName: string): string {
  return listOfMarkets.find((market) => market.name === marketName)?.label ?? '';
}

export function loadRecipeFromMarket(marketName: string): string {
  switch (marketName) {
    case MarketListEnum.MAXIMA:
      return RecipeEnum.MAXIMA_RECIPES;
    case MarketListEnum.IKI:
      return RecipeEnum.IKI_RECIPES;
    case MarketListEnum.LIDL:
      return RecipeEnum.LIDL_RECIPES;
    case MarketListEnum.RIMI:
      return RecipeEnum.LIDL_RECIPES;
    default:
      return RecipeEnum.MAXIMA_RECIPES;
  }
}
