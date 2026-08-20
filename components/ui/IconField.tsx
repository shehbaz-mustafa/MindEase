import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface IconFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  error?: string;
  trailing?: ReactNode;
}

export const IconField = forwardRef<HTMLInputElement, IconFieldProps>(
  ({ label, icon, error, trailing, id, className = "", ...rest }, ref) => {
    const fieldId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
          <input
            ref={ref}
            id={fieldId}
            aria-label={label ? undefined : rest.name}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={`w-full rounded-xl border bg-cream px-10 py-2.5 text-sm text-ink outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-primary/20 ${
              error ? "border-red-300" : "border-border focus:border-primary"
            } ${className}`}
            {...rest}
          />
          {trailing && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{trailing}</span>
          )}
        </div>
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

IconField.displayName = "IconField";

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
    </svg>
  );
}
