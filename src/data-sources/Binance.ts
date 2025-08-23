import axios from 'axios';
import { DataSource, DataSourceConfig, PriceData } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo } from '../utils/logger';
import { DataSourceError } from '../utils/errors';

export class BinanceDataSource {
  private config: DataSource;
  private baseUrl: string;

  constructor() {
    this.config = dataSourceConfig.binance;
    this.baseUrl = this.config.baseUrl;
  }

  async getPrice(symbol: string): Promise<PriceData> {
    try {
        // edgecase since BINANCE Pricing works with USDT.. BTCUSDT is valid, but BTC is not.. LMAO
        if (symbol.includes('USDT') || symbol.includes('usdt') ) {
            symbol = symbol.toUpperCase();
        } else {
            symbol = symbol.toUpperCase()+"USDT";
        }
        logInfo(`Fetching price for ${symbol} from Binance`);
      const response = await axios.get(`${this.baseUrl}?symbol=${symbol}`);
      const price = parseFloat(response.data.price);
      logInfo(`Price for ${symbol} from Binance: ${price}`);
      return {
        symbol,
        price,
        timestamp: Date.now(),
        source: 'binance',
      };
    } catch (error) {
      logError(`Error fetching price for ${symbol} from Binance: ${error}`);
      throw new DataSourceError(`Error fetching price for ${symbol} from Binance`);
    }
  }
}

// TODO just for testing, should be removed
const binance = new BinanceDataSource();
binance.getPrice('btcusdt');

