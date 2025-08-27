import { Router, Request, Response } from 'express';
import { PriceData, ApiRequest, PriceResponse, HistoryResponse } from '../../types';
import { asyncHandler } from '../../utils/errors';
import { logInfo } from '../../utils/logger';
import { ValidationError, NotFoundError } from '../../utils/errors';
import { fetchAndAggregate } from '../../processors/price-aggregator';
import BinanceDataSource from '../../data-sources/Binance';
import BybitDataSource from '../../data-sources/bybit';
import KrakenDataSource from '../../data-sources/kraken';

const router = Router();

// /: is because its a dynamic route... can be /BTC, /ETH, /USDT, etc
router.get('/:symbol', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const { source } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  const normalizedSymbol = symbol.toUpperCase();

  const aggregated = await fetchAndAggregate(normalizedSymbol);

  const response: PriceResponse = {
    success: true,
    data: aggregated,
    timestamp: Date.now(),
  };

  logInfo(`Price request for ${normalizedSymbol}`, { 
    symbol: normalizedSymbol, 
    source: source || 'default' 
  });

  res.json(response);
}));

// Binance specific endpoint
router.get('/binance/:symbol', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;

  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  const normalizedSymbol = symbol.toUpperCase();
  const binanceDataSource = new BinanceDataSource();
  
  try {
    const priceData = await binanceDataSource.getPrice(normalizedSymbol);
    
    const response: PriceResponse = {
      success: true,
      data: priceData,
      timestamp: Date.now(),
    };

    logInfo(`Binance price request for ${normalizedSymbol}`, { 
      symbol: normalizedSymbol, 
      source: 'binance' 
    });

    res.json(response);
  } catch (error) {
    throw new NotFoundError(`Price not available for ${normalizedSymbol} on Binance`);
  }
}));

// Bybit specific endpoint
router.get('/bybit/:symbol', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;

  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  const normalizedSymbol = symbol.toUpperCase();
  const bybitDataSource = new BybitDataSource();
  
  try {
    const priceData = await bybitDataSource.getPrice(normalizedSymbol);
    
    const response: PriceResponse = {
      success: true,
      data: priceData,
      timestamp: Date.now(),
    };

    logInfo(`Bybit price request for ${normalizedSymbol}`, { 
      symbol: normalizedSymbol, 
      source: 'bybit' 
    });

    res.json(response);
  } catch (error) {
    throw new NotFoundError(`Price not available for ${normalizedSymbol} on Bybit`);
  }
}));

// Kraken specific endpoint
router.get('/kraken/:symbol', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;

  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  const normalizedSymbol = symbol.toUpperCase();
  const krakenDataSource = new KrakenDataSource();
  
  try {
    const priceData = await krakenDataSource.getPrice(normalizedSymbol);
    
    const response: PriceResponse = {
      success: true,
      data: priceData,
      timestamp: Date.now(),
    };

    logInfo(`Kraken price request for ${normalizedSymbol}`, { 
      symbol: normalizedSymbol, 
      source: 'kraken' 
    });

    res.json(response);
  } catch (error) {
    throw new NotFoundError(`Price not available for ${normalizedSymbol} on Kraken`);
  }
}));

//not yet implemented
router.get('/:symbol/history', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const { limit = '10', interval = '1h' } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  const limitNum = parseInt(limit as string);
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 1000) {
    throw new ValidationError('Limit must be a number between 1 and 1000');
  }

  const normalizedSymbol = symbol.toUpperCase();

  //TODO - Implement real data later, mock history for now 
  const mockHistory: PriceData[] = Array.from({ length: Math.min(limitNum, 10) }, (_, i) => ({
    symbol: normalizedSymbol,
    price: 50000 + (Math.random() - 0.5) * 1000, 
    timestamp: Date.now() - (i * 3600000), 
    source: 'mock',
    volume24h: 1000000000,
    marketCap: 1000000000000,
  }));

  const response: HistoryResponse = {
    success: true,
    data: {
      symbol: normalizedSymbol,
      prices: mockHistory,
      interval: interval as string,
    },
    timestamp: Date.now(),
  };

  logInfo(`Price history request for ${normalizedSymbol}`, { 
    symbol: normalizedSymbol, 
    limit: limitNum,
    interval 
  });

  res.json(response);
}));


router.get('/', asyncHandler(async (req: Request, res: Response) => {
  // TODO: Implement actual symbol fetching logic
  const mockSymbols = ['BTC','0G', 'ETH', 'USDT', 'BNB', 'ADA'];

  const response = {
    success: true,
    data: {
      symbols: mockSymbols,
      count: mockSymbols.length,
    },
    timestamp: Date.now(),
  };

  logInfo('Symbols request', { count: mockSymbols.length });

  res.json(response);
}));


// update price by admin TODO - implement auth here❗️
router.post('/:symbol', asyncHandler(async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const { price, source } = req.body;


  if (!symbol || typeof symbol !== 'string') {
    throw new ValidationError('Symbol is required and must be a string');
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    throw new ValidationError('Price is required and must be a positive number');
  }

  const normalizedSymbol = symbol.toUpperCase();
  const updatedPrice: PriceData = {
    symbol: normalizedSymbol,
    price: price,
    timestamp: Date.now(),
    source: source || 'manual',
  };

  const response: PriceResponse = {
    success: true,
    data: updatedPrice,
    timestamp: Date.now(),
  };

  logInfo(`Price update for ${normalizedSymbol}`, { 
    symbol: normalizedSymbol, 
    price, 
    source: source || 'manual' 
  });

  res.status(201).json(response);
}));

// Rate limit info endpoint
router.get('/rate-limit/info', asyncHandler(async (req: Request, res: Response) => {
  
  const remaining = req.headers['x-ratelimit-remaining'];
  const reset = req.headers['x-ratelimit-reset'];
  
  res.json({
    success: true,
    data: {
      remaining: remaining ? parseInt(remaining as string) : 5,
      reset: reset ? parseInt(reset as string) : Date.now() + (24 * 60 * 60 * 1000),
      limit: 5,
      window: '24 hours'
    },
    timestamp: Date.now(),
  });
}));

export default router;
