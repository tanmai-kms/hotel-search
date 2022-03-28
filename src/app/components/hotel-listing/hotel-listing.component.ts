import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Hotels } from 'src/app/models/hotels';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.scss']
})
export class HotelListingComponent implements OnInit, OnDestroy {

  hotels!: Hotels;
  changeCurrencySub: Subscription | undefined;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    forkJoin({
      currenciesData: this.hotelService.getCurrency(this.hotelService.currentCurrency),
      hotelsData: this.hotelService.getSearchedHotels('tokyo')
    }).subscribe(data => {
      this.hotels = new Hotels(data.hotelsData, data.currenciesData, this.hotelService.currentCurrency);
    });

    this.changeCurrencySub = this.hotelService.changeCurrency$.subscribe(newCurrency => {
      this.hotelService.getCurrency(newCurrency).subscribe(data => {
        this.hotels.currency = newCurrency;
        this.hotels.loadPrices(data);
      })
    });
  }

  ngOnDestroy(): void {
    if (this.changeCurrencySub) this.changeCurrencySub.unsubscribe();
  }
}
