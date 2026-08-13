import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerMarquee } from './components/TickerMarquee';
import { PayoffVisualizer } from './components/PayoffVisualizer';
import { StrategyMarketplace } from './components/StrategyMarketplace';
import { YieldCalculator } from './components/YieldCalculator';
import { TreasuryGovernance } from './components/TreasuryGovernance';
import { WalletModal } from './components/WalletModal';
import { DepositModal } from './components/DepositModal';
import { Footer } from './components/Footer';

import { StrategyVault, WalletState } from './types';
import { MOCK_STRATEGIES } from './data/strategies';

export function App() {
  // Global Wallet State
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Ethereum Mainnet',
    usdcBalance: 12500,
    dskBalance: 4500,
    stakedDsk: 2000,
  });

  // Modal Controls
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyVault | null>(MOCK_STRATEGIES[0]);

  // Wallet Handlers
  const handleConnectWallet = (provider: string) => {
    setWallet({
      isConnected: true,
      address: '0x71C...4e89',
      network: 'Ethereum Mainnet',
      usdcBalance: 12500,
      dskBalance: 4500,
      stakedDsk: 2000,
    });
  };

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      network: 'Ethereum Mainnet',
      usdcBalance: 0,
      dskBalance: 0,
      stakedDsk: 0,
    });
  };

  // Open Deposit Modal with specific strategy
  const handleOpenDepositForStrategy = (strategy: StrategyVault) => {
    setSelectedStrategy(strategy);
    setIsDepositModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans selection:bg-[#00E676] selection:text-black">
      
      {/* Header Navbar */}
      <Navbar
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero onOpenDeposit={() => setIsDepositModalOpen(true)} />

        {/* Live Tokenized RWA Stock Ticker Marquee */}
        <TickerMarquee />

        {/* Payoff Mechanics Visualizer */}
        <PayoffVisualizer />

        {/* Vault Strategies Marketplace */}
        <StrategyMarketplace onSelectStrategy={handleOpenDepositForStrategy} />

        {/* Yield Return Calculator */}
        <YieldCalculator />

        {/* Treasury & $DSK Governance */}
        <TreasuryGovernance
          wallet={wallet}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={wallet}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        strategy={selectedStrategy}
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

    </div>
  );
}

export default App;
