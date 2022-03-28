import { formatPrice, roundPrice } from "./common.utils";

describe('Common Utils', () => {
  it('should round price to nearest dollar', () => {
    expect(roundPrice(100.21, 'SGD', false)).toBe(100);
    expect(roundPrice(100.21, 'SGD', true)).toBe('SGD 100');
  });

  it('should round price to nearest 100-dollars without format', () => {
    expect(roundPrice(300123.22, 'KRW', false)).toBe(300100);
    expect(roundPrice(300123.22, 'KRW', true)).toBe('KRW 300,100');
  });

  it('should not round price if currency not on the list', () => {
    expect(roundPrice(300123.22, 'KRW1', false)).toBe(300123.22);
  });

  it('should format price with currency', () => {
    expect(formatPrice(300123.22, 'KRW')).toBe('KRW 300,123.22');
  });

});
