export function ProgressSteps({ current, total }: { current: number; total: number }) {
  const percent = total > 0 ? Math.min(100, Math.max(0, ((current + 1) / total) * 100)) : 100;

  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full bg-sage-dark transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {total <= 12 ? (
        <div className="flex w-full items-center justify-between gap-1 overflow-x-auto py-1 no-scrollbar">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 min-w-[8px] flex-1 rounded-full transition-colors duration-200 ${
                i <= current ? "bg-sage-dark" : "bg-border/60"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Step {current + 1} of {total}</span>
          <span>{Math.round(percent)}% complete</span>
        </div>
      )}
    </div>
  );
}
