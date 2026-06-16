"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface SeasonDetailProps {
  seasonName: string;
  gameName: string;
  seasonShort: string;
}

/* ─── Data ─── */

const subsystems = [
  { icon: "⚙️", name: "Drivetrain", tag: "HW", description: "Placeholder — describe your drivetrain design, gear ratios, wheel type, and any design trade-offs here." },
  { icon: "🦾", name: "Intake/Scoring", tag: "HW", description: "Placeholder — describe how the robot picks up and scores game elements, mechanism type, iterations." },
  { icon: "🧱", name: "Lift/Extension", tag: "HW", description: "Placeholder — describe your linear slides, arm, or other extension mechanism and its range of motion." },
  { icon: "💻", name: "Autonomous", tag: "SW", description: "Placeholder — describe your autonomous strategy, path planning approach, and reliability." },
  { icon: "🎮", name: "TeleOp", tag: "SW", description: "Placeholder — describe driver control scheme, automation assists, and field-centric modes." },
  { icon: "📡", name: "Sensors", tag: "HW", description: "Placeholder — describe sensors used (distance, color, IMU, encoders) and how they integrate with software." },
];

const milestones = [
  { date: "Month Year", title: "Kickoff & game analysis", tag: "Planning", tagClass: "hw", body: "Placeholder — describe what you learned at kickoff, initial game analysis, strategy brainstorming, and early prototyping ideas." },
  { date: "Month Year", title: "Drivetrain prototype", tag: "Hardware", tagClass: "hw", body: "Placeholder — describe first physical prototype, materials chosen, assembly challenges, and lessons learned." },
  { date: "Month Year", title: "First autonomous program", tag: "Software", tagClass: "sw", body: "Placeholder — describe your first working autonomous, testing methodology, and accuracy results." },
  { date: "Month Year", title: "Scoring mechanism iteration", tag: "Hardware", tagClass: "hw", body: "Placeholder — log a key design iteration, what failed, what improved, and quantitative results." },
  { date: "Month Year", title: "Scrimmage / qualifier results", tag: "Competition", tagClass: "test", body: "Placeholder — summarize competition performance, match results, and adjustments made." },
];

const posts = [
  { cat: "competition", icon: "🏆", title: "Add your competition update title here", body: "Placeholder — describe match results, alliance selections, and key moments from the event.", date: "Month DD, 2026" },
  { cat: "build", icon: "🔧", title: "Add a build milestone update here", body: "Placeholder — share a significant build milestone, design decision, or mechanical improvement.", date: "Month DD, 2026" },
  { cat: "outreach", icon: "🏫", title: "Add an outreach event update here", body: "Placeholder — describe a community outreach event, demo, or mentorship activity.", date: "Month DD, 2026" },
  { cat: "team", icon: "👥", title: "Add a team news update here", body: "Placeholder — share team news such as new members, sponsorships, or milestones.", date: "Month DD, 2026" },
  { cat: "build", icon: "⚡", title: "Add another build or software update", body: "Placeholder — document another iteration, software feature, or testing session.", date: "Month DD, 2026" },
  { cat: "team", icon: "📰", title: "Season kickoff recap", body: "Placeholder — recap the season kickoff event, team goals, and initial excitement.", date: "Month DD, 2025" },
];

const navLinks = ["Robot", "Subsystems", "Build Log", "Updates", "Awards"];
const navIds = ["robot", "subsystems", "buildlog", "updates", "awards"];
const filterOptions = ["All", "Competition", "Build", "Outreach", "Team"];

/* ─── Component ─── */

