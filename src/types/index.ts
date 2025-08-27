// Price data types
export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
  source: string;
  volume24h?: number;
  marketCap?: number;
  confidence?: number;
}

export interface PriceList{
  symbol: string;
  prices: PriceData[];
}
export interface PriceHistory {
  symbol: string;
  prices: PriceData[];
  interval: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface PriceResponse extends ApiResponse<PriceData> {}
export interface HistoryResponse extends ApiResponse<PriceHistory> {}

// Data source types
export interface DataSource {
  name: string;
  baseUrl: string;
  apiKey?: string;
  rateLimit?: number;
  isActive: boolean;
  tokens?: string[];
  confidence?: number;
}

export interface DataSourceConfig {
  binance: DataSource;
  defillama: DataSource;
  uniswap: DataSource;
  dune: DataSource;
  kraken: DataSource;
  Bybit: DataSource;
}

// Processor types
export interface PriceProcessor {
  process(prices: PriceData[]): PriceData;
}

export interface AggregationMethod {
  name: string;
  calculate(prices: number[]): number;
}

// Storage types
export interface StorageInterface {
  savePrice(price: PriceData): Promise<void>;
  getPrice(symbol: string): Promise<PriceData | null>;
  getPriceHistory(symbol: string, limit: number): Promise<PriceData[]>;
  savePriceHistory(prices: PriceData[]): Promise<void>;
}

// API types
export interface ApiRequest {
  symbol: string;
  source?: string;
  limit?: number;
}

export interface WebSocketMessage {
  type: 'price_update' | 'error' | 'connection';
  data: any;
  timestamp: number;
}

// Configuration types
export interface AppConfig {
  port: number;
  nodeEnv: string;
  database: {
    url: string;
  };
  redis: {
    url: string;
  };
  api: {
    rateLimitWindow: number;
    rateLimitMax: number;
  };
  logging: {
    level: string;
    file: string;
  };
}
