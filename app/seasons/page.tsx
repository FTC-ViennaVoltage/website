"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function SeasonsPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = cardsRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 text-center border-b border-border"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,.08) 0%, transparent 70%)",
        }}
      >
        <p className="text-muted text-sm tracking-widest uppercase mb-4">
          Vienna Voltage · FTC 27427
        </p>
        <h1 className="font-sans text-[3rem] md:text-[4rem] font-bold text-voltage-primary leading-tight">
          Our Seasons
        </h1>
        <p className="text-muted max-w-[620px] mx-auto mt-5 text-lg leading-relaxed">
          Each season is a new challenge — a new game, a new robot, and a new
          story. Pick a year to explore the robot, the build log, competition
          results, and everything in between.
        </p>
      </section>

      {/* Seasons Grid */}
      <section
        ref={cardsRef}
        className="px-8 max-w-[900px] mx-auto"
        style={{ padding: "80px 32px 120px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2026-27 Current Season */}
          <Link
            href="/seasons/2627"
            className="fade-in group relative block rounded-[22px] border border-border overflow-hidden transition-all duration-300 hover:border-[rgba(59,130,246,.5)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(59,130,246,.1)]"
            style={{ background: "var(--bg3)" }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,.13), transparent 70%)",
              }}
            />

            {/* Content */}
            <div className="relative z-[1] p-11">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-[rgba(52,211,153,.3)] text-[#34d399] bg-[rgba(52,211,153,.1)] mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
                </span>
                Current Season
              </span>

              {/* Year */}
              <h2 className="font-sans text-[3.2rem] font-bold text-voltage-primary leading-none">
                26<span className="text-accent-light">/</span>27
              </h2>

              {/* Game */}
              <p className="text-muted font-medium mt-2">BIOBUZZ</p>

              {/* Stats */}
              <div className="flex gap-7 border-t border-border pt-6 mt-7">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Competitions</p>
                  <p className="text-voltage-primary font-semibold mt-1">—</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Awards</p>
                  <p className="text-voltage-primary font-semibold mt-1">—</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Ranking</p>
                  <p className="text-voltage-primary font-semibold mt-1">—</p>
                </div>
              </div>

              {/* CTA */}
              <p className="text-accent-light mt-7 text-sm font-medium">
                View season{" "}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>

            {/* Bottom divider */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3b82f6, transparent)",
              }}
            />
          </Link>

          {/* 2025-26 Last Season */}
          <Link
            href="/seasons/2526"
            className="fade-in group relative block rounded-[22px] border border-border overflow-hidden transition-all duration-300 hover:border-[rgba(59,130,246,.5)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(59,130,246,.1)]"
            style={{ background: "var(--bg3)" }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,.13), transparent 70%)",
              }}
            />

            {/* Content */}
            <div className="relative z-[1] p-11">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-[rgba(59,130,246,.25)] text-accent bg-[rgba(59,130,246,.1)] mb-5">
                Last Season
              </span>

              {/* Year */}
              <h2 className="font-sans text-[3.2rem] font-bold text-voltage-primary leading-none">
                25<span className="text-accent-light">/</span>26
              </h2>

              {/* Game */}
              <p className="text-muted font-medium mt-2">DECODE</p>

              {/* Stats */}
              <div className="flex gap-7 border-t border-border pt-6 mt-7">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Competitions</p>
                  <p className="text-voltage-primary font-semibold mt-1">2</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Awards</p>
                  <p className="text-voltage-primary font-semibold mt-1">2</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Ranking</p>
                  <p className="text-voltage-primary font-semibold mt-1">7 (best)</p>
                </div>
              </div>

              {/* CTA */}
              <p className="text-accent-light mt-7 text-sm font-medium">
                View season{" "}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>

            {/* Bottom divider */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3b82f6, transparent)",
              }}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
