"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type AboutPageHeroProps = {
  aboutShort: string;
};

export function AboutPageHero({ aboutShort }: AboutPageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full max-w-full min-h-[min(72vh,640px)] overflow-x-clip bg-black pt-[4.25rem]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-athletes.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[70%_center] opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative mx-auto box-border flex h-full min-h-[min(72vh,640px)] w-full min-w-0 max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-hero text-xs font-semibold uppercase tracking-[0.28em] text-d1-orange"
        >
          About D1 Nation
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6 }}
          className="mt-3 max-w-4xl font-hero text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[1.02] tracking-wide text-white"
        >
          Built for athletes.
          <span className="block text-d1-orange">Designed for families.</span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.55 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {aboutShort}
        </motion.p>
      </div>
    </section>
  );
}
