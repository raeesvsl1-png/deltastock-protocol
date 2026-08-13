import React from 'react';
import { ShieldCheck, Terminal, FileText, ExternalLink, Github, Twitter, Disc as Discord } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080B10] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00E5FF] p-0.5">
                <div className="w-full h-full bg-[#0B0E14] rounded-[6px] flex items-center justify-center font-bold text-[#00E676]">
                  Δ
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-white">DeltaStock.fi</span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              The automated delta-neutral yield protocol on tokenized equities. Capture real DEX trading fees without price exposure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Protocol</h4>
            <ul className="space-y-2">
              <li><a href="#visualizer" className="hover:text-[#00E676] transition-colors">Payoff Mechanics</a></li>
              <li><a href="#strategies" className="hover:text-[#00E676] transition-colors">Vault Strategies</a></li>
              <li><a href="#calculator" className="hover:text-[#00E676] transition-colors">Yield Calculator</a></li>
              <li><a href="#treasury" className="hover:text-[#00E676] transition-colors">DAO Treasury & $DSK</a></li>
            </ul>
          </div>

          {/* Research & Audits */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Security & Research</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" /> Smart Contract Audit</li>
              <li className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-slate-400" /> Technical Whitepaper</li>
              <li className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5 text-slate-400" /> Keeper Bot Source Code</li>
            </ul>
          </div>

          {/* Governance & Disclaimer */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Governance</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3">
              50% of protocol performance fees are distributed weekly to $DSK governance token stakers.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://x.com/deltastock_/status/2087854976865542652?s=20" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Official X / Twitter @deltastock_"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00E676] hover:border-[#00E676] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com/raeesvsl1-png/deltastock-protocol" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00E676] hover:border-[#00E676] transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© 2026 DeltaStock Protocol. All rights reserved.</div>
          <div className="flex space-x-4">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Docs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
