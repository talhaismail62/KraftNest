export type Stat = { n: string; l: string };

export const stats: Stat[] = [
  { n: "24/7", l: "Always On" },
  { n: "95%", l: "Time Saved" },
  { n: "2 Weeks", l: "First Launch" },
  { n: "100%", l: "Custom Built" },
];

export type FlowNode = {
  icon: string;
  label: string;
  tag: string;
};

export type Employee = {
  id: string;
  role: string;
  title: string;
  desc: string;
  tasks: string[];
  flow: FlowNode[];
};

// Reframed around "AI Employees" — concrete job titles, not abstract "automation"
export const employees: Employee[] = [
  {
    id: "web",
    role: "01",
    title: "Web Development",
    desc: "High-converting websites wired directly into your AI employees from day one — one connected system, not separate tools.",
    tasks: ["Conversion-focused web design", "Booking & payment integration", "API & tool integrations"],
    flow: [
      { icon: "🧭", label: "Visitor lands on your site", tag: "Trigger" },
      { icon: "🖥️", label: "Site routes them to the right AI employee", tag: "Route" },
      { icon: "💳", label: "Booking or payment completed", tag: "Action" },
      { icon: "📊", label: "Data synced across your stack", tag: "Sync" },
    ],
  },
  {
    id: "receptionist",
    role: "02",
    title: "AI Voice Receptionist",
    desc: "Answers every call, books appointments, and qualifies callers — sounds human, works 24/7, never takes a sick day.",
    tasks: ["Answers inbound calls", "Books & reschedules appointments", "Routes urgent calls to you"],
    flow: [
      { icon: "📞", label: "Inbound call rings in", tag: "Trigger" },
      { icon: "🗣️", label: "AI answers & qualifies caller", tag: "AI Layer" },
      { icon: "📅", label: "Appointment booked to calendar", tag: "Action" },
      { icon: "✅", label: "Confirmation SMS sent", tag: "Notify" },
    ],
  },
  {
    id: "sdr",
    role: "03",
    title: "AI Sales Rep (SDR)",
    desc: "Chats with website visitors, qualifies leads on the spot, and books meetings straight onto your calendar.",
    tasks: ["Live chat lead qualification", "Auto-books discovery calls", "Follows up on cold leads"],
    flow: [
      { icon: "💬", label: "Visitor opens website chat", tag: "Trigger" },
      { icon: "🤖", label: "AI qualifies & scores the lead", tag: "AI Layer" },
      { icon: "📬", label: "Discovery call auto-booked", tag: "Action" },
      { icon: "📊", label: "Lead synced to CRM", tag: "Sync" },
    ],
  },
  {
    id: "support",
    role: "04",
    title: "AI Support Agent",
    desc: "Resolves common customer questions instantly across your website, WhatsApp, and email — escalates only what needs a human.",
    tasks: ["Answers FAQs instantly", "Handles order/booking status", "Escalates edge cases to your team"],
    flow: [
      { icon: "📥", label: "Customer message received", tag: "Trigger" },
      { icon: "🤖", label: "AI matches intent & answers", tag: "AI Layer" },
      { icon: "📦", label: "Order/booking status pulled live", tag: "Action" },
      { icon: "🚨", label: "Edge case escalated to you", tag: "Escalate" },
    ],
  },
  {
    id: "ops",
    role: "05",
    title: "AI Ops Assistant",
    desc: "Connects your CRM, sheets, inbox and tools so data moves itself — no more copy-pasting between apps.",
    tasks: ["Syncs CRM & spreadsheets", "Auto-updates records from forms/emails", "Sends internal alerts on Slack"],
    flow: [
      { icon: "📝", label: "Form or email comes in", tag: "Trigger" },
      { icon: "🤖", label: "AI extracts & structures data", tag: "AI Layer" },
      { icon: "📊", label: "CRM & sheets auto-updated", tag: "Sync" },
      { icon: "🔔", label: "Slack alert fired to team", tag: "Notify" },
    ],
  },
  {
    id: "outreach",
    role: "06",
    title: "AI Outreach Agent",
    desc: "Researches prospects and sends personalised email/LinkedIn sequences that book meetings while you sleep.",
    tasks: ["Personalised cold outreach", "Follow-up sequencing", "Meeting booking on autopilot"],
    flow: [
      { icon: "🔍", label: "Prospect list loaded", tag: "Trigger" },
      { icon: "🤖", label: "AI researches & personalises", tag: "AI Layer" },
      { icon: "📤", label: "Sequence sent across channels", tag: "Action" },
      { icon: "📅", label: "Reply books a meeting", tag: "Convert" },
    ],
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  desc: string;
  points: string[];
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discovery & Audit",
    desc: "We map your current workflows, pinpoint where time and leads leak, and size the ROI — in a free 30-minute call.",
    points: ["Workflow & tooling audit", "ROI sized before you commit", "No-obligation, 30 minutes"],
  },
  {
    n: "02",
    title: "AI Employee Blueprint",
    desc: "We design exactly which AI employee(s) you need, what they'll do, and how they plug into your existing tools.",
    points: ["Exact role + scope defined", "Integration plan mapped", "Sign-off before any build work"],
  },
  {
    n: "03",
    title: "Build & QA",
    desc: "We build and rigorously test every workflow on sandboxed data before it ever touches your live business.",
    points: ["Built on sandboxed data first", "Tested against real scenarios", "Zero risk to your live business"],
  },
  {
    n: "04",
    title: "Launch & Support",
    desc: "Go live with full documentation, a walkthrough for your team, and ongoing support to keep things running.",
    points: ["Full documentation handed over", "Live walkthrough for your team", "Ongoing support after go-live"],
  },
];

