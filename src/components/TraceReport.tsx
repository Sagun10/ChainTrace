import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert,
  Send,
  Zap,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { CaseData } from '../types';

interface TraceReportProps {
  caseData: CaseData;
  onExportReport: () => void;
  onOpenLegalNotice: () => void;
  onCopyAddress: (addr: string) => void;
}

export const TraceReport: React.FC<TraceReportProps> = ({
  caseData,
  onExportReport,
  onOpenLegalNotice,
  onCopyAddress,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyAddress(caseData.seedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Circular progress math
  const score = caseData.riskScore;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return { stroke: '#EF4444', text: 'text-red-600', label: 'High' };
    if (score >= 50) return { stroke: '#F59E0B', text: 'text-amber-600', label: 'Medium' };
    return { stroke: '#10B981', text: 'text-emerald-600', label: 'Low' };
  };

  const scoreMeta = getScoreColor();

  return (
    <div
      id="case-trace-report-panel"
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between"
    >
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1E293B]">Case Trace Intelligence Report</h3>
              <p className="text-[11px] text-slate-500">
                Official Law Enforcement Forensic Summary
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {caseData.complaintId}
          </span>
        </div>

        {/* Complaint & Seed Wallet Address Area */}
        <div className="space-y-3 mb-4">
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">
                Seed Wallet (Fraud Origin)
              </span>
              <span className="font-medium text-slate-600">{caseData.firNumber}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-xs text-slate-900 bg-white p-2 rounded-lg border border-slate-200">
              <span className="truncate pr-2">{caseData.seedAddress}</span>
              <button
                id="copy-seed-address-btn"
                onClick={handleCopy}
                className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
                title="Copy Address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Victim: <strong className="text-slate-700">{caseData.victimName}</strong></span>
              <span className="font-mono font-bold text-slate-800">{caseData.stolenAmount}</span>
            </div>
          </div>

          {/* Risk Score Circular Gauge & Analysis */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-50/40 p-3.5 rounded-xl border border-slate-200/80">
            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center sm:col-span-1">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-slate-200 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke={scoreMeta.stroke}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-extrabold text-[#1E293B] font-mono leading-none">
                    {score}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">/100</span>
                  <span className={`text-[10px] font-bold ${scoreMeta.text} uppercase tracking-wider`}>
                    {scoreMeta.label}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 mt-1">
                Risk Score Gauge
              </span>
            </div>

            {/* Tags / Chips Breakdown */}
            <div className="sm:col-span-2 space-y-2">
              <div className="text-[11px] font-semibold text-slate-600">
                Automated Forensic Indicators:
              </div>
              <div className="flex flex-wrap gap-1.5" id="report-tag-chips">
                {caseData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/80 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight pt-1">
                High-confidence heuristic matching indicates structured layering to obscure trail.
              </p>
            </div>
          </div>

          {/* Info Block: Exchange Landing Point */}
          <div
            id="exchange-landing-card"
            className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 text-xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 bg-blue-100 rounded-lg text-[#2563EB] shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1E293B] text-xs flex items-center space-x-1.5">
                    <span>Exchange Landing: {caseData.exchangeLanding.exchangeName} Deposit Wallet</span>
                  </div>
                  <p className="text-[11px] text-blue-900 font-medium mt-0.5">
                    {caseData.exchangeLanding.actionRequired}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Deposit Destination: <span className="font-mono text-slate-700 font-medium">{caseData.exchangeLanding.depositWallet}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                {caseData.exchangeLanding.kycStatus}
              </span>
              <button
                onClick={onOpenLegalNotice}
                className="text-[11px] font-semibold text-[#2563EB] hover:text-blue-800 hover:underline flex items-center space-x-1"
              >
                <span>Draft Section 94 Notice</span>
                <Send className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Efficiency Metric Banner */}
          <div
            id="efficiency-metric-card"
            className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-[12px]">
                  Time to Trace: <span className="text-emerald-700 font-mono font-extrabold">{caseData.timeToTrace}</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  (vs {caseData.manualTraceEstimate})
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              98.2% Faster
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
        <button
          id="export-pdf-button"
          onClick={onExportReport}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Case Report (PDF)</span>
        </button>
        <p className="text-[10px] text-center text-slate-400">
          Automatically stamped with digital signature & logged to CCPS audit register
        </p>
      </div>
    </div>
  );
};
