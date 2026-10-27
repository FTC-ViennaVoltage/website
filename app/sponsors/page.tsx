import { existsSync } from "node:fs";
import { join } from "node:path";

const MAIL = "mailto:ftcviennavoltage@gmail.com?subject=Sponsoring%20Vienna%20Voltage";

type Sponsor = {
  name: string;
  url: string;
  /* Path under public/. Until the file exists the tile shows the name instead. */
  logo?: string;
  /* Fills the tile around a logo that doesn't match its shape */
  logoBg?: string;
  blurb: string;
};

/* Current sponsors, keyed by tier name. Each one fills an open spot. */
const SPONSORS: Record<string, Sponsor[]> = {
  Silver: [
    {
      name: "CleverSys Inc.",
      url: "https://cleversysinc.com/CleverSysInc/",
      logo: "/sponsors/cleversys.png",
      blurb:
        "CleverSys builds video-analysis software that automatically tracks and scores animal behavior for neuroscience and drug research labs.",
    },
    {
      name: "CyberMirage",
      url: "https://cybermirage.tech/",
      logo: "/sponsors/cybermirage.png",
      blurb: "CyberMirage is a cybersecurity company.",
    },
  ],
  Bronze: [
    {
      name: "Sunshine Academy",
      url: "https://sunshine-academy.org/",
      logo: "/sponsors/sunshine-academy.png",
      logoBg: "#fdce05",
      blurb:
        "Sunshine Academy offers classes for grades 1–12 in reading, writing, critical thinking and competition math, from MathCounts to AMC.",
    },
  ],
};

const hasFile = (publicPath?: string) =>
  !!publicPath && existsSync(join(process.cwd(), "public", publicPath));

const TIERS = [
  {
    name: "Gold",
    price: "$500+",
    slots: 2,
    field: "bg-yellow text-navy",
    perks: [
      "Large logo on robot and website",
      "Featured in all competition materials",
      "Named in social media posts",
      "Letter of recognition",
      "Outreach event co-branding",
    ],
  },
  {
    name: "Silver",
    price: "$200+",
    slots: 3,
    field: "bg-bg text-ink",
    perks: [
      "Logo on website",
      "Listed in competition materials",
      "Named in social media posts",
      "Letter of recognition",
    ],
  },
  {
    name: "Bronze",
    price: "$50+",
    slots: 4,
    field: "bg-navy text-navy-ink",
    perks: [
      "Name listed on website",
      "Letter of recognition",
      "Tax deductible donation",
    ],
  },
];

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[72px]">
        <div className="wrap grid12 gap-y-8 pt-[clamp(64px,14vh,160px)] pb-[clamp(56px,10vh,120px)] items-end">
          <p className="left-zone t-body measure after-lines order-2 min-[900px]:order-1">
            Vienna Voltage is made possible by individuals, businesses and
            organizations who want more students building robots. Thank you
            to everyone who backs our season.
          </p>
          <h1 className="on-axis t-display lines order-1 min-[900px]:order-2">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>Sponsors</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Open spots, by tier */}
      <section className="pb-[var(--section)]">
        <div className="wrap grid gap-y-14">
          {TIERS.map((tier) => (
            <div key={tier.name} className="grid12 gap-y-5" data-reveal>
              <div className="col-span-12 md:col-span-4">
                <h2 className="t-lead font-semibold">{tier.name} sponsors</h2>
                <p className="text-muted">{tier.price} per season</p>
              </div>
              <ul
                className={`col-span-12 md:col-start-6 md:col-span-7 grid gap-[var(--gutter)] ${
                  tier.slots === 2 ? "grid-cols-2" : tier.slots === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
                {(SPONSORS[tier.name] ?? []).map((sponsor) => (
                  <li key={sponsor.name}>
                    <SponsorTile sponsor={sponsor} />
                  </li>
                ))}
                {Array.from({
                  length: Math.max(0, tier.slots - (SPONSORS[tier.name]?.length ?? 0)),
                }).map((_, i) => (
                  <li key={i}>
                    <a
                      href={MAIL}
                      className="group flex flex-col justify-between aspect-[3/2] bg-surface hover:bg-yellow transition-colors duration-200 p-4"
                    >
                      <span className="font-semibold">Open spot</span>
                      <span className="t-small text-muted group-hover:text-navy">
                        Your logo here <span className="arrow">→</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What sponsorship builds */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {[
          { src: "/season/2526/finalrobot.webp", alt: "Our 2025–26 competition robot", w: 548, h: 588 },
          { src: "/season/2526/teampic.webp", alt: "The team at a qualifier", w: 1736, h: 1302 },
          { src: "/season/2526/stemnight.jpg", alt: "Our robot at an elementary school STEAM night", w: 1067, h: 800 },
          { src: "/season/2526/java.webp", alt: "A Java class we taught to middle schoolers", w: 1196, h: 1008 },
        ].map((p) => (
          <div key={p.src} className="aspect-square photo-frame" data-reveal>
            <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="photo" />
          </div>
        ))}
      </div>

      {/* Become a sponsor */}
      <section className="section bg-surface">
        <div className="wrap grid12 gap-y-6 mb-14">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Become a sponsor</h2>
          <p className="col-span-12 md:col-start-6 md:col-span-7 t-lead measure-wide" data-reveal>
            Sponsorship pays for parts, tournament fees and the outreach events
            where younger students build their first robot.
          </p>
        </div>
        <div className="wrap grid lg:grid-cols-3 gap-[var(--gutter)]">
          {TIERS.map((tier) => (
            <article key={tier.name} className={`${tier.field} p-7 md:p-8 flex flex-col`} data-reveal>
              <h3 className="t-head">{tier.name}</h3>
              <p className="t-lead font-semibold tabular mt-3">{tier.price} per season</p>
              <ul className="mt-8 grid gap-2">
                {tier.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="wrap grid12 mt-16">
          <div className="on-axis" data-reveal>
            <p className="t-lead measure-wide">
              Interested in sponsoring Vienna Voltage? We&apos;d love to tell you
              more about the team and what your support would build.
            </p>
            <a href={MAIL} className="btn mt-8">
              Contact us about sponsorship
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const host = new URL(sponsor.url).hostname.replace(/^www\./, "");
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className={`aspect-[3/2] bg-white flex items-center justify-center overflow-hidden photo-frame ${
          hasFile(sponsor.logo) && sponsor.logoBg ? "" : "p-4"
        }`}
        style={hasFile(sponsor.logo) && sponsor.logoBg ? { background: sponsor.logoBg } : undefined}
      >
        {hasFile(sponsor.logo) ? (
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            loading="lazy"
            className="photo !object-contain !bg-transparent"
          />
        ) : (
          <span className="t-lead font-extrabold tracking-[-0.03em] text-center leading-tight">
            {sponsor.name}
          </span>
        )}
      </div>
      <p className="font-semibold mt-3 underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-yellow transition-[text-decoration-color] duration-200">
        {sponsor.name} <span className="arrow">→</span>
      </p>
      <p className="t-small text-muted">{host}</p>
      <p className="t-small mt-1">{sponsor.blurb}</p>
    </a>
  );
}

