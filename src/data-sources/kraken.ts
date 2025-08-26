import axios from 'axios';
import { DataSource, PriceData } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo } from '../utils/logger';
import { DataSourceError } from '../utils/errors';

export class KrakenDataSource{
    private config: DataSource;
    private baseUrl: string;

    constructor(){
        this.config = dataSourceConfig.kraken;
        this.baseUrl = this.config.baseUrl;
    }

    async getPrice(symbol: string): Promise<PriceData>{
        if (symbol.includes('USD') || symbol.includes('usd')){
            symbol = symbol.toUpperCase();
    } else{
        symbol = symbol.toUpperCase()+"USD";
    }
    logInfo(`Fetching price for ${symbol} from Kraken`);
    const response = await axios.get(`${this.baseUrl}/public/Ticker?pair=${symbol}`);
    const symbolKey = Object.keys(response.data.result)[0];
    const price = parseFloat(response.data.result[symbolKey].c[0]);
    logInfo(`Price for ${symbol} from Kraken: ${price}`);
    return {
        source: this.config.name,
        symbol: symbol,
        price: price,
        timestamp: Date.now(),
    };
    }
}

export default KrakenDataSource;
    
// TODO just for testing, should be removed
// const kraken = new KrakenDataSource();
// kraken.getPrice('BTC').then(console.log);