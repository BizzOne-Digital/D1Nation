import Link from "next/link";

const cards = [
  { href: "/admin/settings", title: "Site Settings", desc: "Logo, hero video, contact, social links" },
  { href: "/admin/services", title: "Services", desc: "Programs, benefits, optional public pricing" },
  { href: "/admin/inquiries", title: "Inquiries", desc: "Contact form submissions" },
  { href: "/admin/products", title: "Products", desc: "Shop catalog and availability" },
  { href: "/admin/blogs", title: "Blog", desc: "Articles and SEO fields" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-d1-off-white">Dashboard</h1>
      <p className="mt-2 text-sm text-d1-muted">
        Manage content, media, and inquiries for the public D1 Nation site.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-d1-orange/40 hover:bg-d1-orange/5"
          >
            <h2 className="font-display text-2xl text-d1-off-white">{c.title}</h2>
            <p className="mt-2 text-sm text-d1-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
