import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Alert } from "@/components/ui/Alert";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AuthCard activeTab="signin">
      {user ? (
        <ResetPasswordForm />
      ) : (
        <div className="flex flex-col gap-4">
          <Alert variant="error">
            This reset link is invalid or has expired. Request a new one to continue.
          </Alert>
          <Link
            href="/forgot-password"
            className="text-center text-sm font-medium text-primary hover:underline"
          >
            Request a new link
          </Link>
        </div>
      )}
    </AuthCard>
  );
}
