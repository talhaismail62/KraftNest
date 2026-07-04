// Central site config. Replace PLACEHOLDER values with the real ones.
export const site = {
  name: "KraftNest",
  sub: "Automations",
  slogan: "We Build AI Employees, Agents & Automations",
  domain: "kraftnest.co",
  url: "https://kraftnest.co",
  description:
    "KraftNest builds AI employees — voice receptionists, sales agents, support reps and ops assistants that work 24/7 so your team doesn't have to.",
  email: "kraftnestco@gmail.com",
  phone: "+92 305 5447927",
  whatsapp: "923055447927", // digits only, country code first
  booking: "https://cal.com/kraftnestco/30min",
  bookingEmbed: "https://cal.com/kraftnestco/30min?theme=dark&hide_event_type_details=1",
  socials: {
    linkedin: "https://www.linkedin.com/company/kraftnest-automations",
    instagram: "https://instagram.com/kraftnest.co",
    x: "#", // PLACEHOLDER
  },
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi KraftNest — I'd like to learn about building an AI employee for my business.",
)}`;

export const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  site.email,
)}&su=${encodeURIComponent("Free AI automation audit")}`;
