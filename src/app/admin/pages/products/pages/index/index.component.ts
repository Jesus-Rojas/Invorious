import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  products: Product[] = []
  expandSet = new Set<number>();
  productSchema!: Product;

  constructor(
    private productService: ProductService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.productService.get()
      .pipe(
        map((products: Product[]) => (
          products.map((product: Product) => {
            let validRelated: number[] = []
            // Se valida la existencia del related (si se modifica el json y este no existe).
            product.relatedProducts.map(id => (
              products.find(p => p.id == id) && validRelated.push(id)
            ))

            product.products = validRelated.map(id => (
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

  remove(id :number) {
    const products = this.products.filter(product => (product.relatedProducts.includes(id)))

    // Se elimina las relaciones del producto y de ultimo se elimina el mismo
    this.update({ products, id })
      .pipe(
        mergeMap(() => this.productService.remove(id))
      )
      .subscribe(() => {
        this.message.success(`Product deleted`);
        this.ngOnInit()
      })
  }

  update({ products, id }: { products: Product[], id: number }) {
    const observer = products.map(({ relatedProducts, ...product }) => {
      delete product.products

      return this.productService.update({
        relatedProducts: relatedProducts.filter(related => related !== id),
        ...product,
      })
    })
    return forkJoin(observer)
  }

}
