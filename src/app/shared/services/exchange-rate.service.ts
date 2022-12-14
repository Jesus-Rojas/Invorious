import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exchange } from '../models/exchange.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private api = environment.url
  public exchangeSubject = new Subject<Exchange | null>();
  public exchange = this.exchangeSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(`${this.api}/exchange-rates`)
  }
}
