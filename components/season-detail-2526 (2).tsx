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
  {
    icon: "⚙️", name: "Mecanum Drivetrain", tag: "HW",
    description: "Built a 4-wheel mecanum drivetrain enabling full omnidirectional movement including strafing. Carefully tuned torque ratios through experimentation to balance traversal speed against pushing power on the field.",
  },
  {
    icon: "🦾", name: "Claw Intake (V4)", tag: "HW",
    description: "Went through 4 major claw iterations. V1 had good reach but poor grip due to leverage and low contact area. V2 improved hold but was still inconsistent. V3 better fit the block. Final V4 is consistent with the intake claw and much more reliable — spring-loaded fingers with rubber inserts for friction.",
  },
  {
    icon: "📥", name: "Intake Mechanism (V4)", tag: "HW",
    description: "V1 could intake from one orientation but back was too wide and jammed constantly. V2 fixed the width but was still one-directional. V3 improved traversal speed. V4 achieved much higher consistency with more control over the intake process at the cost of slightly slower speed.",
  },
  {
    icon: "🔄", name: "Transfer System (V3)", tag: "HW",
    description: "V1 top-down transfer from intake was very inconsistent between intake and claw. V2 horizontal transfer (new claw design) was much more consistent with less moving parts and simple movements. V3 switched from active roller intake to claw intake, greatly improving size constraints and accuracy.",
  },
  {
    icon: "⏱️", name: "Timing Belt Drive", tag: "HW",
    description: "To minimize the number of servos spinning the two hex shafts, we used a timing belt system to drive both from a single servo. This reduced weight, eliminated failure points, and simplified intake actuation significantly.",
  },
  {
    icon: "💻", name: "Autonomous & TeleOp", tag: "SW",
    description: "Built autonomous routines for consistent field element scoring with experimentally determined torque ratios. Driver control systems were refined over the season — our software quality earned us the Control Award at the Alexandria qualifier.",
  },
];

const milestones = [
  { date: "September 2025", title: "Kickoff & game analysis", tag: "Planning", tagClass: "hw", body: "Extensive research on robot design for DECODE. Built extension pieces, field parameters, and custom game pieces to practice with. Began brainstorming robot strategy and initial design concepts." },
  { date: "Early October", title: "Drivetrain build", tag: "Hardware", tagClass: "hw", body: "Built the mecanum drivetrain. Began coding for wheel control and experimenting with torque ratios for the best balance of speed and pushing power on the field." },
  { date: "Late October", title: "Intake research", tag: "Hardware", tagClass: "hw", body: "Began research on intake devices. Brainstormed shooter and sorting mechanisms for game element handling. Started first CAD models in OnShape." },
  { date: "Early November", title: "CAD & first prototypes", tag: "Hardware", tagClass: "hw", body: "Began experimenting with CAD models of intake, spindexer, and shooter in OnShape. Built and tested first physical prototypes, documenting pros/cons of each iteration." },
  { date: "Late November", title: "Testing iterations", tag: "Software", tagClass: "sw", body: "Started testing effectiveness of different configurations. Iterated through multiple designs. Software team began writing and tuning autonomous routines alongside mechanical iterations." },
  { date: "Early December", title: "Richmond Qualifier — Innovate Award", tag: "Competition", tagClass: "test", body: "Finalized claw/intake after 4 major iterations each. Competed at Richmond VA Qualifier I — ranked 16th of 34 teams (3W–2L). Won the Innovate Award sponsored by RTX, 2nd Place, recognizing our engineering design process." },
  { date: "Late December", title: "Robot redesign", tag: "Hardware", tagClass: "hw", body: "Redesigned many parts of the robot in preparation for Alexandria. Addressed issues found at Richmond qualifier — improved transfer consistency and claw reliability." },
  { date: "January 2026", title: "Alexandria Qualifier — Control Award & Playoffs", tag: "Competition", tagClass: "test", body: "Competed at Alexandria VA Qualifier I — ranked 7th of 24 teams (4W–1L). Selected as Alliance Captain #5, made playoffs (2W–2L). Won the Control Award recognizing our software and autonomous systems." },
];

