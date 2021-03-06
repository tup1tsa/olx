export type Price = { currency: string; value: number } | null;
export type ParsePrice = (input: string) => Price;

export const parsePrice: ParsePrice = input => {
  const priceWithoutSpaces = input.replace(/ /g, "");
  if (priceWithoutSpaces === "Обмен") {
    return null;
  }
  const regExp = /^([\d]+)(грн\.|\$|€)$/;
  const match = priceWithoutSpaces.match(regExp);
  if (match === null) {
    throw new Error("price format is incorrect");
  }
  const [, valueString, currencySymbol] = match;
  let currency = "UAH";
  if (currencySymbol === "$") {
    currency = "USD";
  } else if (currencySymbol === "€") {
    currency = "EUR";
  }
  const value = parseInt(valueString, 10);
  return { currency, value };
};
