import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelData } from '../models/hotel';
import { map, of, Subject } from 'rxjs';
import { HotelPriceData } from '../models/hotelPrice';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private changeCurrencySource = new Subject<string>();
  public changeCurrency$ = this.changeCurrencySource.asObservable();

  get currentCurrency() {
    return localStorage.getItem('currency') || 'USD';
  }

  set currentCurrency(currency: string) {
    localStorage.setItem('currency', currency);
  }

  constructor(private http: HttpClient) {}

  getSearchedHotels(city: string) {
    // the api is now return "Not found" if city not tokyo,
    // the map function is dealing with it
    return this.http.get<HotelData[]>('https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/' + city).pipe(
      map(res => Array.isArray(res) ? res: [])
    );
  }

  getCurrencyList() {
    return of(['USD', 'SGD', 'CNY', 'KRW']);
  }

  changeCurrency(newCurrency: string) {
    this.currentCurrency = newCurrency;
    this.changeCurrencySource.next(newCurrency);
  }

  getCurrency(currency: string) {
    // the api is now return "Not found" if currency not in the list,
    // the map function is dealing with it
    return this.http.get<HotelPriceData[]>('http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/' + currency).pipe(
      map(res => Array.isArray(res) ? res: [])
    );
  }
}
