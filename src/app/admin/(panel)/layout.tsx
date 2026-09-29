import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-0 w-full max-w-full overflow-x-clip bg-d1-charcoal lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1 overflow-x-clip lg:pl-64">
        <div className="border-b border-white/10 bg-d1-charcoal/80 px-4 py-4 backdrop-blur sm:px-5 lg:sticky lg:top-0 lg:z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-d1-muted">D1 Nation Control Center</p>
        </div>
        <div className="min-w-0 p-4 sm:p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
