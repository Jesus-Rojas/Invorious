import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() products :Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
