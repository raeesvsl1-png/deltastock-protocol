import React, { useState } from 'react';
import { MOCK_STRATEGIES } from '../data/strategies';
import { StrategyVault } from '../types';
import { Filter, Zap, ArrowUpRight, ShieldCheck, Cpu, Layers, DollarSign } from 'lucide-react';

interface StrategyMarketplaceProps {
  onSelectStrategy: (strategy: StrategyVault) => void;
}

export const StrategyMarketplace: React.FC<StrategyMarketplaceProps> = ({ onSelectStrategy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tech Sector', 'Index ETF', 'High-Cap', 'High Yield'];

  const filteredStrategies = selectedCategory === 'All'
    ? MOCK_STRATEGIES
    : MOCK_STRATEGIES.filter(s => s.category === selectedCategory);

  return (
    <section id="strategies" className="py-20 bg-[#0E131F] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold mb-3">
              <Zap className="w-3.5 h-3.5" /> High Yield RWA Vaults
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Delta-Neutral <span className="text-gradient-emerald">Vault Strategies</span>
            </h2>
            <p className="mt-2 text-slate-300 text-base max-w-xl">
              Deposit USDC into automated strategies. One click manages both DEX liquidity positioning and perpetual short hedging.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Strategy Vaults Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map((vault) => (
            <div
              key={vault.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              
              {/* Badge Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-mono font-semibold text-slate-300">
                  {vault.category}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  vault.status === 'High Volume' 
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : vault.status === 'Active'
                    ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30'
                    : 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30'
                }`}>
                  {vault.status}
                </span>
              </div>

              {/* Title & Asset */}
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-extrabold text-lg text-white group-hover:border-[#00E676] transition-colors">
                    {vault.assetSymbol}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-[#00E676] transition-colors">
                      {vault.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">Asset: {vault.assetName}</p>
                  </div>
                </div>
              </div>

              {/* Net APY Breakdown Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400">Net Est APY:</span>
                  <span className="text-2xl font-extrabold font-mono text-[#00E676]">
                    +{vault.estApy}%
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-900 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block">DEX Trading Fee:</span>
                    <span className="text-slate-300 font-semibold">+{vault.feeApy}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Perp Funding Cost:</span>
                    <span className="text-rose-400 font-semibold">{vault.hedgeCostApy}%</span>
                  </div>
                </div>
              </div>

              {/* Strategy Parameters */}
              <div className="mt-6 space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Vault TVL:</span>
                  <span className="text-slate-200 font-bold">${(vault.tvl / 1000000).toFixed(2)}M USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>24h Spot Volume:</span>
                  <span className="text-slate-200">${(vault.volume24h / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span>DEX LP Venue:</span>
                  <span className="text-slate-300">{vault.lpVenue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Perp Hedge Venue:</span>
                  <span className="text-[#00E5FF]">{vault.perpVenue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Delta Variance:</span>
                  <span className="text-[#00E676] font-bold">{vault.deltaVariance}</span>
                </div>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => onSelectStrategy(vault)}
                className="mt-6 w-full py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00E676] hover:bg-[#00E676] text-white hover:text-black font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#00E676]/20"
              >
                <span>Deposit & Earn Yield</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
