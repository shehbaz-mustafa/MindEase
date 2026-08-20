import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Alert } from "@/components/ui/Alert";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; resetSuccess?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard activeTab="signin">
      <div className="flex flex-col gap-4">
        {params.resetSuccess && (
          <Alert variant="success">Your password has been updated. Log in below.</Alert>
        )}
        {params.error && (
          <Alert variant="error">Something went wrong. Please try logging in again.</Alert>
        )}
        <LoginForm redirectTo={params.redirectTo} />
      </div>
    </AuthCard>
  );
}
