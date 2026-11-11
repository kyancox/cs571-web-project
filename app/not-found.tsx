import { MapPinOff } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";

export default function NotFound() {
  return (
    <PageContainer>
      <EmptyState
        icon={MapPinOff}
        title="We couldn't find that spot"
        subtitle="It may have moved, or the link might be off."
        action={<ButtonLink href="/explore">Explore Activities</ButtonLink>}
      />
    </PageContainer>
  );
}
