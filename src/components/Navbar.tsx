import React from 'react';
import { Shield, ShieldCheck, UserCheck, Radio, LayoutDashboard, Info, Network } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'console';
  onViewChange: (view: 'landing' | 'console') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <header id="top-navbar" className="bg-[#FFFFFF] border-b border-[#E2E8F0] sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo and Department */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => onViewChange('landing')}
            className="flex items-center space-x-2.5 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] shadow-xs group-hover:bg-blue-100 transition-colors">
              <Shield className="w-5 h-5 fill-blue-500/20 text-[#2563EB]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-[#1E293B] font-['Plus_Jakarta_Sans']">
                  Chain<span className="text-[#2563EB]">Trace</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-100/70 text-blue-700">
                  Forensic v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight hidden md:block">
                Crypto Fraud Node Tracing & Asset Recovery System
              </p>
            </div>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* Department Badge */}
          <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Chandigarh Cyber Cell</span>
          </div>
        </div>

        {/* Center: Navigation View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            id="nav-landing-tab"
            onClick={() => onViewChange('landing')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              currentView === 'landing'
                ? 'bg-white text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Overview & Guide</span>
          </button>
          <button
            id="nav-console-tab"
            onClick={() => onViewChange('console')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              currentView === 'console'
                ? 'bg-white text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Investigation Console</span>
          </button>
        </div>

        {/* Right: Security info & Officer Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-slate-600 font-medium">FIU-IND Connected</span>
          </div>

          {/* Officer status badge */}
          <div
            id="officer-badge"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[#1E293B] text-xs font-medium shadow-2xs"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></div>
            <UserCheck className="w-4 h-4 text-[#2563EB]" />
            <span className="font-semibold text-slate-800 font-mono text-[12px]">CC-8092</span>
          </div>
        </div>
      </div>
    </header>
  );
};
