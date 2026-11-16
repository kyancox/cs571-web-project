import {
  GraduationCap,
  Landmark,
  Ticket,
  Trees,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { Category } from "@/lib/activities";
import { getActivityImage } from "@/lib/activity-images";

type CategoryStyle = {
  Icon: LucideIcon;
  /** Text/icon accent */
  text: string;
  /** Soft background tint */
  soft: string;
  /** Gradient used for activity covers */
  cover: string;
};

// Full class strings so Tailwind can see them at build time.
export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  Food: {
    Icon: UtensilsCrossed,
    text: "text-food",
    soft: "bg-food-soft",
    cover: "from-[#ffe3cf] via-[#ffd2b3] to-[#ffb98c]",
  },
  Outdoors: {
    Icon: Trees,
    text: "text-outdoors",
    soft: "bg-outdoors-soft",
    cover: "from-[#d6f2dc] via-[#bfe8c8] to-[#9fd9ad]",
  },
  Campus: {
    Icon: GraduationCap,
    text: "text-campus",
    soft: "bg-campus-soft",
    cover: "from-[#fde2e2] via-[#fbcaca] to-[#f6a8a8]",
  },
  Entertainment: {
    Icon: Ticket,
    text: "text-entertainment",
    soft: "bg-entertainment-soft",
    cover: "from-[#e9e3fd] via-[#d9cffb] to-[#c2b2f7]",
  },
  Attractions: {
    Icon: Landmark,
    text: "text-attractions",
    soft: "bg-attractions-soft",
    cover: "from-[#dcebfa] via-[#c6ddf6] to-[#a6c9ef]",
  },
};

export function CategoryTag({
  category,
  size = "sm",
}: {
  category: Category;
  size?: "sm" | "md";
}) {
  const s = CATEGORY_STYLES[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium ${s.soft} ${s.text} ${
        size === "md" ? "px-3 py-[5px] text-sm" : "px-2.5 py-1 text-[13px]"
      }`}
    >
      <s.Icon size={size === "md" ? 15 : 13} strokeWidth={2.25} aria-hidden />
      {category}
    </span>
  );
}

/**
 * Activity photo, or a category-tinted placeholder when we don't have one yet.
 * Photos come from lib/activity-images.json (see scripts/fetch-activity-images.mjs).
 */
export function ActivityCover({
  activityId,
  alt,
  category,
  className = "",
  iconSize = 40,
  sizes = "100vw",
  preload = false,
}: {
  activityId: string;
  alt: string;
  category: Category;
  className?: string;
  iconSize?: number;
  sizes?: string;
  preload?: boolean;
}) {
  const s = CATEGORY_STYLES[category];
  const photo = getActivityImage(activityId);
  if (photo) {
    return (
      <div className={`relative overflow-hidden rounded-md ${s.soft} ${className}`}>
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${s.cover} ${className}`}
    >
      <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/25" aria-hidden />
      <div className="absolute -bottom-10 -left-4 size-28 rounded-full bg-white/20" aria-hidden />
      <s.Icon
        size={iconSize}
        strokeWidth={1.75}
        className={`relative ${s.text} opacity-80`}
        aria-hidden
      />
    </div>
  );
}
