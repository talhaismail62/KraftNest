import { projects } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

/** Wordmark marquee of real shipped projects — reuses the existing .marquee/tick keyframe from globals.css. */
export function TrustWall() {
  return (
    <section className="border-y border-white/[0.05] py-9 overflow-hidden">
      <Reveal>
        <div className="text-center text-[10px] uppercase tracking-[0.25em] text-muted font-heading mb-6">
          Built &amp; Shipped For
        </div>
      </Reveal>
      <div className="marquee">
        {[...projects, ...projects].map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className="font-heading text-[15px] md:text-[18px] font-bold uppercase tracking-[0.07em] text-white/25 hover:text-white/60 transition-colors whitespace-nowrap"
          >
            {p.name}
          </span>
        ))}
      </div>
    </section>
  );
}
