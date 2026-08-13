import React, { useState } from 'react';
import { StrategyVault, WalletState } from '../types';
import { X, ArrowRight, ShieldCheck, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: StrategyVault | null;
  wallet: WalletState;
  onOpenWalletModal: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  strategy,
  wallet,
  onOpenWalletModal
}) => {
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !strategy) return null;

  const numAmount = parseFloat(depositAmount) || 0;
  const annualEstEarn = numAmount * (strategy.estApy / 100);
  const monthlyEstEarn = annualEstEarn / 12;

  const handleExecuteDeposit = () => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0B0E14] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676] flex items-center justify-center mx-auto text-[#00E676] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">Deposit Executed!</h3>
            <p className="text-sm text-slate-300">
              Successfully deposited <strong className="text-[#00E676]">${numAmount.toLocaleString()} USDC</strong> into the{' '}
              <strong>{strategy.name}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 text-left">
              <div className="flex justify-between text-slate-400">
                <span>Leg 1 (Concentrated Spot LP):</span>
                <span className="text-[#00E676] font-bold">Opened 50% Position</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Leg 2 (Perpetual Short Hedge):</span>
                <span className="text-[#00E5FF] font-bold">Opened 50% Short</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Initial Delta State:</span>
                <span className="text-white font-bold">0.00 (Delta Neutral)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-[#00E676] text-black font-extrabold text-sm hover:shadow-lg hover:shadow-[#00E676]/20"
            >
              Return to Vaults
            </button>
          </div>
        ) : (
          /* DEPOSIT FORM */
          <>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] font-mono text-xs font-bold">
                  {strategy.assetSymbol} Vault
                </span>
                <span className="text-xs font-mono text-slate-400">{strategy.category}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-1">{strategy.name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Automated 1-click deposit. Hedged against price volatility, compounding DEX trading fees.
              </p>
            </div>

            {/* Input Deposit Amount */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Deposit Amount (USDC):</span>
                <span>Available: ${wallet.isConnected ? wallet.usdcBalance.toLocaleString() : '10,000'} USDC</span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-lg">$</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-8 pr-16 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xl font-bold focus:outline-none focus:border-[#00E676]"
                />
                <button
                  onClick={() => setDepositAmount((wallet.usdcBalance || 10000).toString())}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-800 text-xs font-mono text-[#00E676] rounded hover:bg-slate-700"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Projected Returns Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Estimated Net Vault APY:</span>
                <span className="text-[#00E676] font-bold text-sm">+{strategy.estApy}%</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Est. Monthly Fee Yield:</span>
                <span className="text-white font-bold">+${monthlyEstEarn.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Est. Annual Fee Yield:</span>
                <span className="text-[#00E5FF] font-bold">+${annualEstEarn.toFixed(2)} USDC</span>
              </div>
            </div>

            {/* Strategy Execution Specs */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>DEX LP Venue:</span>
                <span className="text-slate-200">{strategy.lpVenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Perp Short Venue:</span>
                <span className="text-[#00E5FF]">{strategy.perpVenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Keeper Rebalance Band:</span>
                <span className="text-[#00E676] font-bold">{strategy.rebalanceBand}</span>
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleExecuteDeposit}
              disabled={isExecuting || numAmount <= 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#00C853] text-black font-extrabold text-base hover:shadow-xl hover:shadow-[#00E676]/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isExecuting ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                  <span>Executing Dual-Leg Hedged Position...</span>
                </>
              ) : (
                <>
                  <span>Confirm Deposit ${numAmount.toLocaleString()} USDC</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
};
