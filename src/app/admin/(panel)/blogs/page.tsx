"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Post = {
  _id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
};

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [form, setForm] = useState<Post>({ title: "", excerpt: "", content: "", category: "News" });

  async function load() {
    setItems(await (await fetch("/api/admin/blogs")).json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const method = form._id ? "PATCH" : "POST";
    const body = form._id ? { id: form._id, ...form } : form;
    await fetch("/api/admin/blogs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ title: "", excerpt: "", content: "", category: "News" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete post?")) return;
    await fetch("/api/admin/blogs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-d1-off-white">Blog</h1>
      <div className="max-w-3xl space-y-4 rounded-xl border border-white/10 p-6">
        <AdminField label="Title">
          <input className={adminInputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </AdminField>
        <AdminField label="Excerpt">
          <textarea className={adminInputClass} rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </AdminField>
        <AdminField label="Content">
          <textarea className={adminInputClass} rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </AdminField>
        <ImageUploadField label="Cover" folder="blog" value={form.coverImageUrl} onChange={(url) => setForm({ ...form, coverImageUrl: url })} />
        <AdminField label="SEO title">
          <input className={adminInputClass} value={form.seoTitle || ""} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        </AdminField>
        <AdminField label="SEO description">
          <textarea className={adminInputClass} rows={2} value={form.seoDescription || ""} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
        </AdminField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
        <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">
          {form._id ? "Update" : "Publish"} Post
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p._id} className="flex justify-between rounded-lg border border-white/10 p-4">
            <span className="text-sm">{p.title}</span>
            <div className="flex gap-2">
              <button type="button" className="text-xs text-d1-orange" onClick={() => setForm(p)}>Edit</button>
              <button type="button" className="text-xs text-red-400" onClick={() => p._id && remove(p._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
