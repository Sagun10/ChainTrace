import React from 'react';
import { History, FileText, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { MOCK_CASES } from '../data/mockCases';
import { CaseData } from '../types';

interface SidebarProps {
  currentAddress: string;
  onSelectCase: (address: string) => void;
  isTracing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentAddress, onSelectCase, isTracing }) => {
  const caseList = Object.values(MOCK_CASES);

  return (
    <aside
      id="left-sidebar"
      className="w-full lg:w-80 shrink-0 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#2563EB]" />
            <h2 className="text-sm font-bold text-[#1E293B] tracking-tight">Recent Traces</h2>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {caseList.length} Active Files
          </span>
        </div>

        {/* Instructions / Guidance */}
        <p className="text-[12px] text-slate-500 mb-3 leading-relaxed">
          Click any investigation record below to load the address and initiate real-time node flow analysis:
        </p>

        {/* Case List */}
        <div className="space-y-2.5" id="recent-cases-list">
          {caseList.map((caseItem: CaseData) => {
            const isSelected = caseItem.seedAddress.toLowerCase() === currentAddress.toLowerCase();
            const isHighRisk = caseItem.riskScore >= 80;

            return (
              <button
                key={caseItem.id}
                id={`case-card-${caseItem.id}`}
                onClick={() => onSelectCase(caseItem.seedAddress)}
                disabled={isTracing}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-150 relative group ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-300/50 shadow-2xs'
                    : 'bg-white hover:bg-slate-50/80 border-[#E2E8F0] hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2563EB]' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold text-[#1E293B]">{caseItem.firNumber}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-1 ${
                      isHighRisk
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {isHighRisk ? (
                      <ShieldAlert className="w-2.5 h-2.5 inline mr-0.5" />
                    ) : (
                      <AlertTriangle className="w-2.5 h-2.5 inline mr-0.5" />
                    )}
                    {caseItem.riskScore}/100
                  </span>
                </div>

                <div className="text-[11px] font-medium text-slate-700 truncate mb-1">
                  {caseItem.victimName}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="font-semibold text-slate-800">{caseItem.stolenAmount}</span>
                  <span className="text-slate-500 font-sans text-[10px]">{caseItem.stolenFiat}</span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[130px] font-mono">
                    {caseItem.seedAddress.substring(0, 6)}...{caseItem.seedAddress.substring(caseItem.seedAddress.length - 4)}
                  </span>
                  <span className="text-[#2563EB] font-medium flex items-center group-hover:translate-x-0.5 transition-transform">
                    {isSelected ? 'Viewing' : 'Load Trace'}
                    <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute -left-[1px] top-3 bottom-3 w-1 bg-[#2563EB] rounded-r"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer / LE Audit Badge */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 text-slate-600">
        <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-700 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Chain of Custody Active</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          All cryptographic query hashes are timestamped & logged for court admissibility under Bharatiya Sakshya Adhiniyam / Indian Evidence Act.
        </p>
      </div>
    </aside>
  );
};
