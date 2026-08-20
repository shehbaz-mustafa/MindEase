import Link from "next/link";

export function TopNav({ isAuthed = false }: { isAuthed?: boolean }) {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold text-primary">
          MindEase
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          <Link href={isAuthed ? "/dashboard" : "/"} className="hover:text-ink">
            Dashboard
          </Link>
          <Link href="/resources" className="hover:text-ink">
            Resources
          </Link>
          <Link href="/support" className="hover:text-ink">
            Support
          </Link>
        </nav>

        {isAuthed ? (
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary"
          >
            •
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-primary hover:underline">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
