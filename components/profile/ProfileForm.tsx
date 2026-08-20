"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileActionResult } from "@/app/(protected)/profile/actions";
import { Button } from "@/components/ui/Button";
import { IconField, UserIcon } from "@/components/ui/IconField";
import { Alert } from "@/components/ui/Alert";

const initialState: ProfileActionResult = {};

export function ProfileForm({ fullName }: { fullName: string }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">Your profile has been updated.</Alert>}

      <IconField
        label="Full name"
        icon={<UserIcon />}
        name="fullName"
        defaultValue={fullName}
        required
      />

      <Button type="submit" isLoading={isPending} className="w-fit">
        Save changes
      </Button>
    </form>
  );
}
