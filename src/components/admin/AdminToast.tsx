"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  variant: "success" | "error";
  onDismiss: () => void;
};

export function AdminToast({ message, variant, onDismiss }: Props) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-[100] max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg ${
        variant === "success"
          ? "border-d1-orange/40 bg-d1-charcoal text-d1-off-white"
          : "border-red-500/40 bg-d1-charcoal text-red-300"
      }`}
    >
      {message}
    </div>
  );
}
