"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import type { Activity } from "@/lib/activities";
import { useBucketList } from "@/lib/bucket-list";
import { ActivityCover, CategoryTag } from "./category";

// Figma "Activity Card" component: State=Unsaved | Saved
export function ActivityCard({ activity }: { activity: Activity }) {
  const { statusOf, toggleSaved, hydrated } = useBucketList();
  const status = statusOf(activity.id);
  const title = activity.shortName ?? activity.name;

  return (
    <article className="group relative flex flex-col gap-3 rounded-[10px] border-[1.5px] border-line bg-surface px-3 pt-3 pb-4 shadow-card transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover">
      <ActivityCover category={activity.category} className="h-[140px]" />
      <h3 className="text-[17px] font-semibold text-ink">
        {/* Stretched link: whole card opens the detail page */}
        <Link
          href={`/activity/${activity.id}`}
          className="after:absolute after:inset-0 after:rounded-[10px] focus-visible:underline focus-visible:outline-none"
        >
          {title}
        </Link>
      </h3>
      <div className="flex items-center justify-between gap-2">
        <CategoryTag category={activity.category} />
        {status === "completed" ? (
          <span className="relative z-10 inline-flex items-center gap-1 rounded-md border-[1.5px] border-outdoors/30 bg-outdoors-soft px-3 py-1.5 text-[13px] font-semibold text-outdoors">
            <Check size={13} strokeWidth={3} aria-hidden /> Done
          </span>
        ) : (
          <button
            type="button"
            onClick={() => toggleSaved(activity.id, title)}
            aria-pressed={status === "saved"}
            aria-label={status === "saved" ? `Remove ${title} from list` : `Save ${title}`}
            className={`relative z-10 inline-flex items-center gap-1 rounded-md border-[1.5px] px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              hydrated ? "" : "invisible"
            } ${
              status === "saved"
                ? "border-ink bg-ink text-white hover:bg-ink-soft"
                : "border-line-strong bg-surface text-ink hover:border-brand hover:text-brand"
            }`}
          >
            {status === "saved" ? (
              <>
                <Check size={13} strokeWidth={3} aria-hidden /> Saved
              </>
            ) : (
              <>
                <Plus size={13} strokeWidth={3} aria-hidden /> Save
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
