export type StressTest = {
  name: string;
  deltaPd: number; // absolute PD increase
  note: string;
};

export type Startup = {
  id: string;
  name: string;
  sector: string;
  expIrr: number; // percent
  pd12m: number; // 0..1
  returnVol: number; // 0..1 proxy
  runwayMonths: number;
  topCustomerShare: number; // 0..1
  hhi: number; // 0..1
  fundingGapSoon: boolean;
  primaryRisk: string;
  stressTests: StressTest[];
};

export type InvestorProfile = {
  minIrr: number;
  maxPd: number; // percent
  riskAversion: number; // 0..1
  maxTopCustomerShare: number; // percent
  avoidFundingGap: boolean;
};

export type Match = {
  startup: Startup;
  eligible: boolean;
  reasons: string[];
  rar: number; // decimal
  score: number; // internal
};
