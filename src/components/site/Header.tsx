"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";
import { employees } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleCloseMega() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }

  return (
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${
        scrolled ? "bg-bg/85 border-b border-white/[0.06] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-site mx-auto flex items-center justify-between h-16 md:h-[68px] px-5 md:px-8">
        <Logo />

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <Link
                  href={item.href}
                  className="font-heading text-[12px] uppercase tracking-[0.08em] text-white/55 hover:text-cyan transition-colors"
                >
                  {item.label}
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleCloseMega}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[560px] card p-5"
                    >
                      <div className="grid grid-cols-2 gap-1.5">
                        {employees.map((emp) => (
                          <Link
                            key={emp.id}
                            href="/services"
                            onClick={() => setMegaOpen(false)}
                            className="group flex items-start gap-3 rounded-lg p-3 hover:bg-white/[0.04] transition-colors"
                          >
                            <span className="font-heading text-[11px] text-cyan/50 tracking-[0.1em] pt-0.5 shrink-0 group-hover:text-cyan transition-colors">
                              {emp.role}
                            </span>
                            <span>
                              <span className="block font-heading text-[13px] font-bold text-white/85 group-hover:text-white transition-colors">
                                {emp.title}
                              </span>
                              <span className="block text-[11.5px] text-white/35 leading-snug mt-0.5 line-clamp-2">
                                {emp.desc}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="flex justify-end mt-2 pt-3 border-t border-white/[0.06]">
                        <Link
                          href="/services"
                          onClick={() => setMegaOpen(false)}
                          className="font-heading text-[11px] uppercase tracking-[0.1em] text-cyan/80 hover:text-cyan flex items-center gap-1"
                        >
                          View All Services <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading text-[12px] uppercase tracking-[0.08em] text-white/55 hover:text-cyan transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a Call
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center h-10 w-10 -mr-1 text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Scroll progress — fill only, no visible track until scrolled */}
      <div className="h-[2px] w-full">
        <div
          className="h-[2px] bg-cyan/70"
          style={{ width: `${progress}%`, transition: "width 120ms linear" }}
        />
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-bg/98 backdrop-blur-xl border-t border-white/[0.06] transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-8 gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-heading text-[15px] uppercase tracking-[0.06em] text-white/80 py-4 border-b border-white/[0.06]"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-6">
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
