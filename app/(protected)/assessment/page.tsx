"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect old assessment page to new assessments selector page
 * This maintains backwards compatibility while directing users to the new multi-assessment system
 */
export default function AssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/assessments");
  }, [router]);

  return null;
}
