import { RWATicker } from '../types';

export const MOCK_TICKERS: RWATicker[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 128.50, change24h: 3.42, volume24h: '$42.1M', deltaApy: 31.8, category: 'Equity', icon: '⚡' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 218.40, change24h: -1.85, volume24h: '$28.7M', deltaApy: 28.4, category: 'Equity', icon: '🚗' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 542.10, change24h: 0.54, volume24h: '$58.9M', deltaApy: 18.2, category: 'ETF', icon: '🏛️' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 224.30, change24h: 1.12, volume24h: '$34.5M', deltaApy: 21.5, category: 'Equity', icon: '🍏' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 478.90, change24h: 1.45, volume24h: '$49.2M', deltaApy: 22.9, category: 'ETF', icon: '📈' },
  { symbol: 'GME', name: 'GameStop Corp', price: 22.15, change24h: -4.20, volume24h: '$19.4M', deltaApy: 54.6, category: 'Meme Equity', icon: '🎮' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 448.20, change24h: 0.88, volume24h: '$31.0M', deltaApy: 19.8, category: 'Equity', icon: '💻' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 186.70, change24h: 2.10, volume24h: '$26.8M', deltaApy: 24.1, category: 'Equity', icon: '📦' },
  { symbol: 'META', name: 'Meta Platforms', price: 512.60, change24h: -0.92, volume24h: '$22.3M', deltaApy: 26.7, category: 'Equity', icon: '♾️' },
  { symbol: 'PLTR', name: 'Palantir Tech', price: 29.40, change24h: 5.15, volume24h: '$15.6M', deltaApy: 39.2, category: 'Equity', icon: '👁️' },
  { symbol: 'USO', name: 'US Oil Fund', price: 78.30, change24h: -1.25, volume24h: '$11.8M', deltaApy: 25.4, category: 'Commodity', icon: '🛢️' },
  { symbol: 'GLD', name: 'SPDR Gold Trust', price: 232.80, change24h: 0.35, volume24h: '$18.9M', deltaApy: 15.6, category: 'Commodity', icon: '🥇' },
];
