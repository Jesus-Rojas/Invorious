import { Component, OnInit } from '@angular/core';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  expandSet = new Set<number>();
  productSchema!: Product;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.get()
      .pipe(
        map((products: Product[]) => (
          products.map((product: Product) => {
            product.products = product.relatedProducts.map(id => (
              products.find(p => p.id == id) || this.productSchema
            ))
            return product
          })
        ))
      )
      .subscribe(res => {
        this.products = res
      })
  }

  onExpandChange({ id, checked }: { id: number, checked: boolean }): void {
    checked ? this.expandSet.add(id) : this.expandSet.delete(id)
  }

}
