import { Suspense } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { ResourceExplorer } from "@/components/resources/ResourceExplorer";
import { createClient } from "@/lib/supabase/server";

export default async function ResourcesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-cream">
      <TopNav isAuthed={Boolean(user)} />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold text-ink">Resources & Support</h1>
        <p className="mt-2 max-w-xl text-slate-600">
          A curated collection of tools, articles, and exercises designed to support your mental
          well-being.
        </p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <ResourceExplorer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
