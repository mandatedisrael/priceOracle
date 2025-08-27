import axios from 'axios';
import { PriceData, DataSource } from '../types';
import { dataSourceConfig } from '../config';
import { logError, logInfo } from '../utils/logger';
import { DataSourceError } from '../utils/errors';
import { DuneClient } from '@duneanalytics/client-sdk';

// STILL WORKING ON THIS

export class DuneDataSource {
  private config: DataSource;
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.config = dataSourceConfig.dune;
    this.baseUrl = this.config.baseUrl;
    this.apiKey = this.config.apiKey || '';
  }

}
// Setup environment
const DUNE_API_KEY = process.env.DUNE_API_KEY!;
const client = new DuneClient(DUNE_API_KEY);

async function createTokenPriceQuery(): Promise<string> {
  const response = await fetch('https://api.dune.com/api/v1/query', {
    method: 'POST',
    headers: {
      'X-Dune-API-Key': DUNE_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "All Token Prices Query",
      query_sql: `
        SELECT 
          symbol,
          price,
          timestamp,
          blockchain,
          contract_address
        FROM prices.latest 
        WHERE blockchain = 'ethereum'
        ORDER BY price DESC
        LIMIT 100
      `,
      is_private: false
    })
  });
  
  const result = await response.json() as { query_id: string };
  return result.query_id;
}

export default DuneDataSource;


// TODO - remove this later, just for testing
async function test() {
  const result = await createTokenPriceQuery();
  console.log(result);
}

test();
