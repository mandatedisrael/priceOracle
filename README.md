# Price Aggregator

A simple token price aggregator from multiple reliable sources

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── api/
│   └── routes/          # API endpoints (prices, etc.)
├── config/              # Configuration management
├── data-sources/        # External API integrations
│   ├── Binance.ts       # Binance API integration
│   ├── bybit.ts         # Bybit API integration
│   ├── kraken.ts        # Kraken API integration
│   ├── defillama.ts     # DeFiLlama API integration
│   ├── dune.ts          # Dune Analytics integration
│   └── uniswap/         # Uniswap V4 integration
├── processors/          # Price aggregation logic
├── types/               # TypeScript type definitions
└── utils/               # Helper functions (logger, errors, etc.)
```

## 🔧 Configuration

Create a `.env` file with the needed API KEY 

## 📚 API Endpoints

### Price Data
- **GET** `/price/:symbol` - Get aggregated price for a symbol (e.g., `/price/BTC`)
- **GET** `/price/:symbol/history` - Get historical price data (coming soon)
- **GET** `/price` - Get list of available symbols

### Health Check
- **GET** `/health` - Service health check with uptime information

### Rate Limiting
- **General**: 100 requests per 15 minutes for all endpoints
- **Price Endpoints**: 5 requests per 24 hours for price data

## 📊 Data Sources

**Currently Active:**
- **Binance** - Real-time cryptocurrency prices
- **Kraken** - Cryptocurrency exchange data
- **Bybit** - Cryptocurrency trading data

**In Development: ( soo many edgecases to catch )**
- **DeFiLlama** - DeFi protocol price data
- **Uniswap V4** - DEX price feeds
- **Dune Analytics** - Blockchain analytics data

## 🧪 Testing & Development

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Docker commands
npm run docker:build
npm run docker:run
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Request parameter validation
- **Error Handling** - Comprehensive error management

## 📈 Monitoring & Logging

- **Winston Logger** - Structured logging with multiple transports
- **Request Logging** - API access logs with timing
- **Error Tracking** - Detailed error logging with stack traces
- **Health Monitoring** - Service health endpoints

## 🐳 Docker Support

```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions, please visit the [GitHub Issues page](https://github.com/mandatedisrael/priceOracle/issues).
