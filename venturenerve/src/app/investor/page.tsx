"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Slider from "@/components/Slider";
import { InvestorProfile } from "@/lib/types";

export default function InvestorPage() {
  const [minIrr, setMinIrr] = useState(25);
  const [maxPd, setMaxPd] = useState(35);
  const [riskAversion, setRiskAversion] = useState(0.6);
  const [maxTopCustomerShare, setMaxTopCustomerShare] = useState(45);
  const [avoidFundingGap, setAvoidFundingGap] = useState(true);

  const profile: InvestorProfile = useMemo(
    () => ({
      minIrr,
      maxPd,
      riskAversion,
      maxTopCustomerShare,
      avoidFundingGap,
    }),
    [minIrr, maxPd, riskAversion, maxTopCustomerShare, avoidFundingGap]
  );

  const label = maxPd <= 20 ? "Defensive" : maxPd <= 35 ? "Balanced" : "Aggressive";

  const params = new URLSearchParams({
    minIrr: String(profile.minIrr),
    maxPd: String(profile.maxPd),
    ra: String(profile.riskAversion),
    maxTop: String(profile.maxTopCustomerShare),
    avoidGap: String(profile.avoidFundingGap),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Investor Profile</h2>
          <p className="text-sm text-zinc-400">Set your return target and risk constraints.</p>
        </div>
        <Link
          href={`/matches?${params.toString()}`}
          className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
        >
          View matches
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Mandate" subtitle="Interpreted from your constraints">
          <div className="text-2xl font-semibold">{label}</div>
          <div className="mt-2 text-sm text-zinc-300">
            IRR floor: <b>{minIrr}%</b> · PD cap: <b>{maxPd}%</b>
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Risk aversion λ: {riskAversion.toFixed(2)} · Top customer cap: {maxTopCustomerShare}%
          </div>
        </Card>

        <Card title="How it matches" subtitle="Transparent scoring">
          <p className="text-sm text-zinc-300">We filter startups that violate your constraints, then rank by:</p>
          <p className="mt-2 rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-200">
            Score = RAR − λ·VolPenalty − FragilityPenalty
          </p>
          <p className="mt-2 text-xs text-zinc-400">RAR = Expected IRR × (1 − PD)</p>
        </Card>

        <Card title="Demo data" subtitle="No backend needed">
          <p className="text-sm text-zinc-300">
            This prototype uses a mock universe of 5 startups so you can ship a fully working demo on Vercel.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Return & Risk Controls" subtitle="Core sliders">
          <div className="space-y-4">
            <Slider label="Minimum expected IRR (%)" value={minIrr} min={5} max={60} step={1} onChange={setMinIrr} />
            <Slider label="Maximum 12-month PD (%)" value={maxPd} min={5} max={80} step={1} onChange={setMaxPd} />
            <Slider
              label="Risk aversion (λ) (0=loose, 1=strict)"
              value={riskAversion}
              min={0}
              max={1}
              step={0.01}
              onChange={setRiskAversion}
            />
          </div>
        </Card>

        <Card title="Structural Constraints" subtitle="Hard filters & toggles">
          <div className="space-y-4">
            <Slider
              label="Max top-customer revenue share (%)"
              value={maxTopCustomerShare}
              min={10}
              max={80}
              step={1}
              onChange={setMaxTopCustomerShare}
            />

            <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
              <input
                type="checkbox"
                checked={avoidFundingGap}
                onChange={(e) => setAvoidFundingGap(e.target.checked)}
                className="h-4 w-4"
              />
              <div>
                <div className="text-sm font-medium">Avoid near-term funding gap</div>
                <div className="text-xs text-zinc-400">Exclude startups that need cash within 6 months</div>
              </div>
            </label>

            <Link
              href={`/matches?${params.toString()}`}
              className="block w-full rounded-xl bg-zinc-100 px-4 py-2 text-center text-sm font-medium text-zinc-950 hover:bg-white"
            >
              See ranked top 3
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
