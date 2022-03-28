import { Hotel, HotelData } from "./hotel";
import { HotelPrice, HotelPriceData } from "./hotelPrice";

export class Hotels {

  public data: Hotel[];
  public priceData: HotelPriceData[];
  public currency: string;

  constructor(hotelsData: HotelData[], priceData: HotelPriceData[], currency: string) {
    this.data = hotelsData.map(hotel => new Hotel(hotel));
    this.priceData = priceData;
    this.currency = currency;
    this.loadPrices(this.priceData);
  }

  loadPrices(priceData: HotelPriceData[]) {
    this.data.forEach(hotel => {
      const hotelPrice = priceData.find(price => price.id === hotel.id);
      if (hotelPrice) {
        hotelPrice.currency = this.currency;
        hotel.price = new HotelPrice(hotelPrice);
      } else {
        hotel.price = null;
      }
    });

    // If no price, then it comes last
    this.data.sort((hotel1, hotel2) => {
      if (hotel1.price === null) {
        return 1;
      } else if (hotel2.price === null) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}