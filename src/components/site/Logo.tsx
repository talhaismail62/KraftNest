"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Image
          src="/logo-mark.png"
          alt={`${site.name} ${site.sub}`}
          width={32}
          height={32}
          priority
          className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:rotate-[12deg]"
        />
      </motion.div>
      {!compact && (
        <span className="leading-none">
          <span className="block font-heading text-[15px] font-bold uppercase tracking-[0.18em] text-white">
            {site.name}
          </span>
          <span className="block text-[8px] uppercase tracking-[0.32em] text-cyan/70 mt-0.5">
            {site.sub}
          </span>
        </span>
      )}
    </Link>
  );
}
