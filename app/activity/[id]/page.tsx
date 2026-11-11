import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { ActivityCover, CategoryTag } from "@/components/category";
import { PageContainer, SectionTitle } from "@/components/page-container";
import { ACTIVITIES, getActivity } from "@/lib/activities";
import { ActivityActions } from "./activity-actions";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/activity/[id]">): Promise<Metadata> {
  const { id } = await params;
  const activity = getActivity(id);
  return activity ? { title: activity.name, description: activity.description } : {};
}

// Figma frame "3. Activity Detail"
export default async function ActivityPage({ params }: PageProps<"/activity/[id]">) {
  const { id } = await params;
  const activity = getActivity(id);
  if (!activity) notFound();

  const details = [
    ["Location", activity.location],
    ["Cost", activity.cost],
    ["Best time", activity.bestTime],
    ["Good for", activity.goodFor],
  ] as const;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${activity.name}, Madison, WI`,
  )}`;

  return (
    <PageContainer>
      <Link
        href="/explore"
        className="inline-flex w-fit items-center gap-1.5 font-medium text-lake hover:underline"
      >
        <ArrowLeft size={16} aria-hidden /> Back to Explore
      </Link>

      <div className="flex flex-col gap-10 md:flex-row">
        <ActivityCover
          category={activity.category}
          iconSize={72}
          className="h-[240px] w-full shrink-0 rounded-xl border border-line sm:h-[340px] md:w-[48%] md:max-w-[560px]"
        />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{activity.name}</h1>
          <CategoryTag category={activity.category} size="md" />
          <dl className="flex flex-col gap-3.5">
            {details.map(([label, value]) => (
              <div key={label} className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{label}:</dt>
                <dd className="text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="pt-2.5">
            <ActivityActions id={activity.id} name={activity.name} />
          </div>
        </div>
      </div>

      <SectionTitle>About</SectionTitle>
      <p className="max-w-3xl text-[17px] leading-relaxed text-ink-soft">{activity.description}</p>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-[150px] items-center justify-center gap-3 overflow-hidden rounded-[10px] border border-line bg-lake-soft text-lake transition hover:border-lake/40"
      >
        {/* Decorative map grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgb(29_95_168/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(29_95_168/0.08)_1px,transparent_1px)] [background-size:32px_32px]"
        />
        <span className="relative grid size-10 place-items-center rounded-full bg-surface shadow-card">
          <MapPin size={20} aria-hidden />
        </span>
        <span className="relative font-medium">
          View {activity.location} on Google Maps
        </span>
        <ExternalLink size={16} className="relative opacity-60 group-hover:opacity-100" aria-hidden />
      </a>
    </PageContainer>
  );
}
