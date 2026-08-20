export function Badge({
  children,
  tone = "sage",
}: {
  children: React.ReactNode;
  tone?: "sage" | "primary" | "danger";
}) {
  const toneClasses = {
    sage: "bg-sage-light text-sage-dark",
    primary: "bg-primary-light text-primary",
    danger: "bg-danger-bg text-danger-text",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  );
}
