"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatPublicPrice } from "@/lib/pricing";
import { resolveServiceImage } from "@/lib/service-images";
import { ArrowUpRight } from "lucide-react";

export type ServiceCardData = {
  _id: string;
  title: string;
  slug: string;
  overview: string;
  imageUrl?: string;
  internalPrice?: number | null;
  showPublicPrice?: boolean;
};

export function ServiceCard({ service, index }: { service: ServiceCardData; index: number }) {
  const reduce = useReducedMotion();
  const img = resolveServiceImage(service.slug, service.imageUrl);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-d1-charcoal-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-d1-charcoal via-d1-charcoal/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-d1-orange/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-d1-charcoal">
          {formatPublicPrice(service.internalPrice, !!service.showPublicPrice)}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-hero text-2xl font-semibold uppercase tracking-wide text-d1-off-white">
          {service.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-d1-muted">{service.overview}</p>
        <Link
          href={`/services#${service.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-d1-orange hover:gap-2 transition-all"
        >
          Learn more <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
