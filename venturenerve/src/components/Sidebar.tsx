import Link from "next/link";

const items = [
  { href: "/", label: "Overview" },
  { href: "/investor", label: "Investor Profile" },
  { href: "/matches", label: "Matching Engine" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-3">
        <div className="px-3 py-2 text-xs uppercase tracking-wide text-zinc-500">
          Navigation
        </div>
        <div className="space-y-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/50"
            >
              {it.label}
            </Link>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 text-xs text-zinc-400">
          Demo mode (mock data). Deployable on Vercel with no backend.
        </div>
      </div>
    </aside>
  );
}
