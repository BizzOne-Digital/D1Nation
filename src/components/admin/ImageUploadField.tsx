"use client";

import { useState } from "react";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { AdminToast } from "@/components/admin/AdminToast";
import type { UploadFolder } from "@/lib/stored-upload-shared";

type Props = {
  label: string;
  value?: string;
  onChange: (url: string, publicId?: string) => void;
  folder: UploadFolder;
  kind?: "image" | "video";
};

export function ImageUploadField({ label, value, onChange, folder, kind = "image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  if (kind === "image") {
    return (
      <LocalImageField
        label={label}
        value={value}
        folder={folder}
        onChange={(url) => onChange(url)}
      />
    );
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      form.append("kind", "video");
      const res = await fetch("/api/upload", { method: "POST", body: form, credentials: "same-origin" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url, data.publicId);
      setToast({ message: "Video uploaded.", variant: "success" });
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : "Upload failed", variant: "error" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-d1-muted">{label}</label>
      {value && <video src={value} className="max-h-40 rounded-lg border border-white/10" controls muted />}
      <input
        type="file"
        accept="video/*"
        onChange={onFile}
        disabled={uploading}
        className="block w-full text-xs text-d1-muted file:mr-3 file:rounded-lg file:border-0 file:bg-d1-orange file:px-3 file:py-2 file:text-xs file:font-semibold file:text-d1-charcoal"
      />
      {uploading && <p className="text-xs text-d1-orange">Uploading…</p>}
      {value && (
        <button type="button" className="text-xs text-d1-muted underline" onClick={() => onChange("", "")}>
          Clear
        </button>
      )}
      {toast && <AdminToast message={toast.message} variant={toast.variant} onDismiss={() => setToast(null)} />}
      <p className="text-[11px] text-d1-muted">Videos use Cloudinary when configured; images use MongoDB storage.</p>
    </div>
  );
}
