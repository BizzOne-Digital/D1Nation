"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const DEFAULT_HERO_IMAGE = "/images/hero-athletes.jpg";

type HeroProps = {
  headline?: string;
  subheadline?: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
};

/** Thin translucent slashes like the design mock — not solid orange panels */
function HeroDiagonalAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden>
      <div
        className="absolute top-[-15%] right-[8%] h-[130%] w-[9%] rotate-[24deg] bg-d1-orange/20 mix-blend-screen"
      />
      <div
        className="absolute top-[-10%] right-[22%] h-[125%] w-[5%] rotate-[24deg] bg-d1-orange/28 mix-blend-screen"
      />
      <div
        className="absolute top-[-5%] right-[32%] h-[120%] w-[7%] rotate-[24deg] bg-d1-orange/18 mix-blend-screen"
      />
      <div
        className="absolute top-0 right-[42%] h-[115%] w-[4%] rotate-[24deg] bg-d1-orange/22 mix-blend-screen"
      />
    </div>
  );
}

export function Hero({ heroVideoUrl, heroImageUrl }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const image = heroImageUrl || DEFAULT_HERO_IMAGE;
  const isLocal = image.startsWith("/");

  return (
    <section ref={ref} className="relative isolate w-full max-w-full min-h-[100svh] overflow-x-clip overflow-y-visible bg-black">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0">
        {heroVideoUrl ? (
          <video
            className="h-full w-full object-cover object-[70%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster={image}
          >
            <source src={heroVideoUrl} />
          </video>
        ) : isLocal ? (
          <Image
            src={image}
            alt="Athletes training on a track at dusk"
            fill
            priority
            className="object-cover object-[72%_42%] md:object-[65%_center]"
            sizes="100vw"
          />
        ) : (
          <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        {!reduce && <HeroDiagonalAccents />}
      </motion.div>

      <Container className="relative z-10 flex min-h-[100svh] w-full min-w-0 flex-col justify-center pt-[4.25rem] pb-14 md:pb-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-w-0 max-w-[42rem]"
        >
          <h1 className="font-hero font-bold uppercase leading-[1.02] tracking-[0.02em] break-words text-balance">
            <span className="block text-[clamp(2rem,4.8vw,3.35rem)] text-white">
              A Complete
            </span>
            <span
              className="block text-[clamp(2.75rem,7.2vw,4.65rem)] text-d1-orange"
              style={{ lineHeight: 1 }}
            >
              Sports System
            </span>
            <span className="mt-1 block text-[clamp(1.85rem,4.5vw,3.1rem)] text-white">
              For Today&apos;s Athletes
            </span>
            <span className="block text-[clamp(1.85rem,4.5vw,3.1rem)] text-white">
              And Their Families
            </span>
          </h1>

          <p className="mt-5 font-sans text-[15px] font-normal tracking-wide text-white/90 sm:text-base md:mt-6">
            Training. Teams. Recruiting. Opportunity.
          </p>

          <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-9 sm:flex-row sm:items-stretch">
            <Link
              href="/services"
              className="group inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#ff7a1a] to-[#ff9a3d] px-5 py-3.5 font-hero text-[10px] font-semibold uppercase tracking-[0.12em] text-black shadow-[0_8px_32px_-8px_rgba(255,122,26,0.55)] transition hover:brightness-105 sm:w-auto sm:min-w-[200px] sm:px-6 sm:text-xs"
            >
              Explore Programs
              <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 border border-d1-orange bg-black/20 px-5 py-3.5 font-hero text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-[2px] transition hover:bg-d1-orange/10 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-xs"
            >
              Contact Us
              <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
