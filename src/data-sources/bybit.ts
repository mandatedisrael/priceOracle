import axios from 'axios';
import { DataSource, PriceData } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo, logPriceRequest } from '../utils/logger';
import { DataSourceError } from '../utils/errors';

export class BybitDataSource {
    private config: DataSource;
    private baseUrl: string;

    constructor(){
        this.config = dataSourceConfig.Bybit
        this.baseUrl = this.config.baseUrl;
    }

    async getPrice(symbol: string): Promise<PriceData> {
        if (symbol.includes('USDT') || symbol.includes('usdt')){
            symbol = symbol.toUpperCase();
    } else{
        symbol = symbol.toUpperCase()+"USDT";
    }
    try{
        const response = await axios.get(`${this.baseUrl}v5/market/tickers?category=spot&symbol=${symbol}`);
        const price = parseFloat(response.data.result.list[0].usdIndexPrice);
        logPriceRequest(symbol, 'bybit', price);
        return {
        symbol: symbol,
        price: price,
        timestamp: Date.now(),
        source: this.config.name,
        }
    } catch (error) {
        logPriceRequest(symbol, 'bybit');
        throw new DataSourceError(`Error fetching price for ${symbol} from Bybit`);
    }
}
}
export default BybitDataSource;

