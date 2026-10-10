export class AdminRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function adminRequest<T = unknown>(
  url: string,
  options: { method?: string; body?: Record<string, unknown> | object } = {},
): Promise<T> {
  const { method = "GET", body } = options;
  const res = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new AdminRequestError(data.error || `Request failed (${res.status})`, res.status);
  }
  return data as T;
}

export async function adminList<T>(url: string): Promise<T[]> {
  const data = await adminRequest<T[]>(url);
  return Array.isArray(data) ? data : [];
}
