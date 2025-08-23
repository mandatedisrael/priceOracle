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
  coingecko: {
    name: 'CoinGecko',
    baseUrl: 'https://api.coingecko.com/api/v3/',
    apiKey: process.env.COINGECKO_API_KEY,
    rateLimit: 50,
    isActive: true,
  },
  coinMarketCap: {
    name: 'CoinMarketCap',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1',
    apiKey: process.env.COINMARKETCAP_API_KEY,
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
  }
  //TODO - i will be adding more data sources here.... DEXEs Uniswap, Sushiswap, etc
};


export function validateConfig(): void {
  const warnings: string[] = [];
  const errors: string[] = [];

  const required = ['DATABASE_URL', 'REDIS_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    warnings.push(`Missing environment variables: ${missing.join(', ')}`);
    warnings.push('These are required for database/redis functionality, will use mock data for now');
  }


  const apiKeys = ['COINGECKO_API_KEY', 'COINMARKETCAP_API_KEY', 'BINANCE_API_KEY'];
  const missingApiKeys = apiKeys.filter(key => !process.env[key]);
  
  if (missingApiKeys.length > 0) {
    warnings.push(`Missing API keys: ${missingApiKeys.join(', ')}`);
    warnings.push('Some data sources may not work without API keys');
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Configuration Warnings:');
    warnings.forEach(warning => console.warn(`   ${warning}`));
  }

  if (errors.length > 0) {
    console.error('❌ Configuration Errors:');
    errors.forEach(error => console.error(`   ${error}`));
    throw new Error('Invalid configuration. Please fix the errors above.');
  }

  console.log('✅ Configuration validation passed');
}


export default config;
