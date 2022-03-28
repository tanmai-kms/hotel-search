import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let service: HotelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],

    });
    service = TestBed.inject(HotelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get correct searched hotel list', () => {
    const mockHotelList = [{
      id: 1,
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test1</p>"
    }];
    service.getSearchedHotels('tokyo').subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(1);
      expect(res).toEqual(mockHotelList);
    });
 
    const request = httpTestingController.expectOne('https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo');
    expect(request.request.method).toBe("GET");
    expect(request.cancelled).toBeFalsy();
    expect(request.request.responseType).toEqual('json');
    request.flush(mockHotelList);
  });

  it('should get correct currency data', () => {
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
    service.getCurrency('SGD').subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(1);
      expect(res).toEqual(mockHotelCurrency);
    });
 
    const request = httpTestingController.expectOne('http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/SGD');
    expect(request.request.method).toBe("GET");
    expect(request.cancelled).toBeFalsy();
    expect(request.request.responseType).toEqual('json');
    request.flush(mockHotelCurrency);
  });
});
