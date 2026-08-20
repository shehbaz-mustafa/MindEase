"use client";

interface RadioCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioCard({ label, selected, onSelect }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors ${
        selected
          ? "border-primary bg-primary-light text-primary"
          : "border-border bg-white text-ink hover:border-primary/40"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
          selected ? "border-primary" : "border-slate-300"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  );
}
