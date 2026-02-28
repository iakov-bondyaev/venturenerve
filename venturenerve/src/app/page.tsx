import Link from "next/link";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
              Risk-adjusted startup matching
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Match capital to startups by <span className="text-zinc-200">risk-adjusted return</span>.
            </h1>
            <p className="text-zinc-300">
              VentureNerve quantifies <b>Probability of Distress</b>, structural fragility, and upside distribution—
              then recommends a diversified top-3 allocation that fits your mandate.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/investor"
                className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
              >
                Start matching
              </Link>
              <Link
                href="/matches"
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900/60"
              >
                View demo results
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <Card title="Top 3 Matches (Demo)" subtitle="Risk-adjusted + diversification-aware">
              <div className="grid gap-3">
                {[
                  { name: "HelioPay", tag: "Fintech", rar: "21.4%" },
                  { name: "GridPulse", tag: "Climate", rar: "19.8%" },
                  { name: "ClinicFlow", tag: "Health", rar: "18.6%" },
                ].map((x) => (
                  <div
                    key={x.name}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium">{x.name}</div>
                      <div className="text-xs text-zinc-400">{x.tag}</div>
                    </div>
                    <div className="text-sm text-zinc-200">{x.rar}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card title="Portfolio Survival" subtitle="12-month survival probability">
                <div className="text-2xl font-semibold">71%</div>
                <div className="text-xs text-zinc-400">Across selected top-3</div>
              </Card>
              <Card title="Primary Risk" subtitle="Most common fragility driver">
                <div className="text-2xl font-semibold">Concentration</div>
                <div className="text-xs text-zinc-400">Top-customer exposure</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Risk Engine" subtitle="Forward-looking distress risk">
          <p className="text-sm text-zinc-300">
            We estimate <b>PD (12M)</b>, shock elasticity, and fragility drivers from revenue, burn, cash, and dependencies.
          </p>
        </Card>
        <Card title="Return Engine" subtitle="Distribution, not point forecasts">
          <p className="text-sm text-zinc-300">
            Compute expected return ranges and risk-adjusted return (RAR) without pretending to predict a single exit outcome.
          </p>
        </Card>
        <Card title="Portfolio Builder" subtitle="Pick top-3 intelligently">
          <p className="text-sm text-zinc-300">
            Selects the best <b>risk-adjusted</b> matches while avoiding correlated exposures (sector + fragility overlap).
          </p>
        </Card>
      </section>
    </div>
  );
}
