import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyObserverComponent } from './currency-observer.component';

describe('CurrencyObserverComponent', () => {
  let component: CurrencyObserverComponent;
  let fixture: ComponentFixture<CurrencyObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyObserverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
