import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exchange } from '../models/exchange.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private api = environment.url

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(`${this.api}/exchange-rates`)
  }
}
