import React, { useState } from 'react';
import { X, Copy, Check, Printer, Shield, Building, FileCheck } from 'lucide-react';
import { CaseData } from '../types';

interface LegalNoticeModalProps {
  caseData: CaseData;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  caseData,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const noticeText = `OFFICE OF THE SUPERINTENDENT OF POLICE
CYBER CRIME POLICE STATION, UT CHANDIGARH
----------------------------------------------------------------------
NOTICE UNDER SECTION 94 BNSS, 2023 / SECTION 91 Cr.P.C., 1973
Ref: ${caseData.firNumber} | Complaint ID: ${caseData.complaintId}
Date: 20-AUG-2026

To,
The Nodal Officer / Compliance Department,
${caseData.exchangeLanding.exchangeName} (Virtual Asset Service Provider)

SUBJECT: URGENT PRESERVATION OF TRANSACTION LOGS & KYC DATA IN CYBER FRAUD PROBE

WHEREAS, an investigation is underway regarding cyber financial fraud involving misappropriation of ${caseData.stolenAmount} (${caseData.stolenFiat}) from victim ${caseData.victimName}.

Forensic blockchain trace confirms the destination funds landed at your exchange deposit wallet:
Deposit Address: ${caseData.exchangeLanding.depositWallet}
Seed Suspect Address: ${caseData.seedAddress}

YOU ARE HEREBY REQUIRED TO:
1. Immediately freeze and restrain further withdrawals/transfers from the linked account/UID.
2. Furnish complete KYC records (Aadhaar, PAN, registered Mobile, Email, and Bank Account).
3. Provide raw IP login access logs, device fingerprints, and fiat bank payout records.

Issued by:
Investigating Officer CC-8092
Cyber Crime Police Station, Sector 17, Chandigarh
`;

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    onShowToast('Legal Notice copied to clipboard. Stamped with Officer ID CC-8092.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
    onShowToast('Printing Notice Docket for Investigation Diary.');
  };

  return (
    <div
      id="legal-notice-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl border border-slate-300 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-[#2563EB]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">
                Section 94 BNSS / 91 CrPC Notice Draft
              </h3>
              <p className="text-xs text-slate-500">
                Statutory Data Preservation Notice for {caseData.exchangeLanding.exchangeName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Preview Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 bg-slate-50/50 leading-relaxed border-b border-slate-200">
          <pre className="whitespace-pre-wrap font-mono select-all bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            {noticeText}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500 font-sans">
            Officer ID: <strong className="text-slate-800">CC-8092</strong> • Chandigarh Police
          </span>
          <div className="flex items-center space-x-2.5">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Docket</span>
            </button>
            <button
              onClick={handleCopyNotice}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Notice Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
