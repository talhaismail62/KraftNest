"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail, ArrowUp, CalendarCheck } from "lucide-react";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      label: "WhatsApp",
      href: whatsappLink,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Email",
      href: mailtoLink,
      icon: Mail,
      external: false,
    },
    {
      label: "Book a Call",
      href: site.booking,
      icon: CalendarCheck,
      external: true,
      primary: true,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2.5">
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-10 w-10 rounded-full border border-white/10 bg-bg-2/90 backdrop-blur flex items-center justify-center text-white/70 hover:text-cyan hover:border-cyan-border transition-colors shadow-lg"
        >
          <ArrowUp size={16} />
        </button>
      )}
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          aria-label={item.label}
          className={`group flex items-center gap-2 h-11 rounded-full pl-3 pr-3 hover:pr-4 transition-all duration-200 shadow-lg border ${
            item.primary
              ? "bg-cyan text-black border-cyan/40"
              : "bg-bg-2/90 backdrop-blur text-white/80 border-white/10 hover:border-cyan-border hover:text-cyan"
          }`}
        >
          <item.icon size={17} className="shrink-0" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-200 whitespace-nowrap font-heading text-[11px] font-bold uppercase tracking-wide">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}
