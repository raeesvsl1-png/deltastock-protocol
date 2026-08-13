import { Proposal } from '../types';

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'dip-14',
    number: 'DIP-14',
    title: 'Deploy $5M Treasury Reserve into NVDA Delta-Neutral Vault',
    category: 'Treasury Allocation',
    status: 'Active',
    forVotes: 8420000,
    againstVotes: 310000,
    endsInDays: 2,
    description: 'Authorize the DeltaStock DAO treasury to allocate 5,000,000 USDC into the high-performing NVDA Delta-Neutral Vault on Hyperliquid to compound trading fee yield directly into the governance staking pool.',
  },
  {
    id: 'dip-13',
    number: 'DIP-13',
    title: 'Adjust Delta Re-balance Threshold for Tech RWAs to ±8.5%',
    category: 'Risk Management',
    status: 'Passed',
    forVotes: 12100000,
    againstVotes: 980000,
    endsInDays: 0,
    description: 'Tighten the automated keeper rebalance band for high-beta tech equities (NVDA, TSLA, PLTR) from ±10% to ±8.5% to minimize residual curvature slippage during earnings volatility.',
  },
  {
    id: 'dip-12',
    number: 'DIP-12',
    title: 'Distribute 50% Weekly Protocol Revenue to $DSK Stakers',
    category: 'Revenue Split',
    status: 'Executed',
    forVotes: 15400000,
    againstVotes: 120000,
    endsInDays: 0,
    description: 'Confirm smart contract parameter update to direct exactly 50% of protocol performance fees and DEX fee shares directly to the $DSK staking smart contract every Sunday 00:00 UTC.',
  },
];
