"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Service = {
  _id: string;
  title: string;
  slug: string;
  overview: string;
  benefits: string[];
  imageUrl?: string;
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  published?: boolean;
  order?: number;
  ctaLabel?: string;
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!selected) return;
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected._id,
        ...selected,
        benefits: selected.benefits?.filter(Boolean),
      }),
    });
    setMessage(res.ok ? "Service saved." : "Save failed.");
    load();
  }

  async function createNew() {
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Service",
        overview: "Describe this program.",
        benefits: [],
      }),
    });
    const item = await res.json();
    if (res.ok) {
      await load();
      setSelected({ ...item, benefits: item.benefits || [] });
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <h1 className="font-display text-4xl text-d1-off-white">Services</h1>
        <button
          type="button"
          onClick={createNew}
          className="mt-4 w-full rounded-lg border border-dashed border-d1-orange/40 py-2 text-xs font-semibold text-d1-orange"
        >
          + Add service
        </button>
        <ul className="mt-6 space-y-2">
          {items.map((s) => (
            <li key={s._id}>
              <button
                type="button"
                onClick={() => setSelected({ ...s, benefits: s.benefits || [] })}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${selected?._id === s._id ? "bg-d1-orange/15 text-d1-orange" : "text-d1-muted hover:bg-white/5"}`}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected ? (
        <div className="space-y-4 rounded-xl border border-white/10 p-6">
          <AdminField label="Title">
            <input className={adminInputClass} value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
          </AdminField>
          <AdminField label="Overview">
            <textarea className={adminInputClass} rows={4} value={selected.overview} onChange={(e) => setSelected({ ...selected, overview: e.target.value })} />
          </AdminField>
          <AdminField label="Benefits (one per line)">
            <textarea
              className={adminInputClass}
              rows={5}
              value={(selected.benefits || []).join("\n")}
              onChange={(e) => setSelected({ ...selected, benefits: e.target.value.split("\n") })}
            />
          </AdminField>
          <ImageUploadField
            label="Image"
            folder="services"
            value={selected.imageUrl}
            onChange={(url) => setSelected({ ...selected, imageUrl: url })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Internal price (optional)">
              <input
                type="number"
                className={adminInputClass}
                value={selected.internalPrice ?? ""}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    internalPrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </AdminField>
            <label className="flex items-center gap-2 pt-6 text-sm text-d1-off-white">
              <input
                type="checkbox"
                checked={!!selected.showPublicPrice}
                onChange={(e) => setSelected({ ...selected, showPublicPrice: e.target.checked })}
              />
              Show public price on site
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!selected.published} onChange={(e) => setSelected({ ...selected, published: e.target.checked })} />
            Published
          </label>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">Save</button>
            <button type="button" onClick={() => remove(selected._id)} className="rounded-full border border-red-500/40 px-6 py-2 text-sm text-red-300">Delete</button>
          </div>
          {message && <p className="text-sm text-d1-orange">{message}</p>}
        </div>
      ) : (
        <p className="text-d1-muted">Select a service to edit.</p>
      )}
    </div>
  );
}
