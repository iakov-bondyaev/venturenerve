export default function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium">{title}</div>
        {subtitle ? <div className="text-xs text-zinc-400">{subtitle}</div> : null}
      </div>
      {children}
    </section>
  );
}
