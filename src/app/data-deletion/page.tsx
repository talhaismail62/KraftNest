import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LegalSection, LegalBullets, MailLink, LEGAL_EMAIL } from "@/components/site/LegalSection";
import { site } from "@/lib/site";

const SUBJECT = "Data Deletion Request";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description:
    "How to request deletion of the data KraftNest Automations holds from its AI-powered Instagram and Facebook DM automation service.",
};

export default function DataDeletionPage() {
  return (
    <>
      <PageHero
        variant="grid"
        eyebrow="Legal"
        title={[
          { text: "Data" },
          { text: "Deletion", className: "text-white/30" },
          { text: "Request.", className: "text-white/30" },
        ]}
        subtitle="If you have messaged a business account that uses KraftNest, you can have the data from that conversation deleted. Here is exactly how."
      />

      <section className="max-w-site mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="flex flex-col gap-5 max-w-[860px]">
          <LegalSection n="01" title="How to Request Deletion">
            <p>
              To request deletion of your data, send an email to <MailLink /> with the subject line{" "}
              <span className="text-white/75">&ldquo;{SUBJECT}&rdquo;</span>.
            </p>
            <p>So we can find the right conversation, include both of the following:</p>
            <LegalBullets
              items={[
                <>
                  <span className="text-white/75">
                    The Instagram or Facebook username you messaged from
                  </span>{" "}
                  — the account that sent the direct message.
                </>,
                <>
                  <span className="text-white/75">
                    The name of the business account you contacted
                  </span>{" "}
                  — the Instagram or Facebook business page you were messaging.
                </>,
              ]}
            />
            <p>
              Without those two details we may not be able to locate your data, so please include
              them in your first email to avoid delays.
            </p>

            <Reveal delay={0.05}>
              <a
                href={`mailto:${LEGAL_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
                className="btn btn-primary mt-2"
              >
                <Mail size={14} />
                Email a Deletion Request
              </a>
            </Reveal>
          </LegalSection>

          <LegalSection n="02" title="What Happens Next" delay={0.08}>
            <p>Once your request reaches us, we follow the same three steps every time:</p>
            <LegalBullets
              items={[
                <>
                  <span className="text-white/75">We verify the request</span> — we confirm that the
                  username in your email matches a conversation with the business account you named,
                  so that no one can have someone else&apos;s data deleted.
                </>,
                <>
                  <span className="text-white/75">We delete the associated message data</span> — the
                  message content, the Instagram or Facebook user ID, and the timestamps tied to
                  your conversation are removed from our systems and our operational logs.
                </>,
                <>
                  <span className="text-white/75">We confirm by email</span> — once the deletion is
                  complete, we reply to let you know it is done.
                </>,
              ]}
            />
            <p>
              If we cannot verify a request, we will reply and tell you what is missing rather than
              acting on it.
            </p>
          </LegalSection>

          <LegalSection n="03" title="Related" delay={0.12}>
            <p>
              For the full picture of what {site.name} {site.sub} collects, how it is used, and who
              processes it, see our{" "}
              <Link
                href="/privacy"
                className="text-cyan/80 hover:text-cyan transition-colors inline-flex items-center gap-1"
              >
                privacy policy
                <ArrowUpRight size={12} className="shrink-0" />
              </Link>
              .
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}
