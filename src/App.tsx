import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SearchArea } from './components/SearchArea';
import { FlowGraph } from './components/FlowGraph';
import { TraceReport } from './components/TraceReport';
import { FlaggedAccordion } from './components/FlaggedAccordion';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { LandingPage } from './components/LandingPage';
import { Toast } from './components/Toast';
import { MOCK_CASES, DEFAULT_CASE_ADDRESS } from './data/mockCases';
import { CaseData } from './types';
import { Network, Activity, Info, Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [currentAddress, setCurrentAddress] = useState<string>(DEFAULT_CASE_ADDRESS);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [activeCase, setActiveCase] = useState<CaseData>(MOCK_CASES[DEFAULT_CASE_ADDRESS]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLegalNotice, setShowLegalNotice] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Querying mempool and transaction logs...');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const runTrace = (targetAddr?: string) => {
    const addr = targetAddr || currentAddress;
    setIsTracing(true);
    setLoadingStep('Mapping wallet flow across blockchain nodes...');

    // Match or fallback to mock case
    const matchedKey = Object.keys(MOCK_CASES).find(
      (key) => key.toLowerCase() === addr.toLowerCase()
    );

    const selectedCase = matchedKey
      ? MOCK_CASES[matchedKey]
      : {
          ...MOCK_CASES[DEFAULT_CASE_ADDRESS],
          seedAddress: addr,
          complaintId: `#2026-CC-${Math.floor(1000 + Math.random() * 9000)}`,
          firNumber: `FIR #${Math.floor(400 + Math.random() * 50)}/26`,
          nodes: [
            {
              ...MOCK_CASES[DEFAULT_CASE_ADDRESS].nodes[0],
              address: addr,
              shortAddress: `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`,
            },
            ...MOCK_CASES[DEFAULT_CASE_ADDRESS].nodes.slice(1),
          ],
        };

    // 1.5 seconds loading simulation as specified in prompt
    setTimeout(() => {
      setActiveCase(selectedCase);
      setIsTracing(false);
      showToast(`Trace completed: Found ${selectedCase.nodes.length} nodes across ${selectedCase.edges.length} hops.`);
    }, 1500);
  };

  const handleLaunchConsoleFromLanding = (sampleAddr?: string) => {
    if (sampleAddr) {
      setCurrentAddress(sampleAddr);
      setViewMode('console');
      runTrace(sampleAddr);
    } else {
      setViewMode('console');
    }
  };

  const handleSelectRecentCase = (addr: string) => {
    setCurrentAddress(addr);
    runTrace(addr);
  };

  const handleExportPDF = () => {
    // Prompt specification: shows a toast message saying "Report generated and logged to audit trail"
    showToast('Report generated and logged to audit trail');
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    showToast(`Address copied: ${addr.substring(0, 8)}...${addr.substring(addr.length - 6)}`);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB] text-[#1E293B] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar with view switchers */}
      <Navbar currentView={viewMode} onViewChange={setViewMode} />

      {/* Conditional Rendering: Landing Page vs Forensic Console */}
      {viewMode === 'landing' ? (
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          <LandingPage onLaunchConsole={handleLaunchConsoleFromLanding} />
        </main>
      ) : (
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 animate-in fade-in duration-200">
          {/* Left Sidebar (Recent Traces) */}
          <Sidebar
            currentAddress={currentAddress}
            onSelectCase={handleSelectRecentCase}
            isTracing={isTracing}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Context Sub-bar with quick back to guide link */}
            <div className="flex items-center justify-between px-1 text-xs">
              <div className="flex items-center space-x-2 text-slate-500">
                <span className="font-semibold text-slate-700">Active Investigation:</span>
                <span className="bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
                  {activeCase.firNumber}
                </span>
                <span className="hidden sm:inline text-slate-400">• {activeCase.victimName}</span>
              </div>
              <button
                onClick={() => setViewMode('landing')}
                className="text-xs font-semibold text-slate-500 hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer hover:underline"
              >
                <Info className="w-3.5 h-3.5" />
                <span>View Platform Guide & Details</span>
              </button>
            </div>

            {/* Top Search Area with Sample Chips */}
            <SearchArea
              address={currentAddress}
              setAddress={setCurrentAddress}
              onTrace={runTrace}
              isTracing={isTracing}
            />

            {/* Interactive Loading State (1.5s as specified) */}
            {isTracing ? (
              <div
                id="tracing-loading-card"
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-12 shadow-xs flex flex-col items-center justify-center text-center animate-in fade-in duration-300 min-h-[420px]"
              >
                <div className="relative mb-6">
                  {/* Pulsing radar animation */}
                  <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
                    <Network className="w-10 h-10 animate-pulse text-[#2563EB]" />
                  </div>
                  <div className="absolute -inset-2 rounded-full border-2 border-blue-400/40 border-t-transparent animate-spin"></div>
                  <div className="absolute -inset-4 rounded-full border border-blue-300/20 animate-ping pointer-events-none"></div>
                </div>

                <h3 className="text-base font-bold text-[#1E293B] mb-2 font-['Plus_Jakarta_Sans']">
                  Mapping wallet flow across blockchain nodes...
                </h3>
                <p className="text-xs text-slate-500 max-w-md mb-6">
                  Executing heuristic graph clustering, tracing unspent transaction outputs (UTXO/EVMLogs), and matching VASP exchange deposit vaults.
                </p>

                {/* Progress Steps */}
                <div className="w-full max-w-md bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2 text-left text-xs text-slate-600">
                  <div className="flex items-center space-x-2 text-[#2563EB] font-semibold">
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing seed wallet hop velocity & gas sponsorship...</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1"></div>
                    <span>Resolving intermediary mule consolidation layer...</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1"></div>
                    <span>Identifying KYC-regulated exchange landing address...</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Arena */
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                {/* Top Row: A) Live Wallet Flow Graph & B) Case Trace Report Panel */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  {/* Left/Center Column (7 cols): A) Live Wallet Flow Graph */}
                  <div className="xl:col-span-7 flex flex-col">
                    <FlowGraph
                      caseData={activeCase}
                      onCopyAddress={handleCopyAddress}
                    />
                  </div>

                  {/* Right Column (5 cols): B) Case Trace Report Panel */}
                  <div className="xl:col-span-5 flex flex-col">
                    <TraceReport
                      caseData={activeCase}
                      onExportReport={handleExportPDF}
                      onOpenLegalNotice={() => setShowLegalNotice(true)}
                      onCopyAddress={handleCopyAddress}
                    />
                  </div>
                </div>

                {/* Bottom Row: C) Collapsible "How this was flagged" Section */}
                <FlaggedAccordion caseData={activeCase} />
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-3.5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">ChainTrace Cyber Cell Portal</span>
            <span className="text-slate-400">• Authorized Law Enforcement System</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Compliant with IT Act 2000, Section 94 BNSS (2023) & Bharatiya Sakshya Adhiniyam standards
          </p>
        </div>
      </footer>

      {/* Legal Notice Draft Modal */}
      {showLegalNotice && (
        <LegalNoticeModal
          caseData={activeCase}
          onClose={() => setShowLegalNotice(false)}
          onShowToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
