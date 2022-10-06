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

  store(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/products`, product)
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/products/${product.id}`, product)
  }

  show(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`)
  }

  related(related: number[]): Observable<Product[]> {
    const products = related.map(id => this.show(id))
    return forkJoin(products)
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/products/${id}`)
  }
}
