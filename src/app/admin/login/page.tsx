"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandMark } from "@/components/brand/BrandMark";
import { adminInputClass } from "@/components/admin/AdminField";

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen min-w-0 items-center justify-center overflow-x-clip bg-d1-charcoal px-4 py-8">
      <div className="box-border w-full max-w-md min-w-0 rounded-2xl border border-white/10 bg-d1-charcoal-soft p-6 sm:p-8">
        <div className="mb-8 flex justify-center">
          <BrandMark size="lg" />
        </div>
        <h1 className="text-center font-display text-3xl text-d1-off-white">Admin Portal</h1>
        <p className="mt-2 text-center text-sm text-d1-muted">Sign in to manage D1 Nation</p>
        {params.get("error") === "config" && (
          <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-xs text-red-300">
            Server auth is not configured. Set AUTH_SECRET (32+ chars) in environment variables.
          </p>
        )}
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-wider text-d1-muted">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={adminInputClass}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-wider text-d1-muted">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminInputClass}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-d1-orange py-3 text-sm font-semibold text-d1-charcoal hover:bg-d1-orange-bright disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-d1-muted">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
