import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { ExchangeRatesComponent } from './pages/exchange-rates/exchange-rates.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ExchangeRatesComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroModule,
  ]
})
export class AdminModule { }
