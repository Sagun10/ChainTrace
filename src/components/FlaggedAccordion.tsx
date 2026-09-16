import React, { useState } from 'react';
import {
  ChevronDown,
  Layers,
  Zap,
  ShieldAlert,
  Building,
  HelpCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import { CaseData } from '../types';

interface FlaggedAccordionProps {
  caseData: CaseData;
}

export const FlaggedAccordion: React.FC<FlaggedAccordionProps> = ({ caseData }) => {
  const [isOpen, setIsOpen] = useState(true);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'peel':
        return <Layers className="w-4 h-4 text-[#2563EB]" />;
      case 'speed':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'blacklist':
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'exchange':
        return <Building className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div
      id="flagged-accordion-container"
      className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs transition-all"
    >
      {/* Header Button */}
      <button
        id="flagged-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-200/50 transition-colors"
      >
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#2563EB] shadow-2xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E293B]">How this was flagged</h4>
            <p className="text-[11px] text-slate-500">
              Automated behavioral detection criteria applied to this transaction chain
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600 px-2 py-0.5 rounded-full bg-white border border-slate-200">
            {caseData.flags.length} Triggers
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div
          id="flagged-accordion-content"
          className="px-5 pb-5 pt-1 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {caseData.flags.map((flag, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-start space-x-3 hover:border-blue-200 transition-all"
            >
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0 mt-0.5">
                {getIcon(flag.icon)}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-[#1E293B]">{flag.title}</h5>
                  <span className="text-[9px] font-bold text-slate-400 font-mono">0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {flag.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
