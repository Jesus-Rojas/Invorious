import { Component, OnInit } from '@angular/core';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {

  exchanges: Exchange[] = []

  constructor(
    private exchangeService: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.exchangeService.get().subscribe(res => {
      this.exchanges = res
    })
  }

}
