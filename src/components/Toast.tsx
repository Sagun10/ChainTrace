import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      id="app-toast-notification"
      className="fixed bottom-5 right-5 z-50 max-w-md bg-[#1E293B] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center justify-between space-x-3 animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="flex items-center space-x-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <p className="text-xs font-medium text-slate-100">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
