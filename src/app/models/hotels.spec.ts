import { HotelPrice } from './hotelPrice';
import { Hotels } from './hotels';

const mockHotelList = [{
  id: 1,
  name: "Shinagawa Prince Hotel",
  rating: 7.7,
  stars: 4,
  address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
  photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
  description: "<p>Test1</p>"
}];

const mockHotelCurrency = [{
  id: 1,
  price: 164,
  currency: 'SGD',
  competitors: {
    "Traveloka": 190,
    "Expedia": 163
  },
  taxes_and_fees: {
    tax: 13.12,
    hotel_fees: 16.4
  }
}];

const hotels = new Hotels(mockHotelList, mockHotelCurrency, 'SGD');

describe('Hotels', () => {
  it('should create an instance', () => {
    expect(hotels).toBeTruthy();
  });

  it('should have correct hotel price data', () => {
    const expectedResult = new HotelPrice(mockHotelCurrency[0]);
    expect(hotels.data.length).toEqual(1);
    expect(hotels.data[0].price).toEqual(expectedResult);
  });

  it('should have no hotel price data', () => {
    const mockHotelCurrency = [{
      id: 2,
      price: 164,
      currency: 'SGD'
    }];
    const hotels = new Hotels(mockHotelList, mockHotelCurrency, 'SGD');
    expect(hotels.data.length).toEqual(1);
    expect(hotels.data[0].price).toEqual(null);
  });

  it('should push hotel to bottom if its price is null', () => {
    const mockHotelList = [{
      id: 1,
      name: "Hotel1",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test1</p>"
    },{
      id: 2,
      name: "Hotel2",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test2</p>"
    },{
      id: 3,
      name: "Hotel3",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test3</p>"
    }];
    const mockHotelCurrency = [{
      id: 2,
      price: 164,
      currency: 'SGD'
    },{
      id: 3,
      price: 164,
      currency: 'SGD'
    }];
    const hotels = new Hotels(mockHotelList, mockHotelCurrency, 'SGD');
    expect(hotels.data.length).toEqual(3);
    expect(hotels.data[2].id).toEqual(1);
    expect(hotels.data[2].price).toEqual(null);
  });

  it('should not be present in data if hotel details not available regardless of price', () => {
    const mockHotelCurrency = [{
      id: 1,
      price: 164,
      currency: 'SGD'
    }];
    const hotels = new Hotels([], mockHotelCurrency, 'SGD');
    expect(hotels.data.length).toEqual(0);
  });
});
