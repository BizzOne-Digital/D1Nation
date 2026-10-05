import { SERVICE_IMAGE_BY_SLUG } from "@/lib/service-images";
import { HOME_IMAGES } from "@/lib/home-images";
import { ABOUT_IMAGES } from "@/lib/about-images";
import { NIL_IMAGES } from "@/lib/nil-images";

export type MarketingPageDefinition = {
  metadataTitle: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  bullets?: string[];
  sections?: { heading: string; body: string }[];
  highlight?: { title: string; body: string };
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const MARKETING_PAGES = {
  academy: {
    metadataTitle: "Academy",
    eyebrow: "D1 Nation Academy",
    title: "Train with purpose. Grow every rep.",
    subtitle: "Year-round skill development, athletic performance, and basketball IQ in a premium club environment.",
    heroImage: SERVICE_IMAGE_BY_SLUG.academy,
    intro:
      "Academy is where habits are built — position work, strength and speed, film feedback, and a development plan your family can follow.",
    bullets: [
      "Position-specific skill blocks",
      "Strength, speed, and recovery integration",
      "Film review and performance feedback",
      "Family-aligned progression planning",
    ],
    primaryCta: { label: "Ask About Academy", href: "/contact" },
    secondaryCta: { label: "View pricing", href: "/pricing" },
  },
  teams: {
    metadataTitle: "Teams",
    eyebrow: "Competitive Teams",
    title: "Compete with standards that travel.",
    subtitle: "Club teams that connect training to real games, leadership, and culture.",
    heroImage: SERVICE_IMAGE_BY_SLUG.teams,
    intro:
      "D1 Nation teams translate academy work into weekend reps — systems, accountability, and coaching aligned with how we train all week.",
    bullets: [
      "Competitive schedules and organized play",
      "Team systems and situational basketball",
      "Coaching aligned with club standards",
      "Exposure through quality competition",
    ],
    primaryCta: { label: "Team inquiries", href: "/contact" },
    secondaryCta: { label: "Academy", href: "/academy" },
  },
  camps: {
    metadataTitle: "Camps",
    eyebrow: "Camps & Clinics",
    title: "High-energy camps. Lasting takeaways.",
    subtitle: "Seasonal camps and clinics for athletes who want focused reps in a demanding, positive environment.",
    heroImage: HOME_IMAGES.path03,
    intro:
      "From skill intensives to position clinics, our camps pack purposeful reps into a short window — with coaches who know how to challenge and encourage.",
    bullets: [
      "Age-appropriate groupings",
      "Skill, IQ, and competitive segments",
      "Clear communication for parents",
      "Pathways into academy and teams when it fits",
    ],
    primaryCta: { label: "Camp registration interest", href: "/contact" },
    secondaryCta: { label: "Programs & pricing", href: "/pricing" },
  },
  uniforms: {
    metadataTitle: "Uniforms & Gear",
    eyebrow: "Uniforms",
    title: "Look the part. Represent the standard.",
    subtitle: "Team apparel and custom gear coordinated through D1 Nation and partner providers.",
    heroImage: HOME_IMAGES.program02,
    intro:
      "Families receive clear guidance on team kits, practice gear, and optional custom pieces — so athletes show up consistent and ready.",
    bullets: [
      "Team uniform packages by program",
      "Sizing and ordering support",
      "Custom options through approved partners",
      "Replacement and add-on ordering",
    ],
    primaryCta: { label: "Uniform questions", href: "/contact" },
    secondaryCta: { label: "Shop", href: "/shop" },
  },
  "social-media-management": {
    metadataTitle: "Social Media Management",
    eyebrow: "Social Media",
    title: "Tell your story the right way.",
    subtitle: "Education and support for athletes and families building a brand-safe presence online.",
    heroImage: NIL_IMAGES.eduBrand,
    intro:
      "From content basics to NIL-ready storytelling, we help athletes understand what to post, what to avoid, and how to stay compliant.",
    bullets: [
      "Profile and content fundamentals",
      "Brand-safe posting guidelines",
      "NIL-aligned storytelling workshops",
      "Optional managed support for select athletes",
    ],
    primaryCta: { label: "Talk to our team", href: "/contact" },
    secondaryCta: { label: "NIL opportunities", href: "/nil-opportunities" },
  },
  "payment-gateways": {
    metadataTitle: "Payments",
    eyebrow: "Payment Gateways",
    title: "Simple, secure payments for families.",
    subtitle: "Program fees, camps, and shop checkout through trusted payment providers.",
    heroImage: HOME_IMAGES.program03,
    intro:
      "D1 Nation uses secure online payment options for registrations and merchandise. Your family receives clear receipts and support if anything needs attention.",
    bullets: [
      "Secure card payments for programs and camps",
      "Transparent invoices and receipts",
      "Shop checkout for apparel and gear",
      "Questions handled by our admin team",
    ],
    sections: [
      {
        heading: "How it works",
        body:
          "After you inquire or register, we send the right payment link or shop checkout for your program. No hidden steps — if you are unsure which option applies, contact us and we will walk you through it.",
      },
    ],
    primaryCta: { label: "Payment help", href: "/contact" },
    secondaryCta: { label: "Shop", href: "/shop" },
  },
  sponsors: {
    metadataTitle: "Sponsors",
    eyebrow: "Partners & Sponsors",
    title: "Powered by partners who believe in athletes.",
    subtitle: "Local and national partners help us deliver training, gear, and opportunities at a higher level.",
    heroImage: ABOUT_IMAGES.story02,
    intro:
      "Sponsorship keeps costs manageable for families and brings real resources to the gym, the field, and the community.",
    highlight: {
      title: "D1 Nation Custom Clothing (Key Sponsor)",
      body:
        "Our key apparel partner supports team kits, custom clothing, and branded gear for athletes and families — quality pieces built to represent D1 Nation on and off the court.",
    },
    bullets: [
      "Custom team and fan apparel",
      "Partner discounts where available",
      "Co-branded camp and event gear",
      "Inquiry path for new partners",
    ],
    primaryCta: { label: "Become a partner", href: "/contact" },
    secondaryCta: { label: "Uniforms", href: "/uniforms" },
  },
} as const satisfies Record<string, MarketingPageDefinition>;

export type MarketingPageKey = keyof typeof MARKETING_PAGES;
