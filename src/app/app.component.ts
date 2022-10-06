import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  routes: Routes[] = [
    {
      name: 'Admin',
      base: '/admin',
      icon: 'user',
      routes: [
        {
          route: '/products',
          name: 'Products'
        },
        {
          route: '/exchange-rates',
          name: 'Exchange Rates'
        },
      ]
    },
    {
      name: 'Clientes',
      base: '/client',
      icon: 'team',
      routes: [
        {
          route: '/products',
          name: 'Products'
        },
      ]
    },
  ];
}

interface Routes {
  name: string;
  base: string;
  icon: string;
  routes: Route[];
}

interface Route {
  route: string;
  name: string;
}