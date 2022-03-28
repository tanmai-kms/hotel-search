import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelListingComponent } from './components/hotel-listing/hotel-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelListingComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
