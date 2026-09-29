"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Item = {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  context: string;
  photoUrl?: string;
  published?: boolean;
  isSample?: boolean;
  order?: number;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({ name: "", role: "", quote: "", context: "" });
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/admin/testimonials");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const method = form._id ? "PATCH" : "POST";
    const body = form._id ? { id: form._id, ...form } : form;
    const res = await fetch("/api/admin/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMessage(res.ok ? "Saved." : "Failed.");
    setForm({ name: "", role: "", quote: "", context: "" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete testimonial?")) return;
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-d1-off-white">Testimonials</h1>
      <p className="text-sm text-d1-muted">Only publish real endorsements. Mark samples as unpublished or isSample.</p>

      <div className="rounded-xl border border-white/10 p-6 space-y-4 max-w-2xl">
        <AdminField label="Quote">
          <textarea className={adminInputClass} rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Name">
            <input className={adminInputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </AdminField>
          <AdminField label="Role / context">
            <input className={adminInputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </AdminField>
        </div>
        <ImageUploadField label="Photo" folder="testimonials" value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
        <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">
          {form._id ? "Update" : "Add"} Testimonial
        </button>
        {message && <p className="text-sm text-d1-orange">{message}</p>}
      </div>

      <ul className="space-y-3">
        {items.map((t) => (
          <li key={t._id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 p-4">
            <div>
              <p className="text-sm text-d1-off-white line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-xs text-d1-muted mt-1">{t.name} {t.published ? "· Published" : "· Draft"}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-xs text-d1-orange" onClick={() => setForm(t)}>Edit</button>
              <button type="button" className="text-xs text-red-400" onClick={() => t._id && remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
