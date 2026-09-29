"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Member = {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  order?: number;
  published?: boolean;
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [form, setForm] = useState<Member>({ name: "", role: "", bio: "" });

  async function load() {
    setItems(await (await fetch("/api/admin/team")).json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const method = form._id ? "PATCH" : "POST";
    const body = form._id ? { id: form._id, ...form } : form;
    await fetch("/api/admin/team", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ name: "", role: "", bio: "" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete team member?")) return;
    await fetch("/api/admin/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-d1-off-white">Team</h1>
      <p className="text-sm text-d1-muted">Add real staff only. Unpublished profiles stay off the public site.</p>
      <div className="max-w-2xl space-y-4 rounded-xl border border-white/10 p-6">
        <AdminField label="Name">
          <input className={adminInputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </AdminField>
        <AdminField label="Role">
          <input className={adminInputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </AdminField>
        <AdminField label="Bio">
          <textarea className={adminInputClass} rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </AdminField>
        <ImageUploadField label="Photo" folder="team" value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
        <AdminField label="Display order">
          <input type="number" className={adminInputClass} value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
        </AdminField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
        <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">
          {form._id ? "Update" : "Add"} Member
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((m) => (
          <li key={m._id} className="flex justify-between rounded-lg border border-white/10 p-4">
            <span className="text-sm">{m.name} — {m.role}</span>
            <div className="flex gap-2">
              <button type="button" className="text-xs text-d1-orange" onClick={() => setForm(m)}>Edit</button>
              <button type="button" className="text-xs text-red-400" onClick={() => m._id && remove(m._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
