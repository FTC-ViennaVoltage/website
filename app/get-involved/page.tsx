"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function GetInvolved() {
  return (
    <>
      <HeroSection />
      <WaysToHelp />
      <Divider />
      <ContactSection />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────── */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".fade-in");
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
    <section
      ref={sectionRef}
      className="relative pt-[160px] pb-20 px-8 text-center border-b border-border"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(29,78,216,.2) 0%,transparent 70%)",
      }}
    >
      <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-4 fade-in">
        Join the mission
      </p>
      <h1 className="font-sans text-[clamp(2.4rem,5vw,3.6rem)] font-bold text-voltage-primary tracking-tight mb-5 fade-in">
        Get Involved
      </h1>
      <p className="text-muted max-w-[640px] mx-auto leading-[1.8] text-base fade-in">
        Whether you&apos;re a student, teacher, parent, business, or community
        organization — there&apos;s a role for you in building the next
        generation of engineers and problem-solvers.
      </p>
    </section>
  );
}

/* ─── Ways to Help ────────────────────────────────────────────────── */

const cards = [
  {
    icon: "🤝",
    title: "Partner With Us",
    desc: "We're looking to collaborate with elementary and middle schools, libraries, and community organizations to bring robotics education to more students.",
  },
  {
    icon: "🎓",
    title: "Volunteer",
    desc: "Support outreach events, workshops, and demonstrations. Volunteers help make STEM education more accessible to young learners in our area.",
  },
  {
    icon: "🏆",
    title: "Sponsor Our Team",
    desc: "Businesses and organizations can support robotics equipment, competition travel, and outreach activities — with sponsorship recognition on our site and materials.",
  },
  {
    icon: "📢",
    title: "Spread the Word",
    desc: "Share our mission with schools, friends, and organizations that might want to support STEM and robotics education in our community.",
  },
];

function WaysToHelp() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".fade-in");
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
    <section ref={sectionRef} className="py-[90px] px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14 fade-in">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
            Ways to help
          </p>
          <h2 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-bold text-voltage-primary tracking-tight">
            How you can support us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="fade-in relative overflow-hidden bg-card border border-border rounded-2xl p-9 transition-all duration-300 hover:border-accent hover:-translate-y-0.5"
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
              <span className="text-3xl mb-4 block">{card.icon}</span>
              <h3 className="font-sans text-xl font-semibold text-voltage-primary mb-3">
                {card.title}
              </h3>
              <p className="text-muted leading-[1.8] text-[0.95rem]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────── */

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".fade-in");
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
    <section ref={sectionRef} className="py-[90px] px-8">
      <div className="max-w-[720px] mx-auto">
        <div
          className="fade-in border border-border rounded-[20px] p-[60px] text-center"
          style={{ background: "var(--bg3)" }}
        >
          <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-4">
            Contact Vienna Voltage
          </h2>
          <p className="text-muted leading-[1.8] mb-0">
            Interested in partnering, volunteering, or sponsoring?
          </p>

          <div className="space-y-4 mb-4">
            <p className="text-[0.95rem]" style={{ color: 'var(--text)' }}>
              📧 ftcviennavoltage@gmail.com
            </p>
            <a
              href="https://instagram.com/viennavoltagerobotics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-light text-[0.95rem] hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @viennavoltagerobotics
            </a>
          </div>

          <p className="text-muted text-sm mb-9">FTC Team Number: 27427</p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:ftcviennavoltage@gmail.com"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-transparent transition-all duration-200 hover:bg-accent-dark hover:-translate-y-0.5 inline-block"
            >
              Send an Email
            </a>
            <Link
              href="/donate"
              className="bg-transparent text-voltage-primary px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-border transition-all duration-200 hover:border-accent hover:text-accent-light inline-block"
            >
              Donate Instead
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Divider ─────────────────────────────────────────────────────── */

function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}
