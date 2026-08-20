import { TopNav } from "@/components/layout/TopNav";
import { createClient } from "@/lib/supabase/server";

export default async function SupportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-cream">
      <TopNav isAuthed={Boolean(user)} />
      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Professional Support</h1>
          <p className="mt-2 text-slate-600">
            MindEase is a well-being companion, not a replacement for a licensed psychologist,
            counsellor, or doctor. If you&apos;re going through something heavy, reaching out to a
            professional is a sign of strength.
          </p>

          <section className="mt-8 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              When might it help to talk to someone?
            </h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <li>• Stress, sadness, or worry are affecting your sleep, appetite, or classes</li>
              <li>• You&apos;ve felt persistently low, anxious, or overwhelmed for weeks</li>
              <li>• You&apos;re relying on unhealthy habits to cope</li>
              <li>• You just want a space to talk things through with someone trained to listen</li>
            </ul>
          </section>

          <section className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              What can counselling offer?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              A counsellor provides a confidential, judgment-free space to work through stress,
              relationships, identity, grief, or anything else on your mind. Many campuses offer
              free or low-cost sessions to enrolled students — you don&apos;t need a crisis to
              make an appointment.
            </p>
          </section>

          <section className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              Contacting your campus counselling service
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Most universities have a counselling or student wellness center — usually reachable
              through your student health portal, campus directory, or student services office.
              Look for &quot;Counselling Services,&quot; &quot;Student Wellness,&quot; or
              &quot;CAPS&quot; (Counseling and Psychological Services) on your school&apos;s
              website, or ask at your student union.
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl border border-danger-accent/30 bg-danger-bg p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-danger-text">
              ⚠️ Need immediate help?
            </h2>
            <p className="mt-2 text-sm text-danger-text">
              If you are in immediate danger or experiencing a crisis, please reach out now.
            </p>

            <div className="mt-4 rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-danger-text/80">
                Suicide & Crisis Lifeline (US)
              </p>
              <p className="font-display text-2xl font-semibold text-danger-text">988</p>
              <p className="text-xs text-danger-text/80">Call or text, available 24/7, free & confidential.</p>
            </div>

            <div className="mt-3 rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-danger-text/80">
                Campus security
              </p>
              <p className="mt-1 text-sm text-danger-text">
                Look up your campus security or emergency line and save it here for quick access.
              </p>
            </div>

            <p className="mt-3 text-xs text-danger-text/80">
              Outside the US, search &quot;crisis helpline&quot; plus your country for a local
              number.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
