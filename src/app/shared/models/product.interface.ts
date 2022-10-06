interface Price {
  base: string;
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
