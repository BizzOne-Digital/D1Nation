"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { AdminFormActions } from "@/components/admin/AdminFormActions";
import { AdminListRow } from "@/components/admin/AdminListRow";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminList, adminRequest } from "@/lib/admin-client";

type Post = {
  _id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  published?: boolean;
};

const emptyPost = (): Post => ({
  title: "",
  excerpt: "",
  content: "",
  category: "News",
  published: false,
});

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [form, setForm] = useState<Post>(emptyPost());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    try {
      setItems(await adminList<Post>("/api/admin/blogs"));
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Could not load posts" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm(emptyPost());
    setMessage(null);
  }

  function startEdit(p: Post) {
    setForm({ ...p });
    setMessage(null);
  }

  async function save() {
    if (!form.title.trim()) {
      setMessage({ type: "err", text: "Title is required." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const { _id, ...fields } = form;
      if (_id) {
        await adminRequest("/api/admin/blogs", { method: "PATCH", body: { id: _id, ...fields } });
        setMessage({ type: "ok", text: "Post updated." });
      } else {
        await adminRequest("/api/admin/blogs", { method: "POST", body: fields });
        setMessage({ type: "ok", text: "Post added." });
      }
      setForm(emptyPost());
      await load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    setMessage(null);
    try {
      await adminRequest("/api/admin/blogs", { method: "DELETE", body: { id } });
      if (form._id === id) setForm(emptyPost());
      await load();
      setMessage({ type: "ok", text: "Post deleted." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Delete failed" });
    }
  }

  const isEdit = Boolean(form._id);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-d1-off-white">Blog</h1>
          <p className="mt-2 text-sm text-d1-muted">Add, edit, or delete articles. Upload a cover image for each post.</p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="rounded-full border border-dashed border-d1-orange/50 px-5 py-2 text-sm font-semibold text-d1-orange hover:bg-d1-orange/10"
        >
          + New post
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.type === "ok" ? "text-d1-orange" : "text-red-400"}`}>{message.text}</p>
      )}

      <div className="max-w-3xl space-y-4 rounded-xl border border-white/10 p-6">
        <AdminField label="Title">
          <input className={adminInputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </AdminField>
        <AdminField label="Category">
          <input
            className={adminInputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="News, Academy, Events…"
          />
        </AdminField>
        <AdminField label="Excerpt">
          <textarea className={adminInputClass} rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </AdminField>
        <AdminField label="Content">
          <textarea className={adminInputClass} rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </AdminField>
        <ImageUploadField
          label="Cover image"
          folder="gallery"
          value={form.coverImageUrl}
          onChange={(url, publicId) =>
            setForm({
              ...form,
              coverImageUrl: url,
              coverImagePublicId: publicId || form.coverImagePublicId || "",
            })
          }
        />
        <label className="flex items-center gap-2 text-sm text-d1-off-white">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published on site
        </label>
        <AdminFormActions isEdit={isEdit} saving={saving} onSave={save} onCancel={isEdit ? startNew : undefined} saveLabel={isEdit ? "Save changes" : "Publish post"} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-d1-muted">All posts ({items.length})</h2>
        <ul className="space-y-2">
          {items.map((p) => (
            <AdminListRow
              key={p._id}
              title={p.title}
              subtitle={[p.category, p.published ? "Published" : "Draft"].filter(Boolean).join(" · ")}
              imageUrl={p.coverImageUrl}
              onEdit={() => startEdit(p)}
              onDelete={() => p._id && remove(p._id)}
            />
          ))}
        </ul>
        {items.length === 0 && <p className="text-sm text-d1-muted">No posts yet. Create one above.</p>}
      </div>
    </div>
  );
}
