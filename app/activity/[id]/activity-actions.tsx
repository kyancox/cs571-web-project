"use client";

import { Check, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/button";
import { useBucketList } from "@/lib/bucket-list";

export function ActivityActions({ id, name }: { id: string; name: string }) {
  const { statusOf, toggleSaved, complete, uncomplete, hydrated } = useBucketList();
  const status = statusOf(id);

  if (status === "completed") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-outdoors/30 bg-outdoors-soft px-6 py-3 font-medium text-outdoors">
          <Check size={18} strokeWidth={2.5} aria-hidden /> Completed
        </span>
        <Button variant="secondary" onClick={() => uncomplete(id)}>
          <RotateCcw size={16} aria-hidden /> Undo
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant={status === "saved" ? "secondary" : "primary"}
        onClick={() => toggleSaved(id, name)}
        aria-pressed={status === "saved"}
        disabled={!hydrated}
      >
        {status === "saved" ? (
          <>
            <Check size={18} strokeWidth={2.5} aria-hidden /> Saved to List
          </>
        ) : (
          <>
            <Plus size={18} strokeWidth={2.5} aria-hidden /> Save to List
          </>
        )}
      </Button>
      <Button variant="secondary" onClick={() => complete(id)} disabled={!hydrated}>
        Mark Completed
      </Button>
    </div>
  );
}
