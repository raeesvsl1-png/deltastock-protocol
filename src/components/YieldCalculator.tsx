import React, { useState } from 'react';
import { Calculator, DollarSign, ArrowRight, ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import { MOCK_STRATEGIES } from '../data/strategies';

export const YieldCalculator: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(10000);
  const [selectedVaultId, setSelectedVaultId] = useState<string>(MOCK_STRATEGIES[0].id);
  const [timeframeMonths, setTimeframeMonths] = useState<number>(12);
  const [simulatedStockDrop, setSimulatedStockDrop] = useState<number>(-15); // -15% stock drop scenario

  const currentVault = MOCK_STRATEGIES.find(s => s.id === selectedVaultId) || MOCK_STRATEGIES[0];

  // Calculations
  const yearFraction = timeframeMonths / 12;
  const deltaStockYield = depositAmount * (currentVault.estApy / 100) * yearFraction;
  const deltaStockTotal = depositAmount + deltaStockYield;

  // Unhedged LP loses value if stock drops -15%
  const unhedgedLoss = depositAmount * (simulatedStockDrop / 100) * 0.7; // IL + directional loss
  const unhedgedFeeYield = depositAmount * (currentVault.feeApy / 100) * yearFraction;
  const unhedgedTotal = Math.max(0, depositAmount + unhedgedLoss + unhedgedFeeYield);

  // Buy & Hold 100% exposed to stock drop
  const buyHoldTotal = depositAmount * (1 + simulatedStockDrop / 100);

  return (
    <section id="calculator" className="py-20 bg-[#0B0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-mono font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" /> Return Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your <span className="text-gradient-emerald">Hedged Fee Earnings</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            See how DeltaStock protects your initial deposit while continuously gathering trading fee yield.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
            
            {/* Input Deposit Amount */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Deposit Amount (USDC):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-lg">$</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(100, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-extrabold text-xl focus:outline-none focus:border-[#00E676]"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[1000, 5000, 10000, 50000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setDepositAmount(amt)}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700"
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Vault Strategy */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Select Delta-Neutral Vault:
              </label>
              <select
                value={selectedVaultId}
                onChange={(e) => setSelectedVaultId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-sans font-semibold text-sm focus:outline-none focus:border-[#00E676]"
              >
                {MOCK_STRATEGIES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.estApy}% Net APY)
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe Selection */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Investment Duration:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '1 Month', value: 1 },
                  { label: '6 Months', value: 6 },
                  { label: '1 Year', value: 12 },
                ].map(tf => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframeMonths(tf.value)}
                    className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      timeframeMonths === tf.value
                        ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Downturn Stress Test Slider */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300">
                  Simulate Market Stock Crash Scenario:
                </label>
                <span className="font-mono text-xs font-bold text-rose-400">{simulatedStockDrop}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="20"
                step="5"
                value={simulatedStockDrop}
                onChange={(e) => setSimulatedStockDrop(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Tests how portfolio handles a {simulatedStockDrop}% drop in stock price.
              </p>
            </div>

          </div>

          {/* Results Comparison (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Card 1: DeltaStock Result (Winner) */}
            <div className="p-6 rounded-2xl glass-panel border border-[#00E676]/50 bg-[#00E676]/10 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00E676]" />
                  <span className="font-bold text-white text-base">DeltaStock Hedged Strategy</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00E676] text-black font-mono font-extrabold text-xs uppercase">
                  Protected
                </span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-slate-300">Projected Portfolio Value:</div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00E676] mt-0.5">
                    ${deltaStockTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-300">Net Fee Yield Earned:</div>
                  <div className="text-xl font-bold font-mono text-[#00E676]">
                    +${deltaStockYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-300 border-t border-emerald-500/30 pt-3">
                ✅ Stock price drop ({simulatedStockDrop}%) was completely hedged out. Your principal is preserved, and you keep 100% of trading fee yields.
              </p>
            </div>

            {/* Card 2: Unhedged LP Position */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 bg-slate-900/40">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-bold text-slate-200">Unhedged DEX LP (Without Short)</span>
                <span className="text-amber-400">Exposed to Loss</span>
              </div>

              <div className="mt-2 flex items-baseline justify-between font-mono">
                <div className="text-2xl font-bold text-slate-300">
                  ${unhedgedTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className={`text-sm font-semibold ${unhedgedTotal >= depositAmount ? 'text-[#00E676]' : 'text-rose-400'}`}>
                  {unhedgedTotal >= depositAmount ? '+' : ''}
                  ${(unhedgedTotal - depositAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Card 3: Traditional Buy & Hold */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 bg-slate-900/40">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-bold text-slate-200">Direct Stock Buy & Hold</span>
                <span className="text-rose-400">Direct Market Loss</span>
              </div>

              <div className="mt-2 flex items-baseline justify-between font-mono">
                <div className="text-2xl font-bold text-slate-300">
                  ${buyHoldTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm font-semibold text-rose-400">
                  ${(buyHoldTotal - depositAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
