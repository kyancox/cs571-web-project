import type { Metadata } from "next";
import { PageContainer, PageHeading } from "@/components/page-container";
import { MyListView } from "./my-list-view";

export const metadata: Metadata = { title: "My Bucket List" };

// Figma frames "4. My Bucket List", "7. ... - Completed", "8. ... - Empty"
export default function MyListPage() {
  return (
    <PageContainer>
      <PageHeading>My Bucket List</PageHeading>
      <MyListView />
    </PageContainer>
  );
}
