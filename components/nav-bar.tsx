"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBucketList } from "@/lib/bucket-list";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/my-list", label: "My Bucket List" },
];

// Figma "Nav Bar" component: Page=Home | Explore | My Bucket List.
// Activity detail pages highlight Explore, matching frame 3.
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/explore") return pathname.startsWith("/explore") || pathname.startsWith("/activity");
  return pathname.startsWith(href);
}

export function NavBar() {
  const pathname = usePathname();
  const { savedCount } = useBucketList();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:h-[72px] sm:flex-nowrap sm:px-8 sm:py-0 lg:px-16">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-extrabold text-white"
          >
            M
          </span>
          Madison Bucket List
        </Link>

        <nav className="flex items-center gap-5 sm:gap-9">
          {LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col gap-1.5 pt-2 pb-0.5 text-[15px] whitespace-nowrap sm:text-base ${
                  active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {label}
                <span
                  aria-hidden
                  className={`h-[3px] rounded-full ${active ? "bg-brand" : "bg-transparent"}`}
                />
              </Link>
            );
          })}
          <Link
            href="/my-list"
            className="rounded-full bg-ink px-2.5 py-1 text-sm font-medium whitespace-nowrap text-white hover:bg-ink-soft"
          >
            {savedCount} saved
          </Link>
        </nav>
      </div>
    </header>
  );
}
