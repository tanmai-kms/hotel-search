import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencySymbols: string[] = [];

  constructor(private hotelService: HotelService) {}

  get currentCurrency(): string {
    return this.hotelService.currentCurrency;
  }

  ngOnInit(): void {
    this.hotelService.getCurrencyList().subscribe((currencySymbols) => {
      this.currencySymbols = currencySymbols;
    });
  }

  onCurrencyChange(event: Event) {
    const newCurrency = (event as any).target.value;
    if (newCurrency) {
      this.hotelService.changeCurrency(newCurrency);
    }
  }

}
