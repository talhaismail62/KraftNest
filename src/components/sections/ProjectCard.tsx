import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/lib/data";

type Project = (typeof projects)[number];

const STATUS_LABEL: Record<Project["status"], string> = {
  Live: "Live",
  Prototype: "Pilot Build",
};

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="card p-6 h-full flex flex-col hover:border-cyan-border transition-colors duration-300 group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-cyan/70">
          {p.category}
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-[0.15em] text-white/35 shrink-0">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              p.status === "Live" ? "bg-cyan" : "bg-white/25"
            }`}
          />
          {STATUS_LABEL[p.status]}
        </span>
      </div>

      <h3 className="font-heading text-[17px] font-bold tracking-tight mb-2.5 flex items-center gap-1.5">
        <Link href={`/work/${p.id}`} className="hover:text-cyan transition-colors">
          {p.name}
        </Link>
        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${p.name}`}
            className="text-cyan opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight size={15} />
          </a>
        )}
      </h3>

      <p className="text-[13px] text-white/40 leading-[1.7] font-light mb-5">{p.summary}</p>

      <ul className="flex flex-col gap-1.5 mb-5">
        {p.highlights.map((h) => (
          <li key={h} className="text-[12px] text-white/35 flex items-start gap-2">
            <span className="text-cyan/50 mt-0.5">·</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>

      <Link
        href={`/work/${p.id}`}
        className="mt-auto pt-4 border-t border-white/[0.05] font-heading text-[11px] uppercase tracking-[0.1em] text-cyan/80 hover:text-cyan inline-flex items-center gap-1.5"
      >
        Read Case Study <ArrowUpRight size={13} />
      </Link>
    </article>
  );
}
