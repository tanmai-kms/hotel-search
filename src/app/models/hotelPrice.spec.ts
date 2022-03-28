import { HotelPrice } from './hotelPrice';

const hotelPrice = new HotelPrice({
  id: 1,
  price: 164.12,
  currency: 'SGD',
  competitors: {
    "Traveloka": 190,
    "Expedia": 163
  },
  taxes_and_fees: {
    tax: 13.12,
    hotel_fees: 16.4
  }
});

describe('HotelPrice', () => {
  it('should create an instance', () => {
    expect(hotelPrice).toBeTruthy();
  });

  it('should have correct formatted price', () => {
    expect(hotelPrice.formattedPrice).toBe('SGD 164');
  });

  it('should have competitor price list with ordering', () => {
    const expectedResult = [
      { name: 'Expedia', price: 163, formattedPrice: 'SGD 163' },
      { name: 'Us', price: 164.12, formattedPrice: 'SGD 164', us: true },
      { name: 'Traveloka', price: 190, formattedPrice: 'SGD 190' }
    ]
    expect(hotelPrice.competitorPrices).toEqual(expectedResult);
  });

  it('should have correct max price and formatted', () => {
    expect(hotelPrice.maxPrice).toBe(190);
    expect(hotelPrice.formattedMaxPrice).toBe('SGD 190');
  });

  it('should have saving and formatted saving amount', () => {
    // 26 = 190 - 164
    expect(hotelPrice.saving).toBe(26);
    expect(hotelPrice.formattedSaving).toBe('SGD 26');
  });

  it('should have taxes and fees tooltip', () => {
    expect(hotelPrice.taxesFeesText).toBe('Taxes: SGD 13 and Fees: SGD 16');
  });
});
