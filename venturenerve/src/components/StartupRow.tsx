import Link from "next/link";
import { Match } from "@/lib/types";

export default function StartupRow({ x }: { x: Match }) {
  const pd = Math.round(x.startup.pd12m * 100);
  const rar = (x.rar * 100).toFixed(1);

  return (
    <Link
      href={`/startup/${x.startup.id}`}
      className="block rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 hover:bg-zinc-900/40"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{x.startup.name}</div>
            <div className="text-xs text-zinc-400">{x.startup.sector}</div>
          </div>
          <div className="text-xs text-zinc-500">Risk: {x.startup.primaryRisk}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-right">
          <Mini label="IRR" value={`${x.startup.expIrr}%`} />
          <Mini label="PD" value={`${pd}%`} />
          <Mini label="RAR" value={`${rar}%`} />
        </div>
      </div>
    </Link>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="text-sm font-medium text-zinc-200 tabular-nums">{value}</div>
    </div>
  );
}
