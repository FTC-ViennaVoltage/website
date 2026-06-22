"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Competition Data (DECODE 2025-26) ──────────────────────────────── */

const COMPETITIONS = [
  {
    name: "Richmond, VA Qualifier I",
    date: "December 13, 2025",
    qualRank: "16 of 34",
    qualRecord: "3W – 2L",
    playoffs: false,
    award: "Innovate Award sponsored by RTX — 2nd Place",
    awardColor: "#f59e0b",
    qualMatches: [
      { score: 31, result: "W" },
      { score: 104, result: "W" },
      { score: 61, result: "W" },
      { score: 100, result: "L" },
      { score: 61, result: "L" },
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
    award: "Control Award 🏆",
    awardColor: "#3b82f6",
    qualMatches: [
      { score: 211, result: "W" },
      { score: 86, result: "W" },
      { score: 95, result: "W" },
      { score: 85, result: "L" },
      { score: 98, result: "W" },
    ],
    playoffMatches: [
      { label: "UB R1", score: 108, result: "W" },
      { label: "UB R2", score: 74, result: "L" },
      { label: "LB R3", score: 60, result: "W" },
      { label: "LB R4", score: 98, result: "L" },
    ],
  },
];

const AWARDS = [
  {
    icon: "⚡",
    name: "Innovate Award sponsored by RTX",
    place: "2nd Place",
    event: "Richmond, VA Qualifier I",
    date: "Dec 13, 2025",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.08)",
    border: "rgba(245,158,11,.22)",
    desc: "Recognized for our iterative engineering design process — going through 4 intake versions and 4 claw versions, documenting each with CAD models in OnShape and thorough pros/cons analysis.",
  },
  {
    icon: "🎮",
    name: "Control Award",
    place: "Winner",
    event: "Alexandria, VA Qualifier I",
    date: "Jan 17, 2026",
    color: "#3b82f6",
    bg: "rgba(59,130,246,.08)",
    border: "rgba(59,130,246,.22)",
    desc: "Recognized for our software innovations — autonomous programming, optimized wheel torque ratios, and driver control systems developed throughout the season.",
  },
];

const TIMELINE = [
  { month: "September 2025", tag: "Planning", tagClass: "hw", body: "Extensive research on robot design for DECODE. Built extension pieces, field parameters, and custom game pieces to practice with. Began brainstorming robot strategy." },
  { month: "Early October", tag: "Hardware", tagClass: "hw", body: "Built the mecanum drivetrain. Began coding for wheel control and experimenting with torque ratios for the best balance of speed and pushing power." },
  { month: "Late October", tag: "Hardware", tagClass: "hw", body: "Began research on intake devices. Brainstormed shooter and sorting mechanisms for game element handling." },
  { month: "Early November", tag: "Hardware", tagClass: "hw", body: "Began experimenting with CAD models of intake, spindexer, and shooter in OnShape. Started first intake prototypes." },
  { month: "Late November", tag: "Software", tagClass: "sw", body: "Started testing effectiveness of different configurations. Iterated through multiple designs, refining CAD after each test." },
  { month: "Early December", tag: "Competition", tagClass: "comp", body: "Finalized claw/intake after extensive research — 4 intake iterations and 4 claw iterations. Competed at Richmond VA Qualifier I (Rank 16/34). Won Innovate Award (RTX) 2nd Place." },
  { month: "Late December", tag: "Hardware", tagClass: "hw", body: "Redesigned many parts of the robot in preparation for Alexandria. Addressed issues found at Richmond qualifier." },
  { month: "January 2026", tag: "Competition", tagClass: "comp", body: "Final robot touches complete. Competed at Alexandria VA Qualifier I — ranked 7th of 24, captained Alliance #5, made playoffs (2W–2L). Won the Control Award." },
];

