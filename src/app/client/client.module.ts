import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { TableComponent } from './components/table/table.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { FormsModule } from '@angular/forms';
import { CurrencyObserverComponent } from './components/currency-observer/currency-observer.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    TableComponent,
    CurrencyComponent,
    CurrencyObserverComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgZorroModule,
    FormsModule
  ]
})
export class ClientModule { }
