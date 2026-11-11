import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/nav-bar";
import { BucketListProvider } from "@/lib/bucket-list";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Madison Bucket List",
    template: "%s · Madison Bucket List",
  },
  description:
    "Food, outdoors, campus spots and local attractions in Madison, all in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <BucketListProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line py-8 text-center text-sm text-muted">
            Made for exploring Madison, WI
          </footer>
        </BucketListProvider>
      </body>
    </html>
  );
}
