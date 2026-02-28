import { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "heliopay",
    name: "HelioPay",
    sector: "Fintech",
    expIrr: 34,
    pd12m: 0.32,
    returnVol: 0.28,
    runwayMonths: 14,
    topCustomerShare: 0.22,
    hhi: 0.18,
    fundingGapSoon: false,
    primaryRisk: "Regulatory & underwriting",
    stressTests: [
      { name: "Funding delay (6 months)", deltaPd: 0.10, note: "Longer fundraising cycle increases cash distress risk." },
      { name: "Revenue -15% shock", deltaPd: 0.08, note: "Lower originations reduce fee income; burn becomes rigid." }
    ]
  },
  {
    id: "gridpulse",
    name: "GridPulse",
    sector: "Climate",
    expIrr: 30,
    pd12m: 0.26,
    returnVol: 0.22,
    runwayMonths: 18,
    topCustomerShare: 0.35,
    hhi: 0.27,
    fundingGapSoon: false,
    primaryRisk: "Customer concentration",
    stressTests: [
      { name: "Lose top customer", deltaPd: 0.18, note: "Single contract dependency creates a hard cliff." },
      { name: "Costs +10%", deltaPd: 0.06, note: "Hardware/ops inflation compresses runway." }
    ]
  },
  {
    id: "clinicflow",
    name: "ClinicFlow",
    sector: "Health",
    expIrr: 28,
    pd12m: 0.23,
    returnVol: 0.18,
    runwayMonths: 16,
    topCustomerShare: 0.18,
    hhi: 0.14,
    fundingGapSoon: false,
    primaryRisk: "Sales cycle length",
    stressTests: [
      { name: "Sales cycle +3 months", deltaPd: 0.07, note: "Slower conversions delay cash inflows." },
      { name: "Revenue -10%", deltaPd: 0.05, note: "Moderate resilience due to diversified clinics." }
    ]
  },
  {
    id: "mintcart",
    name: "MintCart",
    sector: "Commerce",
    expIrr: 40,
    pd12m: 0.48,
    returnVol: 0.35,
    runwayMonths: 8,
    topCustomerShare: 0.52,
    hhi: 0.41,
    fundingGapSoon: true,
    primaryRisk: "Funding dependency + concentration",
    stressTests: [
      { name: "Funding delay (3 months)", deltaPd: 0.12, note: "Short runway becomes critical under delay." },
      { name: "Ad CAC +20%", deltaPd: 0.09, note: "Marketing efficiency shock raises burn." }
    ]
  },
  {
    id: "signalops",
    name: "SignalOps",
    sector: "B2B SaaS",
    expIrr: 32,
    pd12m: 0.38,
    returnVol: 0.30,
    runwayMonths: 10,
    topCustomerShare: 0.40,
    hhi: 0.31,
    fundingGapSoon: true,
    primaryRisk: "Macro + renewals",
    stressTests: [
      { name: "Churn +5pp", deltaPd: 0.10, note: "Renewal softness cascades into MRR decline." },
      { name: "Hiring freeze", deltaPd: 0.04, note: "Mitigation can stabilize burn, but slows growth." }
    ]
  }
];
