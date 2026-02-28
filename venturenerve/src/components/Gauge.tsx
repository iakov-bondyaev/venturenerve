export default function Gauge({ value, label }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const strokeDasharray = `${v} ${100 - v}`;

  return (
    <div className="flex items-center gap-3">
      <svg width="44" height="44" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="rgb(39 39 42)"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="rgb(244 244 245)"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="25"
        />
      </svg>
      {label ? <div className="text-xs text-zinc-400">{label}</div> : null}
    </div>
  );
}
