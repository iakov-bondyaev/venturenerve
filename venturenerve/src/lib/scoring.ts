import { InvestorProfile, Match, Startup } from "./types";

function rarOf(s: Startup) {
  return (s.expIrr / 100) * (1 - s.pd12m);
}

export function computeMatch(s: Startup, inv: InvestorProfile): Match {
  const reasons: string[] = [];

  if (s.expIrr < inv.minIrr) reasons.push(`Below IRR floor (${s.expIrr}% < ${inv.minIrr}%)`);
  if (s.pd12m * 100 > inv.maxPd)
    reasons.push(`PD too high (${Math.round(s.pd12m * 100)}% > ${inv.maxPd}%)`);
  if (s.topCustomerShare * 100 > inv.maxTopCustomerShare)
    reasons.push(
      `Top customer too high (${Math.round(s.topCustomerShare * 100)}% > ${inv.maxTopCustomerShare}%)`
    );
  if (inv.avoidFundingGap && s.fundingGapSoon) reasons.push("Near-term funding gap");

  const eligible = reasons.length === 0;
  const rar = rarOf(s);

  // Penalties scale down RAR modestly; this is a demo, not a black box
  const volPenalty = inv.riskAversion * s.returnVol * 0.25;
  const fragilityPenalty = inv.riskAversion * (0.35 * s.hhi + 0.65 * s.topCustomerShare) * 0.20;

  const score = rar - volPenalty - fragilityPenalty;

  return { startup: s, eligible, reasons, rar, score };
}

function similarity(a: Startup, b: Startup) {
  const sectorSim = a.sector === b.sector ? 1 : 0;
  const riskSim = a.primaryRisk === b.primaryRisk ? 1 : 0;
  const concSim = 1 - Math.min(1, Math.abs(a.hhi - b.hhi) / 0.4);
  return 0.45 * sectorSim + 0.25 * riskSim + 0.30 * concSim;
}

export function pickTopK(eligible: Match[], k: number, riskAversion: number) {
  const pool = [...eligible].sort((x, y) => y.score - x.score);
  const picked: Match[] = [];

  const gamma = 0.20 + 0.25 * riskAversion; // diversification strength

  while (picked.length < k && pool.length > 0) {
    if (picked.length === 0) {
      picked.push(pool.shift()!);
      continue;
    }

    let bestIdx = 0;
    let bestAdj = -Infinity;

    for (let i = 0; i < pool.length; i++) {
      const m = pool[i];
      const sim = picked.reduce((acc, p) => acc + similarity(m.startup, p.startup), 0) / picked.length;
      const adj = m.score - gamma * sim;
      if (adj > bestAdj) {
        bestAdj = adj;
        bestIdx = i;
      }
    }

    picked.push(pool.splice(bestIdx, 1)[0]);
  }

  return picked;
}
