import Link from "next/link";
import Card from "@/components/Card";
import Gauge from "@/components/Gauge";
import StartupRow from "@/components/StartupRow";
import { startups } from "@/lib/mock";
import { computeMatch, pickTopK } from "@/lib/scoring";

export default function MatchesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const minIrr = Number(searchParams.minIrr ?? 25);
  const maxPd = Number(searchParams.maxPd ?? 35);
  const ra = Number(searchParams.ra ?? 0.6);
  const maxTop = Number(searchParams.maxTop ?? 45);
  const avoidGap = String(searchParams.avoidGap ?? "true") === "true";

  const scored = startups.map((s) =>
    computeMatch(s, {
      minIrr,
      maxPd,
      riskAversion: ra,
      maxTopCustomerShare: maxTop,
      avoidFundingGap: avoidGap,
    })
  );

  const eligible = scored.filter((x) => x.eligible);
  const top3 = pickTopK(eligible, 3, ra);

  const portfolioSurvival = top3.length
    ? Math.round(
        (top3.reduce((acc, x) => acc + (1 - x.startup.pd12m), 0) / top3.length) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Matches</h2>
          <p className="text-sm text-zinc-400">
            Ranked by risk-adjusted return with light diversification control.
          </p>
        </div>
        <Link
          href="/investor"
          className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900/60"
        >
          Edit profile
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Portfolio Survival" subtitle="Avg 12M survival across Top 3">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-semibold">{portfolioSurvival}%</div>
            <Gauge value={portfolioSurvival} />
          </div>
          <div className="mt-2 text-xs text-zinc-400">Based on selected Top 3 (simple average).</div>
        </Card>

        <Card title="Constraints" subtitle="Applied filters">
          <div className="text-sm text-zinc-300 space-y-1">
            <div>
              Min IRR: <b>{minIrr}%</b>
            </div>
            <div>
              Max PD: <b>{maxPd}%</b>
            </div>
            <div>
              Top customer cap: <b>{maxTop}%</b>
            </div>
            <div>
              Funding gap filter: <b>{avoidGap ? "ON" : "OFF"}</b>
            </div>
          </div>
        </Card>

        <Card title="Universe" subtitle="Eligible startups">
          <div className="text-3xl font-semibold">{eligible.length}</div>
          <div className="text-xs text-zinc-400">Out of {startups.length} demo startups</div>
        </Card>
      </div>

      <Card title="Top 3 Recommendations" subtitle="Click a startup for full stress view">
        {top3.length === 0 ? (
          <div className="text-sm text-zinc-300">
            No eligible startups under the current constraints. Try raising max PD or lowering min IRR.
          </div>
        ) : (
          <div className="grid gap-3">
            {top3.map((x, idx) => (
              <Link
                key={x.startup.id}
                href={`/startup/${x.startup.id}`}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 hover:bg-zinc-900/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs rounded-full border border-zinc-700 px-2 py-0.5 text-zinc-300">
                        #{idx + 1}
                      </span>
                      <div className="text-sm font-medium">{x.startup.name}</div>
                      <div className="text-xs text-zinc-400">{x.startup.sector}</div>
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">Primary risk: {x.startup.primaryRisk}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-400">Match score</div>
                    <div className="text-lg font-semibold">{x.score.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Metric label="Expected IRR" value={`${x.startup.expIrr}%`} />
                  <Metric label="PD (12M)" value={`${Math.round(x.startup.pd12m * 100)}%`} />
                  <Metric label="RAR" value={`${(x.rar * 100).toFixed(1)}%`} />
                  <Metric label="Top customer" value={`${Math.round(x.startup.topCustomerShare * 100)}%`} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      <Card title="All Eligible (Ranked)" subtitle="Scored list">
        <div className="space-y-2">
          {eligible
            .sort((a, b) => b.score - a.score)
            .map((x) => (
              <StartupRow key={x.startup.id} x={x} />
            ))}
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="text-sm font-medium text-zinc-200">{value}</div>
    </div>
  );
}
