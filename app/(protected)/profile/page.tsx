import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { logoutAction } from "@/app/auth/actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user?.id)
    .single();

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-3xl font-semibold text-ink">Profile & settings</h1>
      <p className="mt-2 text-slate-600">Manage your account details.</p>

      <div className="mt-8 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-ink">Email</label>
          <p className="rounded-xl bg-cream px-3.5 py-2.5 text-sm text-muted">
            {profile?.email ?? user?.email}
          </p>
        </div>

        <div className="mt-6">
          <ProfileForm fullName={profile?.full_name ?? ""} />
        </div>
      </div>

      <form action={logoutAction} className="mt-6">
        <button
          type="submit"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted hover:border-danger-accent/40 hover:text-danger-text"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
