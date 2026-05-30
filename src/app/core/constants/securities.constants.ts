/** Listed instruments available in the order-entry dropdown (mock market data). */
export const SECURITIES = [
  'RELIANCE',
  'TCS',
  'INFY',
  'HDFCBANK',
  'ICICIBANK',
] as const;

export type SecuritySymbol = (typeof SECURITIES)[number];
