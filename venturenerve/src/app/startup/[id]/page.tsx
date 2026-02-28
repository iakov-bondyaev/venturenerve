import Link from "next/link";
import Card from "@/components/Card";
import Gauge from "@/components/Gauge";
import { startups } from "@/lib/mock";

export default function StartupDetail({ params }: { params: { id: string } }) {
  const s = startups.find((x) => x.id === params.id);

  if (!s) {
    return (
      <Card title="Not found" subtitle="Startup does not exist">
        <Link href="/matches" className="text-sm text-zinc-200 underline">
          Back to matches
        </Link>
      </Card>
    );
  }

  const pdPct = Math.round(s.pd12m * 100);
  const survivalPct = 100 - pdPct;
  const rarPct = (s.expIrr * (1 - s.pd12m)).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{s.name}</h2>
          <p className="text-sm text-zinc-400">
            {s.sector} · Primary risk: {s.primaryRisk}
          </p>
        </div>
        <Link
          href="/matches"
          className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900/60"
        >
          Back
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Expected IRR" subtitle="Input / estimate">
          <div className="text-3xl font-semibold">{s.expIrr}%</div>
          <div className="text-xs text-zinc-400">Illustrative expected IRR (demo)</div>
        </Card>
        <Card title="PD (12 months)" subtitle="Probability of distress">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-semibold">{pdPct}%</div>
            <Gauge value={survivalPct} label="Survival" />
          </div>
          <div className="text-xs text-zinc-400 mt-2">Higher PD means more fragility</div>
        </Card>
        <Card title="RAR" subtitle="Risk-adjusted return">
          <div className="text-3xl font-semibold">{rarPct}%</div>
          <div className="text-xs text-zinc-400 mt-2">RAR = IRR × (1 − PD)</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Structural Metrics" subtitle="Drivers you can explain to judges">
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              Top customer share: <b>{Math.round(s.topCustomerShare * 100)}%</b>
            </li>
            <li>
              Revenue concentration (HHI): <b>{s.hhi.toFixed(2)}</b>
            </li>
            <li>
              Cash runway (months): <b>{s.runwayMonths}</b>
            </li>
            <li>
              Funding gap within 6 months: <b>{s.fundingGapSoon ? "Yes" : "No"}</b>
            </li>
            <li>
              Return volatility proxy: <b>{(s.returnVol * 100).toFixed(0)}%</b>
            </li>
          </ul>
        </Card>

        <Card title="Stress Tests" subtitle="Simple, demo-friendly scenario impacts">
          <div className="space-y-3">
            {s.stressTests.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-zinc-400">ΔPD</div>
                </div>
                <div className="mt-1 text-sm text-zinc-300">{t.note}</div>
                <div className="mt-2 text-xs text-zinc-400">
                  PD increases by <b>{Math.round(t.deltaPd * 100)}%</b> under this shock (demo).
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
