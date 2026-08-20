"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  error?: string;
  success?: boolean;
}

export async function registerAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!fullName) return { error: "Please enter your full name." };
  if (!email) return { error: "Please enter your email." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "An account with this email already exists. Try logging in instead." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function loginAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect(redirectTo || "/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPasswordAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Please enter your email." };

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  // Always report success to avoid leaking which emails are registered.
  if (error) {
    console.error("resetPasswordForEmail error:", error.message);
  }

  return { success: true };
}

export async function resetPasswordAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  redirect("/login?resetSuccess=1");
}
