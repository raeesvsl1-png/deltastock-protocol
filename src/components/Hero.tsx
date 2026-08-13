import React from 'react';
import { ArrowRight, ShieldCheck, Zap, TrendingUp, Layers, Cpu, Play } from 'lucide-react';

interface HeroProps {
  onOpenDeposit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDeposit }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-radial-gradient">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E676]/10 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[200px] bg-[#00E5FF]/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#00E676]/30 backdrop-blur-md text-xs font-mono text-slate-200 shadow-xl shadow-[#00E676]/5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
            </span>
            <span className="text-[#00E676] font-bold">Delta-Neutral Protocol</span>
            <span className="text-slate-500">•</span>
            <span>Automated Perpetuals Hedging Engine</span>
          </div>
        </div>

        {/* Hero Title & Leade */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Earn the fees,<br />
            <span className="text-gradient-emerald">not the price.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Tokenized equities (NVDA, TSLA, SPY) generate massive DEX trading fees. 
            Providing liquidity normally means taking price directional risk. 
            <strong className="text-white font-semibold"> We hedge the stock away with short perps</strong> and compound the fees straight to your wallet.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDeposit}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#00C853] text-black font-extrabold text-base hover:shadow-xl hover:shadow-[#00E676]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Vault Strategies</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#visualizer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white font-semibold text-base hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />
              <span>How Delta-Neutral Works</span>
            </a>
          </div>
        </div>

        {/* Live Platform Key Stats */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Indexed RWA Assets</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">182</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Layers className="w-3 h-3 text-[#00E676]" /> Equities, ETFs & Commodities
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Vault Liquidity (TVL)</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00E676] mt-1">$84.5M</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00E5FF]" /> Fully Automated Hedging
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">24h Spot & Perp Vol</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">$162.4M</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#00E676]" /> Driving Real Fee Yields
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Average Hedged APY</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00E5FF] mt-1">24.8%</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-[#00E5FF]" /> Net of Borrow & Swap Fees
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
