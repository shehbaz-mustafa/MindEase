import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopNav } from "@/components/layout/TopNav";

const FEATURES = [
  {
    title: "Guided self-care",
    description: "Find short breathing exercises, journaling prompts, and study-break routines for demanding days.",
  },
  {
    title: "Progress tracking",
    description: "Review completed check-ins in one place and notice patterns over time.",
  },
  {
    title: "Professional support",
    description: "Learn when to contact campus counselling or another qualified professional.",
    link: { href: "/support", label: "Learn more" },
  },
  {
    title: "Private by design",
    description: "Your account and assessment responses are used to provide your MindEase experience.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <TopNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">Student well-being</p>
              <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Make space to check in with yourself.
              </h1>
              <p className="mt-4 max-w-md text-slate-600">
                MindEase gives students a private place to complete self-reflection assessments,
                review past check-ins, and find support resources.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/register" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
                  Create an account
                </Link>
                <Link href="/resources" className="rounded-lg border border-sage-dark/40 px-5 py-3 text-sm font-medium text-sage-dark transition-colors hover:bg-sage-light">
                  Browse resources
                </Link>
              </div>
            </div>

            <div className="border-l-4 border-sage-dark bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">What you can do here</p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
                <li className="border-b border-border pb-4">Choose a self-reflection assessment that fits what you want to explore.</li>
                <li className="border-b border-border pb-4">Review completed check-ins and their guidance.</li>
                <li>Find practical resources and information about getting professional support.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-ink">Practical support for student life</h2>
            <p className="mt-3 text-slate-600">Use MindEase as a place to reflect, not as a substitute for professional care.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="flex flex-col gap-3 rounded-xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
                {feature.link && (
                  <Link href={feature.link.href} className="mt-1 text-sm font-medium text-primary hover:underline">
                    {feature.link.label}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
