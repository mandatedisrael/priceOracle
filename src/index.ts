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

// 2 prevent rate limit
const limiter = rateLimit({
  windowMs: config.api.rateLimitWindow,
  max: config.api.rateLimitMax,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
    statusCode: 429,
    timestamp: Date.now(),
  },
});
app.use('/api/', limiter);


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


app.use('/api/v1/prices', priceRoutes);


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
