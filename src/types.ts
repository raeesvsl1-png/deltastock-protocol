export interface RWATicker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  deltaApy: number;
  category: 'Equity' | 'ETF' | 'Commodity' | 'Meme Equity';
  icon: string;
}

export interface StrategyVault {
  id: string;
  name: string;
  assetSymbol: string;
  assetName: string;
  category: 'High-Cap' | 'Index ETF' | 'Tech Sector' | 'High Yield';
  lpVenue: string;
  perpVenue: string;
  tvl: number;
  estApy: number;
  feeApy: number;
  hedgeCostApy: number;
  volume24h: number;
  rebalanceBand: string;
  deltaVariance: string;
  status: 'Active' | 'Optimizing' | 'High Volume';
  riskScore: 'Low' | 'Medium' | 'Dynamic';
}

export interface Proposal {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'Active' | 'Passed' | 'Executed';
  forVotes: number;
  againstVotes: number;
  endsInDays: number;
  description: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  usdcBalance: number;
  dskBalance: number;
  stakedDsk: number;
}
