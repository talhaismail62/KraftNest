import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { CursorGlow } from "@/components/site/CursorGlow";
import { CardSpotlight } from "@/components/site/CardSpotlight";
import { MagneticButtons } from "@/components/site/MagneticButtons";
import { PageTransition } from "@/components/site/PageTransition";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { SmoothScroll } from "@/components/site/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI automation agency",
    "AI employees",
    "AI voice agents",
    "AI chatbots",
    "workflow automation",
    "AI receptionist",
  ],
  openGraph: {
    title: `${site.name} | ${site.slogan}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.slogan}`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${site.name} ${site.sub}`,
  url: site.url,
  description: site.description,
  email: site.email,
  sameAs: [site.socials.linkedin, site.socials.instagram, site.socials.x].filter(
    (s) => s && s !== "#",
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <div className="bg-field" />
        <CursorGlow />
        <CardSpotlight />
        <MagneticButtons />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
