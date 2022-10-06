export interface Exchange {
  base: string;
  rates: Rates;
}

interface Rates {
  USD?: number;
  CNY?: number;
  AUD?: number;
}