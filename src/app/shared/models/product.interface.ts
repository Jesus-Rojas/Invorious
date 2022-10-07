interface Price {
  base: 'USD'|'CNY'|'AUD'|string;
  value: number;
  amount: number;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: Price;
  relatedProducts: number[];
  products?: Product[];
}
