"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction, type ActionResult } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { IconField, MailIcon, LockIcon } from "@/components/ui/IconField";
import { Alert } from "@/components/ui/Alert";

const initialState: ActionResult = {};

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <input type="hidden" name="redirectTo" value={redirectTo ?? "/dashboard"} />

      <IconField
        label="University email"
        icon={<MailIcon />}
        name="email"
        type="email"
        placeholder="student@university.edu"
        autoComplete="email"
        required
      />

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Password</span>
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot?
          </Link>
        </div>
        <IconField
          label=""
          icon={<LockIcon />}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className="mt-0"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-xs font-medium text-muted hover:text-ink"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
      </div>

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Sign In →
      </Button>
    </form>
  );
}
