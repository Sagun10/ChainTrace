export interface NodeData {
  id: string;
  label: string;
  role: 'seed' | 'mule' | 'exchange';
  address: string;
  shortAddress: string;
  inflow: string;
  outflow: string;
  balance: string;
  firstSeen: string;
  lastActive: string;
  txCount: number;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  exchangeName?: string;
  x: number; // percentage in graph canvas
  y: number;
  flags: string[];
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  amount: string;
  fiatValue: string;
  timestamp: string;
  txHash: string;
  hops: number;
}

export interface CaseData {
  id: string;
  firNumber: string;
  complaintId: string;
  victimName: string;
  stolenAmount: string;
  stolenFiat: string;
  seedAddress: string;
  token: string;
  dateReported: string;
  status: 'Tracing Complete' | 'KYC Subpoena Pending' | 'Account Frozen';
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  exchangeLanding: {
    exchangeName: string;
    depositWallet: string;
    actionRequired: string;
    kycStatus: 'KYC Verified Hot Wallet' | 'Regulated Indian VASP' | 'Offshore Exchange';
  };
  timeToTrace: string;
  manualTraceEstimate: string;
  tags: string[];
  flags: {
    title: string;
    description: string;
    icon: 'peel' | 'speed' | 'blacklist' | 'exchange';
    severity: 'high' | 'warning' | 'info';
  }[];
  nodes: NodeData[];
  edges: EdgeData[];
}
