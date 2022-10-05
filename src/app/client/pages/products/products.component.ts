import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products :Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.get().subscribe(res => {
      this.products = res;
    })
  }
}
