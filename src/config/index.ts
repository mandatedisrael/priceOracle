import dotenv from 'dotenv';
import { AppConfig, DataSourceConfig } from '../types';


dotenv.config();

// TODO postgreql not implemented ye, later ( Will later change this to 0G Storage)
export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'xxxx', //postgresql://localhost:5432/priceoracle
  },
  redis: {
    url: process.env.REDIS_URL || 'xxxxxx', //redis://localhost:6379
  },
  api: {
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log',
  },
};


export const dataSourceConfig: DataSourceConfig = {
  kraken: {
    name: 'Kraken',
    baseUrl: 'https://api.kraken.com/0',
    apiKey: process.env.KRAKEN_API_KEY,
    rateLimit: 50,
    isActive: true,
  },
  Bybit: {
    name: 'Bybit',
    baseUrl: 'https://api.bybit.com/',
    apiKey: process.env.KRAKEN_API_KEY,
    rateLimit: 50,
    isActive: true,
  },
  binance: {
    name: 'Binance',
    baseUrl: 'https://api4.binance.com/api/v3/avgPrice',
    apiKey: '', // PUBLIC API, key not required
    rateLimit: 1200,
    isActive: true,
  },
  defillama: {
    name: 'Defillama',
    baseUrl: 'https://coins.llama.fi',
    apiKey: '', // PUBLIC API, key not required
    rateLimit: 1200,
    isActive: true,
  },
  uniswap: {
    name: 'UniswapV2',
    baseUrl: process.env.UNISWAP_SUBGRAPH_URL || 'https://gateway.thegraph.com/api/' + (process.env.THE_GRAPH_API_KEY || 'YOUR_KEY') + '/subgraphs/id/UNISWAP_V2_SUBGRAPH_ID',
    rateLimit: 1200,
    isActive: true,
  },
  dune: {
    name: 'Dune Analytics',
    baseUrl: 'https://api.dune.com/api/v1',
    apiKey: process.env.DUNE_API_KEY,
    rateLimit: 100,
    isActive: true,
  }
  //TODO - i will be adding more data sources here.... DEXEs Uniswap, Sushiswap, etc
};

export default config;

// Basic runtime configuration validation to fail fast on obvious issues
export function validateConfig(): void {
  if (!config.port || Number.isNaN(config.port)) {
    throw new Error('Invalid PORT configuration');
  }
  // Add lightweight checks; expand as needed without blocking MVP
  if (!config.logging.file) {
    throw new Error('Logging file path must be configured');
  }
}
