import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActivityCard, CardGrid } from "@/components/activity-card";
import { ButtonLink } from "@/components/button";
import { CATEGORY_STYLES } from "@/components/category";
import { PageContainer, SectionTitle } from "@/components/page-container";
import { ACTIVITIES, CATEGORIES } from "@/lib/activities";

// Figma frame "1. Home"
export default function HomePage() {
  const featured = ACTIVITIES.filter((a) => a.featured);

  return (
    <PageContainer>
      <section className="relative overflow-hidden rounded-xl border border-line bg-gradient-to-br from-[#fff6f0] via-surface to-lake-soft px-6 py-12 text-center">
        <div aria-hidden className="absolute -top-20 -left-16 size-64 rounded-full bg-brand/5" />
        <div aria-hidden className="absolute -right-10 -bottom-24 size-72 rounded-full bg-lake/5" />
        <div className="relative flex flex-col items-center gap-3.5">
          <p className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
            {ACTIVITIES.length} things to do on the isthmus
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-[40px]">
            Discover Madison
          </h1>
          <p className="max-w-2xl text-lg text-muted">
            Food, outdoors, campus spots and local attractions, all in one place.
          </p>
          <div className="pt-2.5">
            <ButtonLink href="/explore">
              Explore Activities <ArrowRight size={18} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionTitle>Browse by category</SectionTitle>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const s = CATEGORY_STYLES[category];
          return (
            <Link
              key={category}
              href={`/explore?category=${category}`}
              className="group flex flex-col items-center gap-2.5 rounded-[10px] border-[1.5px] border-line bg-surface py-5 shadow-card transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
            >
              <span className={`grid size-10 place-items-center rounded-full ${s.soft}`}>
                <s.Icon size={20} strokeWidth={2} className={s.text} aria-hidden />
              </span>
              <span className="font-medium text-ink">{category}</span>
            </Link>
          );
        })}
      </div>

      <SectionTitle>Featured this week</SectionTitle>
      <CardGrid>
        {featured.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </CardGrid>
    </PageContainer>
  );
}
