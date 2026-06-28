"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Booking embed */}
        <Reveal>
          <div className="card p-2 overflow-hidden">
            <div className="px-5 pt-4 pb-3">
              <div className="font-heading text-[11px] uppercase tracking-[0.15em] text-cyan/80">
                Book a Free Audit Call
              </div>
            </div>
            <iframe
              title="Book a call with KraftNest"
              src={site.bookingEmbed}
              loading="lazy"
              className="w-full h-[480px] rounded-lg border-0 bg-[#0e0e16]"
            />
            <div className="px-5 pb-4 pt-2">
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-cyan/80 hover:text-cyan underline underline-offset-2"
              >
                Open scheduler in a new tab →
              </a>
            </div>
          </div>
        </Reveal>

        {/* Form + direct contact */}
        <Reveal delay={0.1}>
          <div className="card p-7">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
                <CheckCircle2 size={32} className="text-cyan" />
                <div className="font-heading text-[15px] font-bold">Message sent</div>
                <p className="text-[13px] text-white/40 font-light max-w-xs">
                  Thanks — we&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[11px] uppercase tracking-wide text-muted font-heading">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="bg-bg/60 border border-white/[0.08] rounded-md px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-cyan-border placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[11px] uppercase tracking-wide text-muted font-heading">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-bg/60 border border-white/[0.08] rounded-md px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-cyan-border placeholder:text-white/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="business" className="text-[11px] uppercase tracking-wide text-muted font-heading">
                    Business / Website (optional)
                  </label>
                  <input
                    id="business"
                    name="business"
                    className="bg-bg/60 border border-white/[0.08] rounded-md px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-cyan-border placeholder:text-white/20"
                    placeholder="What do you run?"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[11px] uppercase tracking-wide text-muted font-heading">
                    What would you like to automate?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="bg-bg/60 border border-white/[0.08] rounded-md px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-cyan-border placeholder:text-white/20 resize-none"
                    placeholder="Tell us what's eating your team's time..."
                  />
                </div>
                <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-1 disabled:opacity-60">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                {status === "error" && (
                  <p className="text-[12px] text-red-400">
                    Something went wrong — email us directly at {site.email}.
                  </p>
                )}
              </form>
            )}

            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/[0.06]">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 rounded-md border border-white/[0.07] hover:border-cyan-border transition-colors"
              >
                <MessageCircle size={16} className="text-cyan" />
                <span className="text-[10px] text-muted uppercase tracking-wide">WhatsApp</span>
              </a>
              <a
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 rounded-md border border-white/[0.07] hover:border-cyan-border transition-colors"
              >
                <Mail size={16} className="text-cyan" />
                <span className="text-[10px] text-muted uppercase tracking-wide">Email</span>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex flex-col items-center gap-1.5 py-3 rounded-md border border-white/[0.07] hover:border-cyan-border transition-colors"
              >
                <Phone size={16} className="text-cyan" />
                <span className="text-[10px] text-muted uppercase tracking-wide">Call</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
