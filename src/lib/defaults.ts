import { SERVICE_IMAGE_BY_SLUG } from "@/lib/service-images";

export const FALLBACK_SERVICES = [
  {
    _id: "fallback-academy",
    title: "Academy",
    slug: "academy",
    overview:
      "Structured, high-performance training designed to sharpen skills, athleticism, and game IQ in a premium club environment.",
    benefits: [],
    imageUrl: SERVICE_IMAGE_BY_SLUG.academy,
    internalPrice: null,
    showPublicPrice: false,
  },
  {
    _id: "fallback-teams",
    title: "Teams",
    slug: "teams",
    overview:
      "Competitive team experiences that translate training into real-game reps, leadership, and team culture.",
    benefits: [],
    imageUrl: SERVICE_IMAGE_BY_SLUG.teams,
    internalPrice: null,
    showPublicPrice: false,
  },
  {
    _id: "fallback-recruiting",
    title: "Recruiting Coordination",
    slug: "recruiting-coordination",
    overview:
      "Guidance for families navigating the college athletics process — timelines, communication, and presentation.",
    benefits: [],
    imageUrl: SERVICE_IMAGE_BY_SLUG["recruiting-coordination"],
    internalPrice: null,
    showPublicPrice: false,
  },
  {
    _id: "fallback-nil",
    title: "NIL Opportunities",
    slug: "nil-opportunities",
    overview:
      "Education and coordination around Name, Image, and Likeness — helping athletes and families understand options responsibly.",
    benefits: [],
    imageUrl: SERVICE_IMAGE_BY_SLUG["nil-opportunities"],
    internalPrice: null,
    showPublicPrice: false,
  },
] as const;

export const FALLBACK_SETTINGS = {
  headline: "A Complete Sports System for Today's Athletes and Their Families",
  subheadline:
    "Elite training, competitive teams, recruiting guidance, and NIL education — built for families pursuing college athletics.",
  aboutShort:
    "D1 Nation is a high-end sports club with a legacy of over 1,000 athletes placed in college.",
  logoUrl: "",
  heroVideoUrl: "",
  heroImageUrl: "/images/hero-athletes.jpg",
  email: "RealD1Nation@gmail.com",
  phone: "+1 (512) 508-4632",
  address: "",
  socialFacebook: "",
  socialInstagram: "",
  socialTiktok: "",
  socialTwitter: "",
  placementClaim: "1,000+",
  placementClaimLabel: "athletes placed in college programs",
  metaTitle: "D1 Nation | Luxury Sports Club",
  metaDescription:
    "D1 Nation — a complete sports system for today's athletes and families pursuing college athletics.",
};
