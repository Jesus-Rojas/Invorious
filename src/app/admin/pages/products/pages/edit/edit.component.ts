import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, switchMap, tap } from 'rxjs';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';
import { ProductService } from 'src/app/shared/services/product.service';

interface FormSchema {
  id: null | number,
  name: string,
  price: null | number,
  amount: null | number,
  base: string,
  description: string,
  related: number[],
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  exchanges: Exchange[] = []
  products: Product[] = []
  formSchema: FormSchema = {
    id: null,
    name: '',
    price: null,
    amount: null,
    base: '',
    description: '',
    related: [],
  }
  
  form = this.fb.group({
    name: [this.formSchema.name, [Validators.required]],
    price: [this.formSchema.price, [Validators.required, Validators.min(1)]],
    amount: [this.formSchema.amount, [Validators.required, Validators.min(1)]],
    base: [this.formSchema.base, [Validators.required]],
    description: [this.formSchema.description, [Validators.required]],
    related: [this.formSchema.related, []],
    id: [this.formSchema.id, []],
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exchangeService: ExchangeRateService,
    private productService: ProductService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((param) => param['id']),
        switchMap(id => this.productService.show(Number(id)))
      )
      .subscribe({
        next: ({ name, price, description, relatedProducts: related, id }) => {
          this.form.setValue({
            id: id || null,
            name,
            description,
            related,
            price: price.value,
            amount: price.amount,
            base: price.base,
          })
        },
        error: ({ status, statusText }) => {
          this.message.error(`${status} ${statusText}`);
          this.router.navigate(['/admin/products'])
        }
      })

    this.productService.get().subscribe(products => {
      this.products = products.filter(product => product.id !== this.form.get('id')?.value)
    })

    this.exchangeService.get().subscribe(exchanges => {
      this.exchanges = exchanges
    })
    
    
  }

  submitForm(): void {
    const datos: Product = {
      id: this.form.get('id')?.value || 1,
      name: this.form.get('name')?.value || '',
      description: this.form.get('description')?.value || '',
      relatedProducts: this.form.get('related')?.value || [],
      price: {
        value: this.form.get('price')?.value || 1,
        amount: this.form.get('amount')?.value || 1,
        base: this.form.get('base')?.value || 'USD',
      }
    }

    this.productService.update(datos).subscribe(res => {
      this.message.success(`Product updated`)
      this.router.navigate([`/admin/products/show/${this.form.get('id')?.value}`])
    })
  }

}
