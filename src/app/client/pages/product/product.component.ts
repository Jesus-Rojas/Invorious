import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, switchMap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product :Product | null = null;
  related :Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private message: NzMessageService,
  ) { }

  ngOnInit():any {
    this.route.params
      .pipe(
        map((param) => param['show']),
        switchMap(id => this.productService.show(Number(id)))
      )
      .subscribe({
        next: (product) => {
          this.product = product
          this.productService.related(product.relatedProducts)
            .subscribe(related => {
              this.related = related
            })
        },
        error: ({ status, statusText }) => {
          this.message.error(`${status} ${statusText}`);
          this.router.navigate(['/clientes'])
        }
      });
  }
}
