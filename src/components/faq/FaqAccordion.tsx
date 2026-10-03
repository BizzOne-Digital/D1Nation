"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type FaqItem = { _id: string; question: string; answer: string };

export function FaqAccordion({ items, theme = "dark" }: { items: FaqItem[]; theme?: "dark" | "marketing" }) {
  const marketing = theme === "marketing";
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);
  const reduce = useReducedMotion();

  if (!items.length) {
    return (
      <p
        className={
          marketing
            ? "rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600"
            : "rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-d1-muted"
        }
      >
        FAQs will appear here once published in the admin portal.
      </p>
    );
  }

  return (
    <div
      className={
        marketing
          ? "divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white"
          : "divide-y divide-white/10 rounded-2xl border border-white/10 bg-d1-charcoal-soft/80"
      }
    >
      {items.map((item) => {
        const open = openId === item._id;
        return (
          <div key={item._id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpenId(open ? null : item._id)}
              aria-expanded={open}
            >
              <span className={marketing ? "font-semibold text-neutral-900" : "font-medium text-d1-off-white"}>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "shrink-0 transition-transform",
                  marketing ? "text-[#FF6A00]" : "text-d1-orange",
                  open && "rotate-180",
                )}
                size={20}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p
                    className={
                      marketing
                        ? "px-5 pb-5 text-sm leading-relaxed text-neutral-600"
                        : "px-5 pb-5 text-sm leading-relaxed text-d1-muted"
                    }
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
