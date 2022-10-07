import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
  selector: 'app-currency-observer',
  templateUrl: './currency-observer.component.html',
  styleUrls: ['./currency-observer.component.scss']
})
export class CurrencyObserverComponent implements OnInit {

  @Input() product!: Product

  exchange = this.exchangeService.exchange
  exchangeSubject = this.exchangeService.exchangeSubject
  currency: Exchange | null = null

  constructor(
    private exchangeService: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.exchangeService.get().subscribe(exchanges => {
      const currency = JSON.parse(localStorage.getItem('exchange_rate') || 'null')
      this.currency = exchanges.find(exchange => exchange.base === currency) || null
      
      this.exchangeSubject.next(this.currency)
    })

    this.exchange.subscribe(res => {
      this.currency = res
    })
  }

}
