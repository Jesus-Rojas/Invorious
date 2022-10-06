import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgZorroModule,
  ]
})
export class ClientModule { }
