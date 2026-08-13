import React from 'react';
import { MOCK_TICKERS } from '../data/tickers';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

export const TickerMarquee: React.FC = () => {
  // Duplicate array for seamless infinite marquee effect
  const tickerItems = [...MOCK_TICKERS, ...MOCK_TICKERS];

  return (
    <div className="w-full bg-[#0E131F] border-y border-slate-800/80 py-3.5 overflow-hidden relative">
      
      {/* Fade Overlays on left & right */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E131F] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E131F] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused]">
        {tickerItems.map((item, idx) => {
          const isPositive = item.change24h >= 0;
          return (
            <div
              key={`${item.symbol}-${idx}`}
              className="flex items-center space-x-3 px-4 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs font-mono backdrop-blur-sm hover:border-[#00E676]/40 transition-colors cursor-pointer"
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-bold text-white font-sans">{item.symbol}</span>
              <span className="text-slate-300">${item.price.toFixed(2)}</span>
              
              <span className={`flex items-center gap-0.5 font-semibold ${isPositive ? 'text-[#00E676]' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? '+' : ''}{item.change24h}%
              </span>

              <div className="h-3 w-px bg-slate-700"></div>

              <span className="text-[#00E5FF] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {item.deltaApy}% APY
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
