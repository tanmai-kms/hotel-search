import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { Hotels } from 'src/app/models/hotels';
import { HotelService } from 'src/app/services/hotel.service';

import { HotelListingComponent } from './hotel-listing.component';

describe('HotelListingComponent', () => {
  let component: HotelListingComponent;
  let fixture: ComponentFixture<HotelListingComponent>;
  let service: HotelService;
  let localStore: Record<string, string>;
  let getSearchedHotelsSpy: jasmine.Spy;
  let getCurrencySpy: jasmine.Spy;

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
    competitors: {
      "Traveloka": 190,
      "Expedia": 163
    },
    taxes_and_fees: {
      tax: 13.12,
      hotel_fees: 16.4
    }
  }];

  const mockHotelCurrency2 = [{
    id: 1,
    price: 134434.8,
    competitors: {
      "Booking.com": 135154.89
    }
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelListingComponent ],
      imports: [ HttpClientModule ],
      providers : [ HotelService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListingComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HotelService);
    getSearchedHotelsSpy = spyOn(service, "getSearchedHotels").and.callFake(() => {
      return of(mockHotelList).pipe(delay(100));
    });
    getCurrencySpy = spyOn(service, "getCurrency").and.callFake(() => {
      return of(mockHotelCurrency).pipe(delay(100));
    });
    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.hotels).toEqual(new Hotels(mockHotelList, mockHotelCurrency, 'USD'));
  }));

  it('should have hotel-list class and 2 items', fakeAsync(() => {
    const mockHotelList = [{
      id: 1,
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test1</p>"
    },
    {
      id: 2,
      name: "Hotel 2",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test2</p>"
    }];

    getSearchedHotelsSpy.and.callFake(() => {
      return of(mockHotelList).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hotel-list')).not.toBeNull();
    expect(compiled.querySelectorAll('.hotel-item')?.length).toBe(2);
  }));

  it('should have strikethrough rate if having saving', fakeAsync(() => {
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // most expensive is Traveloka = 190 USD
    expect(compiled.querySelector('.max-price-strikethrough')?.textContent).toContain('USD 190');
  }));

  it('should sort competitor list by price', fakeAsync(() => {
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // competitor list must be sorted by price:
    // "Expedia": 163, "Us": 164, "Traveloka": 190
    const competitorList = compiled.querySelectorAll('.competitor-name');
    expect(competitorList.length).toBe(3);
    expect(competitorList[0].textContent).toContain('Expedia');
    expect(competitorList[1].textContent).toContain('Us');
    expect(competitorList[2].textContent).toContain('Traveloka');
  }));

  it('should have saving amount', fakeAsync(() => {
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // saving 190 - 164 = 26
    expect(compiled.querySelector('.saving')?.textContent).toContain('USD 26');
  }));

  it('should have taxes and fees icon', fakeAsync(() => {
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.taxes-fees mat-icon')?.getAttribute('title')
    ).toContain('Taxes: USD 13 and Fees: USD 16');
  }));

  it('should show "Rates unavailable"', fakeAsync(() => {
    getCurrencySpy.and.callFake(() => {
      return of([]).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.no-price')?.textContent
    ).toContain('Rates unavailable');
  }));

  it('should switch to new currency"', fakeAsync(() => {
    getCurrencySpy.and.callFake((currency: string) => {
      if (currency === 'KRW') {
        return of(mockHotelCurrency2).pipe(delay(100));
      } else {
        return of(mockHotelCurrency).pipe(delay(100));
      }
    });
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.current-price')?.textContent
    ).toContain('USD 164');

    service.changeCurrency('KRW');

    tick(100);

    fixture.detectChanges();

    expect(
      compiled.querySelector('.current-price')?.textContent
    ).toContain('KRW 134,400');
  }));
});
