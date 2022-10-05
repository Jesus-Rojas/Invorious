import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.url

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`)
  }

  show(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`)
  }

  related(related: number[]): Observable<Product[]> {
    const products = related.map(id => this.show(id))
    return forkJoin(products)
  }
}
