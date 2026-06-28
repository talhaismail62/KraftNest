"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/site/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="eyebrow">FAQ</div>
        <RevealWords
          as="h2"
          className="section-title mt-4"
          words={[{ text: "Questions," }, { text: "Answered." }]}
        />
      </Reveal>

      <div className="max-w-2xl mx-auto mt-12">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-heading text-[14px] font-bold tracking-tight">
                  {item.q}
                </span>
                <Plus
                  size={16}
                  className={`text-cyan shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <p className="text-[13.5px] text-white/45 leading-[1.8] font-light pb-5 pr-8">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
