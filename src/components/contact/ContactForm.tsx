"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const services = [
  "Academy",
  "Teams",
  "Camps",
  "Uniforms",
  "Recruiting Coordination",
  "NIL Opportunities",
  "Social Media Management",
  "Sponsorship",
  "General",
];

export function ContactForm({ theme = "dark" }: { theme?: "dark" | "marketing" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputClass =
    theme === "marketing"
      ? "box-border w-full max-w-full min-w-0 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-[#FF6A00]/60 focus:ring-2 focus:ring-[#FF6A00]/15 sm:text-sm"
      : "box-border w-full max-w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-d1-off-white placeholder:text-d1-muted/60 outline-none transition focus:border-d1-orange/60 focus:ring-2 focus:ring-d1-orange/20 sm:text-sm";

  const labelClass =
    theme === "marketing"
      ? "mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-500"
      : "mb-1.5 block text-xs font-medium uppercase tracking-wider text-d1-muted";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className={labelClass}>
            Parent / Guardian Name *
          </label>
          <input id="parentName" name="parentName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="athleteName" className={labelClass}>
            Athlete Name *
          </label>
          <input id="athleteName" name="athleteName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="graduationYear" className={labelClass}>
            Athlete Graduation Year *
          </label>
          <input
            id="graduationYear"
            name="graduationYear"
            inputMode="numeric"
            pattern="[0-9]{4}"
            placeholder="2028"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="serviceInterest" className={labelClass}>
            Service of Interest *
          </label>
          <select id="serviceInterest" name="serviceInterest" required className={inputClass}>
            <option value="">Select…</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message *
        </label>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </div>

      {status === "success" && (
        <p
          className={
            theme === "marketing"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              : "rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
          }
          role="status"
        >
          Thank you — your inquiry was received. We&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p
          className={
            theme === "marketing"
              ? "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              : "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          }
          role="alert"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        variant={theme === "marketing" ? "marketing" : "primary"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Submit Inquiry"}
      </Button>
    </form>
  );
}
