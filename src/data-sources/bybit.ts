import axios from 'axios';
import { DataSource, PriceData } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo } from '../utils/logger';

export class BybitDataSource {
    private config: DataSource;
    private baseUrl: string;

    constructor(){
        this.config = dataSourceConfig.Bybit
        this.baseUrl = this.config.baseUrl;
    }

    async getPrice(symbol: string){
        if (symbol.includes('USDT') || symbol.includes('usdt')){
            symbol = symbol.toUpperCase();
    } else{
        symbol = symbol.toUpperCase()+"USDT";
    }
    logInfo(`Fetching price for ${symbol} from Bybit`);
    const response = await axios.get(`${this.baseUrl}v5/market/tickers?category=spot&symbol=${symbol}`);
    const price = parseFloat(response.data.result.list[0].usdIndexPrice);
    logInfo(`Price for ${symbol} from Bybit: ${price}`);
    return {
        symbol: symbol,
        price: price,
        timestamp: Date.now(),
        source: this.config.name,
    }
}

}
export default BybitDataSource;

// TODO just for testing, should be removed
const bybit = new BybitDataSource();
bybit.getPrice('BTC').then(console.log);
