export const transformPrices = (euroValue: string | undefined, centValue: string | undefined) => {
  if (!euroValue && !centValue) {
    return '';
  }
  let newCents = centValue?.replaceAll('€/vnt.', '');
  let newCents2 = newCents?.replaceAll('€/kg', '');
  let newCents3 = newCents2?.replaceAll('€', '').replace(/\s/g, '');
  return `${euroValue},${newCents3}`;
};
