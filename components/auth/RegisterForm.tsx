"use client";

import { useActionState, useState } from "react";
import { registerAction, type ActionResult } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { IconField, MailIcon, LockIcon, UserIcon } from "@/components/ui/IconField";
import { Alert } from "@/components/ui/Alert";
import { isValidEmail, checkPasswordStrength } from "@/lib/validation";

const initialState: ActionResult = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);

  const emailError =
    touched.email && !isValidEmail(fields.email) ? "Enter a valid email address." : undefined;

  const passwordCheck = checkPasswordStrength(fields.password);
  const passwordError = touched.password && !passwordCheck.valid ? passwordCheck.message : undefined;

  const confirmError =
    touched.confirmPassword && fields.confirmPassword !== fields.password
      ? "Passwords do not match."
      : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <IconField
        label="Full name"
        icon={<UserIcon />}
        name="fullName"
        autoComplete="name"
        required
        value={fields.fullName}
        onChange={(e) => setFields((f) => ({ ...f, fullName: e.target.value }))}
      />
      <IconField
        label="Email"
        icon={<MailIcon />}
        name="email"
        type="email"
        placeholder="student@university.edu"
        autoComplete="email"
        required
        value={fields.email}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
        error={emailError}
      />
      <IconField
        label="Password"
        icon={<LockIcon />}
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
        value={fields.password}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        onChange={(e) => setFields((f) => ({ ...f, password: e.target.value }))}
        error={passwordError}
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
        label="Confirm password"
        icon={<LockIcon />}
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
        value={fields.confirmPassword}
        onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
        onChange={(e) => setFields((f) => ({ ...f, confirmPassword: e.target.value }))}
        error={confirmError}
      />

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Create Account →
      </Button>
    </form>
  );
}