const SUBSYSTEMS = [
  {
    ic: "⚙️",
    name: "Mecanum Drivetrain",
    tag: "Hardware",
    body: "Built a 4-wheel mecanum drivetrain enabling full omnidirectional movement including strafing. Carefully tuned torque ratios through experimentation to balance traversal speed against pushing power on the field.",
  },
  {
    ic: "🦾",
    name: "Claw Intake — V4",
    tag: "Hardware",
    body: "Went through 4 major claw iterations. V1 had good reach but poor grip. V2 improved hold but was inconsistent. V3 better fit the block. Final V4 is consistent with the intake claw — reliable, with room for improvement on block fit. Spring-loaded 3D-printed fingers with rubber inserts for friction.",
  },
  {
    ic: "📥",
    name: "Intake Mechanism — V4",
    tag: "Hardware",
    body: "V1 could intake from one orientation but was wide and jammed. V2 fixed width but was one-directional. V3 improved traversal speed. V4 achieved much higher consistency with more control over the intake process, at the cost of slightly slower speed.",
  },
  {
    ic: "🔄",
    name: "Transfer System — V3",
    tag: "Hardware",
    body: "V1 top-down transfer was very inconsistent. V2 horizontal transfer (new claw design) was much more consistent with fewer moving parts. V3 switched from active roller intake to claw intake, greatly improving size constraints, accuracy, and repeatability.",
  },
  {
    ic: "⏱️",
    name: "Timing Belt Drive",
    tag: "Hardware",
    body: "To minimize actuators, we used a timing belt system to drive both hex shafts from a single servo. This reduced weight, eliminated failure points, and simplified the intake actuation significantly.",
  },
  {
    ic: "💻",
    name: "Autonomous & TeleOp",
    tag: "Software",
    body: "Coded wheel control with experimentally determined torque ratios. Developed autonomous routines for consistent field element scoring. Driver controls were refined over the season — the Control Award win at Alexandria recognized our software quality.",
  },
];