export type Industry = {
  id: string;
  label: string;
  blurb: string;
  useCases: string[];
  projectId?: string;
};

export const industries: Industry[] = [
  {
    id: "hospitality",
    label: "Events & Hospitality",
    blurb: "Guests expect an instant reply — AI employees handle bookings, FAQs, and follow-ups the moment an inquiry comes in.",
    useCases: [
      "AI receptionist answers booking calls 24/7",
      "Automated inquiry-to-confirmation flow",
      "Multi-step booking wizard with live availability",
    ],
    projectId: "checkmate",
  },
  {
    id: "hotels",
    label: "Hotels & Resorts",
    blurb: "Seasonal pricing and limited rooms make manual booking risky — an AI-backed booking flow keeps availability accurate without double-bookings.",
    useCases: [
      "Multi-step booking wizard with live availability",
      "Automated inquiry-to-confirmation flow",
      "Admin dashboard for pricing & bookings",
    ],
    projectId: "grand-cottages",
  },
  {
    id: "retail",
    label: "Retail",
    blurb: "Shoppers have the same questions on repeat — an AI sales rep answers instantly and keeps them moving toward a decision.",
    useCases: [
      "Live chat product & sizing guidance",
      "Interactive comparison tools embedded on-site",
      "Booking integration with fallback to a human",
    ],
    projectId: "journey-jewelers",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    blurb: "From product questions to order status, an AI agent keeps shoppers moving toward checkout instead of bouncing.",
    useCases: [
      "Live storefront Q&A and recommendations",
      "Order status lookups on demand",
      "WhatsApp checkout & abandoned-cart follow-up",
    ],
    projectId: "womens-lounge",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    blurb: "Patients book and ask questions outside office hours — an AI receptionist captures every one without adding staff.",
    useCases: [
      "24/7 appointment booking & rescheduling",
      "Pre-visit FAQ handling",
      "Urgent-call routing straight to your team",
    ],
    projectId: "heartbeat",
  },
  {
    id: "education",
    label: "Education",
    blurb: "Prospective students ask the same questions on repeat — an AI support agent answers instantly and routes real leads to your team.",
    useCases: [
      "Application & program FAQ automation",
      "Lead qualification before a human call",
      "Guidance-content delivery on demand",
    ],
    projectId: "ghawas",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    blurb: "Buyers and renters contact several agents at once — the AI receptionist that replies first usually books the showing.",
    useCases: [
      "AI receptionist books property showings 24/7",
      "Lead qualification & follow-up on new inquiries",
      "Instant FAQ answers on listings, pricing & availability",
    ],
  },
  {
    id: "legal",
    label: "Legal Services",
    blurb: "Potential clients often call after hours with urgent questions — an AI intake assistant captures every lead and screens them before a lawyer's time is spent.",
    useCases: [
      "24/7 intake calls & consultation booking",
      "Pre-screens case details before a callback",
      "Automated follow-up on cold leads",
    ],
  },
  {
    id: "finance",
    label: "Financial Services & Insurance",
    blurb: "Clients expect fast, accurate answers on policies and appointments — an AI agent handles the repetitive questions so your advisors focus on closing.",
    useCases: [
      "AI support agent answers policy & coverage FAQs",
      "Appointment booking for consultations",
      "Lead qualification before an advisor call",
    ],
  },
  {
    id: "automotive",
    label: "Automotive",
    blurb: "Car buyers contact multiple dealers at once — the AI sales rep that replies fastest usually wins the appointment.",
    useCases: [
      "Instant lead qualification on inventory inquiries",
      "Test-drive & service appointment booking",
      "Follow-up sequencing on warm leads",
    ],
  },
  {
    id: "home-services",
    label: "Home Services & Contractors",
    blurb: "Missed calls mean missed jobs — an AI voice receptionist answers every inquiry and books the estimate before a competitor does.",
    useCases: [
      "AI receptionist books on-site estimates 24/7",
      "Urgent job requests routed straight to your team",
      "Follow-up on quotes that haven't converted yet",
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants & Food Service",
    blurb: "Reservation calls and repeat questions eat into service time — an AI receptionist handles bookings and FAQs without pulling staff off the floor.",
    useCases: [
      "AI receptionist takes reservations & answers hours/menu questions",
      "Large-party & event booking requests routed to you",
      "Automated waitlist & confirmation messages",
    ],
  },
  {
    id: "fitness",
    label: "Fitness & Wellness",
    blurb: "Trial sign-ups and class questions come in around the clock — an AI agent keeps members engaged without adding front-desk hours.",
    useCases: [
      "AI chat answers class schedules & membership FAQs",
      "Trial sign-up & consultation booking",
      "Re-engagement follow-ups on inactive leads",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  summary: string;
  highlights: string[];
  href?: string; // PLACEHOLDER live link — fill in when public
  status: "Live" | "Prototype";
  problem: string;
  approach: string;
  result: string;
};

export const projects: Project[] = [
  {
    id: "checkmate",
    name: "CheckMate Events",
    category: "Events & Hospitality",
    tags: ["Next.js 15", "Framer Motion"],
    summary:
      "Full brand site for a Lahore-based event management company — services, filterable portfolio gallery, and a 4-step booking inquiry flow.",
    highlights: [
      "Filterable portfolio gallery across 6 event categories",
      "4-step multi-step inquiry form (React Hook Form + Zod)",
      "Scroll-driven motion system throughout",
    ],
    status: "Live",
    problem:
      "CheckMate needed a brand site that could actually convert event inquiries — not just look good. Their old presence had no structured way to capture leads across different event categories.",
    approach:
      "Built a full Next.js 15 site with Framer Motion throughout, a filterable portfolio gallery spanning 6 event categories, and a 4-step multi-step inquiry form (React Hook Form + Zod validation) that routes structured leads straight to their inbox.",
    result:
      "A live, production site that turns category browsing into a qualified inquiry in 4 steps — no more back-and-forth emails to figure out what a lead actually wants.",
  },
  {
    id: "grand-cottages",
    name: "Grand Cottages Kalam",
    category: "Hospitality & Booking",
    tags: ["Next.js", "Booking Engine"],
    summary:
      "A mountain resort site with a complete 5-step booking wizard and a full admin dashboard for managing bookings, pricing, and availability.",
    highlights: [
      "5-step booking flow: dates → room → details → review → payment",
      "Admin dashboard: bookings board, calendar, seasonal pricing, inquiries",
      "22 routes, fully responsive, accessibility-passed",
    ],
    status: "Prototype",
    problem:
      "Grand Cottages Kalam needed to take booking off phone calls and WhatsApp entirely — a resort with seasonal pricing and limited rooms can't manage availability manually without double-bookings.",
    approach:
      "Built a complete 5-step booking wizard (dates → room → details → review → payment) backed by a full admin dashboard — bookings board, calendar view, seasonal pricing controls, and an inquiries inbox — across 22 fully responsive, accessibility-passed routes.",
    result:
      "A self-serve booking system a small team can run without spreadsheets, with a single source of truth for availability and pricing.",
  },
  {
    id: "journey-jewelers",
    name: "Journey Jewelers",
    category: "Retail",
    tags: ["Booking", "Interactive Tools"],
    summary:
      "Redesign for a real Oklahoma City jewelry shop — added the booking, gallery and interactive features their live site was missing.",
    highlights: [
      "Embedded Square booking with fallback",
      "Before/after craftsmanship gallery with filters",
      "Interactive ring-size guide & 4Cs diamond comparison tool",
    ],
    status: "Prototype",
    problem:
      "Journey Jewelers is a real Oklahoma City jewelry shop whose live site was missing the booking, gallery, and interactive tools competitors already had — losing shoppers who wanted to browse before walking in.",
    approach:
      "Designed a redesign with embedded Square booking (with a fallback path), a filterable before/after craftsmanship gallery, and two interactive tools: a ring-size guide and a 4Cs diamond comparison tool.",
    result:
      "A site that does the pre-sale education work a jeweler's staff would otherwise spend time on in-store — before a customer ever calls.",
  },
  {
    id: "womens-lounge",
    name: "Women's Lounge",
    category: "E-Commerce",
    tags: ["Next.js", "Shopify API"],
    summary:
      "Premium e-commerce storefront for hijabs, strollers and accessories, backed live by the Shopify Storefront API.",
    highlights: [
      "Live Shopify Storefront API integration",
      "Cart state via Zustand, WhatsApp checkout CTA",
      "Custom design system, no off-the-shelf theme",
    ],
    status: "Live",
    problem:
      "Women's Lounge needed a premium storefront for hijabs, strollers and accessories that didn't feel like an off-the-shelf theme — and that could sell live, not just display a catalog.",
    approach:
      "Built a custom Next.js storefront wired directly into the Shopify Storefront API for live inventory and checkout, with cart state managed in Zustand and a WhatsApp checkout CTA for customers who prefer messaging over forms.",
    result:
      "A live, fully custom e-commerce experience selling real inventory — not a templated theme with a logo swapped in.",
  },
  {
    id: "heartbeat",
    name: "HeartBeat Cardiology",
    category: "Healthcare",
    tags: ["Static Site"],
    summary:
      "Premium cardiac-care clinic site built to establish trust and drive appointment requests for a specialist practice.",
    highlights: [
      "Clean clinical brand identity",
      "Appointment-request focused layout",
      "Fast, lightweight, zero-dependency build",
    ],
    status: "Prototype",
    problem:
      "A specialist cardiac-care practice needed a site that built trust fast and made requesting an appointment the obvious next step — speed and clarity matter when patients are anxious.",
    approach:
      "Built a clean, clinical-grade brand identity as a fast, zero-dependency static site, with every layout decision oriented around one outcome: an appointment request.",
    result:
      "A lightweight site that loads instantly and gives a cardiac-care practice a credible, trust-building presence without unnecessary complexity.",
  },
  {
    id: "ghawas",
    name: "Ghawas",
    category: "EdTech",
    tags: ["Full Stack", "Analytics"],
    summary:
      "A graduate-program guidance platform helping international students navigate applications — frontend, backend and analytics pipeline.",
    highlights: [
      "Full frontend + backend application",
      "Built-in analytics pipeline",
      "Content system for guidance articles",
    ],
    status: "Prototype",
    problem:
      "International students applying to graduate programs face the same confusing questions over and over — Ghawas needed a platform that could guide them at scale, not one advisor at a time.",
    approach:
      "Built a full-stack platform: frontend, backend, a content system for guidance articles, and a built-in analytics pipeline to track what students actually engage with.",
    result:
      "A guidance platform that scales advice that used to require a one-on-one human conversation for every student.",
  },
];

export type PricingPlan = {
  label: string;
  price: string;
  unit?: string;
  desc: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    label: "Starter",
    price: "from $999",
    unit: "/project",
    desc: "One AI employee, live in under two weeks.",
    features: [
      "1 AI employee (chatbot, voice, or workflow)",
      "Deployed on website or WhatsApp",
      "2 tool integrations",
      "30-day post-launch support",
    ],
    cta: "Get Started",
  },
  {
    label: "Growth",
    price: "from $2,499",
    unit: "/project",
    desc: "A small AI workforce across your business.",
    features: [
      "Up to 5 automation workflows",
      "AI agent + voice receptionist",
      "Full CRM & tool integration",
      "Custom web development included",
      "90-day support & maintenance",
    ],
    featured: true,
    cta: "Most Popular — Start Now",
  },
  {
    label: "Enterprise",
    price: "Custom",
    desc: "Full-scale AI workforce infrastructure.",
    features: [
      "Unlimited workflows & AI employees",
      "Dedicated project manager",
      "Priority build & deployment",
      "Ongoing retainer support",
    ],
    cta: "Talk to Us",
  },
];

export const faqs = [
  {
    q: "What exactly is an “AI employee”?",
    a: "It's an AI agent given a specific job — answering calls, qualifying leads, handling support — with access to the tools it needs to actually do that job, not just chat about it.",
  },
  {
    q: "How long does a build take?",
    a: "Most single AI employees go live in 1–2 weeks. Multi-agent systems (Growth tier) typically take 3–5 weeks depending on integrations.",
  },
  {
    q: "Do I need technical knowledge to use this?",
    a: "No. We handle setup, training and documentation. You get a working system and a walkthrough — not a tool you have to learn to configure.",
  },
  {
    q: "What if it doesn't work for my business?",
    a: "Every engagement starts with a free audit call where we tell you honestly whether automation will move the needle before you pay anything.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "Yes — we integrate with most CRMs, calendars, spreadsheets, and communication tools. If it has an API, we can usually connect it.",
  },
];
