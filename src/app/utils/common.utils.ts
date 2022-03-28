export function roundPrice(price: number, currency: string, format = true): number | string {
  if (['USD', 'SGD', 'CNY'].includes(currency)) {
    price = Math.floor(price);
  } else if (['KRW', 'JPY'].includes(currency)) {
    price = Math.floor(price / 100) * 100;
  }
  if (format) {
    return formatPrice(price, currency);
  } else {
    return price;
  }
}

export function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString()}`;
}