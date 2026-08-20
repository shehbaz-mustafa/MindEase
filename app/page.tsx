import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";

const FEATURES = [
  {
    icon: "🧘",
    title: "Guided Self-Care",
    description:
      "Access a library of breathing exercises, journaling prompts, and study-break routines tailored for academic stress and anxiety.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Visualize your well-being over time with gentle, intuitive charts.",
  },
  {
    icon: "🤝",
    title: "Professional Support",
    description:
      "Connect easily with campus counsellors or licensed therapists when you need extra guidance.",
    link: { href: "/support", label: "Learn more" },
  },
  {
    icon: "🔒",
    title: "Your Safe Space",
    badge: "Private & Secure",
    description:
      "Your assessments and check-ins are encrypted and completely private. We prioritize your confidentiality above all else.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <TopNav />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-sage-dark">
                🌱 Student Wellness First
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Your Sanctuary for Mental Well-being
              </h1>
              <p className="mt-4 max-w-md text-slate-600">
                A calm, supportive space designed specifically for students. Complete
                well-being check-ins, track your progress, and connect with support when
                you need it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Get Started
                </Link>
                <Link
                  href="/resources"
                  className="rounded-full border border-sage-dark/40 px-6 py-3 text-sm font-medium text-sage-dark hover:bg-sage-light"
                >
                  Explore Resources
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>🙂 Feeling Calm</span>
                <span>Daily Goal</span>
              </div>
              <div className="mt-4 h-48 rounded-2xl bg-gradient-to-br from-primary-light to-sage-light" />
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full w-2/3 rounded-full bg-sage-dark" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Everything you need to thrive
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              A holistic approach to mental wellness, providing the tools and support to
              help you navigate student life with clarity.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-lg">
                    {f.icon}
                  </span>
                  {f.badge && <span className="text-xs font-medium text-muted">{f.badge}</span>}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.description}</p>
                {f.link && (
                  <Link
                    href={f.link.href}
                    className="mt-1 text-sm font-medium text-primary hover:underline"
                  >
                    {f.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
          <div>
            <p className="font-display font-semibold text-primary">MindEase</p>
            <p className="mt-1 text-xs">
              © {new Date().getFullYear()} MindEase. Your sanctuary for mental well-being.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/resources" className="hover:text-ink">
              Resources
            </Link>
            <Link href="/support" className="hover:text-ink">
              Emergency Resources
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
