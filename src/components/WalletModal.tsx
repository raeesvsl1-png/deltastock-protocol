import React from 'react';
import { WalletState } from '../types';
import { X, Check, ExternalLink, ShieldCheck, Wallet } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onConnectWallet: (provider: string) => void;
  onDisconnectWallet: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onConnectWallet,
  onDisconnectWallet
}) => {
  if (!isOpen) return null;

  const walletProviders = [
    { name: 'MetaMask', icon: '🦊', desc: 'Popular EVM Browser Wallet' },
    { name: 'Phantom', icon: '👻', desc: 'Solana & Multi-chain Wallet' },
    { name: 'Coinbase Wallet', icon: '🔵', desc: 'Self-custody Mobile & Extension' },
    { name: 'WalletConnect', icon: '🌐', desc: 'Connect with 100+ Mobile Wallets' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#0B0E14] border border-slate-800 rounded-3xl p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] mb-3">
            <Wallet className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {wallet.isConnected ? 'Connected Wallet' : 'Connect Web3 Wallet'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {wallet.isConnected
              ? 'Manage your wallet connection and testnet assets.'
              : 'Select your preferred Web3 wallet provider to interact with DeltaStock vaults.'}
          </p>
        </div>

        {/* Connected State View */}
        {wallet.isConnected ? (
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Address:</span>
                <span className="text-[#00E676] font-bold">{wallet.address}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Network:</span>
                <span className="text-slate-200">{wallet.network}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>USDC Balance:</span>
                <span className="text-white font-bold">${wallet.usdcBalance.toLocaleString()} USDC</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>$DSK Balance:</span>
                <span className="text-[#00E5FF] font-bold">{wallet.dskBalance.toLocaleString()} DSK</span>
              </div>
            </div>

            <button
              onClick={() => {
                onDisconnectWallet();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 font-extrabold text-xs hover:bg-rose-500/30 transition-all"
            >
              Disconnect Wallet
            </button>

          </div>
        ) : (
          /* Connect Wallet Options list */
          <div className="space-y-3">
            {walletProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => {
                  onConnectWallet(provider.name);
                  onClose();
                }}
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#00E676]/50 hover:bg-slate-800 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-[#00E676] transition-colors">
                      {provider.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{provider.desc}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#00E676] group-hover:border-[#00E676]">
                  →
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-slate-900 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
            Non-custodial. Your keys, your assets.
          </p>
        </div>

      </div>
    </div>
  );
};
