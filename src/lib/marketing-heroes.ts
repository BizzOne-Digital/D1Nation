import { ABOUT_IMAGES } from "@/lib/about-images";
import { HOME_IMAGES } from "@/lib/home-images";
import { NIL_IMAGES } from "@/lib/nil-images";
import { SERVICES_PAGE_IMAGES } from "@/lib/services-page-images";

/** Stock heroes for marketing-themed inner pages (reuses uploaded SS assets). */
export const MARKETING_HEROES = {
  contact: SERVICES_PAGE_IMAGES.cta,
  pricing: HOME_IMAGES.path02,
  blog: ABOUT_IMAGES.story01,
  shop: HOME_IMAGES.program04,
  testimonials: HOME_IMAGES.testimonial,
  team: ABOUT_IMAGES.founder,
  product: NIL_IMAGES.eduBrand,
  article: HOME_IMAGES.videoBreak,
  member: ABOUT_IMAGES.staffPrograms,
} as const;
