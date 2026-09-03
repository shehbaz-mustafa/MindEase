"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/auth/actions";

const AUTHED_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessments", label: "Assessments" },
  { href: "/history", label: "History" },
  { href: "/resources", label: "Resources" },
  { href: "/support", label: "Support" },
  { href: "/profile", label: "Settings" },
];

const PUBLIC_NAV = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/support", label: "Support" },
];

export function TopNav({ isAuthed = false }: { isAuthed?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-8">
        <Link href={isAuthed ? "/dashboard" : "/"} className="font-display text-xl font-bold tracking-tight text-primary">
          MindEase
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {(isAuthed ? AUTHED_NAV : PUBLIC_NAV).map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  active ? "font-semibold text-primary" : "hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {isAuthed ? (
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary shadow-xs hover:ring-2 hover:ring-primary/30 transition-all"
              title="Profile Settings"
            >
              👤
            </Link>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/login" className="text-sm font-medium text-primary hover:underline">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-primary-dark transition-all"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-cream text-ink hover:bg-border/40 md:hidden transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-white px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {(isAuthed ? AUTHED_NAV : PUBLIC_NAV).map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sage-light font-semibold text-sage-dark"
                      : "text-slate-700 hover:bg-cream hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {!isAuthed && (
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl border border-border py-2.5 text-center text-sm font-medium text-primary hover:bg-cream"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-white hover:bg-primary-dark"
              >
                Sign up
              </Link>
            </div>
          )}

          {isAuthed && (
            <div className="mt-4 border-t border-border pt-3">
              <form action={logoutAction}>
                <button
                  type="submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-danger-text hover:bg-red-50"
                >
                  Log out
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
