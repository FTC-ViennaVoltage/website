"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <MissionSection />
      <Divider />
      <ImpactSection />
      <CtaBand />
    </>
  );
}


function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;
    if (!hero) return;

    const coarse = matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!coarse && !reduce) {
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        hero.style.setProperty("--hx", `${x * 100}%`);
        hero.style.setProperty("--hy", `${y * 100}%`);
        if (content) {
          content.style.transform = `translate(${((x - 0.5) * 16).toFixed(1)}px,${((y - 0.5) * 11).toFixed(1)}px)`;
        }
      };
      const onLeave = () => {
        if (content) content.style.transform = "";
      };
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      return () => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      };
    }

    if (!reduce && grid) {
      const onScroll = () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          grid.style.transform = `translateY(${(y * 0.35).toFixed(1)}px) scale(1.18)`;
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex justify-center items-center text-center text-white px-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(rgba(8,13,20,.75),rgba(8,13,20,.85)),radial-gradient(circle at top right,#2563eb,#0f172a)",
        // @ts-expect-error css custom properties
        "--hx": "50%",
        "--hy": "32%",
      }}
    >
      {/* Mouse spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle 420px at var(--hx) var(--hy),rgba(96,165,250,.18),transparent 68%)",
        }}
      />

      {/* Grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-60 will-change-transform"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] max-w-[900px] transition-transform duration-[250ms] ease-out will-change-transform"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,.12)] border border-[rgba(59,130,246,.25)] rounded-full px-4 py-1.5 text-[0.8rem] text-accent-light font-medium mb-8 tracking-wider">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span></span>
          FTC Team 27427 · McLean, VA
        </div>

        <h1 className="font-sans text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight mb-3">
          Vienna
          <br />
          <span className="text-accent relative inline-block">
            Voltage
            <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-sm animate-[arc_2.5s_ease-in-out_infinite]" />
          </span>
        </h1>

        <p className="font-sans text-[1.3rem] text-accent-light font-medium mb-5">
          FIRST Tech Challenge
        </p>

        <p className="leading-[1.9] text-[1.15rem] mb-10 text-[rgba(232,237,244,.8)]">
          Building robots, community outreach, and winning competitions. We do it all.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/get-involved"
            className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-transparent transition-all duration-200 hover:bg-accent-dark hover:-translate-y-0.5"
          >
            Get Involved
          </Link>
          <Link
            href="/seasons"
            className="bg-transparent px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-border transition-all duration-200 hover:border-accent hover:text-accent-light"
          >
            Our Seasons
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted text-[0.75rem] tracking-[0.06em] uppercase">
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-[scrollline_1.8s_ease-in-out_infinite]" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────────────── */

function AboutSection() {
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
    <section ref={sectionRef} id="about" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center mt-15">
          {/* Text side */}
          <div className="fade-in">
            <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
              Who we are
            </p>
            <h2 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-bold text-voltage-primary mb-5 tracking-tight">
              Built by students.
              <br />
              Driven by curiosity.
            </h2>
            <p className="text-muted leading-[1.9] text-base mb-4">
              Vienna Voltage (FTC 27427) is a community-organized robotics team in Northern Virginia. We are dedicated to winning competitions and promoting STEM education to younger students throughout our community.
            </p>
            <p className="text-muted leading-[1.9] text-base mb-4">
              We&apos;re a group of high school students who believe the excitement of building and competing with robots can inspire younger learners for a lifetime.
            </p>
            <Link
              href="/team"
              className="mt-7 inline-flex items-center gap-2 text-accent font-semibold text-[0.9rem] hover:text-accent-light hover:gap-3.5 transition-all duration-200"
            >
              Meet the Team →
            </Link>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 fade-in">
            <StatCard value="FTC" label="Competition" />
            <StatCard value="27427" label="Team Number" />
            <StatCard value="K–8" label="Outreach Focus" />
            <StatCard value="VA" label="McLean Area" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-7 text-center transition-all duration-300 hover:border-[rgba(59,130,246,.45)] hover:-translate-y-1">
      <div className="font-sans text-[2.4rem] font-bold text-accent leading-none">
        {value}
      </div>
      <div className="text-[0.72rem] text-muted mt-2 font-semibold uppercase tracking-[0.08em]">
        {label}
      </div>
    </div>
  );
}

/* ─── Mission (Scrollytelling) ─────────────────────────────────────── */

const missionSteps = [
  {
    num: "01",
    label: "Educate",
    icon: "⚡",
    title: "Educate",
    desc: "Introduce younger students to robotics through lessons, hands-on workshops, and community outreach events.",
  },
  {
    num: "02",
    label: "Inspire",
    icon: "🔭",
    title: "Competitions",
    desc: "Lead our team to win competitions and help our team members find a genuine interest in robotics.",
  },
  {
    num: "03",
    label: "Empower",
    icon: "🤝",
    title: "Networking & Sponsorships",
    desc: "Connect with local businesses and schools to spread word about our mission, and to give our members affordable costs.",
  },
];

function MissionSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const n = missionSteps.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      const vh = window.innerHeight;
      const total = track!.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-track!.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const i = Math.min(n - 1, Math.max(0, Math.floor(p * n - 1e-6)));
      setActiveIdx(i);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const handleStepClick = (j: number) => {
    const track = trackRef.current;
    if (!track) return;
    const vh = window.innerHeight;
    const total = track.offsetHeight - vh;
    const docTop = track.getBoundingClientRect().top + window.scrollY;
    const y = docTop + ((j + 0.5) / n) * total;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="mission" className="!p-0 bg-voltage-bg">
      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center w-full max-w-[1200px] mx-auto">
            {/* Left side */}
            <div>
              <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
                What we stand for
              </p>
              <h2 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-bold text-voltage-primary mb-5 tracking-tight">
                Our Mission
              </h2>
              <div className="flex flex-col gap-1.5 mt-8 lg:mt-8 lg:flex-col max-lg:flex-row max-lg:flex-wrap max-lg:mt-5">
                {missionSteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className={`flex items-center gap-4 border cursor-pointer px-4.5 py-3.5 rounded-xl text-left w-full transition-all duration-300 max-lg:flex-1 max-lg:min-w-[120px] ${
                      activeIdx === i
                        ? "bg-[rgba(59,130,246,.08)] border-[rgba(59,130,246,.3)]"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <span
                      className={`font-sans text-[0.8rem] font-bold tracking-[0.1em] transition-colors duration-300 ${
                        activeIdx === i ? "text-accent" : "text-muted"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span
                      className={`font-sans text-[1.3rem] font-semibold transition-colors duration-300 hover:text-accent-light ${
                        activeIdx === i ? "text-voltage-primary" : "text-muted"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="relative min-h-[340px]">
              {/* Big number background */}
              <div className="absolute -top-[78px] right-0 font-sans text-[13rem] max-lg:text-[7rem] max-lg:-top-[44px] font-bold leading-none text-[rgba(96,165,250,.07)] pointer-events-none z-0">
                {String(activeIdx + 1).padStart(2, "0")}
              </div>

              {/* Panels */}
              <div className="relative h-[300px] z-[1]">
                {missionSteps.map((step, i) => (
                  <article
                    key={i}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeIdx === i
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-[34px] scale-[0.98] pointer-events-none"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[rgba(59,130,246,.12)] border border-[rgba(59,130,246,.25)] flex items-center justify-center text-[1.8rem] mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-sans text-[2rem] font-bold mb-4 text-voltage-primary">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-[1.9] text-[1.12rem] max-lg:text-base max-w-[480px]">
                      {step.desc}
                    </p>
                  </article>
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute left-0 right-0 -bottom-[26px] h-[3px] bg-border rounded-sm z-[1]">
                <div
                  className="h-full bg-gradient-to-r from-accent-dark to-accent-light rounded-sm shadow-[0_0_10px_rgba(59,130,246,.6)] scrolly-progress-fill"
                  style={{ width: `${((activeIdx + 1) / n) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute left-1/2 bottom-8 -translate-x-1/2 text-[0.72rem] tracking-[0.14em] uppercase text-muted flex items-center gap-2 opacity-70 max-lg:hidden">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Impact ───────────────────────────────────────────────────────── */

function ImpactSection() {
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
    <section ref={sectionRef} id="impact" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center fade-in">
          <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
            Community impact
          </p>
          <h2 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-bold text-voltage-primary mb-5 tracking-tight">
            Charging up our community
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
          <ImpactBox value="FTC" desc="Competitive Robotics" />
          <ImpactBox value="STEM" desc="Community Outreach" />
          <ImpactBox value="K–8" desc="Student Engagement" />
        </div>
      </div>
    </section>
  );
}

function ImpactBox({ value, desc }: { value: string; desc: string }) {
  return (
    <div className="bg-voltage-bg2 border border-border rounded-2xl px-8 py-10 text-center transition-all duration-300 hover:border-[rgba(59,130,246,.4)] hover:-translate-y-1.5 fade-in">
      <div className="font-sans text-[3rem] font-bold text-accent leading-none">
        {value}
      </div>
      <div className="text-muted text-[0.8rem] mt-2.5 uppercase tracking-[0.06em] font-medium">
        {desc}
      </div>
    </div>
  );
}

/* ─── CTA Band ─────────────────────────────────────────────────────── */

function CtaBand() {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = bandRef.current?.querySelectorAll(".fade-in");
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
    <div
      ref={bandRef}
      id="join"
      className="border-t border-b border-border py-20 px-8 text-center"
      style={{
        background: "linear-gradient(135deg, var(--bg3), var(--bg2))",
      }}
    >
      <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold mb-4 fade-in">
        Help Build the Future
      </h2>
      <p className="text-muted max-w-[560px] mx-auto mb-9 leading-[1.8] fade-in">
        We&apos;re partnering with elementary and middle schools to bring beginner-friendly robotics experiences to students who haven&apos;t had the chance yet.
      </p>
      <div className="flex gap-4 justify-center flex-wrap fade-in">
        <Link
          href="/get-involved"
          className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-transparent transition-all duration-200 hover:bg-accent-dark hover:-translate-y-0.5 inline-block"
        >
          Get Involved
        </Link>
        <Link
          href="/donate"
          className="bg-transparent text-voltage-primary px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] border border-border transition-all duration-200 hover:border-accent hover:text-accent-light inline-block"
        >
          Donate
        </Link>
      </div>
    </div>
  );
}

/* ─── Divider ──────────────────────────────────────────────────────── */

function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}
