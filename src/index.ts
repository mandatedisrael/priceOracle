import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { config, validateConfig } from './config';
import { requestLogger, logInfo, logError } from './utils/logger';
import { errorHandler } from './utils/errors';
import priceRoutes from './api/routes/prices';

validateConfig();

const app = express();

// security
app.use(helmet());
app.use(cors());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
    statusCode: 429,
    timestamp: Date.now(),
  },
});

// Strict rate limit for price endpoints: 5 requests per 24 hours
const priceLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    error: 'Rate limit exceeded. Maximum 5 requests per 24 hours.',
    statusCode: 429,
    timestamp: Date.now(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', generalLimiter);
app.use('/price', priceLimiter);


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
});


app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Price Aggregator API',
    endpoints: {
      symbols: 'All known tokens are available at /price',
      price: '/price/:symbol',
      history: '/price/:symbol/history (coming soon)',
      health: '/health',
      rateLimit: '/price/rate-limit/info',
      Author: 'Built with ❤️ by notMartin (https://x.com/damiclone)'
    },
    timestamp: Date.now(),
  });
});

app.use('/price', priceRoutes);


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    statusCode: 404,
    timestamp: Date.now(),
  });
});


app.use(errorHandler);


const PORT = config.port;

app.listen(PORT, () => {
  logInfo(`Price Oracle server started`, {
    port: PORT,
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});


process.on('SIGTERM', () => {
  logInfo('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logInfo('SIGINT received, shutting down gracefully');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  logError('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled Rejection', new Error(`Promise: ${promise}, Reason: ${reason}`));
  process.exit(1);
});

export default app;
