export interface PriceAlert {
  id: string;
  symbol: string;
  threshold: number;
  type: 'above' | 'below';
  active: boolean;
}

export interface TickerResponse {
  bid: string;
  ask: string;
  volume: {
    BTC?: string;
    USD?: string;
    timestamp: number;
  };
  last: string;
}