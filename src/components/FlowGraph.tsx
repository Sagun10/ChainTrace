import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Building2,
  Users,
  AlertOctagon,
  ArrowRight,
  Clock,
  Coins,
  Shield,
  Layers,
  ZoomIn,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CaseData, NodeData, EdgeData } from '../types';

interface FlowGraphProps {
  caseData: CaseData;
  onCopyAddress: (addr: string) => void;
}

export const FlowGraph: React.FC<FlowGraphProps> = ({ caseData, onCopyAddress }) => {
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'ledger'>('graph');
  const [animationKey, setAnimationKey] = useState<number>(0);

  const activeNode = hoveredNode || selectedNode;

  const handleCopy = (address: string, id: string) => {
    onCopyAddress(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Node styling helper
  const getNodeStyle = (role: NodeData['role']) => {
    switch (role) {
      case 'seed':
        return {
          ringClass: 'border-2 border-red-500 ring-4 ring-red-100/90 shadow-sm',
          bgBadge: 'bg-red-50 text-red-700 border-red-200',
          icon: AlertOctagon,
          iconColor: 'text-red-600',
          accentColor: '#EF4444',
          labelColor: 'text-red-900 font-bold',
        };
      case 'mule':
        return {
          ringClass: 'border-2 border-amber-500 ring-4 ring-amber-100/90 shadow-sm',
          bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Users,
          iconColor: 'text-amber-600',
          accentColor: '#F59E0B',
          labelColor: 'text-amber-950 font-bold',
        };
      case 'exchange':
        return {
          ringClass: 'border-2 border-blue-600 ring-4 ring-blue-100/90 shadow-sm',
          bgBadge: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: Building2,
          iconColor: 'text-blue-600',
          accentColor: '#2563EB',
          labelColor: 'text-blue-950 font-bold',
        };
    }
  };

  return (
    <div
      id="flow-graph-container"
      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between"
    >
      {/* Top Header of Graph */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-sm font-bold text-[#1E293B] tracking-tight">
              Live Wallet Flow Graph
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              ({caseData.nodes.length} nodes, {caseData.edges.length} hops)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Directed blockchain transaction progression with automated risk ring classification
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* View toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200 text-xs">
            <button
              id="graph-view-btn"
              onClick={() => setViewMode('graph')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'graph'
                  ? 'bg-white text-[#2563EB] shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Node Graph
            </button>
            <button
              id="ledger-view-btn"
              onClick={() => setViewMode('ledger')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'ledger'
                  ? 'bg-white text-[#2563EB] shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hop Ledger Table
            </button>
          </div>

          <button
            id="replay-flow-btn"
            onClick={handleReplay}
            title="Replay flow animation"
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Visual Arena */}
      {viewMode === 'graph' ? (
        <div className="relative min-h-[380px] lg:min-h-[420px] bg-[#F8FAFC] border border-slate-200/80 rounded-xl overflow-hidden flex flex-col justify-center select-none">
          {/* Subtle Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#94a3b8 0.75px, transparent 0.75px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Directed SVG Arrows & Hop Badges */}
          <svg
            key={animationKey}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <marker
                id="arrowhead-red"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
              </marker>
              <linearGradient id="flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            {caseData.edges.map((edge) => {
              const sourceNode = caseData.nodes.find((n) => n.id === edge.source);
              const targetNode = caseData.nodes.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <g key={edge.id} className="transition-all">
                  {/* Background line */}
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke="#CBD5E1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Animated Dashed Flow Line */}
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    className="animate-pulse opacity-80"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Transfer Amount & Timestamp Badges on Edges */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            {caseData.edges.map((edge) => {
              const sourceNode = caseData.nodes.find((n) => n.id === edge.source);
              const targetNode = caseData.nodes.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <div
                  key={`edge-badge-${edge.id}`}
                  style={{
                    left: `${midX}%`,
                    top: `${midY - 7}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute pointer-events-auto"
                >
                  <div className="px-2.5 py-1 rounded-full bg-white border border-slate-300/90 shadow-xs flex items-center space-x-1 text-[11px] font-medium text-slate-800 whitespace-nowrap hover:scale-105 hover:border-blue-400 transition-all cursor-default">
                    <span className="font-bold text-[#1E293B] font-mono">{edge.amount}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-sans text-[10px] flex items-center">
                      <Clock className="w-2.5 h-2.5 mr-0.5 inline text-slate-400" />
                      {edge.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Nodes Layer */}
          <div className="relative w-full h-full flex items-center justify-between px-4 sm:px-8 py-12" style={{ zIndex: 10 }}>
            {caseData.nodes.map((node) => {
              const style = getNodeStyle(node.role);
              const Icon = style.icon;
              const isHovered = hoveredNode?.id === node.id;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  id={`graph-node-${node.id}`}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  className="flex flex-col items-center cursor-pointer group relative"
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Outer Pulsing Aura on Active/Hover */}
                  {(isHovered || isSelected) && (
                    <div
                      className="absolute -inset-3 rounded-full opacity-30 animate-ping pointer-events-none"
                      style={{ backgroundColor: style.accentColor }}
                    />
                  )}

                  {/* Circular Node Card */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex flex-col items-center justify-center transition-all duration-200 ${
                      style.ringClass
                    } ${
                      isHovered || isSelected
                        ? 'scale-110 shadow-md ring-offset-2'
                        : 'group-hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${style.iconColor}`} />
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 mt-0.5 font-mono">
                      {node.role === 'seed'
                        ? 'Origin'
                        : node.role === 'exchange'
                        ? 'Exchange'
                        : node.label}
                    </span>
                  </div>

                  {/* Node Label Badge Below */}
                  <div className="mt-2 text-center">
                    <span
                      className={`inline-block text-[11px] px-2 py-0.5 rounded-full font-bold border ${style.bgBadge}`}
                    >
                      {node.label}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {node.shortAddress}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating White Tooltip (Prompt Requirement: Wallet Address, Inflow, Outflow, and First-Seen timestamp) */}
          {activeNode && (
            <div
              id="node-hover-tooltip"
              className="absolute z-30 bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-lg text-xs animate-in fade-in slide-in-from-bottom-2 duration-150"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeNode.role === 'seed'
                        ? 'bg-red-500'
                        : activeNode.role === 'mule'
                        ? 'bg-amber-500'
                        : 'bg-blue-600'
                    }`}
                  />
                  <span className="font-bold text-[#1E293B] text-xs">
                    {activeNode.label} Details
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    activeNode.role === 'seed'
                      ? 'bg-red-50 text-red-700'
                      : activeNode.role === 'mule'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {activeNode.role === 'seed'
                    ? 'High Risk Origin'
                    : activeNode.role === 'mule'
                    ? 'Intermediary Mule'
                    : 'Regulated Exchange'}
                </span>
              </div>

              {/* Wallet Address with copy */}
              <div className="mb-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Wallet Address
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-800 break-all">
                  <span>{activeNode.address}</span>
                  <button
                    onClick={() => handleCopy(activeNode.address, activeNode.id)}
                    className="ml-1 p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors shrink-0"
                    title="Copy full address"
                  >
                    {copiedId === activeNode.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Grid of Inflow, Outflow, First-Seen */}
              <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                <div className="bg-slate-50/70 p-1.5 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Total Inflow</span>
                  <span className="font-bold text-emerald-700 font-mono">{activeNode.inflow}</span>
                </div>
                <div className="bg-slate-50/70 p-1.5 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Total Outflow</span>
                  <span className="font-bold text-red-600 font-mono">{activeNode.outflow}</span>
                </div>
                <div className="col-span-2 bg-slate-50/70 p-1.5 rounded border border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">First-Seen Timestamp:</span>
                  <span className="font-medium text-slate-700 font-mono text-[10px]">
                    {activeNode.firstSeen}
                  </span>
                </div>
              </div>

              {/* Node Tags */}
              <div className="flex flex-wrap gap-1">
                {activeNode.flags.map((flag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Alternative Table Ledger View */
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-3.5 py-2.5">Hop</th>
                <th className="px-3.5 py-2.5">Source Node</th>
                <th className="px-3.5 py-2.5">Destination Node</th>
                <th className="px-3.5 py-2.5">Amount Transferred</th>
                <th className="px-3.5 py-2.5">Fiat Value (INR)</th>
                <th className="px-3.5 py-2.5">Timestamp</th>
                <th className="px-3.5 py-2.5">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
              {caseData.edges.map((edge, idx) => {
                const source = caseData.nodes.find((n) => n.id === edge.source);
                const target = caseData.nodes.find((n) => n.id === edge.target);

                return (
                  <tr key={edge.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3.5 py-2.5 font-bold text-slate-900 font-sans">Hop #{idx + 1}</td>
                    <td className="px-3.5 py-2.5">
                      <span className="font-semibold text-slate-900">{source?.label}</span>
                      <div className="text-[10px] text-slate-400">{source?.shortAddress}</div>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <span className="font-semibold text-blue-700">{target?.label}</span>
                      <div className="text-[10px] text-slate-400">{target?.shortAddress}</div>
                    </td>
                    <td className="px-3.5 py-2.5 font-bold text-slate-900">{edge.amount}</td>
                    <td className="px-3.5 py-2.5 font-sans font-medium text-emerald-700">
                      {edge.fiatValue}
                    </td>
                    <td className="px-3.5 py-2.5 font-sans text-slate-500">{edge.timestamp}</td>
                    <td className="px-3.5 py-2.5 text-blue-600 hover:underline cursor-pointer">
                      {edge.txHash}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Graph Footer Legend */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-red-500 ring-2 ring-red-100 bg-white"></span>
            <span className="text-[11px] font-medium text-slate-700">Seed / Fraud Origin</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-amber-500 ring-2 ring-amber-100 bg-white"></span>
            <span className="text-[11px] font-medium text-slate-700">Mule Intermediary</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-blue-600 ring-2 ring-blue-100 bg-white"></span>
            <span className="text-[11px] font-medium text-slate-700">Exchange Landing Point</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400">
          Hover node to inspect metrics • Click to lock focus
        </span>
      </div>
    </div>
  );
};
