import type { Metadata } from "next";
import { Suspense } from "react";
import { PageContainer, PageHeading } from "@/components/page-container";
import { ExploreView } from "./explore-view";

export const metadata: Metadata = { title: "Explore" };

// Figma frames "2. Explore", "5. Explore - Filtered", "6. Explore - No Results"
export default function ExplorePage() {
  return (
    <PageContainer>
      <PageHeading>Explore Activities</PageHeading>
      {/* useSearchParams needs a Suspense boundary for prerendering */}
      <Suspense fallback={<div className="h-[51px] rounded-[10px] border-[1.5px] border-line bg-surface" />}>
        <ExploreView />
      </Suspense>
    </PageContainer>
  );
}
