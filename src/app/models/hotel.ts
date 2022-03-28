import { HotelPrice } from "./hotelPrice";

export interface HotelData {
  id: number | string;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
  price?: HotelPrice | null;
}

export class Hotel implements HotelData {

  id: number | string;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
  price?: HotelPrice | null;

  constructor(data: HotelData) {
    this.id = data.id;
    this.name = data.name;
    this.rating = data.rating;
    this.stars = data.stars;
    this.address = data.address;
    this.photo = data.photo;
    this.description = data.description;
    this.price = data.price;
  }
}