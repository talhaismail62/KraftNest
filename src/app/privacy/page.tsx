import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LegalSection, LegalBullets, MailLink, LEGAL_EMAIL } from "@/components/site/LegalSection";
import { site } from "@/lib/site";

const LAST_UPDATED = "July 3, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KraftNest Automations collects, uses, shares and deletes data from its AI-powered Instagram and Facebook DM automation service.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        variant="grid"
        eyebrow="Legal"
        title={[
          { text: "Privacy" },
          { text: "Policy.", className: "text-white/30" },
        ]}
        subtitle="What our AI messaging service collects, what it never touches, who processes it, and how to have it deleted."
      />

      <section className="max-w-site mx-auto px-5 md:px-8 py-10 md:py-14">
        <Reveal>
          <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/80 mb-8">
            Last updated: {LAST_UPDATED}
          </div>
        </Reveal>

        <div className="flex flex-col gap-5 max-w-[860px]">
          <LegalSection n="01" title="Introduction">
            <p>
              {site.name} {site.sub} operates an automated messaging service on Instagram and
              Facebook. Businesses connect their Instagram or Facebook account to our service, and
              when someone sends that business a direct message, our system reads the message,
              generates a relevant reply using AI, and sends the reply back inside the same
              conversation.
            </p>
            <p>
              This policy explains what data that service handles, why it handles it, who else
              processes it, and how you can have it removed. It applies to anyone who messages a
              business account that uses {site.name}, as well as to the businesses that operate
              those accounts.
            </p>
          </LegalSection>

          <LegalSection n="02" title="Information We Collect" delay={0.04}>
            <p>
              We only receive what Meta&apos;s messaging platform passes to us when you send a
              direct message to a business account using our service. That is:
            </p>
            <LegalBullets
              items={[
                "Your Instagram or Facebook user ID — the account identifier Meta provides, along with the public username or display name attached to it.",
                "Message content — the text you send to the business account, and any text our AI sends back to you.",
                "Timestamps — when each message was sent and received, used to keep the conversation in order and to maintain operational logs.",
              ]}
            />
            <p>
              We do not collect or have access to your Instagram or Facebook password, your login
              credentials, your payment or card details, or any part of your account we are not
              explicitly sent by Meta. We do not scrape your profile, your followers, your posts, or
              your activity outside of the conversation you started with the business.
            </p>
          </LegalSection>

          <LegalSection n="03" title="How We Use Information" delay={0.08}>
            <p>
              Your information is used for exactly one purpose: to read your message, generate an
              automated reply, and send that reply back to you within the same conversation. That is
              the entire function of the service.
            </p>
            <p>
              We do not sell your data. We do not rent, trade or share it with data brokers. We do
              not use it for advertising, ad targeting, retargeting, audience building, or profile
              enrichment. We do not use it to contact you on any other channel, and we do not build
              a marketing profile about you.
            </p>
          </LegalSection>

          <LegalSection n="04" title="Meta Platform Data" delay={0.12}>
            <p>
              Our service uses Meta&apos;s Instagram Messaging API and Facebook Messenger Platform
              API to receive and send messages on behalf of the connected business account. Any data
              we obtain through those APIs is Platform Data.
            </p>
            <p>
              We handle all Platform Data in accordance with Meta&apos;s Platform Terms and
              Developer Policies. We only request the permissions the service actually needs to
              read and reply to messages, we only use Platform Data to provide that messaging
              functionality, and we do not transfer it to any party except the processors described
              in the next section.
            </p>
          </LegalSection>

          <LegalSection n="05" title="Third-Party Processing" delay={0.16}>
            <p>
              To generate a reply, your message content is processed by third-party services acting
              on our behalf:
            </p>
            <LegalBullets
              items={[
                <>
                  <span className="text-white/75">Google Gemini</span> — message content is sent to
                  Google&apos;s Gemini AI so that a relevant reply can be generated and returned.
                </>,
                <>
                  <span className="text-white/75">n8n</span> — we use n8n as the workflow automation
                  platform that connects the messaging APIs to the AI and moves the message through
                  each step of that process.
                </>,
              ]}
            />
            <p>
              These providers process message content only to deliver the reply back to you. They
              are not permitted to use your data for their own independent purposes, and no other
              third parties receive your message data.
            </p>
          </LegalSection>

          <LegalSection n="06" title="Data Retention" delay={0.2}>
            <p>
              We retain data only for as long as it is necessary to operate the service and to
              maintain operational logs — the records that let us keep conversations coherent,
              diagnose failures, and confirm the system is replying correctly.
            </p>
            <p>
              Once that data is no longer needed for those purposes, it is deleted. If you ask us to
              delete your data sooner, we will do so on request as described below.
            </p>
          </LegalSection>

          <LegalSection n="07" title="Your Rights and Data Deletion" delay={0.24}>
            <p>
              You can ask us at any time to tell you what data we hold about you, or to delete it
              entirely. To make either request, email <MailLink /> from or about the account you
              messaged with, and we will action it.
            </p>
            <p>
              Step-by-step instructions, including exactly what to include in your request and what
              happens after you send it, are on our{" "}
              <Link
                href="/data-deletion"
                className="text-cyan/80 hover:text-cyan transition-colors inline-flex items-center gap-1"
              >
                data deletion page
                <ArrowUpRight size={12} className="shrink-0" />
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection n="08" title="Contact" delay={0.28}>
            <p>
              If you have questions about this policy or about how your data is handled, contact us:
            </p>
            <LegalBullets
              items={[
                <>
                  <span className="text-white/75">
                    {site.name} {site.sub}
                  </span>
                </>,
                <MailLink key="email" />,
              ]}
            />
            <p>
              We aim to respond to every privacy or deletion enquiry sent to {LEGAL_EMAIL} promptly.
            </p>
          </LegalSection>
        </div>
      </section>
    </>
  );
}
