import React, { useState } from 'react';
import { MOCK_PROPOSALS } from '../data/proposals';
import { WalletState } from '../types';
import { Landmark, TrendingUp, Vote, Award, Coins, CheckCircle, ArrowUpRight, Lock } from 'lucide-react';

interface TreasuryGovernanceProps {
  wallet: WalletState;
  onOpenWalletModal: () => void;
}

export const TreasuryGovernance: React.FC<TreasuryGovernanceProps> = ({ wallet, onOpenWalletModal }) => {
  const [activeTab, setActiveTab] = useState<'treasury' | 'staking' | 'governance'>('treasury');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [userVotedMap, setUserVotedMap] = useState<Record<string, 'for' | 'against'>>({});

  const treasuryBalance = 14850000; // $14.85M Treasury
  const weeklyProfitPool = 142000; // $142k distributed this week

  const handleVote = (proposalId: string, choice: 'for' | 'against') => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }
    setUserVotedMap(prev => ({ ...prev, [proposalId]: choice }));
  };

  return (
    <section id="treasury" className="py-20 bg-[#0E131F] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold mb-3">
            <Landmark className="w-3.5 h-3.5" /> DAO Treasury & $DSK Token Governance
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Owned by the Protocol. <span className="text-gradient-emerald">Governed On-Chain.</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Every fee earned compounds into an on-chain treasury. $DSK stakers receive 50% of weekly strategy profits directly.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('treasury')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === 'treasury'
                  ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Treasury Mechanics
            </button>
            <button
              onClick={() => setActiveTab('staking')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === 'staking'
                  ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              $DSK Staking (50% Revenue)
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === 'governance'
                  ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Proposals
            </button>
          </div>
        </div>

        {/* TAB 1: TREASURY MECHANICS */}
        {activeTab === 'treasury' && (
          <div className="mt-10 space-y-8">
            
            {/* 3 Inflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 relative">
                <div className="w-8 h-8 rounded-lg bg-[#00E676]/20 text-[#00E676] flex items-center justify-center font-mono font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="font-bold text-lg text-white">All Protocol Trading Fees</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Every fee earned across all indexed tokenized equity pools flows directly into the treasury smart contract rather than operator wallets.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-slate-800 relative">
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center font-mono font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="font-bold text-lg text-white">10% Strategy Performance Fee</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Outside capital using DeltaStock strategies pays a tenth of net profits (profits only, principal is never touched).
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-slate-800 relative">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="font-bold text-lg text-white">Automated Capital Proceeds</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  ACF proceeds sell supply into strength on a transparent schedule, landing directly in the governance treasury.
                </p>
              </div>

            </div>

            {/* Treasury Balance Banner */}
            <div className="p-8 rounded-2xl glass-panel border border-[#00E676]/30 bg-[#00E676]/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Total DAO Treasury Reserve:</span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mt-1">
                  $14,850,240 <span className="text-[#00E676] text-xl">USDC</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Deployed back into DeltaStock hedged strategies to generate compounding yield for stakers.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('staking')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00E676] to-[#00C853] text-black font-extrabold text-sm hover:shadow-lg hover:shadow-[#00E676]/20 transition-all flex items-center gap-2 shrink-0"
              >
                <span>Stake $DSK & Earn Dividends</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: STAKING DASHBOARD */}
        {activeTab === 'staking' && (
          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Staking Panel */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#00E676]" /> Stake $DSK Governance Tokens
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300">
                  50% Revenue Share
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Your $DSK Balance:</span>
                  <span className="text-white font-bold">{wallet.dskBalance.toLocaleString()} DSK</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Your Staked $DSK:</span>
                  <span className="text-[#00E676] font-bold">{wallet.stakedDsk.toLocaleString()} DSK</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">Amount to Stake:</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[#00E676]"
                  />
                  <button
                    onClick={() => setStakeAmount(wallet.dskBalance.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-xs font-mono text-[#00E676] rounded hover:bg-slate-700"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <button
                onClick={() => alert(`Simulated: Staked ${stakeAmount || 0} $DSK tokens!`)}
                className="w-full py-3.5 rounded-xl bg-[#00E676] text-black font-extrabold text-sm hover:shadow-lg hover:shadow-[#00E676]/20 transition-all"
              >
                Stake $DSK Tokens
              </button>
            </div>

            {/* Weekly Dividend Stats */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  This Week's Distributed Profit Pool:
                </div>
                <div className="text-3xl font-extrabold font-mono text-[#00E5FF] mt-1">
                  $142,500 USDC
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  50% of all protocol performance & fee revenue distributed automatically every Sunday 00:00 UTC.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Your Weekly Dividend Claim:</span>
                  <span className="text-[#00E676] font-bold">$184.20 USDC</span>
                </div>
                <button
                  onClick={() => alert("Simulated: Claimed $184.20 USDC Staking Dividend!")}
                  className="w-full py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white hover:border-[#00E676] font-mono text-xs font-bold transition-all"
                >
                  Claim Staking Dividends
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: GOVERNANCE PROPOSALS */}
        {activeTab === 'governance' && (
          <div className="mt-10 max-w-4xl mx-auto space-y-6">
            {MOCK_PROPOSALS.map((prop) => {
              const totalVotes = prop.forVotes + prop.againstVotes;
              const forPercent = Math.round((prop.forVotes / totalVotes) * 100);
              const userVote = userVotedMap[prop.id];

              return (
                <div key={prop.id} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-slate-800 font-mono text-xs font-bold text-[#00E5FF]">
                        {prop.number}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{prop.category}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      prop.status === 'Active' ? 'bg-[#00E676]/20 text-[#00E676]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {prop.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{prop.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{prop.description}</p>

                  {/* Voting Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>For: {forPercent}% ({(prop.forVotes / 1000000).toFixed(1)}M DSK)</span>
                      <span>Against: {100 - forPercent}% ({(prop.againstVotes / 1000000).toFixed(1)}M DSK)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="bg-[#00E676] h-full" style={{ width: `${forPercent}%` }}></div>
                      <div className="bg-rose-500 h-full" style={{ width: `${100 - forPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Voting Controls */}
                  {prop.status === 'Active' && (
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Ends in {prop.endsInDays} days</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleVote(prop.id, 'for')}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                            userVote === 'for' 
                              ? 'bg-[#00E676] text-black' 
                              : 'bg-slate-900 border border-slate-700 text-white hover:border-[#00E676]'
                          }`}
                        >
                          {userVote === 'for' ? '✓ Voted For' : 'Vote For'}
                        </button>
                        <button
                          onClick={() => handleVote(prop.id, 'against')}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                            userVote === 'against' 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-slate-900 border border-slate-700 text-white hover:border-rose-500'
                          }`}
                        >
                          {userVote === 'against' ? '✓ Voted Against' : 'Vote Against'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
