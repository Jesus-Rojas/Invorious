import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { ExchangeRatesComponent } from './pages/exchange-rates/exchange-rates.component';


@NgModule({
  declarations: [
    ExchangeRatesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroModule,
  ]
})
export class AdminModule { }
