import React from 'react';
import { WalletState } from '../types';
import { Shield, Wallet, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  wallet: WalletState;
  onOpenWalletModal: () => void;
  onOpenDepositModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ wallet, onOpenWalletModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0E14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676] to-[#00E5FF] p-0.5 shadow-lg shadow-[#00E676]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
                <span className="font-mono text-xl font-bold text-[#00E676] group-hover:text-white transition-colors">Δ</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                DeltaStock<span className="text-[#00E676]">.fi</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></span> Delta-Neutral RWAs
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a 
            href="#visualizer" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-4 h-4 text-[#00E676]" />
            Payoff Mechanics
          </a>
          <a 
            href="#strategies" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Vault Strategies
          </a>
          <a 
            href="#calculator" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Yield Calculator
          </a>
          <a 
            href="#treasury" 
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1"
          >
            DAO & $DSK
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#00E676]/20 text-[#00E676] rounded">50% Share</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Official X Account Link */}
          <a
            href="https://x.com/deltastock_/status/2087854976865542652?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-[#00E676] hover:border-[#00E676]/40 transition-colors"
          >
            <span className="font-bold text-[#00E676]">𝕏</span>
            <span>@deltastock_</span>
          </a>

          {/* Audit Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Audited Smart Contracts</span>
          </div>


          {/* Connect Wallet Button */}
          <button
            onClick={onOpenWalletModal}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg ${
              wallet.isConnected
                ? 'bg-slate-900 border border-[#00E676]/50 text-[#00E676] hover:bg-slate-800'
                : 'bg-gradient-to-r from-[#00E676] to-[#00C853] text-black font-semibold hover:opacity-90 shadow-[#00E676]/25 hover:shadow-[#00E676]/40'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {wallet.isConnected && wallet.address ? (
              <span className="font-mono">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

        </div>

      </div>
    </header>
  );
};
