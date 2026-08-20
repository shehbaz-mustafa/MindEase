"use client";

import { useActionState, useState } from "react";
import { resetPasswordAction, type ActionResult } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { IconField, LockIcon } from "@/components/ui/IconField";
import { Alert } from "@/components/ui/Alert";

const initialState: ActionResult = {};

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <p className="text-sm text-muted">Choose a new password for your account.</p>

      <IconField
        label="New password"
        icon={<LockIcon />}
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
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
      <IconField
        label="Confirm new password"
        icon={<LockIcon />}
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
      />

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Reset password
      </Button>
    </form>
  );
}
