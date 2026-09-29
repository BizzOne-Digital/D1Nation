"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange: (url: string, publicId?: string) => void;
  folder: string;
  kind?: "image" | "video";
};

export function ImageUploadField({ label, value, onChange, folder, kind = "image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      form.append("kind", kind);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url, data.publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-d1-muted">{label}</label>
      {value && kind === "image" && (
        <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg border border-white/10">
          <Image src={value} alt="Preview" fill className="object-cover" sizes="200px" />
        </div>
      )}
      {value && kind === "video" && (
        <video src={value} className="max-h-40 rounded-lg border border-white/10" controls muted />
      )}
      <input
        type="file"
        accept={kind === "video" ? "video/*" : "image/*"}
        onChange={onFile}
        disabled={uploading}
        className="block w-full text-xs text-d1-muted file:mr-3 file:rounded-lg file:border-0 file:bg-d1-orange file:px-3 file:py-2 file:text-xs file:font-semibold file:text-d1-charcoal"
      />
      {uploading && <p className="text-xs text-d1-orange">Uploading…</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {value && (
        <button
          type="button"
          className="text-xs text-d1-muted underline"
          onClick={() => onChange("", "")}
        >
          Clear
        </button>
      )}
    </div>
  );
}
