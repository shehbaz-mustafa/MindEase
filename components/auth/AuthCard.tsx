import Link from "next/link";

export function AuthCard({
  activeTab,
  children,
}: {
  activeTab: "signin" | "signup";
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-primary">MindEase</p>
          <p className="mt-1 text-sm text-muted">Your sanctuary for mental well-being.</p>
        </div>

        <div className="mt-6 flex rounded-full bg-cream-deep p-1 text-sm font-medium">
          <Link
            href="/login"
            className={`flex-1 rounded-full py-2 text-center transition-colors ${
              activeTab === "signin" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className={`flex-1 rounded-full py-2 text-center transition-colors ${
              activeTab === "signup" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
          >
            Create Account
          </Link>
        </div>

        <div className="mt-6">{children}</div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-cream px-3 py-2.5 text-xs text-muted">
          <span>🛡️</span>
          Your privacy is our priority. Secure &amp; confidential.
        </div>
      </div>
    </div>
  );
}
