import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase email links (password reset, email confirmation) redirect here
// with a `code` param. We exchange it for a session, then continue on to
// wherever the link intended (e.g. /reset-password).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/reset-password";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
