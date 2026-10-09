import type { Metadata } from "next";
import { IntroLandingPage } from "@/components/intro/IntroLandingPage";

export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

export default function IntroPage() {
  return <IntroLandingPage />;
}
