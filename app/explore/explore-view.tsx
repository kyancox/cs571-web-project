"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { ActivityCard, CardGrid } from "@/components/activity-card";
import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ACTIVITIES, CATEGORIES, isCategory, type Category } from "@/lib/activities";

function matches(query: string, haystack: string[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const text = haystack.join(" ").toLowerCase();
  return q.split(/\s+/).every((word) => text.includes(word));
}

export function ExploreView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<Category | null>(
    isCategory(initialCategory) ? initialCategory : null,
  );

  // Keep the URL shareable without adding history entries per keystroke.
  function syncUrl(nextQuery: string, nextCategory: Category | null) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory) params.set("category", nextCategory);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function updateQuery(next: string) {
    setQuery(next);
    syncUrl(next, category);
  }

  function updateCategory(next: Category | null) {
    setCategory(next);
    syncUrl(query, next);
  }

  function clearAll() {
    setQuery("");
    setCategory(null);
    syncUrl("", null);
  }

  const results = useMemo(
    () =>
      ACTIVITIES.filter(
        (a) =>
          (!category || a.category === category) &&
          matches(query, [a.name, a.category, a.location, a.goodFor, a.description]),
      ),
    [query, category],
  );

  const filtered = query.trim() !== "" || category !== null;

  let summary: string;
  if (!filtered) summary = `Showing ${results.length} activities`;
  else if (results.length === 0) summary = "0 results";
  else {
    summary = `${results.length} ${results.length === 1 ? "result" : "results"}`;
    if (query.trim()) summary += ` for "${query.trim()}"`;
    if (category) summary += ` in ${category}`;
  }

  return (
    <>
      {/* Search Bar */}
      <div
        className={`flex items-center gap-3 rounded-[10px] border-[1.5px] bg-surface px-4 py-3.5 transition-colors focus-within:border-lake focus-within:ring-4 focus-within:ring-lake/10 ${
          query ? "border-ink-soft" : "border-line"
        }`}
      >
        <Search size={20} className="shrink-0 text-ink-soft" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Search activities or places..."
          aria-label="Search activities or places"
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => updateQuery("")}
            aria-label="Clear search"
            className="grid size-5 shrink-0 place-items-center rounded-full bg-line text-ink-soft hover:bg-line-strong"
          >
            <X size={12} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
        <Chip label="All" selected={category === null} onClick={() => updateCategory(null)} />
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            label={c}
            selected={category === c}
            onClick={() => updateCategory(category === c ? null : c)}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 text-muted" aria-live="polite">
        <p>{summary}</p>
        {filtered && results.length > 0 && (
          <button type="button" onClick={clearAll} className="font-medium text-lake hover:underline">
            Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <CardGrid>
          {results.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </CardGrid>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No activities match your search"
          subtitle="Try a different keyword or pick another category."
          action={<Button onClick={clearAll}>Clear filters</Button>}
        />
      )}
    </>
  );
}

// Figma "Filter Chip" component: State=Default | Selected
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border-[1.5px] px-[18px] py-2 text-[15px] font-medium transition-colors ${
        selected
          ? "border-ink bg-ink text-white"
          : "border-line bg-surface text-ink hover:border-line-strong hover:bg-sunken"
      }`}
    >
      {label}
    </button>
  );
}
