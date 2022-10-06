import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { TableComponent } from './components/table/table.component';
import { StoreComponent } from './pages/store/store.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    EditComponent,
    TableComponent,
    StoreComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgZorroModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
