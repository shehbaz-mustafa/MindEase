import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Terms and Conditions | MindEase",
  description: "Terms for using MindEase.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Terms and Conditions</h1>
        <p className="mt-3 text-sm text-muted">Last updated: September 18, 2026</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Using MindEase</h2>
            <p className="mt-2">MindEase provides self-reflection assessments, educational resources, and information about seeking support. By creating an account or using the service, you agree to use it lawfully and to provide accurate account information.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Not medical advice or emergency care</h2>
            <p className="mt-2">MindEase does not diagnose, treat, or prevent any condition. Assessment results are informational and are not a substitute for a clinician, counsellor, or emergency service. If you may harm yourself or someone else, contact local emergency services or a crisis service immediately.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Your account</h2>
            <p className="mt-2">Keep your login credentials confidential and do not use another person&apos;s account. You are responsible for activity performed through your account. We may suspend access when necessary to protect the service, its users, or applicable law.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Your content</h2>
            <p className="mt-2">You retain your rights in the information you submit. You permit MindEase to process that information only to operate and improve the service for you, consistent with the Privacy Policy.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Service availability</h2>
            <p className="mt-2">We work to keep MindEase available and accurate, but do not guarantee uninterrupted access or that every resource will fit every situation. Use your own judgment and seek qualified help when needed.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Changes and questions</h2>
            <p className="mt-2">We may update these terms by publishing a revised version here. Questions about these terms should be directed to the organization that provides your MindEase access.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