const OUTREACH = [
  {
    icon: "☕",
    title: "Java Class — Herbert Hoover MS",
    students: "~30 students",
    body: "Taught a Java fundamentals class at Herbert Hoover Middle School to inspire students to join FTC and learn programming basics. Covered variables, loops, and basic OOP concepts relevant to robot code.",
  },
  {
    icon: "🏫",
    title: "STEAM Night — Kent Gardens ES",
    students: "200+ families",
    body: "Brought our robot to Kent Gardens Elementary School's STEAM night. Demonstrated the robot, answered questions from families and students, and promoted FTC as a pathway for young engineers.",
  },
  {
    icon: "🤖",
    title: "Coaching FLL Teams — Churchill Road ES",
    students: "2 FLL teams",
    body: "Encouraged Churchill Road Elementary students to start two FIRST LEGO League teams. Guided them through programming, robot design, teamwork, and their first season — helping build the next generation of FIRST competitors.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function Season2526() {
  return (
    <>
      <HeroSection />
      <StickyNav />
      <RobotSection />
      <Divider />
      <DesignProcessSection />
      <Divider />
      <SubsystemsSection />
      <Divider />
      <TimelineSection />
      <Divider />
      <CompetitionsSection />
      <Divider />
      <AwardsSection />
      <Divider />
      <OutreachSection />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      className="pt-36 pb-16 px-8 text-center border-b border-border"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29,78,216,.2) 0%, transparent 70%)",
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-5 text-sm">
        <a href="/seasons" className="text-muted hover:text-accent-light transition-colors">Seasons</a>
        <span className="text-muted">›</span>
        <span className="text-voltage-primary font-medium">2025–26</span>
      </div>

      <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-accent mb-3">
        FTC Team 27427 · Vienna Voltage
      </p>
      <h1 className="font-sans text-[clamp(2.8rem,7vw,5rem)] font-bold text-voltage-primary tracking-tight leading-none mb-4">
        Season 2025–26
      </h1>
      <p className="font-sans text-xl text-accent-light font-medium mb-4">DECODE</p>
      <p className="text-muted max-w-[600px] mx-auto leading-[1.85] text-base mb-8">
        Our second competitive season. Two qualifiers, two awards, a playoff run as Alliance Captain,
        and a robot built through 8+ major design iterations.
      </p>

      {/* Stats */}
      <div className="flex gap-4 justify-center flex-wrap mb-2">
        {[
          { val: "2", label: "Qualifiers" },
          { val: "2", label: "Awards" },
          { val: "7th", label: "Best Ranking" },
          { val: "9–5–0", label: "Overall Record" },
          { val: "Alliance Capt.", label: "Alexandria" },
        ].map((s) => (
          <div
            key={s.label}
            className="px-5 py-3 rounded-xl border border-border text-center min-w-[90px]"
            style={{ background: "var(--card)" }}
          >
            <p className="font-sans text-base font-bold text-voltage-primary leading-tight">{s.val}</p>
            <p className="text-[0.65rem] text-muted uppercase tracking-wide mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Sticky Nav ──────────────────────────────────────────────────────── */

function StickyNav() {
  const [active, setActive] = useState("robot");
  const ids = ["robot", "design", "subsystems", "timeline", "competitions", "awards", "outreach"];
  const labels: Record<string,string> = {
    robot: "Robot", design: "Design Process", subsystems: "Subsystems",
    timeline: "Build Log", competitions: "Competitions", awards: "Awards", outreach: "Outreach",
  };

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 110;
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="sticky top-[57px] z-[900] border-b border-border overflow-x-auto"
      style={{ background: "rgba(8,13,20,.96)", backdropFilter: "blur(14px)" }}
    >
      <div className="flex max-w-[1200px] mx-auto px-6">
        {ids.map(id => (
          <a
            key={id}
            href={`#${id}`}
            className="px-4 py-3.5 text-[0.75rem] font-semibold uppercase tracking-wide whitespace-nowrap border-b-2 transition-all duration-200"
            style={{
              color: active === id ? "var(--accent-light)" : "var(--muted)",
              borderBottomColor: active === id ? "var(--accent)" : "transparent",
            }}
          >
            {labels[id]}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Robot Overview ──────────────────────────────────────────────────── */

function RobotSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);
  return (
    <section id="robot" ref={ref} className="py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Robot photo — from portfolio page 5 */}
          <div className="fade-in flex flex-col gap-4">
            <div
              className="rounded-2xl border border-border overflow-hidden"
              style={{ background: "var(--bg3)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--muted)" }}
            >
              <span style={{ fontSize: "4rem" }}>🤖</span>
              <p style={{ fontSize: ".85rem" }}>Add final robot photo here</p>
            </div>
            {/* Drivetrain photo from portfolio */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border overflow-hidden bg-[var(--bg3)] aspect-video flex items-center justify-center text-muted text-xs text-center p-2">
                Drivetrain photo<br/>(from portfolio p.5)
              </div>
              <div className="rounded-xl border border-border overflow-hidden bg-[var(--bg3)] aspect-video flex items-center justify-center text-muted text-xs text-center p-2">
                Intake + spindexer<br/>(from portfolio p.5)
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="fade-in">
            <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2">Specs</p>
            <h2 className="font-sans text-[clamp(1.7rem,3vw,2.2rem)] font-bold text-voltage-primary mb-6 tracking-tight">
              Robot Overview
            </h2>
            <table className="w-full border-collapse mb-8">
              <tbody>
                {[
                  ["Season game", "DECODE — FTC 2025–26"],
                  ["Drive train", "Mecanum (4-wheel omnidirectional)"],
                  ["Control system", "REV Control Hub"],
                  ["Language", "Java (FTC SDK)"],
                  ["Intake", "Claw intake (V4) — spring-loaded"],
                  ["Transfer", "Horizontal claw-to-claw (V3)"],
                  ["Belt system", "Timing belt — dual hex shaft, 1 servo"],
                  ["CAD", "OnShape"],
                ].map(([l, v]) => (
                  <tr key={l} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 text-muted text-[0.72rem] uppercase tracking-wide font-medium w-[40%]">{l}</td>
                    <td className="py-3 text-voltage-primary font-medium text-[0.88rem]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Quick award pills */}
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-3 py-1.5 rounded-full border" style={{ background: "rgba(245,158,11,.1)", borderColor: "rgba(245,158,11,.3)", color: "#f59e0b" }}>
                ⚡ Innovate Award (RTX) — 2nd
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-3 py-1.5 rounded-full border" style={{ background: "rgba(59,130,246,.1)", borderColor: "rgba(59,130,246,.3)", color: "#60a5fa" }}>
                🎮 Control Award — Winner
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Design Process ──────────────────────────────────────────────────── */

function DesignProcessSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);
  const [open, setOpen] = useState<number | null>(null);

  const steps = [
    { icon: "💡", title: "Brainstorm", body: "At the start of each meeting, we identify the main problem to solve and create an action plan on a whiteboard. This keeps us focused and consistent throughout the session." },
    { icon: "✏️", title: "Sketch", body: "After narrowing down ideas, we make detailed whiteboard sketches with measurements and calculations. These act as the starting point for building prototypes." },
    { icon: "🔧", title: "Design", body: "We build prototypes with FTC-legal parts, test them, discuss improvements as a team, then refine in OnShape (CAD) to optimize and ensure precision for competition." },
    { icon: "🔩", title: "Assemble", body: "After sketching, we build working models using available parts. We then create a 3D CAD model in OnShape to make it easier to adjust components and achieve the best version." },
    { icon: "📊", title: "Evaluate", body: "We test thoroughly and compare the mechanism to original sketches. As a team we discuss strengths and weaknesses, deciding which parts to keep and which need improvement." },
    { icon: "🔁", title: "Iterate", body: "Through multiple targeted iterations we make the design simpler, more reliable, and more versatile. After satisfaction we CAD the final design and integrate with the full robot CAD." },
  ];

  return (
    <section id="design" ref={ref} className="py-20 px-8" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">Engineering methodology</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-3 tracking-tight fade-in">Design Process</h2>
        <p className="text-muted max-w-[600px] mb-10 leading-[1.8] fade-in">
          Every mechanism on our robot went through this 6-step engineering cycle. The intake went through 4 major versions, the claw through 4, and the transfer through 3.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="fade-in text-left relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:border-[rgba(59,130,246,.4)] hover:-translate-y-0.5 group"
              style={{
                background: open === i ? "rgba(59,130,246,.08)" : "var(--card)",
                borderColor: open === i ? "rgba(59,130,246,.4)" : "var(--border)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" style={{ opacity: open === i ? 0.6 : 0 }} />
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: "rgba(59,130,246,.12)", color: "#60a5fa" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xl">{s.icon}</span>
                <h3 className="font-sans font-semibold text-voltage-primary">{s.title}</h3>
              </div>
              <p
                className="text-muted text-[0.85rem] leading-[1.75] overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px", opacity: open === i ? 1 : 0 }}
              >
                {s.body}
              </p>
              <p className="text-[0.72rem] text-accent mt-2">{open === i ? "▲ collapse" : "▼ expand"}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Subsystems ──────────────────────────────────────────────────────── */

function SubsystemsSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);
  const [active, setActive] = useState(0);

  return (
    <section id="subsystems" ref={ref} className="py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">How it works</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-10 tracking-tight fade-in">Subsystems</h2>

        <div className="fade-in grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          <div className="flex flex-col gap-2">
            {SUBSYSTEMS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3"
                style={{
                  background: active === i ? "rgba(59,130,246,.1)" : "var(--card)",
                  borderColor: active === i ? "rgba(59,130,246,.45)" : "var(--border)",
                  transform: active === i ? "translateX(3px)" : "",
                }}
              >
                <span className="text-base">{s.ic}</span>
                <span className="text-[0.82rem] font-semibold flex-1 text-left" style={{ color: active === i ? "var(--text)" : "var(--muted)" }}>
                  {s.name}
                </span>
                <span className="text-[0.58rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border"
                  style={{ color: active === i ? "#60a5fa" : "var(--muted)", borderColor: active === i ? "rgba(59,130,246,.4)" : "var(--border)" }}>
                  {s.tag === "Hardware" ? "HW" : "SW"}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="rounded-2xl border border-border p-10 relative overflow-hidden flex flex-col justify-center min-h-[260px]"
            style={{ background: "linear-gradient(160deg, var(--bg3), var(--bg2))" }}>
            <div className="absolute top-[-30%] right-[-5%] w-[320px] h-[320px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,.18), transparent 70%)" }} />
            <div className="relative z-10">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent mb-3">
                Subsystem {String(active + 1).padStart(2, "0")} / {String(SUBSYSTEMS.length).padStart(2, "0")}
              </p>
              <div className="text-4xl mb-4">{SUBSYSTEMS[active].ic}</div>
              <h3 className="font-sans text-[1.6rem] font-bold text-voltage-primary mb-3">{SUBSYSTEMS[active].name}</h3>
              <p className="text-muted leading-[1.85] text-[0.95rem] max-w-[520px] mb-4">{SUBSYSTEMS[active].body}</p>
              <span className="inline-block text-[0.68rem] font-semibold uppercase tracking-wide px-2.5 py-1 rounded border text-accent"
                style={{ background: "rgba(59,130,246,.1)", borderColor: "rgba(59,130,246,.2)" }}>
                {SUBSYSTEMS[active].tag}
              </span>
            </div>
          </div>
        </div>

        {/* Iteration photos from portfolio */}
        <div className="mt-8 fade-in">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent mb-4">Intake iterations (V1 → V4)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["V1 — One directional, wide back", "V2 — Correct size, still jammed", "V3 — Fast traversal, unreliable", "V4 — High consistency ✓"].map((label, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden" style={{ background: "var(--bg3)" }}>
                <div className="aspect-square flex items-center justify-center text-muted text-xs text-center p-3">
                  Add intake V{i+1} CAD photo<br/>(portfolio p.6)
                </div>
                <div className="px-3 py-2 border-t border-border">
                  <p className="text-[0.7rem] text-muted leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 fade-in">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent mb-4">Claw iterations (V1 → V4)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["V1 — Good reach, poor grip", "V2 — Better hold, inconsistent", "V3 — Better fit, still unreliable", "V4 — Consistent & reliable ✓"].map((label, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden" style={{ background: "var(--bg3)" }}>
                <div className="aspect-square flex items-center justify-center text-muted text-xs text-center p-3">
                  Add claw V{i+1} CAD photo<br/>(portfolio p.8)
                </div>
                <div className="px-3 py-2 border-t border-border">
                  <p className="text-[0.7rem] text-muted leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ────────────────────────────────────────────────────────── */

function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);
  const [active, setActive] = useState(0);

  const tagColors: Record<string,{bg:string,color:string}> = {
    hw: { bg: "rgba(59,130,246,.12)", color: "#60a5fa" },
    sw: { bg: "rgba(52,211,153,.12)", color: "#34d399" },
    comp: { bg: "rgba(245,158,11,.12)", color: "#f59e0b" },
    Planning: { bg: "rgba(139,92,246,.12)", color: "#a78bfa" },
  };

  return (
    <section id="timeline" ref={ref} className="py-20 px-8" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">Engineering notebook</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-10 tracking-tight fade-in">Season Timeline</h2>

        {/* Rail */}
        <div className="fade-in mb-6 relative">
          <div className="h-px w-full" style={{ background: "var(--border)" }} />
          <div className="h-px absolute top-0 left-0 transition-all duration-500"
            style={{ background: "linear-gradient(90deg, #1d4ed8, #60a5fa)", width: `${((active) / (TIMELINE.length - 1)) * 100}%`, boxShadow: "0 0 10px rgba(59,130,246,.7)" }} />
          <div className="flex justify-between mt-2">
            {TIMELINE.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-4 h-4 rounded-full border-2 transition-all duration-300 -mt-[10px]"
                  style={{
                    background: i <= active ? "#3b82f6" : "var(--bg3)",
                    borderColor: i <= active ? "#3b82f6" : "var(--border)",
                    boxShadow: i === active ? "0 0 0 4px rgba(59,130,246,.2)" : "",
                  }} />
                <span className="text-[0.6rem] font-semibold uppercase tracking-wide hidden md:block"
                  style={{ color: i === active ? "#60a5fa" : "var(--muted)" }}>
                  {TIMELINE[i].month.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="fade-in flex gap-4 items-stretch">
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
            className="w-11 flex-shrink-0 rounded-xl border border-border text-accent-light text-2xl transition-all hover:border-[rgba(59,130,246,.5)] hover:bg-[rgba(59,130,246,.08)] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "var(--card)" }}>‹</button>

          <div className="flex-1 rounded-2xl border border-border p-8 min-h-[160px]" style={{ background: "var(--card)" }}>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-accent">
                {String(active + 1).padStart(2,"0")} / {String(TIMELINE.length).padStart(2,"0")}
              </p>
              <span className="text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded"
                style={{ background: tagColors[TIMELINE[active].tagClass]?.bg, color: tagColors[TIMELINE[active].tagClass]?.color }}>
                {TIMELINE[active].tag}
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-voltage-primary mb-3">{TIMELINE[active].month}</h3>
            <p className="text-muted leading-[1.85] text-[0.93rem]">{TIMELINE[active].body}</p>
          </div>

          <button onClick={() => setActive(Math.min(TIMELINE.length - 1, active + 1))} disabled={active === TIMELINE.length - 1}
            className="w-11 flex-shrink-0 rounded-xl border border-border text-accent-light text-2xl transition-all hover:border-[rgba(59,130,246,.5)] hover:bg-[rgba(59,130,246,.08)] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "var(--card)" }}>›</button>
        </div>
      </div>
    </section>
  );
}

/* ─── Competitions ────────────────────────────────────────────────────── */

function CompetitionsSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);

  const resultStyle = (r: string) => ({
    background: r === "W" ? "rgba(52,211,153,.1)" : r === "T" ? "rgba(245,158,11,.1)" : "rgba(239,68,68,.1)",
    borderColor: r === "W" ? "rgba(52,211,153,.3)" : r === "T" ? "rgba(245,158,11,.3)" : "rgba(239,68,68,.3)",
    color: r === "W" ? "#34d399" : r === "T" ? "#f59e0b" : "#f87171",
  });

  return (
    <section id="competitions" ref={ref} className="py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">Match results</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-10 tracking-tight fade-in">Competitions</h2>

        <div className="flex flex-col gap-8">
          {COMPETITIONS.map((comp, i) => (
            <div key={i} className="fade-in rounded-2xl border border-border overflow-hidden" style={{ background: "var(--card)" }}>

              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-border"
                style={{ background: `linear-gradient(90deg, ${comp.awardColor}08, transparent)` }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-voltage-primary">{comp.name}</h3>
                    <p className="text-muted text-sm mt-0.5">{comp.date}</p>
                  </div>
                  <span className="inline-block text-[0.7rem] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
                    style={{ background: comp.awardColor + "18", color: comp.awardColor, border: `1px solid ${comp.awardColor}40` }}>
                    {comp.award}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid divide-x divide-border" style={{ gridTemplateColumns: comp.playoffs ? "repeat(4, 1fr)" : "repeat(2, 1fr)" }}>
                <div className="px-6 py-4">
                  <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-1">Qual Ranking</p>
                  <p className="font-sans font-bold text-voltage-primary text-lg">{comp.qualRank}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-1">Qual Record</p>
                  <p className="font-sans font-bold text-voltage-primary text-lg">{comp.qualRecord}</p>
                </div>
                {comp.playoffs && (
                  <>
                    <div className="px-6 py-4">
                      <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-1">Alliance</p>
                      <p className="font-sans font-bold text-voltage-primary text-lg">{comp.allianceRole}</p>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-1">Playoff Record</p>
                      <p className="font-sans font-bold text-voltage-primary text-lg">{comp.playoffRecord}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Qual matches */}
              <div className="px-7 py-5 border-t border-border">
                <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-3">Qualification matches (our alliance score)</p>
                <div className="flex gap-2 flex-wrap">
                  {comp.qualMatches.map((m, j) => (
                    <div key={j} className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border min-w-[52px] text-center"
                      style={resultStyle(m.result)}>
                      <span className="text-[0.58rem] font-bold uppercase" style={{ color: resultStyle(m.result).color }}>{m.result}</span>
                      <span className="font-sans font-bold text-voltage-primary text-sm">{m.score}</span>
                      <span className="text-[0.58rem] text-muted">Q{j + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Playoff matches */}
              {comp.playoffs && comp.playoffMatches && (
                <div className="px-7 py-5 border-t border-border" style={{ background: "rgba(59,130,246,.03)" }}>
                  <p className="text-[0.62rem] uppercase tracking-wide text-muted mb-3">Playoff matches (our alliance score)</p>
                  <div className="flex gap-2 flex-wrap">
                    {comp.playoffMatches.map((m, j) => (
                      <div key={j} className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border min-w-[58px] text-center"
                        style={resultStyle(m.result)}>
                        <span className="text-[0.58rem] font-bold uppercase" style={{ color: resultStyle(m.result).color }}>{m.result}</span>
                        <span className="font-sans font-bold text-voltage-primary text-sm">{m.score}</span>
                        <span className="text-[0.58rem] text-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Awards ──────────────────────────────────────────────────────────── */

function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);

  return (
    <section id="awards" ref={ref} className="py-20 px-8" style={{ background: "var(--bg2)" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">Recognition</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-10 tracking-tight fade-in">Awards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AWARDS.map((award, i) => (
            <div key={i} className="fade-in relative rounded-2xl border p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: award.bg, borderColor: award.border }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${award.color}, transparent)` }} />
              <div className="text-4xl mb-5">{award.icon}</div>
              <span className="inline-block text-[0.65rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3"
                style={{ background: award.color + "22", color: award.color, border: `1px solid ${award.color}40` }}>
                {award.place}
              </span>
              <h3 className="font-sans text-xl font-bold text-voltage-primary mb-1">{award.name}</h3>
              <p className="text-muted text-sm mb-1">{award.event}</p>
              <p className="text-sm font-semibold mb-5" style={{ color: award.color }}>{award.date}</p>
              <p className="text-muted text-[0.88rem] leading-[1.75]">{award.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Outreach ────────────────────────────────────────────────────────── */

function OutreachSection() {
  const ref = useRef<HTMLElement>(null);
  useFadeIn(ref);

  return (
    <section id="outreach" ref={ref} className="py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent mb-2 fade-in">Community impact</p>
        <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-voltage-primary mb-3 tracking-tight fade-in">Outreach</h2>
        <p className="text-muted max-w-[560px] mb-10 leading-[1.8] fade-in">
          We impacted over 230 students and families this season through workshops, STEAM events, and coaching FIRST LEGO League teams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTREACH.map((item, i) => (
            <div key={i} className="fade-in relative overflow-hidden rounded-2xl border border-border p-7 transition-all duration-300 hover:border-[rgba(59,130,246,.35)] hover:-translate-y-1"
              style={{ background: "var(--card)" }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-sans text-base font-semibold text-voltage-primary mb-1">{item.title}</h3>
              <p className="text-accent text-[0.72rem] font-semibold mb-3">{item.students}</p>
              <p className="text-muted text-[0.86rem] leading-[1.75]">{item.body}</p>

              {/* Photo placeholder */}
              <div className="mt-5 rounded-xl border border-border flex items-center justify-center text-muted text-xs text-center p-3 aspect-video"
                style={{ background: "var(--bg3)" }}>
                Add photo (portfolio p.11)
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function Divider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />;
}

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-in");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
