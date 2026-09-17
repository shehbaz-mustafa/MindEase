import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <div>
          <p className="font-display font-semibold text-primary">MindEase</p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} MindEase. Student well-being resources and self-reflection tools.</p>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/resources" className="hover:text-ink">Resources</Link>
          <Link href="/support" className="hover:text-ink">Support</Link>
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
