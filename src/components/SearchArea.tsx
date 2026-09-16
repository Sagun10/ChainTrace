import React, { useState, useEffect } from 'react';
import { Search, Sparkles, X, Clipboard, ArrowRight, ShieldAlert } from 'lucide-react';
import { SAMPLE_CHIPS } from '../data/mockCases';

interface SearchAreaProps {
  address: string;
  setAddress: (val: string) => void;
  onTrace: (targetAddress?: string) => void;
  isTracing: boolean;
}

export const SearchArea: React.FC<SearchAreaProps> = ({
  address,
  setAddress,
  onTrace,
  isTracing,
}) => {
  const [localInput, setLocalInput] = useState(address);

  useEffect(() => {
    setLocalInput(address);
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim()) {
      setAddress(localInput.trim());
      onTrace(localInput.trim());
    }
  };

  const handleChipClick = (chipAddress: string) => {
    setLocalInput(chipAddress);
    setAddress(chipAddress);
    onTrace(chipAddress);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLocalInput(text.trim());
      }
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setLocalInput('');
  };

  return (
    <div
      id="search-area-card"
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-xs"
    >
      {/* Sample Trace Chips Section */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Try a sample trace:</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Quick-load active police cyber cell fraud patterns
          </span>
        </div>

        <div className="flex flex-wrap gap-2" id="sample-chips-container">
          {SAMPLE_CHIPS.map((chip, idx) => {
            const isChipActive = localInput.toLowerCase() === chip.address.toLowerCase();
            return (
              <button
                key={idx}
                id={`sample-chip-${idx}`}
                onClick={() => handleChipClick(chip.address)}
                disabled={isTracing}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isChipActive
                    ? 'bg-blue-50 text-[#2563EB] border-blue-300 ring-1 ring-blue-300/40 shadow-2xs font-semibold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-mono text-[11px]">{chip.label}</span>
                <span className="text-[10px] text-slate-400 bg-white/80 px-1 py-0.5 rounded border border-slate-200/60 font-sans">
                  {chip.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>

            <input
              id="wallet-address-input"
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Enter suspect wallet address (e.g., 0x71C849...8932) or transaction hash..."
              disabled={isTracing}
              className="w-full pl-10 pr-20 py-3 rounded-xl bg-slate-50/50 border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 text-sm font-mono text-[#1E293B] placeholder:text-slate-400 placeholder:font-sans transition-all outline-none"
            />

            <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
              {localInput && (
                <button
                  type="button"
                  id="clear-input-button"
                  onClick={handleClear}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                id="paste-clipboard-button"
                onClick={handlePaste}
                className="hidden sm:inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 transition-colors"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="trace-submit-button"
            disabled={isTracing || !localInput.trim()}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm shadow-xs hover:shadow-sm transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            {isTracing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Tracing Nodes...</span>
              </>
            ) : (
              <>
                <span>Trace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
