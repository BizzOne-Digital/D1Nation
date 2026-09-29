"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminSettingsPage() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  function set(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "Settings saved." : "Failed to save.");
  }

  if (loading) return <p className="text-d1-muted">Loading…</p>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl text-d1-off-white">Site Settings</h1>
        <p className="mt-2 text-sm text-d1-muted">Logo, hero media, headlines, contact, and SEO.</p>
      </div>

      <section className="space-y-4 rounded-xl border border-white/10 p-6">
        <h2 className="font-display text-2xl">Brand & Hero</h2>
        <ImageUploadField
          label="Logo"
          folder="branding"
          value={data.logoUrl}
          onChange={(url, publicId) => {
            set("logoUrl", url);
            if (publicId) set("logoPublicId", publicId);
          }}
        />
        <ImageUploadField
          label="Hero Video"
          folder="hero"
          kind="video"
          value={data.heroVideoUrl}
          onChange={(url, publicId) => {
            set("heroVideoUrl", url);
            if (publicId) set("heroVideoPublicId", publicId);
          }}
        />
        <ImageUploadField
          label="Hero Fallback Image"
          folder="hero"
          value={data.heroImageUrl}
          onChange={(url, publicId) => {
            set("heroImageUrl", url);
            if (publicId) set("heroImagePublicId", publicId);
          }}
        />
        <AdminField label="Headline">
          <textarea className={adminInputClass} rows={2} value={data.headline || ""} onChange={(e) => set("headline", e.target.value)} />
        </AdminField>
        <AdminField label="Subheadline">
          <textarea className={adminInputClass} rows={3} value={data.subheadline || ""} onChange={(e) => set("subheadline", e.target.value)} />
        </AdminField>
      </section>

      <section className="space-y-4 rounded-xl border border-white/10 p-6">
        <h2 className="font-display text-2xl">Contact & Social</h2>
        <AdminField label="Email">
          <input className={adminInputClass} value={data.email || ""} onChange={(e) => set("email", e.target.value)} />
        </AdminField>
        <AdminField label="Phone">
          <input className={adminInputClass} value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} />
        </AdminField>
        <AdminField label="Address">
          <input className={adminInputClass} value={data.address || ""} onChange={(e) => set("address", e.target.value)} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminField label="City">
            <input className={adminInputClass} value={data.city || ""} onChange={(e) => set("city", e.target.value)} />
          </AdminField>
          <AdminField label="State">
            <input className={adminInputClass} value={data.state || ""} onChange={(e) => set("state", e.target.value)} />
          </AdminField>
          <AdminField label="ZIP">
            <input className={adminInputClass} value={data.zip || ""} onChange={(e) => set("zip", e.target.value)} />
          </AdminField>
        </div>
        <AdminField label="Facebook URL">
          <input className={adminInputClass} value={data.socialFacebook || ""} onChange={(e) => set("socialFacebook", e.target.value)} placeholder="https://..." />
        </AdminField>
        <AdminField label="Instagram URL">
          <input className={adminInputClass} value={data.socialInstagram || ""} onChange={(e) => set("socialInstagram", e.target.value)} />
        </AdminField>
        <AdminField label="TikTok URL">
          <input className={adminInputClass} value={data.socialTiktok || ""} onChange={(e) => set("socialTiktok", e.target.value)} />
        </AdminField>
        <AdminField label="X / Twitter URL">
          <input className={adminInputClass} value={data.socialTwitter || ""} onChange={(e) => set("socialTwitter", e.target.value)} />
        </AdminField>
      </section>

      <section className="space-y-4 rounded-xl border border-white/10 p-6">
        <h2 className="font-display text-2xl">Legacy & SEO</h2>
        <AdminField label="Placement claim (e.g. 1,000+)">
          <input className={adminInputClass} value={data.placementClaim || ""} onChange={(e) => set("placementClaim", e.target.value)} />
        </AdminField>
        <AdminField label="Placement label">
          <input className={adminInputClass} value={data.placementClaimLabel || ""} onChange={(e) => set("placementClaimLabel", e.target.value)} />
        </AdminField>
        <AdminField label="Meta title">
          <input className={adminInputClass} value={data.metaTitle || ""} onChange={(e) => set("metaTitle", e.target.value)} />
        </AdminField>
        <AdminField label="Meta description">
          <textarea className={adminInputClass} rows={3} value={data.metaDescription || ""} onChange={(e) => set("metaDescription", e.target.value)} />
        </AdminField>
      </section>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-full bg-d1-orange px-8 py-3 text-sm font-semibold text-d1-charcoal disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Settings"}
      </button>
      {message && <p className="text-sm text-d1-orange">{message}</p>}
    </div>
  );
}
