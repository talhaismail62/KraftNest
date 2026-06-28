const tools = [
  "Make.com",
  "OpenAI",
  "n8n",
  "Zapier",
  "Airtable",
  "HubSpot",
  "Notion",
  "Stripe",
  "Slack",
  "Twilio",
];

export function Ticker() {
  return (
    <div className="border-y border-white/[0.05] py-5 overflow-hidden">
      <div className="marquee">
        {[...tools, ...tools].map((t, i) => (
          <div
            key={`${t}-${i}`}
            className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.15em] text-muted font-heading whitespace-nowrap"
          >
            <span className="h-1 w-1 rounded-full bg-cyan/60" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