/* Gallery data — placeholder paths for you to replace with real images */
const galleries = {
  build: [
    { src: "", caption: "Mecanum drivetrain — early October build" },
    { src: "", caption: "Intake V1 CAD model (OnShape)" },
    { src: "", caption: "Intake V2 — width correction iteration" },
    { src: "", caption: "Intake V3 — fast traversal prototype" },
    { src: "", caption: "Intake V4 — final consistent design" },
    { src: "", caption: "Claw V1 — good reach, poor grip" },
    { src: "", caption: "Claw V2 — improved hold" },
    { src: "", caption: "Claw V3 — better block fit" },
    { src: "", caption: "Claw V4 — consistent & reliable" },
    { src: "", caption: "Transfer V1 — top-down (inconsistent)" },
    { src: "", caption: "Transfer V2 — horizontal design" },
    { src: "", caption: "Transfer V3 — claw-based intake" },
    { src: "", caption: "Timing belt system — single servo dual shaft" },
    { src: "", caption: "Final robot assembly" },
  ],
  competition: [
    { src: "", caption: "Richmond VA Qualifier I — Dec 13, 2025" },
    { src: "", caption: "Innovate Award (RTX) 2nd Place — Richmond" },
    { src: "", caption: "Match play at Richmond" },
    { src: "", caption: "Alexandria VA Qualifier I — Jan 17, 2026" },
    { src: "", caption: "Control Award — Alexandria" },
    { src: "", caption: "Alliance selection — Captain #5" },
    { src: "", caption: "Playoff match at Alexandria" },
  ],
  outreach: [
    { src: "", caption: "Java class at Herbert Hoover Middle School" },
    { src: "", caption: "Teaching ~30 students Java fundamentals" },
    { src: "", caption: "STEAM Night — Kent Gardens Elementary School" },
    { src: "", caption: "Robot demo for 200+ families at Kent Gardens" },
    { src: "", caption: "FLL coaching at Churchill Road Elementary" },
    { src: "", caption: "Guiding FLL teams through their season" },
  ],
};

const awards = [
  {
    icon: "⚡",
    name: "Innovate Award sponsored by RTX",
    place: "2nd Place",
    event: "Richmond, VA Qualifier I",
    date: "December 13, 2025",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.08)",
    border: "rgba(245,158,11,.22)",
    desc: "Recognized for our iterative engineering design process — 4 intake versions and 4 claw versions, each documented with CAD in OnShape and thorough pros/cons analysis. Our team's systematic approach to problem-solving stood out to the judges.",
  },
  {
    icon: "🎮",
    name: "Control Award",
    place: "Winner",
    event: "Alexandria, VA Qualifier I",
    date: "January 17, 2026",
    color: "#3b82f6",
    bg: "rgba(59,130,246,.08)",
    border: "rgba(59,130,246,.22)",
    desc: "Recognized for our software innovations — autonomous programming with experimentally tuned torque ratios, reliable field-element scoring routines, and polished TeleOp driver control. Won at our second qualifier where we also made playoffs as Alliance Captain.",
  },
];

const competitions = [
  {
    name: "Richmond, VA Qualifier I",
    date: "December 13, 2025",
    qualRank: "16 of 34",
    qualRecord: "3W – 2L",
    playoffs: false,
    awardColor: "#f59e0b",
    award: "⚡ Innovate Award (RTX) — 2nd Place",
    qualMatches: [
      { q: "Q2", score: 31, result: "W" },
      { q: "Q17", score: 104, result: "W" },
      { q: "Q21", score: 61, result: "W" },
      { q: "Q32", score: 100, result: "L" },
      { q: "Q36", score: 61, result: "L" },
    ],
  },
  {
    name: "Alexandria, VA Qualifier I",
    date: "January 17, 2026",
    qualRank: "7 of 24",
    qualRecord: "4W – 1L",
    playoffs: true,
    playoffRecord: "2W – 2L",
    allianceRole: "Alliance Captain #5",
    awardColor: "#3b82f6",
    award: "🎮 Control Award — Winner",
    qualMatches: [
      { q: "Q6", score: 211, result: "W" },
      { q: "Q9", score: 86, result: "W" },
      { q: "Q14", score: 95, result: "W" },
      { q: "Q23", score: 85, result: "L" },
      { q: "Q27", score: 98, result: "W" },
    ],
    playoffMatches: [
      { q: "UB R1", score: 108, result: "W" },
      { q: "UB R2", score: 74, result: "L" },
      { q: "LB R3", score: 60, result: "W" },
      { q: "LB R4", score: 98, result: "L" },
    ],
  },
];

