import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exchange } from 'src/app/shared/models/exchange.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchange-rate.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() products :Product[] = [];

  constructor() { }

  ngOnInit(): void { }

}
