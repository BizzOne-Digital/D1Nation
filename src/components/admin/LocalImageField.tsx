"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { resolvePublicImageUrl } from "@/lib/image-url";
import { isStoredUploadUrl, type UploadFolder } from "@/lib/stored-upload-shared";
import { AdminToast } from "@/components/admin/AdminToast";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

type Props = {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
};

async function deleteStoredUrl(url: string) {
  if (!isStoredUploadUrl(url)) return;
  await fetch("/api/upload", {
    method: "DELETE",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
}

export function LocalImageField({ label, value, onChange, folder }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const previewSrc = value ? resolvePublicImageUrl(value) : "";

  const showToast = useCallback((message: string, variant: "success" | "error") => {
    setToast({ message, variant });
  }, []);

  async function uploadFile(file: File) {
    const previous = value;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: form, credentials: "same-origin" });
      const data = (await res.json()) as { url?: string; error?: string; success?: boolean };
      if (!res.ok) throw new Error(data.error || "Upload failed");
      if (!data.url) throw new Error("No URL returned");
      onChange(data.url);
      if (previous && previous !== data.url) {
        await deleteStoredUrl(previous);
      }
      showToast("Image uploaded.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) uploadFile(file);
  }

  async function remove() {
    const previous = value;
    onChange("");
    if (previous) {
      try {
        await deleteStoredUrl(previous);
        showToast("Image removed.", "success");
      } catch {
        showToast("Removed from form; storage cleanup may have failed.", "error");
      }
    }
  }

  return (
    <div className="space-y-3">
      <span className="text-xs font-medium uppercase tracking-wider text-d1-muted">{label}</span>
      {value ? (
        <div className="flex flex-wrap items-start gap-4">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
            <Image src={previewSrc} alt="Preview" fill className="object-cover" sizes="128px" unoptimized={previewSrc.startsWith("/api/uploads/")} />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-d1-off-white hover:bg-white/5 disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={remove}
              className="rounded-lg border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-full max-w-xs flex-col items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-d1-muted hover:border-d1-orange/40 hover:text-d1-orange disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Choose image"}
        </button>
      )}
      <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={onFileChange} disabled={uploading} />
      {uploading && value && <p className="text-xs text-d1-orange">Uploading…</p>}
      {toast && <AdminToast message={toast.message} variant={toast.variant} onDismiss={() => setToast(null)} />}
    </div>
  );
}
