# Price Aggregator

A simple token price aggregator from multiple reliable sources!

## 🌐 Live Demo

**Deployed at:** [https://price-aggregator.vercel.app/](https://price-aggregator.vercel.app/)

Try the API endpoints directly:
- [API Overview](https://price-aggregator.vercel.app/)
- [Get BTC Price (Aggregated)](https://price-aggregator.vercel.app/price/BTC)
- [Get BTC Price from Binance](https://price-aggregator.vercel.app/price/binance/BTC)
- [Get BTC Price from Bybit](https://price-aggregator.vercel.app/price/bybit/BTC)
- [Get BTC Price from Kraken](https://price-aggregator.vercel.app/price/kraken/BTC)
- [Health Check](https://price-aggregator.vercel.app/health)


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
- **GET** `/price/binance/:symbol` - Get price from Binance only (e.g., `/price/binance/BTC`)
- **GET** `/price/bybit/:symbol` - Get price from Bybit only (e.g., `/price/bybit/BTC`)
- **GET** `/price/kraken/:symbol` - Get price from Kraken only (e.g., `/price/kraken/BTC`)
- **GET** `/price/:symbol/history` - Get historical price data (coming soon)
- **GET** `/price` - Get list of available symbols

### Health Check
- **GET** `/health` - Service health check with uptime information

### Rate Limiting
- **General**: 100 requests per 15 minutes for all endpoints
- **Price Endpoints**: 5 requests per 24 hours for price data

## 🚀 How to Use

### Getting Token Prices

You can get real-time prices for any supported cryptocurrency using two types of endpoints:

1. **Aggregated Price** - Combines data from all available sources for the most accurate price
2. **Specific Source** - Get price from a particular exchange (useful for comparison or specific requirements)

#### Aggregated vs Specific Sources

**Aggregated (Recommended for most use cases):**
```bash
curl https://price-aggregator.vercel.app/price/BTC
```

**Specific Sources (For comparison or exchange-specific needs):**
```bash
curl https://price-aggregator.vercel.app/price/binance/BTC
curl https://price-aggregator.vercel.app/price/bybit/BTC
curl https://price-aggregator.vercel.app/price/kraken/BTC
```

#### Popular Cryptocurrencies

**Bitcoin (BTC)**
```bash
curl https://price-aggregator.vercel.app/price/BTC
```

**Ethereum (ETH)**
```bash
curl https://price-aggregator.vercel.app/price/ETH
```

**Other Popular Tokens**
```bash
# Solana
curl https://price-aggregator.vercel.app/price/SOL

# Cardano
curl https://price-aggregator.vercel.app/price/ADA

# Polkadot
curl https://price-aggregator.vercel.app/price/DOT

# Chainlink
curl https://price-aggregator.vercel.app/price/LINK

# Polygon
curl https://price-aggregator.vercel.app/price/MATIC

# Avalanche
curl https://price-aggregator.vercel.app/price/AVAX

# Uniswap
curl https://price-aggregator.vercel.app/price/UNI
```

#### Example Responses

**Aggregated Price Response:**
```json
{
  "success": true,
  "data": {
    "symbol": "BTC",
    "price": 43250.75,
    "currency": "USD",
    "timestamp": 1703123456789,
    "sources": ["Binance", "Kraken", "Bybit"],
    "lastUpdated": "2023-12-21T10:30:56.789Z"
  }
}
```

**Specific Source Response (e.g., Binance):**
```json
{
  "success": true,
  "data": {
    "symbol": "BTCUSDT",
    "price": 43245.50,
    "timestamp": 1703123456789,
    "source": "binance"
  }
}
```

#### Using JavaScript/Fetch

```javascript
// Get Bitcoin price
fetch('https://price-aggregator.vercel.app/price/BTC')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`BTC Price: $${data.data.price}`);
    } else {
      console.error('Error:', data.message);
    }
  });

// Get Ethereum price
fetch('https://price-aggregator.vercel.app/price/ETH')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`ETH Price: $${data.data.price}`);
    } else {
      console.error('Error:', data.message);
    }
  });
```

#### Using Python/Requests

```python
import requests

# Get Bitcoin price
response = requests.get('https://price-aggregator.vercel.app/price/BTC')
data = response.json()

if data['success']:
    print(f"BTC Price: ${data['data']['price']}")
else:
    print(f"Error: {data['message']}")

# Get Ethereum price
response = requests.get('https://price-aggregator.vercel.app/price/ETH')
data = response.json()

if data['success']:
    print(f"ETH Price: ${data['data']['price']}")
else:
    print(f"Error: {data['message']}")
```

### Getting Prices from Specific Data Sources

You can also get prices from individual data sources instead of the aggregated price. This is useful for:

- **Price comparison** across different exchanges
- **Exchange-specific applications** that require data from a particular source
- **Arbitrage opportunities** by comparing prices
- **Debugging** when you need to verify data from a specific exchange
- **Compliance requirements** that mandate using specific data sources

#### Binance Only
```bash
# Get BTC price from Binance
curl https://price-aggregator.vercel.app/price/binance/BTC

# Get ETH price from Binance
curl https://price-aggregator.vercel.app/price/binance/ETH
```

#### Bybit Only
```bash
# Get BTC price from Bybit
curl https://price-aggregator.vercel.app/price/bybit/BTC

# Get ETH price from Bybit
curl https://price-aggregator.vercel.app/price/bybit/ETH
```

#### Kraken Only
```bash
# Get BTC price from Kraken
curl https://price-aggregator.vercel.app/price/kraken/BTC

# Get ETH price from Kraken
curl https://price-aggregator.vercel.app/price/kraken/ETH
```

#### JavaScript Examples for Specific Sources
```javascript
// Get BTC price from Binance
fetch('https://price-aggregator.vercel.app/price/binance/BTC')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`BTC Price from Binance: $${data.data.price}`);
    }
  });

// Get ETH price from Bybit
fetch('https://price-aggregator.vercel.app/price/bybit/ETH')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`ETH Price from Bybit: $${data.data.price}`);
    }
  });

// Get SOL price from Kraken
fetch('https://price-aggregator.vercel.app/price/kraken/SOL')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`SOL Price from Kraken: $${data.data.price}`);
    }
  });
```

### Health Check

Check if the service is running:

```bash
curl https://price-aggregator.vercel.app/health
```

### Rate Limit Information

Get information about your current rate limit status:

```bash
curl https://price-aggregator.vercel.app/price/rate-limit/info
```

### Supported Symbols

The API supports most major cryptocurrency symbols. Common formats include:
- **BTC** (Bitcoin)
- **ETH** (Ethereum)
- **SOL** (Solana)
- **ADA** (Cardano)
- **DOT** (Polkadot)
- **LINK** (Chainlink)
- **MATIC** (Polygon)
- **AVAX** (Avalanche)
- **UNI** (Uniswap)
- **USDT** (Tether)
- **USDC** (USD Coin)

*Note: Symbol availability depends on the data sources. If a symbol is not available, you'll receive an appropriate error message.*

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
