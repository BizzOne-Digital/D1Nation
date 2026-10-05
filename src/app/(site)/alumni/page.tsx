import { redirect } from "next/navigation";

export const metadata = { title: "Alumni" };

/** Alumni stories live on /testimonials; keep /alumni for nav and client checklist. */
export default function AlumniPage() {
  redirect("/testimonials");
}
