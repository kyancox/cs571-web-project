"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, CircleCheckBig, CirclePlus, ListFilter } from "lucide-react";
import { Button, ButtonLink } from "@/components/button";
import { CATEGORY_STYLES } from "@/components/category";
import { EmptyState } from "@/components/empty-state";
import { ACTIVITIES, CATEGORIES, isCategory, type Activity, type Category } from "@/lib/activities";
import { useBucketList, type Entry } from "@/lib/bucket-list";

type Tab = "saved" | "completed";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export function MyListView() {
  const { entries, hydrated, savedCount, completedCount, complete, uncomplete, remove } =
    useBucketList();
  const [tab, setTab] = useState<Tab>("saved");
  const [category, setCategory] = useState<Category | null>(null);

  const total = savedCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const rows = ACTIVITIES.flatMap((activity) => {
    const entry = entries[activity.id];
    return entry ? [{ activity, entry }] : [];
  })
    .filter(({ entry }) => entry.status === tab)
    .filter(({ activity }) => !category || activity.category === category)
    .sort((a, b) =>
      tab === "completed"
        ? (b.entry.completedAt ?? 0) - (a.entry.completedAt ?? 0)
        : b.entry.savedAt - a.entry.savedAt,
    );

  return (
    <>
      {/* Progress */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between text-lg font-medium text-ink">
          <p>
            {completedCount} of {total} completed
          </p>
          <p>{percent}%</p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Bucket list progress"
          className="h-4 overflow-hidden rounded-lg border border-line bg-sunken"
        >
          <div
            className="h-full rounded-lg bg-gradient-to-r from-brand to-[#e8590c] transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-8" role="tablist" aria-label="List view">
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved ({savedCount})
          </TabButton>
          <TabButton active={tab === "completed"} onClick={() => setTab("completed")}>
            Completed ({completedCount})
          </TabButton>
        </div>
        <label className="relative flex items-center gap-2 rounded-lg border-[1.5px] border-line-strong bg-surface px-4 py-2.5 text-[15px] font-medium text-ink focus-within:border-lake hover:border-muted">
          <ListFilter size={16} className="text-ink-soft" aria-hidden />
          <span>Category:</span>
          <select
            value={category ?? "All"}
            onChange={(e) => setCategory(isCategory(e.target.value) ? e.target.value : null)}
            className="cursor-pointer appearance-none bg-transparent pr-5 font-medium outline-none"
          >
            <option value="All">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 text-ink" aria-hidden />
        </label>
      </div>

      {/* List */}
      <div role="tabpanel">
        {!hydrated ? (
          <div className="flex flex-col gap-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[73px] animate-pulse rounded-[10px] bg-sunken" />
            ))}
          </div>
        ) : rows.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {rows.map(({ activity, entry }) => (
              <Row
                key={activity.id}
                activity={activity}
                entry={entry}
                onComplete={() => complete(activity.id)}
                onUndo={() => uncomplete(activity.id)}
                onRemove={() => remove(activity.id)}
              />
            ))}
          </ul>
        ) : (
          <ListEmpty tab={tab} total={total} category={category} onReset={() => setCategory(null)} />
        )}
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-col gap-2 text-[17px] ${active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"}`}
    >
      {children}
      <span aria-hidden className={`h-[3px] w-full rounded-full ${active ? "bg-brand" : "bg-transparent"}`} />
    </button>
  );
}

// Figma "Bucket List Row" component: State=To do | Completed
function Row({
  activity,
  entry,
  onComplete,
  onUndo,
  onRemove,
}: {
  activity: Activity;
  entry: Entry;
  onComplete: () => void;
  onUndo: () => void;
  onRemove: () => void;
}) {
  const done = entry.status === "completed";
  const s = CATEGORY_STYLES[activity.category];

  return (
    <li className="flex flex-wrap items-center gap-4 rounded-[10px] border-[1.5px] border-line bg-surface px-5 py-3.5 shadow-card sm:flex-nowrap">
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? `Mark ${activity.name} as not done` : `Mark ${activity.name} as done`}
        onClick={done ? onUndo : onComplete}
        className={`grid size-6 shrink-0 place-items-center rounded-[5px] border-2 transition-colors ${
          done ? "border-outdoors bg-outdoors text-white" : "border-line-strong bg-surface hover:border-outdoors"
        }`}
      >
        {done && <Check size={15} strokeWidth={3} />}
      </button>

      <span className={`hidden size-10 shrink-0 place-items-center rounded-lg sm:grid ${s.soft}`}>
        <s.Icon size={18} className={s.text} aria-hidden />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          href={`/activity/${activity.id}`}
          className={`truncate text-[17px] font-semibold hover:underline ${
            done ? "text-muted line-through decoration-muted/70" : "text-ink"
          }`}
        >
          {activity.name}
        </Link>
        <p className="text-sm text-muted">
          {activity.category}
          {done && entry.completedAt && ` · Completed ${dateFmt.format(entry.completedAt)}`}
        </p>
      </div>

      <div className="flex basis-full gap-2.5 pl-10 sm:basis-auto sm:pl-0">
        {done ? (
          <Button size="sm" variant="secondary" onClick={onUndo}>
            Undo
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={onComplete}>
              Mark done
            </Button>
            <Button size="sm" variant="secondary" onClick={onRemove}>
              Remove
            </Button>
          </>
        )}
      </div>
    </li>
  );
}

function ListEmpty({
  tab,
  total,
  category,
  onReset,
}: {
  tab: Tab;
  total: number;
  category: Category | null;
  onReset: () => void;
}) {
  if (total === 0) {
    return (
      <EmptyState
        icon={CirclePlus}
        title="Your bucket list is empty"
        subtitle="Save activities from Explore to start tracking your progress."
        action={<ButtonLink href="/explore">Browse Activities</ButtonLink>}
      />
    );
  }
  if (category) {
    return (
      <EmptyState
        icon={ListFilter}
        title={`No ${category} activities here`}
        subtitle={`Nothing in your ${tab} list matches this category.`}
        action={<Button onClick={onReset}>Show all categories</Button>}
      />
    );
  }
  if (tab === "saved") {
    return (
      <EmptyState
        icon={CircleCheckBig}
        title="You've done it all!"
        subtitle="Everything on your list is completed. Find something new to try."
        action={<ButtonLink href="/explore">Browse Activities</ButtonLink>}
      />
    );
  }
  return (
    <EmptyState
      icon={CircleCheckBig}
      title="Nothing completed yet"
      subtitle="Mark an activity as done and it will show up here."
    />
  );
}
