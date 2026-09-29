"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";

type Faq = {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  published?: boolean;
  order?: number;
};

export default function AdminFaqsPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [form, setForm] = useState<Faq>({ question: "", answer: "", category: "general" });

  async function load() {
    const res = await fetch("/api/admin/faqs");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const method = form._id ? "PATCH" : "POST";
    const body = form._id ? { id: form._id, ...form } : form;
    await fetch("/api/admin/faqs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ question: "", answer: "", category: "general" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete FAQ?")) return;
    await fetch("/api/admin/faqs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-d1-off-white">FAQs</h1>
      <div className="max-w-2xl space-y-4 rounded-xl border border-white/10 p-6">
        <AdminField label="Question">
          <input className={adminInputClass} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
        </AdminField>
        <AdminField label="Answer">
          <textarea className={adminInputClass} rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
        </AdminField>
        <AdminField label="Category">
          <select className={adminInputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="general">General</option>
            <option value="home">Home</option>
            <option value="services">Services</option>
            <option value="pricing">Pricing</option>
          </select>
        </AdminField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
        <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">
          {form._id ? "Update" : "Add"} FAQ
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((f) => (
          <li key={f._id} className="rounded-lg border border-white/10 p-4 flex justify-between gap-4">
            <div>
              <p className="font-medium text-d1-off-white">{f.question}</p>
              <p className="text-xs text-d1-muted">{f.category}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button type="button" className="text-xs text-d1-orange" onClick={() => setForm(f)}>Edit</button>
              <button type="button" className="text-xs text-red-400" onClick={() => f._id && remove(f._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
