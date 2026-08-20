"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction, type ActionResult } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { IconField, MailIcon } from "@/components/ui/IconField";
import { Alert } from "@/components/ui/Alert";

const initialState: ActionResult = {};

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="success">
          If an account exists for that email, a password reset link is on its way. Check
          your inbox (and spam folder).
        </Alert>
        <Link href="/login" className="text-center text-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <p className="text-sm text-muted">
        Enter the email on your account and we&apos;ll send you a link to reset your password.
      </p>

      <IconField
        label="University email"
        icon={<MailIcon />}
        name="email"
        type="email"
        placeholder="student@university.edu"
        autoComplete="email"
        required
      />

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Send reset link
      </Button>

      <Link href="/login" className="text-center text-sm font-medium text-primary hover:underline">
        Back to login
      </Link>
    </form>
  );
}
