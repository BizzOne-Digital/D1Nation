import { MarketingLayoutSwitch } from "@/components/layout/MarketingLayoutSwitch";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full min-w-0 w-full max-w-full flex-col overflow-x-clip">
      <MarketingLayoutSwitch>{children}</MarketingLayoutSwitch>
    </div>
  );
}
