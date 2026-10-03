import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Caveat, DM_Sans, Montserrat, Oswald } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-data";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hero",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-marketing",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.metaTitle || "D1 Nation",
      template: "%s | D1 Nation",
    },
    description: settings.metaDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${oswald.variable} ${montserrat.variable} ${caveat.variable} h-full`}>
      <body className="site-body min-h-full flex min-w-0 flex-col bg-d1-charcoal text-d1-off-white antialiased">
        {children}
      </body>
    </html>
  );
}
