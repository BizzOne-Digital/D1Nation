"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  _id: string;
  parentName: string;
  email: string;
  phone: string;
  athleteName: string;
  graduationYear: string;
  serviceInterest: string;
  message: string;
  status: string;
  createdAt: string;
};

const statuses = ["new", "in_progress", "resolved", "archived"];

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);

  async function load() {
    setItems(await (await fetch("/api/admin/inquiries")).json());
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: string) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete inquiry permanently?")) return;
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-d1-off-white">Inquiries</h1>
      {items.length === 0 ? (
        <p className="text-d1-muted">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((inq) => (
            <article key={inq._id} className="rounded-xl border border-white/10 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-d1-off-white">{inq.parentName}</h2>
                  <p className="text-xs text-d1-muted">
                    {new Date(inq.createdAt).toLocaleString()} · Athlete: {inq.athleteName} ({inq.graduationYear})
                  </p>
                </div>
                <select
                  value={inq.status}
                  onChange={(e) => setStatus(inq._id, e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <p className="mt-3 text-sm text-d1-muted">
                <a href={`mailto:${inq.email}`} className="text-d1-orange">{inq.email}</a> · {inq.phone}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-d1-orange">{inq.serviceInterest}</p>
              <p className="mt-3 text-sm text-d1-off-white/90 whitespace-pre-line">{inq.message}</p>
              <button type="button" onClick={() => remove(inq._id)} className="mt-4 text-xs text-red-400">Delete</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
