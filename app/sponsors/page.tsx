"use client";

import { useEffect, useRef } from "react";

export default function SponsorsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = pageRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section
        className="relative border-b border-border pt-40 pb-20 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29,78,216,.2), transparent 70%)",
        }}
      >
        <div className="fade-in mx-auto max-w-[700px] px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Our supporters
          </p>
          <h1 className="font-sans text-4xl font-bold text-voltage-primary md:text-5xl">
            Sponsors
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Vienna Voltage is made possible by the generous support of
            individuals, businesses, and organizations who believe in the next
            generation of STEM talent.
          </p>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1100px]">
          {/* Gold Tier */}
          <div className="fade-in mb-16">
            <div className="mb-6 flex items-center gap-4">
              <span
                className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(245,158,11,.15)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,.3)",
                }}
              >
                Gold
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3.5 rounded-[14px] bg-card p-8 text-center transition-colors"
                  style={{ border: "1px solid rgba(245,158,11,.2)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(245,158,11,.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(245,158,11,.2)")
                  }
                >
                  <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-[rgba(255,255,255,.1)] bg-[var(--bg3)] aspect-[3/1] text-sm text-muted">
                    Add sponsor logo
                  </div>
                  <h3 className="font-sans font-semibold text-voltage-primary">
                    Sponsor Name
                  </h3>
                  <p className="text-sm text-muted">
                    Brief description of the sponsor and their contribution to
                    the team.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Silver Tier */}
          <div className="fade-in mb-16">
            <div className="mb-6 flex items-center gap-4">
              <span
                className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(148,163,184,.12)",
                  color: "#94a3b8",
                  border: "1px solid rgba(148,163,184,.25)",
                }}
              >
                Silver
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3.5 rounded-[14px] bg-card p-8 text-center transition-colors"
                  style={{ border: "1px solid rgba(148,163,184,.15)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(148,163,184,.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(148,163,184,.15)")
                  }
                >
                  <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-[rgba(255,255,255,.1)] bg-[var(--bg3)] aspect-[3/1] text-sm text-muted">
                    Add sponsor logo
                  </div>
                  <h3 className="font-sans font-semibold text-voltage-primary">
                    Sponsor Name
                  </h3>
                  <p className="text-sm text-muted">
                    Brief description of the sponsor and their contribution.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="fade-in">
            <div className="mb-6 flex items-center gap-4">
              <span
                className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(205,124,78,.12)",
                  color: "#cd7c4e",
                  border: "1px solid rgba(205,124,78,.25)",
                }}
              >
                Bronze
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3.5 rounded-[14px] bg-card p-8 text-center transition-colors"
                  style={{ border: "1px solid rgba(205,124,78,.15)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(205,124,78,.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(205,124,78,.15)")
                  }
                >
                  <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-[rgba(255,255,255,.1)] bg-[var(--bg3)] aspect-[2/1] text-sm text-muted">
                    Add sponsor logo
                  </div>
                  <h3 className="font-sans font-semibold text-voltage-primary">
                    Sponsor Name
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Become a Sponsor */}
      <section className="border-t border-b border-border bg-voltage-bg px-8 py-20">
        <div className="fade-in mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Partner with us
            </p>
            <h2 className="font-sans text-3xl font-bold text-voltage-primary md:text-4xl">
              Become a sponsor
            </h2>
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Gold */}
            <div
              className="relative overflow-hidden rounded-[14px] bg-card p-8"
              style={{ border: "1px solid rgba(245,158,11,.35)" }}
            >
              <div
                className="absolute top-0 left-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                }}
              />
              <p
                className="mb-1 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#f59e0b" }}
              >
                Gold
              </p>
              <p className="font-sans text-3xl font-bold text-voltage-primary">
                $500+
              </p>
              <p className="mb-6 text-sm text-muted">per season</p>
              <ul className="space-y-3">
                {[
                  "Large logo on robot and website",
                  "Featured in all competition materials",
                  "Named in social media posts",
                  "Letter of recognition",
                  "Outreach event co-branding",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-voltage-primary">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Silver */}
            <div
              className="relative overflow-hidden rounded-[14px] bg-card p-8"
              style={{ border: "1px solid rgba(148,163,184,.2)" }}
            >
              <div
                className="absolute top-0 left-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #94a3b8, transparent)",
                }}
              />
              <p
                className="mb-1 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#94a3b8" }}
              >
                Silver
              </p>
              <p className="font-sans text-3xl font-bold text-voltage-primary">
                $200+
              </p>
              <p className="mb-6 text-sm text-muted">per season</p>
              <ul className="space-y-3">
                {[
                  "Logo on website",
                  "Listed in competition materials",
                  "Named in social media posts",
                  "Letter of recognition",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-voltage-primary">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bronze */}
            <div
              className="relative overflow-hidden rounded-[14px] bg-card p-8"
              style={{ border: "1px solid rgba(205,124,78,.2)" }}
            >
              <div
                className="absolute top-0 left-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #cd7c4e, transparent)",
                }}
              />
              <p
                className="mb-1 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#cd7c4e" }}
              >
                Bronze
              </p>
              <p className="font-sans text-3xl font-bold text-voltage-primary">
                $50+
              </p>
              <p className="mb-6 text-sm text-muted">per season</p>
              <ul className="space-y-3">
                {[
                  "Name listed on website",
                  "Letter of recognition",
                  "Tax deductible donation",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-voltage-primary">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="mx-auto mb-6 max-w-[600px] text-muted">
              Interested in sponsoring Vienna Voltage? We&apos;d love to connect
              and tell you more about our team and mission.
            </p>
            <a
              href="mailto:ftcviennavoltage@gmail.com"
              className="inline-block rounded-lg bg-accent px-6 py-3 font-sans font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Contact Us About Sponsorship
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