export default function SeasonDetail({ seasonName, gameName, seasonShort }: SeasonDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [activeSubsystem, setActiveSubsystem] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");

  // Fade-in observer
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

    const elements = containerRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Page nav scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = navIds.map((id) => document.getElementById(id));
      const scrollY = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveNav(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = activeFilter === "All"
    ? posts
    : posts.filter((p) => p.cat.toLowerCase() === activeFilter.toLowerCase());

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 130, behavior: "smooth" });
    }
  }, []);

  const tagColor = (tagClass: string) => {
    switch (tagClass) {
      case "hw": return { bg: "rgba(59,130,246,.12)", text: "#60a5fa", border: "rgba(59,130,246,.3)" };
      case "sw": return { bg: "rgba(139,92,246,.12)", text: "#8b5cf6", border: "rgba(139,92,246,.3)" };
      case "test": return { bg: "rgba(16,185,129,.12)", text: "#10b981", border: "rgba(16,185,129,.3)" };
      default: return { bg: "rgba(59,130,246,.12)", text: "#60a5fa", border: "rgba(59,130,246,.3)" };
    }
  };

  return (
    <div ref={containerRef}>
      {/* ─── Breadcrumb ─── */}
      <div className="sticky top-0 z-[5] pt-24 pb-3 px-8 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/seasons" className="hover:text-accent-light transition-colors duration-200">
            Seasons
          </Link>
          <span className="text-muted/60">›</span>
          <span className="text-voltage-primary">{seasonName}</span>
        </nav>
      </div>

      {/* ─── Page Hero ─── */}
      <section
        className="relative pt-40 pb-20 px-8 border-b border-border"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,.08) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted text-sm tracking-widest uppercase mb-4">
            FTC Team 27427 · Vienna Voltage
          </p>
          <h1 className="font-sans text-[3rem] md:text-[4rem] font-bold text-voltage-primary leading-tight">
            Season {seasonName}
          </h1>
          <p className="text-muted max-w-[640px] mx-auto mt-5 text-lg leading-relaxed">
            {gameName} — everything about our robot, build process, competition results, and season updates in one place.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["🤖 Robot", "🔧 Build Log", "📰 Updates", "🏆 Awards"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-md text-sm border"
                style={{
                  background: "rgba(59,130,246,.1)",
                  borderColor: "rgba(59,130,246,.25)",
                  color: "#60a5fa",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Page Nav (sticky secondary) ─── */}
      <nav
        className="sticky top-[64px] z-[8] border-b border-border backdrop-blur-md"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-5xl mx-auto px-8 flex gap-6 overflow-x-auto">
          {navLinks.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollToSection(navIds[i])}
              className={`relative py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeNav === i
                  ? "text-accent"
                  : "text-muted hover:text-voltage-primary"
              }`}
            >
              {label}
              {activeNav === i && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Robot Section ─── */}
      <section id="robot" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Meet the machine</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">
            Robot
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Photo placeholder */}
            <div
              className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[360px]"
              style={{
                background: "var(--bg3)",
                borderColor: "rgba(59,130,246,.25)",
              }}
            >
              <span className="text-5xl mb-4">🤖</span>
              <p className="text-muted text-sm">Add robot photo here</p>
            </div>

            {/* Spec table */}
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Robot name", "TBD — add your robot\u2019s name"],
                    ["Season", `FIRST Tech Challenge ${seasonShort}`],
                    ["Game", gameName],
                    ["Drive train", "Placeholder — e.g. mecanum, tank, swerve"],
                    ["Control system", "REV Control Hub"],
                    ["Programming language", "Java (FTC SDK)"],
                    ["Dimensions", "Placeholder — L × W × H (in)"],
                    ["Weight", "Placeholder — lbs"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="py-3 pr-6 text-muted whitespace-nowrap">{label}</td>
                      <td className="py-3 text-voltage-primary font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Subsystems Section ─── */}
      <section id="subsystems" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">How it works</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">
            Subsystems
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Left nav */}
            <div className="flex flex-col gap-2">
              {subsystems.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveSubsystem(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                    activeSubsystem === i
                      ? "border-[rgba(59,130,246,.3)]"
                      : "border-transparent hover:border-border"
                  }`}
                  style={{
                    background: activeSubsystem === i ? "rgba(59,130,246,.08)" : "transparent",
                  }}
                >
                  <span className="text-xl">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${activeSubsystem === i ? "text-voltage-primary" : "text-muted"}`}>
                      {s.name}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(59,130,246,.1)",
                      color: "#60a5fa",
                      border: "1px solid rgba(59,130,246,.2)",
                    }}
                  >
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Right detail panel */}
            <div
              className="rounded-2xl border border-border p-8 min-h-[300px] relative overflow-hidden"
              style={{ background: "var(--bg3)" }}
            >
              <div
                key={activeSubsystem}
                className="animate-[fadeSlideIn_0.35s_ease_forwards]"
              >
                <p className="text-muted text-xs uppercase tracking-widest mb-2">
                  Subsystem {String(activeSubsystem + 1).padStart(2, "0")} / {String(subsystems.length).padStart(2, "0")}
                </p>
                <span className="text-4xl block mb-4">{subsystems[activeSubsystem].icon}</span>
                <h3 className="font-sans text-2xl font-bold text-voltage-primary mb-3">
                  {subsystems[activeSubsystem].name}
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  {subsystems[activeSubsystem].description}
                </p>
                <span
                  className="inline-flex text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(59,130,246,.1)",
                    color: "#60a5fa",
                    border: "1px solid rgba(59,130,246,.2)",
                  }}
                >
                  {subsystems[activeSubsystem].tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Build Log Section ─── */}
      <section id="buildlog" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Engineering notebook</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">
            Build log
          </h2>

          {/* Timeline rail */}
          <div className="relative mb-10">
            {/* Track */}
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "var(--bg3)" }}>
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${((currentMilestone + 1) / milestones.length) * 100}%` }}
              />
            </div>

            {/* Nodes */}
            <div className="flex justify-between mt-3">
              {milestones.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentMilestone(i)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      i <= currentMilestone
                        ? "bg-accent border-accent shadow-[0_0_8px_rgba(59,130,246,.4)]"
                        : "border-muted bg-transparent"
                    }`}
                  />
                  <span className="text-[10px] text-muted hidden md:block max-w-[80px] text-center leading-tight">
                    {m.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Milestone card */}
          <div
            className="rounded-2xl border border-border p-8 relative"
            style={{ background: "var(--bg3)" }}
          >
            <div key={currentMilestone} className="animate-[fadeSlideIn_0.35s_ease_forwards]">
              <p className="text-muted text-xs uppercase tracking-widest mb-4">
                {String(currentMilestone + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
              </p>
              <p className="text-muted text-sm mb-1">{milestones[currentMilestone].date}</p>
              <h3 className="font-sans text-xl md:text-2xl font-bold text-voltage-primary mb-3">
                {milestones[currentMilestone].title}
              </h3>
              <p className="text-muted leading-relaxed mb-5 max-w-2xl">
                {milestones[currentMilestone].body}
              </p>
              <span
                className="inline-flex text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: tagColor(milestones[currentMilestone].tagClass).bg,
                  color: tagColor(milestones[currentMilestone].tagClass).text,
                  border: `1px solid ${tagColor(milestones[currentMilestone].tagClass).border}`,
                }}
              >
                {milestones[currentMilestone].tag}
              </span>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setCurrentMilestone((prev) => Math.max(0, prev - 1))}
                disabled={currentMilestone === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-voltage-primary hover:border-accent/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "var(--bg)" }}
              >
                ←
              </button>
              <button
                onClick={() => setCurrentMilestone((prev) => Math.min(milestones.length - 1, prev + 1))}
                disabled={currentMilestone === milestones.length - 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-voltage-primary hover:border-accent/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "var(--bg)" }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Updates Section ─── */}
      <section id="updates" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">What we&apos;ve been up to</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-8">
            Season updates
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeFilter === opt
                    ? "text-accent border-[rgba(59,130,246,.3)]"
                    : "text-muted border-transparent hover:text-voltage-primary hover:border-border"
                }`}
                style={{
                  background: activeFilter === opt ? "rgba(59,130,246,.15)" : "transparent",
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <p className="text-muted text-sm mb-8">
            Showing {filteredPosts.length} update{filteredPosts.length !== 1 ? "s" : ""}
          </p>

          {/* Featured post */}
          {filteredPosts.length > 0 && (
            <div
              className="rounded-xl border border-border overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2 gap-0"
              style={{ background: "var(--card)" }}
            >
              {/* Photo placeholder */}
              <div
                className="flex items-center justify-center min-h-[220px]"
                style={{ background: "var(--bg3)" }}
              >
                <div className="text-center">
                  <span className="text-4xl block mb-2">{filteredPosts[0].icon}</span>
                  <p className="text-muted text-xs">Featured image</p>
                </div>
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <span
                  className="inline-flex self-start text-xs px-2.5 py-1 rounded-md mb-3"
                  style={{
                    background: "rgba(59,130,246,.1)",
                    color: "#60a5fa",
                    border: "1px solid rgba(59,130,246,.2)",
                  }}
                >
                  Featured
                </span>
                <h3 className="font-sans text-xl font-bold text-voltage-primary mb-2">
                  {filteredPosts[0].title}
                </h3>
                <p className="text-muted text-xs mb-2">{filteredPosts[0].date}</p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {filteredPosts[0].body}
                </p>
                <Link
                  href="#"
                  className="text-accent-light text-sm font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          )}

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPosts.slice(1).map((post, i) => (
              <article
                key={`${post.cat}-${i}`}
                className="group rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-[rgba(59,130,246,.35)] hover:-translate-y-0.5"
                style={{ background: "var(--card)" }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{post.icon}</span>
                    <span className="text-xs text-muted uppercase tracking-wide">{post.cat}</span>
                  </div>
                  <h4 className="font-sans text-base font-semibold text-voltage-primary mb-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-muted text-xs mb-3">{post.date}</p>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {post.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Awards Section ─── */}
      <section id="awards" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Recognition</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-8">
            Awards &amp; results
          </h2>

          <div
            className="rounded-2xl border border-border p-12 text-center"
            style={{ background: "var(--bg3)" }}
          >
            <p className="text-muted text-lg">
              🏅 Awards will appear here once the season gets going.
            </p>
            {/* TODO: Add award cards here — each with trophy icon, event name, award title, date */}
          </div>
        </div>
      </section>

      {/* Inline keyframes for panel animation */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
