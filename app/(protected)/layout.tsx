import { createClient } from "@/lib/supabase/server";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    fullName = profile?.full_name ?? null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <TopNav isAuthed />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar fullName={fullName} />
        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
