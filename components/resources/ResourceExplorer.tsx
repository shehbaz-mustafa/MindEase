"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RESOURCES, RESOURCE_TAGS, type ResourceTag } from "@/lib/resources";

export function ResourceExplorer() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag") as ResourceTag | null;
  const [activeTag, setActiveTag] = useState<ResourceTag | "all">(initialTag ?? "all");

  const filtered =
    activeTag === "all" ? RESOURCES : RESOURCES.filter((r) => r.tags.includes(activeTag));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTag === "all" ? "bg-primary text-white" : "bg-cream text-muted hover:bg-cream-deep"
          }`}
        >
          All
        </button>
        {RESOURCE_TAGS.map((tag) => (
          <button
            key={tag.value}
            type="button"
            onClick={() => setActiveTag(tag.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTag === tag.value
                ? "bg-primary text-white"
                : "bg-cream text-muted hover:bg-cream-deep"
            }`}
          >
            #{tag.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((resource) => (
          <div
            key={resource.slug}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <span className="w-fit rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              {resource.type}
            </span>
            <h3 className="font-display text-base font-semibold text-ink">{resource.title}</h3>
            <p className="text-sm text-slate-600">{resource.description}</p>
            <span className="mt-auto text-xs text-muted">{resource.duration}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted">No resources for this tag yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
