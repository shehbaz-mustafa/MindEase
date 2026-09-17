import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Privacy Policy | MindEase",
  description: "How MindEase handles account and assessment information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <TopNav />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: September 18, 2026</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">What MindEase collects</h2>
            <p className="mt-2">When you create an account, MindEase stores your email address and the name you provide. When you use an assessment, MindEase stores your responses, calculated scores, assessment type, and completion date. We also use authentication cookies needed to keep you signed in.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">How information is used</h2>
            <p className="mt-2">We use this information to operate your account, show your assessment history, and provide resources and guidance in the service. MindEase does not use assessment responses to make automated decisions about you, and it does not sell assessment responses for advertising.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Service providers and access</h2>
            <p className="mt-2">MindEase uses Supabase to provide authentication and database hosting. Access controls are configured so signed-in users can read and add their own assessment records. We may disclose information when required by law or to protect people from immediate harm.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Retention and choices</h2>
            <p className="mt-2">Account and assessment records are retained while an account is active. If an account is deleted, related profile and assessment records are configured to be deleted with it. To request access, correction, or deletion, contact the organization that provides your MindEase access.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Important context</h2>
            <p className="mt-2">MindEase is a self-reflection tool, not a medical service, healthcare provider, or emergency service. It may collect information that is sensitive to you. Please review this policy before submitting an assessment and do not use MindEase for an emergency.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Changes</h2>
            <p className="mt-2">If this policy changes materially, the updated version will be published here with a new revision date.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
