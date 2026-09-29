"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type FaqItem = { _id: string; question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);
  const reduce = useReducedMotion();

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-d1-muted">
        FAQs will appear here once published in the admin portal.
      </p>
    );
  }

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-d1-charcoal-soft/80">
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
              <span className="font-medium text-d1-off-white">{item.question}</span>
              <ChevronDown
                className={cn(
                  "shrink-0 text-d1-orange transition-transform",
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
                  <p className="px-5 pb-5 text-sm leading-relaxed text-d1-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
