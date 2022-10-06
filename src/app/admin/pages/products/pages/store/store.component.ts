import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  exchanges: Exchange[] = []
  products: Product[] = []
  

  form = this.fb.group({
    name: ['', [Validators.required]],
    price: [null, [Validators.required, Validators.min(1)]],
    amount: [null, [Validators.required, Validators.min(1)]],
    base: ['', [Validators.required]],
    description: ['', [Validators.required]],
    related: [[], []],
  });

  constructor(
    private fb: FormBuilder,
    private exchangeService: ExchangeRateService,
    private productService: ProductService,
    private message: NzMessageService,
  ) 
  { }

  ngOnInit(): void {
    this.productService.get().subscribe(products => {
      this.products = products
    })
    this.exchangeService.get().subscribe(exchanges => {
      this.exchanges = exchanges
    })
  }

  submitForm(): void {
    const datos: Product = {
      name: this.form.get('name')?.value || '',
      description: this.form.get('description')?.value || '',
      relatedProducts: this.form.get('related')?.value || [],
      price: {
        value: this.form.get('price')?.value || 1,
        amount: this.form.get('amount')?.value || 1,
        base: this.form.get('base')?.value || '',
      }
    }

    this.productService.store(datos).subscribe(res => {
      this.message.success(`Product created`);
    })
  }
}
