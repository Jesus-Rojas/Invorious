import { Component, OnInit } from '@angular/core';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currency: null | Exchange = null
  exchanges: Exchange[] = []
  exchangeSubject = this.exchangeService.exchangeSubject

  constructor(
    private exchangeService: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.exchangeService.get().subscribe(exchanges => {
      const currency = JSON.parse(localStorage.getItem('exchange_rate') || 'null')
      this.exchanges = exchanges

      this.currency = exchanges.find(exchange => exchange.base === currency) || null
      
      this.exchangeSubject.next(this.currency)
    })
  }

  changeCurrency(exchange: Exchange | null) {
    const send = exchange && exchange.base ? exchange.base : null
    localStorage.setItem('exchange_rate', JSON.stringify(send))
    this.exchangeSubject.next(exchange)
  }

}
