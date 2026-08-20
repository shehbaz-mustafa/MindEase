export function ProgressSteps({ current, total }: { current: number; total: number }) {
  const percent = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-sage-dark transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-3 flex justify-between">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i <= current ? "bg-sage-dark" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