const navLinks = ["Robot", "Subsystems", "Build Log", "Gallery", "Awards"];
const navIds = ["robot", "subsystems", "buildlog", "gallery", "awards"];
const galleryTabs = ["Build", "Competition", "Outreach"] as const;
type GalleryTab = typeof galleryTabs[number];

/* ─── Component ─── */

export default function SeasonDetail({ seasonName, gameName, seasonShort }: SeasonDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [activeSubsystem, setActiveSubsystem] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [galleryTab, setGalleryTab] = useState<GalleryTab>("Build");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const elements = containerRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navIds.map((id) => document.getElementById(id));
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) { setActiveNav(i); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lightbox on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight" && lightboxIdx !== null) {
        const imgs = galleries[galleryTab.toLowerCase() as keyof typeof galleries];
        setLightboxIdx((prev) => (prev !== null ? Math.min(imgs.length - 1, prev + 1) : null));
      }
      if (e.key === "ArrowLeft" && lightboxIdx !== null) {
        setLightboxIdx((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, galleryTab]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 130, behavior: "smooth" });
  }, []);

  const tagColor = (tagClass: string) => {
    switch (tagClass) {
      case "hw": return { bg: "rgba(59,130,246,.12)", text: "#60a5fa", border: "rgba(59,130,246,.3)" };
      case "sw": return { bg: "rgba(139,92,246,.12)", text: "#8b5cf6", border: "rgba(139,92,246,.3)" };
      case "test": return { bg: "rgba(16,185,129,.12)", text: "#10b981", border: "rgba(16,185,129,.3)" };
      default: return { bg: "rgba(59,130,246,.12)", text: "#60a5fa", border: "rgba(59,130,246,.3)" };
    }
  };

  const resultStyle = (r: string) => ({
    bg: r === "W" ? "rgba(52,211,153,.1)" : "rgba(239,68,68,.1)",
    border: r === "W" ? "rgba(52,211,153,.3)" : "rgba(239,68,68,.3)",
    text: r === "W" ? "#34d399" : "#f87171",
  });

  const currentGallery = galleries[galleryTab.toLowerCase() as keyof typeof galleries];

  return (
    <div ref={containerRef}>
      {/* Breadcrumb */}
      <div className="sticky top-0 z-[5] pt-24 pb-3 px-8 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/seasons" className="hover:text-accent-light transition-colors duration-200">Seasons</Link>
          <span className="text-muted/60">›</span>
          <span className="text-voltage-primary">{seasonName}</span>
        </nav>
      </div>

      {/* Hero */}
      <section
        className="relative pt-40 pb-20 px-8 border-b border-border"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,.08) 0%, transparent 70%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted text-sm tracking-widest uppercase mb-4">FTC Team 27427 · Vienna Voltage</p>
          <h1 className="font-sans text-[3rem] md:text-[4rem] font-bold text-voltage-primary leading-tight">
            Season {seasonName}
          </h1>
          <p className="text-muted max-w-[640px] mx-auto mt-5 text-lg leading-relaxed">
            {gameName} — two qualifiers, two awards, a playoff run as Alliance Captain #5, and a robot built through 8+ design iterations.
          </p>

          {/* Season stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
            {[
              { val: "9–5–0", label: "Overall Record" },
              { val: "7th / 24", label: "Best Ranking" },
              { val: "Alliance Capt.", label: "Alexandria" },
              { val: "2 Awards", label: "This Season" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-2 rounded-lg border border-border text-center" style={{ background: "var(--card)" }}>
                <p className="font-sans font-bold text-voltage-primary text-sm">{s.val}</p>
                <p className="text-[0.62rem] text-muted uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {["🤖 Robot", "🔧 Build Log", "🖼️ Gallery", "🏆 Awards"].map((tag) => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-md text-sm border"
                style={{ background: "rgba(59,130,246,.1)", borderColor: "rgba(59,130,246,.25)", color: "#60a5fa" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Page Nav */}
      <nav className="sticky top-[64px] z-[8] border-b border-border backdrop-blur-md" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto px-8 flex gap-6 overflow-x-auto">
          {navLinks.map((label, i) => (
            <button key={label} onClick={() => scrollToSection(navIds[i])}
              className={`relative py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${activeNav === i ? "text-accent" : "text-muted hover:text-voltage-primary"}`}>
              {label}
              {activeNav === i && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Robot ─── */}
      <section id="robot" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Meet the machine</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">Robot</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[360px]"
              style={{ background: "var(--bg3)", borderColor: "rgba(59,130,246,.25)" }}>
              <span className="text-5xl mb-4">🤖</span>
              <p className="text-muted text-sm">Add robot photo here</p>
            </div>

            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Season game", "DECODE — FTC 2025–26"],
                    ["Season", `FIRST Tech Challenge ${seasonShort}`],
                    ["Drive train", "Mecanum (4-wheel omnidirectional)"],
                    ["Control system", "REV Control Hub"],
                    ["Programming language", "Java (FTC SDK)"],
                    ["Intake", "Claw intake (V4) — spring-loaded fingers"],
                    ["Transfer", "Horizontal claw-to-claw (V3)"],
                    ["Belt system", "Timing belt — dual hex shaft, 1 servo"],
                    ["CAD software", "OnShape"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="py-3 pr-6 text-muted whitespace-nowrap">{label}</td>
                      <td className="py-3 text-voltage-primary font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Award pills */}
              <div className="flex gap-2 flex-wrap mt-6">
                <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{ background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)", color: "#f59e0b" }}>
                  ⚡ Innovate Award (RTX) — 2nd Place
                </span>
                <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{ background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.3)", color: "#60a5fa" }}>
                  🎮 Control Award — Winner
                </span>
              </div>
            </div>
          </div>

          {/* Competition results quick summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {competitions.map((comp, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden" style={{ background: "var(--card)" }}>
                <div className="px-5 py-4 border-b border-border" style={{ background: `linear-gradient(90deg, ${comp.awardColor}0a, transparent)` }}>
                  <h3 className="font-sans font-bold text-voltage-primary text-base">{comp.name}</h3>
                  <p className="text-muted text-xs mt-0.5">{comp.date}</p>
                </div>
                <div className={`grid divide-x divide-border ${comp.playoffs ? "grid-cols-4" : "grid-cols-2"}`}>
                  <div className="px-4 py-3">
                    <p className="text-[0.6rem] uppercase tracking-wide text-muted">Ranking</p>
                    <p className="font-sans font-bold text-voltage-primary text-sm mt-0.5">{comp.qualRank}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[0.6rem] uppercase tracking-wide text-muted">Qual Record</p>
                    <p className="font-sans font-bold text-voltage-primary text-sm mt-0.5">{comp.qualRecord}</p>
                  </div>
                  {comp.playoffs && (
                    <>
                      <div className="px-4 py-3">
                        <p className="text-[0.6rem] uppercase tracking-wide text-muted">Alliance</p>
                        <p className="font-sans font-bold text-voltage-primary text-sm mt-0.5">{comp.allianceRole}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-[0.6rem] uppercase tracking-wide text-muted">Playoffs</p>
                        <p className="font-sans font-bold text-voltage-primary text-sm mt-0.5">{comp.playoffRecord}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="px-5 py-3">
                  <span className="text-[0.68rem] font-bold" style={{ color: comp.awardColor }}>{comp.award}</span>
                </div>
                {/* Match scores */}
                <div className="px-5 pb-4">
                  <p className="text-[0.6rem] uppercase tracking-wide text-muted mb-2">Qual scores</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {comp.qualMatches.map((m, j) => (
                      <div key={j} className="flex flex-col items-center px-2 py-1.5 rounded-lg border text-center min-w-[42px]"
                        style={{ background: resultStyle(m.result).bg, borderColor: resultStyle(m.result).border }}>
                        <span className="text-[0.55rem] font-bold uppercase" style={{ color: resultStyle(m.result).text }}>{m.result}</span>
                        <span className="font-sans font-bold text-voltage-primary text-xs">{m.score}</span>
                        <span className="text-[0.55rem] text-muted">{m.q}</span>
                      </div>
                    ))}
                  </div>
                  {comp.playoffs && comp.playoffMatches && (
                    <>
                      <p className="text-[0.6rem] uppercase tracking-wide text-muted mb-2 mt-3">Playoff scores</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {comp.playoffMatches.map((m, j) => (
                          <div key={j} className="flex flex-col items-center px-2 py-1.5 rounded-lg border text-center min-w-[48px]"
                            style={{ background: resultStyle(m.result).bg, borderColor: resultStyle(m.result).border }}>
                            <span className="text-[0.55rem] font-bold uppercase" style={{ color: resultStyle(m.result).text }}>{m.result}</span>
                            <span className="font-sans font-bold text-voltage-primary text-xs">{m.score}</span>
                            <span className="text-[0.55rem] text-muted">{m.q}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Subsystems ─── */}
      <section id="subsystems" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">How it works</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">Subsystems</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              {subsystems.map((s, i) => (
                <button key={s.name} onClick={() => setActiveSubsystem(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${activeSubsystem === i ? "border-[rgba(59,130,246,.3)]" : "border-transparent hover:border-border"}`}
                  style={{ background: activeSubsystem === i ? "rgba(59,130,246,.08)" : "transparent" }}>
                  <span className="text-xl">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${activeSubsystem === i ? "text-voltage-primary" : "text-muted"}`}>{s.name}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: "rgba(59,130,246,.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,.2)" }}>
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border p-8 min-h-[300px] relative overflow-hidden" style={{ background: "var(--bg3)" }}>
              <div key={activeSubsystem} className="animate-[fadeSlideIn_0.35s_ease_forwards]">
                <p className="text-muted text-xs uppercase tracking-widest mb-2">
                  Subsystem {String(activeSubsystem + 1).padStart(2, "0")} / {String(subsystems.length).padStart(2, "0")}
                </p>
                <span className="text-4xl block mb-4">{subsystems[activeSubsystem].icon}</span>
                <h3 className="font-sans text-2xl font-bold text-voltage-primary mb-3">{subsystems[activeSubsystem].name}</h3>
                <p className="text-muted leading-relaxed mb-4">{subsystems[activeSubsystem].description}</p>
                <span className="inline-flex text-xs px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(59,130,246,.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,.2)" }}>
                  {subsystems[activeSubsystem].tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Build Log ─── */}
      <section id="buildlog" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Engineering notebook</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-10">Build log</h2>

          <div className="relative mb-10">
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "var(--bg3)" }}>
              <div className="absolute top-0 left-0 h-full rounded-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${((currentMilestone + 1) / milestones.length) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-3">
              {milestones.map((m, i) => (
                <button key={i} onClick={() => setCurrentMilestone(i)} className="flex flex-col items-center gap-2 group">
                  <span className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${i <= currentMilestone ? "bg-accent border-accent shadow-[0_0_8px_rgba(59,130,246,.4)]" : "border-muted bg-transparent"}`} />
                  <span className="text-[10px] text-muted hidden md:block max-w-[80px] text-center leading-tight">
                    {m.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border p-8 relative" style={{ background: "var(--bg3)" }}>
            <div key={currentMilestone} className="animate-[fadeSlideIn_0.35s_ease_forwards]">
              <p className="text-muted text-xs uppercase tracking-widest mb-4">
                {String(currentMilestone + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
              </p>
              <p className="text-muted text-sm mb-1">{milestones[currentMilestone].date}</p>
              <h3 className="font-sans text-xl md:text-2xl font-bold text-voltage-primary mb-3">
                {milestones[currentMilestone].title}
              </h3>
              <p className="text-muted leading-relaxed mb-5 max-w-2xl">{milestones[currentMilestone].body}</p>
              <span className="inline-flex text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: tagColor(milestones[currentMilestone].tagClass).bg,
                  color: tagColor(milestones[currentMilestone].tagClass).text,
                  border: `1px solid ${tagColor(milestones[currentMilestone].tagClass).border}`,
                }}>
                {milestones[currentMilestone].tag}
              </span>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrentMilestone((prev) => Math.max(0, prev - 1))}
                disabled={currentMilestone === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-voltage-primary hover:border-accent/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "var(--bg)" }}>←</button>
              <button onClick={() => setCurrentMilestone((prev) => Math.min(milestones.length - 1, prev + 1))}
                disabled={currentMilestone === milestones.length - 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-voltage-primary hover:border-accent/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "var(--bg)" }}>→</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Gallery (replaces Updates) ─── */}
      <section id="gallery" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Season photos</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-8">Gallery</h2>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {galleryTabs.map((tab) => (
              <button key={tab} onClick={() => { setGalleryTab(tab); setLightboxIdx(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${galleryTab === tab ? "text-accent border-[rgba(59,130,246,.3)]" : "text-muted border-transparent hover:text-voltage-primary hover:border-border"}`}
                style={{ background: galleryTab === tab ? "rgba(59,130,246,.15)" : "transparent" }}>
                {tab === "Build" ? "🔧 " : tab === "Competition" ? "🏆 " : "🏫 "}{tab}
              </button>
            ))}
          </div>

          <p className="text-muted text-sm mb-6">{currentGallery.length} photos</p>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentGallery.map((item, i) => (
              <button key={i} onClick={() => setLightboxIdx(i)}
                className="group relative rounded-xl overflow-hidden border border-border transition-all duration-200 hover:border-[rgba(59,130,246,.4)] hover:-translate-y-0.5 text-left"
                style={{ background: "var(--bg3)", aspectRatio: "4/3" }}>
                {item.src ? (
                  <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
                    <span className="text-2xl">
                      {galleryTab === "Build" ? "🔧" : galleryTab === "Competition" ? "🏆" : "🏫"}
                    </span>
                    <p className="text-muted text-[0.65rem] text-center leading-tight">{item.caption}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                  <p className="text-white text-[0.65rem] leading-tight">{item.caption}</p>
                </div>
              </button>
            ))}
          </div>

          {/* How to add photos note */}
          <p className="text-muted text-xs mt-5 italic">
            To add photos: upload images to <code className="text-accent text-xs">/public/season/2526/</code> and update the <code className="text-accent text-xs">src</code> fields in the galleries data above.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
            onClick={() => setLightboxIdx(null)}>✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={lightboxIdx === 0}
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => Math.max(0, (p ?? 0) - 1)); }}>‹</button>
          <div className="max-w-3xl w-full mx-16 text-center" onClick={(e) => e.stopPropagation()}>
            {currentGallery[lightboxIdx].src ? (
              <img src={currentGallery[lightboxIdx].src} alt={currentGallery[lightboxIdx].caption}
                className="w-full rounded-xl mb-3 max-h-[70vh] object-contain" />
            ) : (
              <div className="w-full rounded-xl mb-3 flex items-center justify-center bg-[var(--bg3)] border border-border" style={{ height: "60vh" }}>
                <div className="text-center">
                  <span className="text-6xl block mb-3">
                    {galleryTab === "Build" ? "🔧" : galleryTab === "Competition" ? "🏆" : "🏫"}
                  </span>
                  <p className="text-muted text-sm">Photo placeholder</p>
                </div>
              </div>
            )}
            <p className="text-white/80 text-sm">{currentGallery[lightboxIdx].caption}</p>
            <p className="text-white/40 text-xs mt-1">{lightboxIdx + 1} / {currentGallery.length}</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={lightboxIdx === currentGallery.length - 1}
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => Math.min(currentGallery.length - 1, (p ?? 0) + 1)); }}>›</button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-8"><div className="border-t border-border" /></div>

      {/* ─── Awards ─── */}
      <section id="awards" className="px-8 max-w-6xl mx-auto py-20">
        <div className="fade-in">
          <p className="text-muted text-sm tracking-widest uppercase mb-3">Recognition</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-voltage-primary mb-8">Awards &amp; results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, i) => (
              <div key={i} className="relative rounded-2xl border p-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: award.bg, borderColor: award.border }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${award.color}, transparent)` }} />
                <div className="text-4xl mb-4">{award.icon}</div>
                <span className="inline-block text-[0.65rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3"
                  style={{ background: award.color + "22", color: award.color, border: `1px solid ${award.color}40` }}>
                  {award.place}
                </span>
                <h3 className="font-sans text-xl font-bold text-voltage-primary mb-1">{award.name}</h3>
                <p className="text-muted text-sm mb-1">{award.event}</p>
                <p className="text-sm font-semibold mb-4" style={{ color: award.color }}>{award.date}</p>
                <p className="text-muted text-sm leading-relaxed">{award.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
