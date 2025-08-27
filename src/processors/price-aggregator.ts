import { PriceData, PriceProcessor } from '../types';
import { BinanceDataSource } from '../data-sources/Binance';
import { KrakenDataSource } from '../data-sources/kraken';
import { BybitDataSource } from '../data-sources/bybit';
// import { DuneDataSource } from '../data-sources/dune';
// import { UniswapDataSource } from '../data-sources/Uniswap/quote';
// import { DefiLlamaDataSource } from '../data-sources/defillama';


function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const midIndex = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[midIndex - 1] + sorted[midIndex]) / 2
    : sorted[midIndex];
}

async function getPricesFromSources(symbol: string): Promise<PriceData[]> {
  const tasks = [
    new BinanceDataSource().getPrice(symbol),
    new KrakenDataSource().getPrice(symbol),
    new BybitDataSource().getPrice(symbol),
  ];

  const settled = await Promise.allSettled(tasks);
  const successes: PriceData[] = [];
  for (const r of settled) {
    if (r.status === 'fulfilled') successes.push(r.value);
  }
  return successes;
}
export class PriceAggregator implements PriceProcessor {
  process(prices: PriceData[]): PriceData {
    if (prices.length === 0) {
      throw new Error('No prices provided');
    }

    const valid = prices.filter(p => Number.isFinite(p.price) && p.price > 0);
    if (valid.length === 0) {
      throw new Error('No valid prices to aggregate');
    }

    const medianPrice = calculateMedian(valid.map(p => p.price));

    return {
      symbol: valid[0].symbol,
      price: medianPrice,
      timestamp: Date.now(),
      source: 'aggregated',
    };
  }
}

export async function fetchAndAggregate(symbol: string): Promise<PriceData> {
  // Special case for 0G/OG token - fixed price of $10
  const normalizedSymbol = symbol.toUpperCase();
  if (normalizedSymbol === '0G' || normalizedSymbol === 'OG') {
    return {
      symbol: normalizedSymbol,
      price: 10,
      timestamp: Date.now(),
      source: 'fixed',
    };
  }
  
  const prices = await getPricesFromSources(symbol);
  return new PriceAggregator().process(prices);
}

