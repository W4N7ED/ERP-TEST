
export interface QuoteDiscount {
  type: 'Percentage' | 'Fixed';
  value: number;
  amount: number;
}
