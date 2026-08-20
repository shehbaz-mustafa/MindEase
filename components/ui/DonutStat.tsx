export function DonutStat({
  label,
  sublabel,
  percent,
  color = "primary",
  displayValue,
}: {
  label: string;
  sublabel: string;
  /** 0-100. Drives the ring fill. */
  percent: number;
  color?: "primary" | "sage" | "muted";
  /** Override the center text, e.g. "6.5h" instead of a percentage. */
  displayValue?: string;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  const strokeColor =
    color === "primary" ? "#2d5a73" : color === "sage" ? "#7fa582" : "#6b7280";

  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-white p-6 text-center shadow-sm">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e7e4dc" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          transform="rotate(90 50 50)"
          className="fill-ink text-[20px] font-semibold"
        >
          {displayValue ?? `${Math.round(clamped)}%`}
        </text>
      </svg>
      <div>
        <p className="font-display text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-muted">{sublabel}</p>
      </div>
    </div>
  );
}
