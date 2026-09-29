"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Layers,
  MessageSquare,
  HelpCircle,
  ShoppingBag,
  FileText,
  Users,
  Inbox,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/brand/BrandMark";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/blogs", label: "Blog", icon: FileText },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full max-w-full min-w-0 flex-col overflow-x-clip border-b border-white/10 bg-[#0a0a0c] lg:fixed lg:inset-y-0 lg:z-20 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 p-5">
        <BrandMark size="sm" />
        <span className="rounded bg-d1-orange/20 px-2 py-0.5 text-[10px] font-bold uppercase text-d1-orange">
          Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-x-auto px-3 pb-4 lg:overflow-y-auto" aria-label="Admin">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                active
                  ? "bg-d1-orange/15 text-d1-orange"
                  : "text-d1-muted hover:bg-white/5 hover:text-d1-off-white",
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-d1-muted hover:bg-white/5 hover:text-d1-off-white"
        >
          <LogOut size={18} /> Sign out
        </button>
        <Link href="/" className="mt-1 block px-3 py-2 text-xs text-d1-muted hover:text-d1-orange">
          View public site →
        </Link>
      </div>
    </aside>
  );
}
