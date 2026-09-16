import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  Search,
  ArrowRight,
  Activity,
  Zap,
  Building,
  FileCheck,
  CheckCircle2,
  Lock,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  AlertTriangle,
  Play,
  HelpCircle,
  FileText,
  Users,
  Compass,
  ArrowUpRight,
  Database,
  Eye,
  Check,
} from 'lucide-react';
import { MOCK_CASES } from '../data/mockCases';
import { CaseData } from '../types';

interface LandingPageProps {
  onLaunchConsole: (sampleAddress?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchConsole }) => {
  const [quickInput, setQuickInput] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const cases = Object.values(MOCK_CASES);

  const handleQuickTrace = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onLaunchConsole(quickInput.trim());
    } else {
      onLaunchConsole();
    }
  };

  const faqs = [
    {
      q: 'What is ChainTrace and who is it designed for?',
      a: 'ChainTrace is an automated blockchain forensic and cryptocurrency fraud tracing tool purpose-built for Police Cyber Cells, Law Enforcement Agencies (LEAs), and Financial Intelligence Units (FIU). It replaces tedious manual block-explorer queries with autonomous multi-hop wallet graph mapping, heuristic risk scoring, and automated statutory legal notice drafting.',
    },
    {
      q: 'How does ChainTrace identify intermediary "Mule" wallets?',
      a: 'The engine applies behavioral heuristic clustering: detecting rapid pass-through velocity (>90% of funds leaving within 5 minutes), micro-split "peel chains", gas sponsorship patterns, and automated script forwarding commonly deployed by scam syndicates to evade exchange monitoring.',
    },
    {
      q: 'Are ChainTrace case reports and dockets admissible in Indian courts?',
      a: 'Yes. ChainTrace logs cryptographic hash timestamps, raw transaction hashes, block heights, and digital certificates of authenticity compliant with Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 65B of the Indian Evidence Act, 1872).',
    },
    {
      q: 'What happens when stolen funds land on a KYC-regulated exchange?',
      a: 'ChainTrace flags the destination as a Virtual Asset Service Provider (VASP) landing point, classifies whether it is an FIU-IND registered domestic entity (e.g., WazirX, CoinDCX, ZebPay) or offshore platform, and auto-populates statutory notices under Section 94 BNSS / Section 91 Cr.P.C. for immediate account freezing and KYC seizure.',
    },
    {
      q: 'Which cryptocurrencies and blockchain protocols are supported?',
      a: 'ChainTrace monitors Ethereum (ETH & ERC-20), Bitcoin (BTC), TRON (USDT-TRC20), Polygon (MATIC/POL), Binance Smart Chain (BNB/BEP-20), and Solana with real-time mempool and node synchronisation.',
    },
  ];

  return (
    <div id="chaintrace-landing-page" className="w-full flex flex-col gap-12 sm:gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Official Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold shadow-2xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#2563EB] animate-pulse"></span>
            <span>Dedicated Law Enforcement Cyber Cell Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-[1.15] mb-5">
            Rapid Crypto Fraud Tracing & <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">Autonomous Node Flow Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Empowering investigating officers to map victim funds from fraud seed addresses through complex multi-layer mule chains to KYC-regulated exchange deposit wallets in under <strong>90 seconds</strong>.
          </p>

          {/* Quick Search & Launch Action */}
          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleQuickTrace} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Enter suspect wallet address (0x...) or click sample case"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm font-mono text-[#1E293B] shadow-xs outline-none"
                />
              </div>
              <button
                type="submit"
                id="hero-trace-btn"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-xs hover:shadow transition-all cursor-pointer shrink-0"
              >
                <span>Launch Trace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Sample Active FIRs:</span>
              <button
                onClick={() => onLaunchConsole('0x71C849f2b1849F2e6178bC16568932AbC898932')}
                className="text-[#2563EB] hover:underline font-mono bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200"
              >
                FIR #402/26 (WazirX Landing)
              </button>
              <button
                onClick={() => onLaunchConsole('0x3a9D01824192bC774019485718471b41C347b41c')}
                className="text-[#2563EB] hover:underline font-mono bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200"
              >
                FIR #391/26 (CoinDCX Freeze)
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-200/80 text-left">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xl font-extrabold text-[#2563EB] font-mono">90 Sec</div>
              <div className="text-xs font-semibold text-slate-700">Average Trace Time</div>
              <div className="text-[11px] text-slate-400">vs 2-3 days manual analysis</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xl font-extrabold text-emerald-600 font-mono">100%</div>
              <div className="text-xs font-semibold text-slate-700">BSA / Sec 63 Legal Ready</div>
              <div className="text-[11px] text-slate-400">Court admissible dockets</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xl font-extrabold text-amber-600 font-mono">4+ Hops</div>
              <div className="text-xs font-semibold text-slate-700">Deep Mule Traversal</div>
              <div className="text-[11px] text-slate-400">Unveils peel & split layering</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xl font-extrabold text-slate-800 font-mono">FIU-IND</div>
              <div className="text-xs font-semibold text-slate-700">VASP Registry Match</div>
              <div className="text-[11px] text-slate-400">Instant KYC freeze drafting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visual Anatomy of an Investigation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Investigation Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-3">
              How ChainTrace Solves Crypto Fraud Cases
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From victim complaint registration to statutory exchange freeze in four unified stages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-[#F8FAFC] p-4.5 rounded-xl border border-slate-200 relative group hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mb-3">
                  01
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                  1. Seed Wallet Input
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter the fraudster's initial deposit wallet provided by the victim or cyber complaint portal.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-red-700 bg-red-50 p-2 rounded">
                Red Ring: High-Risk Origin
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F8FAFC] p-4.5 rounded-xl border border-slate-200 relative group hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
                  02
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                  2. Mule Layer Traversal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Autonomous heuristic graph traversal resolves peel-chains, micro-splits, and intermediary relays.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-amber-700 bg-amber-50 p-2 rounded">
                Amber Ring: Mule Accounts
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8FAFC] p-4.5 rounded-xl border border-slate-200 relative group hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm mb-3">
                  03
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                  3. VASP Exchange Pinpoint
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Detects the destination KYC-regulated exchange (WazirX, CoinDCX, ZebPay, Binance, etc.).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-blue-700 bg-blue-50 p-2 rounded">
                Blue Ring: Subpoena Target
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F8FAFC] p-4.5 rounded-xl border border-slate-200 relative group hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                  04
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                  4. Statutory Action & Freeze
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generate Section 94 BNSS / 91 CrPC notice with one click and export court-ready case dockets.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-mono text-emerald-700 bg-emerald-50 p-2 rounded">
                Section 94 Notice Ready
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0" />
              <p className="text-xs text-slate-700">
                Want to see this in action on a real cyber cell complaint? Explore the interactive console now.
              </p>
            </div>
            <button
              onClick={() => onLaunchConsole()}
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              Open Live Console
            </button>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Forensic Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-3">
            Engineered for Cyber Crime Investigators
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Every feature is calibrated to reduce investigation turnaround and prevent crypto asset dissipation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-100">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2">
                Peel Chain & Micro-Split Detection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Criminal rings split major amounts (e.g., ₹35 Lakhs) into dozens of fractional transfers to bypass AML thresholds. ChainTrace reconstructs the full consolidation tree automatically.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-branch transaction clustering</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Residual change address filtration</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2">
                Transit Velocity & Mule Scoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Legitimate wallets hold balances over time; mule wallets dump 90%+ within minutes. ChainTrace assigns a 0-100 risk score and identifies automated forwarding bots.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inflow-to-outflow time delta tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Known bad actor cluster matching</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 border border-blue-100">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2">
                Instant Statutory Subpoena Notice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Auto-generates legal notices under Section 94 of Bharatiya Nagarik Suraksha Sanhita (BNSS) & Section 91 Cr.P.C. pre-filled with deposit wallet hashes and officer credentials.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-click print & copy for Case Diary</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Official VASP Compliance routing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison: Manual vs ChainTrace Automated */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Investigation Efficiency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-3">
              Manual Investigation vs. ChainTrace
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Why speed is the single most critical factor in recovering stolen cryptocurrency:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-bold">
                  <th className="p-3.5">Investigation Phase</th>
                  <th className="p-3.5 text-slate-500">Traditional Manual Method</th>
                  <th className="p-3.5 text-[#2563EB] bg-blue-50/50">ChainTrace Automated Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1E293B]">Multi-Hop Graph Mapping</td>
                  <td className="p-3.5 text-slate-500">
                    2 to 4 days copying hashes into spreadsheets manually across multiple block explorers
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 bg-blue-50/30">
                    <span className="text-emerald-600 font-mono">90 seconds</span> autonomous multi-hop DAG traversal
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1E293B]">Mule Account Identification</td>
                  <td className="p-3.5 text-slate-500">
                    Subjective guesswork; high risk of missing intermediate split peel-chains
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 bg-blue-50/30">
                    Algorithmic heuristic velocity & balance drainage calculation
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1E293B]">Exchange Identification</td>
                  <td className="p-3.5 text-slate-500">
                    Checking known wallet lists manually; delayed legal notice filing
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 bg-blue-50/30">
                    Instant VASP repository match (FIU-IND registered entities flagged)
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1E293B]">Asset Freeze Rate</td>
                  <td className="p-3.5 text-slate-500">
                    Low (&lt;15%) because fraudsters cash out through P2P/fiat within hours
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 bg-blue-50/30">
                    <span className="text-emerald-600 font-semibold">High (&gt;80%)</span> due to immediate Section 94 notice dispatch
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1E293B]">Court Evidence Docket</td>
                  <td className="p-3.5 text-slate-500">
                    Manual screenshot compiling with risk of non-compliance under evidence laws
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 bg-blue-50/30">
                    Standardized PDF with digital hash integrity for Section 63 BSA certificate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Active Case Studies / Preloaded Traces */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-3">
            Real Cyber Cell Fraud Patterns
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Click any active investigation profile to immediately inspect the live interactive node graph and intelligence report:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((caseItem: CaseData) => (
            <div
              key={caseItem.id}
              className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200">
                    {caseItem.firNumber}
                  </span>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                    Risk {caseItem.riskScore}/100
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                  {caseItem.victimName}
                </h3>
                <div className="text-xs font-mono text-slate-500 mb-3">
                  Loss: <strong className="text-slate-800">{caseItem.stolenAmount}</strong> ({caseItem.stolenFiat})
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[11px]">Destination Exchange:</span>
                    <span className="font-bold text-[#2563EB]">{caseItem.exchangeLanding.exchangeName}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[11px]">Trace Duration:</span>
                    <span className="font-mono text-emerald-700 font-bold">{caseItem.timeToTrace}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {caseItem.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onLaunchConsole(caseItem.seedAddress)}
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] border border-slate-200 hover:border-blue-200 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Inspect Trace in Live Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-[#1E293B] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Technical and legal guidelines for investigating officers:
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                >
                  <span className="text-xs font-bold text-[#1E293B] pr-4">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-90 text-[#2563EB]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Launch Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-[#1E293B] text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 text-xs font-semibold mb-4 border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Cyber Cell Forensic Ready</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to Trace a Suspicious Crypto Transaction?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Launch the investigation console, input any wallet hash, and obtain a full multi-node flow graph and statutory Section 94 notice in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onLaunchConsole()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Open Investigation Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onLaunchConsole('0x71C849f2b1849F2e6178bC16568932AbC898932')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Load Demo Trace (FIR #402/26)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
