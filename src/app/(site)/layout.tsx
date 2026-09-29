import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { getSiteSettings } from "@/lib/site-data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-full min-w-0 w-full max-w-full flex-col overflow-x-clip">
      <Header logoUrl={settings.logoUrl} />
      <main className="min-w-0 flex-1 w-full max-w-full overflow-x-clip">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer
        logoUrl={settings.logoUrl}
        email={settings.email}
        phone={settings.phone}
        social={{
          facebook: settings.socialFacebook,
          instagram: settings.socialInstagram,
          tiktok: settings.socialTiktok,
          twitter: settings.socialTwitter,
        }}
      />
    </div>
  );
}
