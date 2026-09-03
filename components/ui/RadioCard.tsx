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
      className={`group flex w-full min-h-[48px] items-center gap-3.5 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 text-left text-sm sm:text-base font-medium transition-all duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        selected
          ? "border-primary bg-primary-light text-primary shadow-xs ring-1 ring-primary/20"
          : "border-border bg-white text-ink hover:border-primary/40 hover:bg-cream/50"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-all ${
          selected ? "border-primary bg-primary" : "border-slate-300 group-hover:border-primary/60"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span className="flex-1 leading-snug">{label}</span>
    </button>
  );
}
