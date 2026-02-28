import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-900 bg-zinc-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-zinc-100" />
          <div className="font-semibold tracking-tight">VentureNerve</div>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/investor"
            className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/60"
          >
            Investor
          </Link>
          <Link
            href="/matches"
            className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
          >
            Matches
          </Link>
        </nav>
      </div>
    </header>
  );
}
