"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** Scroll-reveal wrapper. Use inside client or server trees freely. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that fade/slide in one-by-one as it scrolls into view —
 * the per-word reveal urbi.ae uses on its headlines, instead of fading the whole block at once. */
export function RevealWords({
  words,
  as = "h2",
  className = "",
  style,
}: {
  words: { text: string; className?: string; break?: boolean }[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
    >
      {words.map((w, i) => (
        <span key={i}>
          {w.break && <br />}
          <motion.span
            className={w.className}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 14 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w.text}
            {i < words.length - 1 && !words[i + 1]?.break ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
