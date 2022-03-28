import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay, of } from 'rxjs';
import { HotelService } from 'src/app/services/hotel.service';

import { CurrencyComponent } from './currency.component';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let service: HotelService;

  const mockCurrencyList = ['USD', 'SGD', 'CNY', 'KRW'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyComponent ],
      imports: [ HttpClientModule ],
      providers : [ HotelService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;

    const localStore: Record<string, string> = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );

    service = fixture.debugElement.injector.get(HotelService);
    spyOn(service, "getCurrencyList").and.callFake(() => {
      return of(mockCurrencyList).pipe(delay(100));
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 currencies', fakeAsync(() => {
    component.ngOnInit();
    tick(100);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.currency-switcher')).not.toBeNull();
    expect(compiled.querySelectorAll('.currency-switcher option')?.length).toBe(4);
  }));

  it('should get new currency when currency droplist changes', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('.currency-switcher')).nativeElement as HTMLSelectElement;
    select.selectedIndex = 1;  // SGD
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(service.currentCurrency).toBe('SGD');
  }));
});
