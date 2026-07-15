import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Privacy/deletion requests are handled on the company domain rather than the
 * general contact inbox in site.ts. */
export const LEGAL_EMAIL = "hello@kraftnest.co";

/** Numbered prose block shared by the legal pages (privacy, data deletion) so both
 * read as one document in the site's existing card + typography language. */
export function LegalSection({
  n,
  title,
  children,
  delay = 0,
}: {
  n: string;
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="card p-6 md:p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-cyan/10 border border-cyan-border text-cyan font-heading text-[12px] font-bold shrink-0">
            {n}
          </div>
          <h2 className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-3.5 text-[13.5px] text-white/55 leading-[1.8] font-light">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export function LegalBullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="text-[13px] text-white/55 flex items-start gap-2.5 font-light">
          <span className="text-cyan/50 mt-0.5 shrink-0">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MailLink({ subject, children }: { subject?: string; children?: ReactNode }) {
  const href = subject
    ? `mailto:${LEGAL_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${LEGAL_EMAIL}`;
  return (
    <a href={href} className="text-cyan/80 hover:text-cyan transition-colors">
      {children ?? LEGAL_EMAIL}
    </a>
  );
}
