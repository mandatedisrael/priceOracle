import winston from 'winston';
import { config } from '../config';

// Create logger instance
const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'price-oracle' },
  transports: [
    // Console transport with cleaner format
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, context, error, ...meta }) => {
          let log = `${timestamp} [${level}]: ${message}`;
          if (context) log += ` | ${JSON.stringify(context)}`;
          if (error) log += ` | Error: ${error}`;
          return log;
        })
      ),
    }),
    // File transport with rotation
    new winston.transports.File({
      filename: config.logging.file,
      maxsize: 10485760, // 10MB
      maxFiles: 3,
      tailable: true,
    }),
    // Separate error log file
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 2,
    }),
  ],
});

// Log levels
export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Helper functions for common logging patterns
export const logError = (message: string, error?: Error, context?: any) => {
  logger.error(message, { error: error?.message, stack: error?.stack, context });
};

export const logInfo = (message: string, context?: any) => {
  logger.info(message, { context });
};

export const logWarn = (message: string, context?: any) => {
  logger.warn(message, { context });
};

export const logDebug = (message: string, context?: any) => {
  logger.debug(message, { context });
};

// Specialized logging functions
export const logPriceRequest = (symbol: string, source: string, price?: number) => {
  if (price) {
    logger.info(`Price fetched: ${symbol} = $${price}`, { symbol, source, price });
  } else {
    logger.warn(`Price fetch failed: ${symbol}`, { symbol, source });
  }
};

export const logAPIAccess = (method: string, path: string, statusCode: number, duration: number, ip: string) => {
  const level = statusCode >= 400 ? 'warn' : 'info';
  logger.log(level, `${method} ${path} ${statusCode}`, { 
    method, path, statusCode, duration: `${duration}ms`, ip 
  });
};

export const logAggregation = (symbol: string, sources: number, validPrices: number, finalPrice: number) => {
  logger.info(`Price aggregated: ${symbol} = $${finalPrice}`, { 
    symbol, sources, validPrices, finalPrice 
  });
};


export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logAPIAccess(req.method, req.originalUrl, res.statusCode, duration, ip);
  });
  
  next();
};

export default logger;
