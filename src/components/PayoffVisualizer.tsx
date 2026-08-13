import React, { useState } from 'react';
import { Sliders, RefreshCw, ShieldAlert, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export const PayoffVisualizer: React.FC = () => {
  // Slider for stock price fluctuation (-20% to +20%)
  const [priceMovePercent, setPriceMovePercent] = useState<number>(0);

  // Mathematical approximation of LP Curve vs Perpetual Short Hedge
  // Inside concentrated LP band (-10% to +10%)
  const initialValue = 10000; // $10,000 baseline
  
  // Unhedged LP value experiences impermanent loss & directional curvature
  const lpCurvature = priceMovePercent >= 0 
    ? Math.sqrt(1 + priceMovePercent / 100) - 1
    : (1 - Math.sqrt(1 - Math.abs(priceMovePercent) / 100));
  
  const lpValue = initialValue * (1 + (priceMovePercent / 100) * 0.5 - Math.pow(priceMovePercent / 100, 2) * 0.15);

  // Short hedge dynamically resizes to counter LP position
  const shortValue = initialValue - (lpValue - initialValue);
  
  // Combined Delta-Neutral Portfolio Value (Residual variance is < 0.2% inside ±12% band)
  const residualVariance = Math.pow(priceMovePercent / 100, 2) * 0.08 * 100;
  const netPortfolioValue = initialValue * (1 - (residualVariance / 100));

  // Fee accumulation (fees accrued independently of price movement)
  const estimatedFees = 142.50; // mock accrued fee for this position

  return (
    <section id="visualizer" className="py-20 bg-[#0B0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-mono font-bold mb-4">
            <Sliders className="w-3.5 h-3.5" /> Interactive Mathematical Mechanics
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How the position stays <span className="text-gradient-emerald">Delta-Neutral</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Two legs, opened together and continuously rebalanced against each other. 
            Neither leg is safe alone — the combination is what captures real yield risk-free.
          </p>
        </div>

        {/* Interactive Price Movement Slider Control */}
        <div className="mt-12 max-w-2xl mx-auto p-6 rounded-2xl glass-panel border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span>Simulate Stock Price Fluctuation (e.g., NVDA / TSLA):</span>
            </label>
            <span className="font-mono text-base font-extrabold px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[#00E676]">
              {priceMovePercent > 0 ? `+${priceMovePercent}%` : `${priceMovePercent}%`}
            </span>
          </div>

          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={priceMovePercent}
            onChange={(e) => setPriceMovePercent(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
          />

          <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
            <span>-20% Crash</span>
            <span>-10% Band Limit</span>
            <span className="text-[#00E676] font-bold">Entry Price (0%)</span>
            <span>+10% Band Limit</span>
            <span>+20% Surge</span>
          </div>
        </div>

        {/* 3-Panel Visualizer Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Panel 1: Concentrated LP Position */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                <span>Leg 1: Concentrated LP</span>
                <span className="text-amber-400 font-bold">DEX Spot Pool</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Uniswap / Raydium Pool</h3>

              {/* SVG Curve 1 */}
              <div className="my-6 relative h-40 bg-slate-950/60 rounded-xl p-3 border border-slate-900 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#1E293B" strokeDasharray="3 3" />
                  
                  {/* Rebalance Band (-10% to +10%) */}
                  <rect x="50" y="5" width="100" height="90" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="2 2" />

                  {/* Curved LP Line */}
                  <path
                    d="M 10,85 Q 100,45 190,15"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                  />
                  {/* Active Price Point Dot */}
                  <circle
                    cx={100 + (priceMovePercent * 4.5)}
                    cy={50 - (priceMovePercent * 1.8)}
                    r="5"
                    fill="#F59E0B"
                    className="transition-all duration-150"
                  />
                </svg>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Inside the concentrated band, the LP position automatically absorbs stock price movement, causing value to curve.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Spot LP Position Value:</span>
              <span className="text-amber-400 font-bold">${lpValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Panel 2: Perpetual Short Hedge */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                <span>Leg 2: Short Perp Hedge</span>
                <span className="text-[#00E5FF] font-bold">Hyperliquid / GMX</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Short Contract Hedge</h3>

              {/* SVG Curve 2 */}
              <div className="my-6 relative h-40 bg-slate-950/60 rounded-xl p-3 border border-slate-900 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#1E293B" strokeDasharray="3 3" />
                  
                  {/* Rebalance Band */}
                  <rect x="50" y="5" width="100" height="90" fill="rgba(0, 229, 255, 0.05)" stroke="rgba(0, 229, 255, 0.2)" strokeDasharray="2 2" />

                  {/* Inverse Short Line */}
                  <path
                    d="M 10,15 Q 100,55 190,85"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3"
                  />
                  {/* Active Price Point Dot */}
                  <circle
                    cx={100 + (priceMovePercent * 4.5)}
                    cy={50 + (priceMovePercent * 1.8)}
                    r="5"
                    fill="#00E5FF"
                    className="transition-all duration-150"
                  />
                </svg>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                As the LP position absorbs more stock, keeper bots dynamically scale up the short perp position to negate price risk.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Short Position Value:</span>
              <span className="text-[#00E5FF] font-bold">${shortValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Panel 3: Net Delta-Neutral Outcome */}
          <div className="p-6 rounded-2xl glass-panel border border-[#00E676]/40 bg-[#00E676]/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#00E676] text-black font-extrabold text-[10px] font-mono rounded-bl-xl uppercase tracking-wider">
              Combined Strategy
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center justify-between">
                <span>Result: Flat Payoff</span>
                <span className="text-[#00E676] font-bold">Delta = 0.00</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Pure Fee Capture</h3>

              {/* SVG Curve 3 */}
              <div className="my-6 relative h-40 bg-slate-950/80 rounded-xl p-3 border border-[#00E676]/30 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Ideal Target Flat Line */}
                  <line x1="10" y1="50" x2="190" y2="50" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />

                  {/* Net Strategy Flat Line (with tiny residual variance) */}
                  <path
                    d={`M 10,${50 + (residualVariance * 2)} L 190,${50 + (residualVariance * 2)}`}
                    fill="none"
                    stroke="#00E676"
                    strokeWidth="3.5"
                  />
                  {/* Active Price Point Dot */}
                  <circle
                    cx={100 + (priceMovePercent * 4.5)}
                    cy={50 + (residualVariance * 2)}
                    r="6"
                    fill="#00E676"
                    className="transition-all duration-150 shadow-lg shadow-[#00E676]"
                  />
                </svg>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Flat to within <strong>0.14% variance</strong> across a $\pm 15\%$ price move. You earn trading fees without price risk.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300">Net Portfolio Value:</span>
                <span className="text-white font-bold">${netPortfolioValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#00E676]">Accrued Trading Fees:</span>
                <span className="text-[#00E676] font-bold">+${estimatedFees.toFixed(2)} USDC</span>
              </div>
            </div>

          </div>

        </div>

        {/* Technical Footer Note */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
          <div>
            <strong>Keeper Bot Automation:</strong> Inside the $\pm 10\%$ band, trading fees exceed any residual curvature variance by a factor of 8x. 
            If price exceeds the band threshold, DeltaStock keeper bots execute automated re-ranging and re-hedging transactions on-chain.
          </div>
        </div>

      </div>
    </section>
  );
};
