import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { HeroBackground } from "@/components/site/HeroBackground";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary, type: "article" },
    twitter: { title: project.name, description: project.summary },
  };
}

const STATUS_LABEL: Record<"Live" | "Prototype", string> = {
  Live: "Live",
  Prototype: "Pilot Build",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <section className="relative px-5 pt-28 pb-10 md:pt-32 md:pb-14 overflow-hidden">
        <HeroBackground variant="focus" />
        <div className="relative z-10 max-w-site mx-auto">
          <Reveal>
            <Link
              href="/work"
              className="font-heading text-[11px] uppercase tracking-[0.12em] text-cyan/80 hover:text-cyan inline-flex items-center gap-1.5 mb-8"
            >
              <ArrowLeft size={13} /> All Work
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/70">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-[0.15em] text-white/35">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    project.status === "Live" ? "bg-cyan" : "bg-white/25"
                  }`}
                />
                {STATUS_LABEL[project.status]}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <RevealWords
                as="h1"
                className="section-title"
                words={project.name.split(" ").map((w) => ({ text: w }))}
              />
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan inline-flex"
                  aria-label={`Visit ${project.name}`}
                >
                  <ArrowUpRight size={22} />
                </a>
              )}
            </div>

            <p className="text-[15px] text-white/45 leading-[1.8] max-w-[600px] mt-5 font-light">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10.5px] text-white/40 border border-white/[0.08] rounded-full px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section max-w-site mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "The Problem", text: project.problem },
            { label: "The Build", text: project.approach },
            { label: "The Result", text: project.result },
          ].map((block, i) => (
            <Reveal key={block.label} delay={i * 0.08}>
              <div className="card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-cyan/10 border border-cyan-border text-cyan font-heading text-[12px] font-bold shrink-0">
                    0{i + 1}
                  </div>
                  <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted">
                    {block.label}
                  </div>
                </div>
                <p className="text-[13.5px] text-white/55 leading-[1.8] font-light">{block.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card p-7 mt-8">
            <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-4">
              Highlights
            </div>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="text-[13px] text-white/55 flex items-start gap-2.5">
                  <span className="text-cyan/50 mt-0.5">·</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="Like What You See?"
        title={[
          { text: "Your" },
          { text: "Business" },
          { text: "Could" },
          { text: "Be" },
          { text: "Our", break: true, className: "text-cyan" },
          { text: "Next", className: "text-cyan" },
          { text: "Case", className: "text-cyan" },
          { text: "Study.", className: "text-cyan" },
        ]}
        subtitle="Every project here started as a free 30-minute audit. Let's find out what we'd build for you."
        primaryLabel="Book Free Audit Call →"
        secondaryLabel="See More Work"
        secondaryHref="/work"
        footnote="No commitment. No fluff. Just a clear roadmap for your business."
      />
    </>
  );
}
