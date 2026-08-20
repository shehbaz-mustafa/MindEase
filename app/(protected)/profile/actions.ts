"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProfileActionResult {
  error?: string;
  success?: boolean;
}

export async function updateProfileAction(
  _prev: ProfileActionResult,
  formData: FormData
): Promise<ProfileActionResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!fullName) {
    return { error: "Full name can't be empty." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session has expired. Please log in again." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    return { error: "We couldn't update your profile. Please try again." };
  }

  revalidatePath("/profile");
  return { success: true };
}
