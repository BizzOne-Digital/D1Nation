import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import User from "@/models/User";
import SiteSettings from "@/models/SiteSettings";
import Service from "@/models/Service";
import Faq from "@/models/Faq";
import Testimonial from "@/models/Testimonial";
import BlogPost from "@/models/BlogPost";
import { SERVICE_IMAGE_BY_SLUG } from "@/lib/service-images";

const DEFAULT_SERVICES = [
  {
    title: "Academy",
    slug: "academy",
    icon: "academy",
    order: 0,
    overview:
      "Structured, high-performance training designed to sharpen skills, athleticism, and game IQ in a premium club environment.",
    benefits: [
      "Position-specific skill development",
      "Strength, speed, and recovery integration",
      "Film review and performance feedback",
      "Family-aligned development planning",
    ],
    imageUrl: SERVICE_IMAGE_BY_SLUG.academy,
  },
  {
    title: "Teams",
    slug: "teams",
    icon: "teams",
    order: 1,
    overview:
      "Competitive team experiences that translate training into real-game reps, leadership, and team culture.",
    benefits: [
      "Game-ready competition schedule",
      "Team systems and situational play",
      "Coaching aligned with club standards",
      "Exposure through organized play",
    ],
    imageUrl: SERVICE_IMAGE_BY_SLUG.teams,
  },
  {
    title: "Recruiting Coordination",
    slug: "recruiting-coordination",
    icon: "recruiting",
    order: 2,
    overview:
      "Guidance for families navigating the college athletics process — timelines, communication, and presentation.",
    benefits: [
      "Recruiting timeline education",
      "Profile and résumé support",
      "Communication best practices",
      "Family workshops and check-ins",
    ],
    imageUrl: SERVICE_IMAGE_BY_SLUG["recruiting-coordination"],
  },
  {
    title: "NIL Opportunities",
    slug: "nil-opportunities",
    icon: "nil",
    order: 3,
    overview:
      "Education and coordination around Name, Image, and Likeness — helping athletes and families understand options responsibly.",
    benefits: [
      "NIL literacy for athletes and parents",
      "Brand-safe opportunity exploration",
      "Compliance-aware guidance",
      "Partnership introductions when appropriate",
    ],
    imageUrl: SERVICE_IMAGE_BY_SLUG["nil-opportunities"],
  },
];

const DEFAULT_FAQS = [
  {
    question: "How do we get started with D1 Nation?",
    answer:
      "Submit an inquiry through our contact form. Our team will follow up to learn about your athlete, goals, and the programs that may be the best fit.",
    category: "home",
    order: 0,
  },
  {
    question: "Do you guarantee college scholarships or roster spots?",
    answer:
      "No. We support athlete development and family education. Outcomes depend on many factors, and we do not promise scholarships, offers, or recruiting results.",
    category: "services",
    order: 1,
  },
  {
    question: "How is pricing determined?",
    answer:
      "Program investment varies by athlete age, service selection, and team placement. Contact us for current pricing — we will provide details after understanding your needs.",
    category: "pricing",
    order: 2,
  },
  {
    question: "What ages do you serve?",
    answer:
      "We work with motivated young athletes and their families. Share your athlete's graduation year in an inquiry so we can guide you to appropriate options.",
    category: "general",
    order: 3,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    name: "Marcus & Elena R.",
    role: "Parents · Academy & Teams",
    quote:
      "From day one, the communication stood out. Our son knows what is expected in training and on game day, and we always know how to support him at home. The environment is demanding but positive — exactly what we wanted.",
    context: "Joined D1 Nation for academy training and competitive team play",
    order: 0,
    published: true,
    isSample: false,
  },
  {
    name: "Jennifer M.",
    role: "Parent · Class of 2027",
    quote:
      "The recruiting workshops took a overwhelming process and broke it into clear steps. We still drive the outreach as a family, but we finally understand timelines, film, and how to present our daughter with confidence.",
    context: "Recruiting coordination and family education sessions",
    order: 1,
    published: true,
    isSample: false,
  },
  {
    name: "David K.",
    role: "Parent · Teams",
    quote:
      "My daughter plays harder because the standard is high — not just in skill, but in effort and accountability. The coaching staff pushes her while keeping the experience fun and competitive.",
    context: "Competitive team program",
    order: 2,
    published: true,
    isSample: false,
  },
  {
    name: "Priya S.",
    role: "Parent · Academy",
    quote:
      "The attention to detail in skill work is unlike anything we have seen. Small group reps, honest feedback, and a plan that grows with our athlete. It feels like a true development system, not a one-size-fits-all clinic.",
    order: 3,
    published: true,
    isSample: false,
  },
];

