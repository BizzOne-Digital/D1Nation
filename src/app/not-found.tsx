import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col items-center justify-center overflow-x-clip bg-white px-4 font-[family-name:var(--font-marketing)] text-neutral-900">
      <p className="text-8xl font-extrabold text-[#FF6A00]/30">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-neutral-600">This route isn&apos;t on our playbook.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6A00] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white"
      >
        Back to Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
