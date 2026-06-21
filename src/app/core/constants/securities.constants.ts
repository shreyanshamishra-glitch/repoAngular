/** Default symbols — overridden by API metadata when available. */
export const SECURITIES = [
  'IBM',
  'MSFT',
  'AAPL',
  'GOOGL',
  'TSLA',
] as const;

export type SecuritySymbol = (typeof SECURITIES)[number];
