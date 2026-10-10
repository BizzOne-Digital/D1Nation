"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { AdminFormActions } from "@/components/admin/AdminFormActions";
import { AdminListRow } from "@/components/admin/AdminListRow";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminList, adminRequest } from "@/lib/admin-client";

type Service = {
  _id: string;
  title: string;
  slug: string;
  overview: string;
  benefits: string[];
  imageUrl?: string;
  imagePublicId?: string;
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  published?: boolean;
  order?: number;
  ctaLabel?: string;
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    try {
      const list = await adminList<Service>("/api/admin/services");
      setItems(list);
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Could not load services" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createNew() {
    setMessage(null);
    try {
      const item = await adminRequest<Service>("/api/admin/services", {
        method: "POST",
        body: {
          title: `New service ${Date.now().toString(36)}`,
          overview: "Describe this program.",
          benefits: [],
          published: false,
        },
      });
      await load();
      setSelected({ ...item, benefits: item.benefits || [] });
      setMessage({ type: "ok", text: "Service created. Edit details and save." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Could not create service" });
    }
  }

  function select(s: Service) {
    setSelected({ ...s, benefits: s.benefits || [] });
    setMessage(null);
  }

  function clearSelection() {
    setSelected(null);
    setMessage(null);
  }

  async function save() {
    if (!selected) return;
    if (!selected.title.trim() || !selected.overview.trim()) {
      setMessage({ type: "err", text: "Title and overview are required." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const { _id, ...rest } = selected;
      const updated = await adminRequest<Service>("/api/admin/services", {
        method: "PATCH",
        body: {
          id: _id,
          ...rest,
          benefits: selected.benefits?.filter(Boolean) ?? [],
        },
      });
      setSelected({ ...updated, benefits: updated.benefits || [] });
      await load();
      setMessage({ type: "ok", text: "Service saved." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    setMessage(null);
    try {
      await adminRequest("/api/admin/services", { method: "DELETE", body: { id } });
      if (selected?._id === id) setSelected(null);
      await load();
      setMessage({ type: "ok", text: "Service deleted." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Delete failed" });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-d1-off-white">Services</h1>
          <p className="mt-2 text-sm text-d1-muted">Programs on the site — edit text, upload images, publish or hide.</p>
        </div>
        <button
          type="button"
          onClick={createNew}
          className="rounded-full border border-dashed border-d1-orange/50 px-5 py-2 text-sm font-semibold text-d1-orange hover:bg-d1-orange/10"
        >
          + Add service
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.type === "ok" ? "text-d1-orange" : "text-red-400"}`}>{message.text}</p>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-d1-muted">All services ({items.length})</h2>
          <ul className="space-y-2">
            {items.map((s) => (
              <AdminListRow
                key={s._id}
                title={s.title}
                subtitle={s.published ? "Published" : "Draft"}
                imageUrl={s.imageUrl}
                onEdit={() => select(s)}
                onDelete={() => remove(s._id)}
              />
            ))}
          </ul>
          {items.length === 0 && <p className="text-sm text-d1-muted">No services yet.</p>}
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
              label="Service image"
              folder="pages"
              value={selected.imageUrl}
              onChange={(url, publicId) =>
                setSelected({
                  ...selected,
                  imageUrl: url,
                  imagePublicId: publicId || selected.imagePublicId || "",
                })
              }
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
            <label className="flex items-center gap-2 text-sm text-d1-off-white">
              <input type="checkbox" checked={!!selected.published} onChange={(e) => setSelected({ ...selected, published: e.target.checked })} />
              Published on site
            </label>
            <AdminFormActions isEdit saving={saving} onSave={save} onCancel={clearSelection} saveLabel="Save service" />
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-d1-muted">
            Select a service to edit, or add a new one.
          </p>
        )}
      </div>
    </div>
  );
}
