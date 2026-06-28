"use client";

import { useState } from "react";
import Link from "next/link";
import { Linkedin, Instagram, Twitter, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Logo } from "./Logo";
import { FooterWordmark } from "./FooterWordmark";
import { mailtoLink, site } from "@/lib/site";
import { projects } from "@/lib/data";

const cols = [
  {
    title: "AI Employees",
    links: [
      { label: "Voice Receptionist", href: "/services" },
      { label: "Sales Rep (SDR)", href: "/services" },
      { label: "Support Agent", href: "/services" },
      { label: "Ops Assistant", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const workLinks = [...projects]
  .sort((a, b) => (a.status === b.status ? 0 : a.status === "Live" ? -1 : 1))
  .slice(0, 4);

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "group inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors font-light";
  const arrow = (
    <ArrowUpRight
      size={12}
      className="shrink-0 -translate-x-1 opacity-0 text-cyan transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
    />
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {arrow}
    </a>
  );
}

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "newsletter", email }),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-[13px] text-cyan font-light">
        <Check size={15} /> You&apos;re on the list — watch your inbox.
      </div>
    );
  }

  return (
    <div className="max-w-[280px]">
      <form
        name="newsletter"
        onSubmit={handleSubmit}
        data-netlify="true"
        className="flex items-center gap-2"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.com"
          className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-cyan-border transition-colors"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="h-[38px] w-[38px] shrink-0 rounded-md bg-cyan text-black flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <ArrowRight size={15} />
        </button>
      </form>
      {error && (
        <p className="text-[11px] text-red-400 mt-2">Something went wrong — try again.</p>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] max-w-site mx-auto pt-12 md:pt-16">
      <div className="px-5 md:px-8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-10 mb-10">
        <div>
          <Logo />
          <p className="text-[13px] text-muted leading-relaxed mt-4 max-w-[240px] font-light">
            {site.slogan} — voice, chat and workflow agents that work around the clock.
          </p>

          <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/80 mt-7 mb-3">
            Get Automation Ideas
          </div>
          <Newsletter />
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/80 mb-4">
              {col.title}
            </div>
            <div className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/80 mb-4">
            Recent Work
          </div>
          <div className="flex flex-col gap-2.5">
            {workLinks.map((p) => (
              <FooterLink key={p.id} href={`/work/${p.id}`}>
                {p.name}
              </FooterLink>
            ))}
          </div>

          <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/80 mt-7 mb-4">
            Connect
          </div>
          <div className="flex flex-col gap-2.5">
            <FooterLink href={site.socials.linkedin}>LinkedIn</FooterLink>
            <FooterLink href={mailtoLink}>{site.email}</FooterLink>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 border-t border-white/[0.05] pt-6 pb-10 md:pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="text-[11px] text-subtle tracking-wide">
          © {new Date().getFullYear()} {site.name} {site.sub}. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={site.socials.linkedin}
            aria-label="LinkedIn"
            className="h-8 w-8 rounded-md border border-white/[0.08] flex items-center justify-center hover:border-cyan-border transition-colors"
          >
            <Linkedin size={14} className="text-muted" />
          </a>
          <a
            href={site.socials.instagram}
            aria-label="Instagram"
            className="h-8 w-8 rounded-md border border-white/[0.08] flex items-center justify-center hover:border-cyan-border transition-colors"
          >
            <Instagram size={14} className="text-muted" />
          </a>
          <a
            href={site.socials.x}
            aria-label="Twitter / X"
            className="h-8 w-8 rounded-md border border-white/[0.08] flex items-center justify-center hover:border-cyan-border transition-colors"
          >
            <Twitter size={14} className="text-muted" />
          </a>
        </div>
      </div>

      <div className="mt-2 md:mt-4">
        <FooterWordmark text={site.name.toLowerCase()} />
      </div>
    </footer>
  );
}
