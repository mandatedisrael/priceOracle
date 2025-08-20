import axios from 'axios';
import { PriceData, DataSource } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo } from '../utils/logger';
import { DataSourceError } from '../utils/errors';

export class DefillamaDataSource {
  private config: DataSource;
  private baseUrl: string;

private readonly tokens: string[] = [
    "ethereum:0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
    "ethereum:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    "ethereum:0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    "ethereum:0x514910771AF9Ca656af840dff83E8264EcF986CA", // ChainLINK
    "ethereum:0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    "ethereum:0xB8c77482e45F1F44dE1745F52C74426C631bDD52" // BNB
  ]
  constructor() {
    this.config = dataSourceConfig.defillama;
    this.baseUrl = this.config.baseUrl;
  }

  async getTokensPrices(): Promise<PriceData[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/prices/current/${this.tokens.join(',')}`);

      const coins = (response.data && (response.data as any).coins) as Record<string, { symbol: string; price: number; timestamp: number; confidence?: number }>;
      if (!coins) {
        throw new DataSourceError('DefiLlama response missing coins');
      }

      const priceData: PriceData[] = this.tokens.map((id) => {
        const c = coins[id];
        if (!c) {
          throw new DataSourceError(`Missing price for ${id}`);
        }
        return {
          symbol: c.symbol.toUpperCase(),
          price: c.price,
          timestamp: c.timestamp * 1000,
          confidence: c.confidence,
          source: 'defillama',
        };
      });

      logInfo('Retrieved data from DefiLlama', { count: priceData.length });
      return priceData;

    } catch (error) {
      logError(`Failed to get the datas from Defillama`, error as Error);
      throw new DataSourceError(`Defillama API error: ${(error as Error).message}`);
    }
  }
}

export default DefillamaDataSource;

// TODO - remove this later, just for testing
// const defillama = new DefillamaDataSource();
// defillama.getTokensPrices().then(console.log).catch(console.error);

