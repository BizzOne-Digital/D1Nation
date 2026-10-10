export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

const STORED_URL_RE = /^\/api\/uploads\/([^/]+)\/([^/]+)$/;

export function isUploadFolder(folder: string): folder is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(folder);
}

export function isStoredUploadUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return STORED_URL_RE.test(url.split("?")[0]);
}

export function parseStoredUploadUrl(url: string): { folder: UploadFolder; filename: string } | null {
  const path = url.split("?")[0];
  const match = STORED_URL_RE.exec(path);
  if (!match) return null;
  const folder = match[1];
  const filename = match[2];
  if (!isUploadFolder(folder) || !isSafeFilename(filename)) return null;
  return { folder, filename };
}

export function isSafeFilename(filename: string): boolean {
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return false;
  }
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}

export function storedUploadPublicUrl(folder: UploadFolder, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}