const DEFAULT_BLOG_POSTS = [
  {
    title: "What year-round academy training actually looks like",
    slug: "year-round-academy-training",
    category: "Training",
    excerpt:
      "Structured sessions, recovery, and film — how D1 Nation athletes build skill without burning out.",
    coverImageUrl: SERVICE_IMAGE_BY_SLUG.academy,
    published: true,
    publishedAt: new Date("2026-02-10"),
    seoTitle: "Year-Round Academy Training at D1 Nation",
    seoDescription:
      "A practical look at how academy athletes train, recover, and grow throughout the year.",
    content: `Most families picture academy training as endless reps. At D1 Nation, it is closer to a season plan with a weekly rhythm: skill blocks, athletic performance, competitive application, and recovery built in on purpose.

A typical week might include position-specific work, small-group intensity, and film review that connects what happened in training to what shows up on game film. Coaches give direct feedback athletes can act on before the next session — not vague praise, not criticism without a path forward.

For parents, the win is predictability. You know when sessions are, what the focus is, and how to support habits at home — sleep, nutrition, and accountability — without turning the car ride home into a second practice.

If you are exploring academy options, ask about progression, communication, and how training connects to team play. Those answers matter more than a flashy facility tour.`,
  },
  {
    title: "Five ways parents can support game day (without coaching from the stands)",
    slug: "parents-support-game-day",
    category: "Families",
    excerpt:
      "Simple habits that help athletes stay confident, focused, and ready to compete.",
    coverImageUrl: SERVICE_IMAGE_BY_SLUG.teams,
    published: true,
    publishedAt: new Date("2026-01-22"),
    seoTitle: "Supporting Your Athlete on Game Day",
    seoDescription:
      "Practical tips for parents who want to encourage without adding pressure.",
    content: `Athletes feel the energy in the stands. The goal is not to be silent — it is to be steady.

First, agree on a pre-game routine at home: hydrate, light fuel, headphones if that helps them focus. Keep the conversation about effort and preparation, not outcomes.

Second, let coaches coach. Cheering is great; play-calling from the sideline is not. If you have a question about rotation or role, save it for a scheduled conversation — not the parking lot right after the buzzer.

Third, debrief with care. Ask what they learned before asking what went wrong. One or two takeaways beat a full film session in the car.

Fourth, protect recovery. Late-night scrolling and skipped meals undo good weeks of training.

Fifth, model respect — for officials, opponents, and teammates. Culture starts with adults.

D1 Nation partners with families who want high standards and high support. That balance is where athletes grow fastest.`,
  },
  {
    title: "Recruiting timelines: sophomore vs junior year",
    slug: "recruiting-timelines-sophomore-junior",
    category: "Recruiting",
    excerpt:
      "A calm, step-by-step view of what families can focus on — without chasing hype.",
    coverImageUrl: SERVICE_IMAGE_BY_SLUG["recruiting-coordination"],
    published: true,
    publishedAt: new Date("2025-12-05"),
    seoTitle: "Recruiting Timelines for Families",
    seoDescription:
      "What to prioritize in sophomore and junior year when navigating college athletics.",
    content: `Recruiting feels urgent because everyone online says it is. The healthier approach is a timeline you can actually follow.

Sophomore year is for foundation: grades, health, skill growth, and honest assessment of level and goals. Start building a basic profile — academics, measurables if relevant, highlight plan — but resist the pressure to email every program in the country.

Junior year is for organized outreach: a realistic target list, clean film, concise emails, and camp or showcase choices that fit your athlete — not a scattershot calendar. Families should document communication and understand NCAA/NAIA rules at a high level; details vary by sport and division.

Throughout, remember: no club can guarantee offers. What you can control is development, presentation, and persistence with the right schools.

D1 Nation recruiting coordination focuses on education, timelines, and family workshops — so you move with clarity instead of fear.`,
  },
  {
    title: "NIL 101: what families should know before signing anything",
    slug: "nil-101-for-families",
    category: "NIL",
    excerpt:
      "Brand literacy, compliance, and questions to ask before your athlete says yes.",
    coverImageUrl: SERVICE_IMAGE_BY_SLUG["nil-opportunities"],
    published: true,
    publishedAt: new Date("2025-11-18"),
    seoTitle: "NIL Basics for Athletes and Parents",
    seoDescription:
      "An introductory guide to Name, Image, and Likeness for high school families.",
    content: `Name, Image, and Likeness opportunities are real — and so are the risks when families move too fast.

Start with literacy: what NIL is, what it is not, and how school, club, and state rules may interact. Athletes should understand that their online presence is part of their brand long before a deal is offered.

Before signing, read the full agreement. Who owns content? What are exclusivity terms? Are there moral clauses? Is a parent or guardian required to co-sign? If something is unclear, pause and get guidance.

Work with opportunities that fit your athlete's age, values, and schedule. Not every local business offer is worth the distraction during a competitive season.

D1 Nation's NIL programming emphasizes education and brand-safe exploration — not hype about dollar amounts. The goal is informed decisions, not rushed signatures.`,
  },
  {
    title: "Inside D1 Nation team culture: standards that travel",
    slug: "d1-nation-team-culture",
    category: "Club News",
    excerpt:
      "How we build accountability, leadership, and pride across academy and team programs.",
    coverImageUrl: SERVICE_IMAGE_BY_SLUG.teams,
    published: true,
    publishedAt: new Date("2026-03-01"),
    seoTitle: "D1 Nation Team Culture",
    seoDescription:
      "How D1 Nation athletes learn leadership and accountability on and off the field.",
    content: `Culture is not a poster on the wall. It is what happens when practice is hard, the bus is late, or the scoreboard is not in your favor.

At D1 Nation, we expect athletes to compete with intensity and treat people with respect — teammates, coaches, officials, and families on the sideline. Leaders are developed on purpose: captains meetings, peer accountability, and standards that do not change when the spotlight is off.

Our teams connect back to academy work. Skills drilled in the week should show up in situational play on the weekend. When they do not, we adjust — film, reps, communication — instead of blaming effort alone.

Families choose us because they want a premium experience with substance: high coaching, honest feedback, and a community athletes are proud to represent.

Questions about team placement or expectations? Reach out through our contact page — we are happy to walk you through fit and next steps.`,
  },
];

export async function ensureSiteData() {
  await connectDB();

  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({});
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
  }

  for (const [slug, imageUrl] of Object.entries(SERVICE_IMAGE_BY_SLUG)) {
    await Service.updateOne({ slug }, { $set: { imageUrl } });
  }

  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.insertMany(DEFAULT_FAQS);
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany(DEFAULT_BLOG_POSTS);
  }
}

export async function ensureAdminUser() {
  await connectDB();
  const count = await User.countDocuments();
  if (count > 0) return { created: false };

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    return { created: false, missingEnv: true };
  }

  await User.create({
    email: email.toLowerCase(),
    passwordHash: await hashPassword(password),
    name: "D1 Nation Admin",
  });
  return { created: true };
}
