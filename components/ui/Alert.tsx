type AlertVariant = "error" | "success" | "info";

const variantClasses: Record<AlertVariant, string> = {
  error: "bg-red-50 text-red-700 border-red-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
};

export function Alert({
  variant = "info",
  children,
}: {
  variant?: AlertVariant;
  children: React.ReactNode;
}) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
