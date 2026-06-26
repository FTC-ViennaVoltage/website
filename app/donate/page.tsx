"use client";

import { useEffect, useRef } from "react";

export default function DonatePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll(".fade-in");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section
        className="relative pt-[160px] pb-20 px-6 text-center border-b border-border"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(29,78,216,.2) 0%,transparent 70%)",
        }}
      >
        <div className="max-w-[700px] mx-auto fade-in">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
            Support the team
          </p>
          <h1 className="font-sans text-[clamp(2.4rem,5vw,3.5rem)] font-bold text-voltage-primary tracking-tight mb-5">
            Donate
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-[600px] mx-auto">
            Your generosity helps us build robots, compete in FTC events, expand
            STEM outreach, and inspire the next generation of engineers in our
            community.
          </p>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto fade-in">
          <div
            className="rounded-[20px] p-[60px] text-center border border-border"
            style={{ background: "var(--bg3)" }}
          >
            <h2 className="font-sans text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-voltage-primary tracking-tight mb-4">
              Choose a Donation Method
            </h2>
            <p className="text-muted text-base leading-relaxed mb-10 max-w-[500px] mx-auto">
              Every contribution helps Team Vienna Voltage provide robotics
              education and competitive STEM experiences to our community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
                href="https://gofund.me/e5f7d42bb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-7 rounded-[10px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "#02a95c" }}
              >
                <span>💚</span> GoFundMe
              </a>
              
                href="https://hcb.hackclub.com/donations/start/27427-vienna-voltage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-7 rounded-[10px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "#0070ba" }}
              >
                <span>🔵</span> Official Donation Page
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What your donation supports */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14 fade-in">
            <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
              Where it goes
            </p>
            <h2 className="font-sans text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-voltage-primary tracking-tight">
              What your donation supports
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SupportCard
              icon="🤖"
              title="Robotics Equipment"
              description="Motors, sensors, electronics, building materials, and engineering tools used throughout the FTC season."
            />
            <SupportCard
              icon="🏆"
              title="Competitions"
              description="FTC registration fees, tournament participation, travel expenses, and team resources needed to compete."
            />
            <SupportCard
              icon="📚"
              title="STEM Outreach"
              description="Workshops, demonstrations, and hands-on robotics activities for elementary and middle school students."
            />
            <SupportCard
              icon="🚀"
              title="Future Growth"
              description="Expanding our outreach efforts and creating more opportunities for students to discover STEM."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="fade-in bg-card border border-border rounded-[14px] p-8 transition-all duration-200 hover:border-[rgba(59,130,246,.4)] hover:-translate-y-1">
      <span className="text-3xl mb-4 block">{icon}</span>
      <h3 className="font-sans text-lg font-semibold text-voltage-primary mb-2">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
