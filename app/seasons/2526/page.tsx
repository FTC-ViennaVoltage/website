"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import IterationExplorer from "@/components/iteration-explorer";

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
    award: "Control Award",
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
    name: "Mecanum Drivetrain",
    tag: "Hardware",
    body: "Built a 4-wheel mecanum drivetrain enabling full omnidirectional movement including strafing. Carefully tuned torque ratios through experimentation to balance traversal speed against pushing power on the field.",
  },
  {
    name: "Claw Intake — V4",
    tag: "Hardware",
    body: "Went through 4 major claw iterations. V1 had good reach but poor grip. V2 improved hold but was inconsistent. V3 better fit the block. Final V4 is consistent with the intake claw — reliable, with room for improvement on block fit. Spring-loaded 3D-printed fingers with rubber inserts for friction.",
  },
  {
    name: "Intake Mechanism — V4",
    tag: "Hardware",
    body: "V1 could intake from one orientation but was wide and jammed. V2 fixed width but was one-directional. V3 improved traversal speed. V4 achieved much higher consistency with more control over the intake process, at the cost of slightly slower speed.",
  },
  {
    name: "Transfer System — V3",
    tag: "Hardware",
    body: "V1 top-down transfer was very inconsistent. V2 horizontal transfer (new claw design) was much more consistent with fewer moving parts. V3 switched from active roller intake to claw intake, greatly improving size constraints, accuracy, and repeatability.",
  },
  {
    name: "Timing Belt Drive",
    tag: "Hardware",
    body: "To minimize actuators, we used a timing belt system to drive both hex shafts from a single servo. This reduced weight, eliminated failure points, and simplified the intake actuation significantly.",
  },
  {
    name: "Autonomous & TeleOp",
    tag: "Software",
    body: "Coded wheel control with experimentally determined torque ratios. Developed autonomous routines for consistent field element scoring. Driver controls were refined over the season — the Control Award win at Alexandria recognized our software quality.",
  },
];

const OUTREACH = [
  {
    title: "Java Class — Herbert Hoover MS",
    students: "~30 students",
    body: "Taught a Java fundamentals class at Herbert Hoover Middle School to inspire students to join FTC and learn programming basics. Covered variables, loops, and basic OOP concepts relevant to robot code.",
  },
  {
    title: "STEAM Night — Kent Gardens ES",
    students: "200+ families",
    body: "Brought our robot to Kent Gardens Elementary School's STEAM night. Demonstrated the robot, answered questions from families and students, and promoted FTC as a pathway for young engineers.",
  },
  {
    title: "Coaching FLL Teams — Churchill Road ES",
    students: "2 FLL teams",
    body: "Encouraged Churchill Road Elementary students to start two FIRST LEGO League teams. Guided them through programming, robot design, teamwork, and their first season — helping build the next generation of FIRST competitors.",
  },
];

/* The six-step engineering cycle */
const DESIGN_STEPS = [
  { title: "Brainstorm", body: "At the start of each meeting, we identify the main problem to solve and create an action plan on a whiteboard. This keeps us focused and consistent throughout the session." },
  { title: "Sketch", body: "After narrowing down ideas, we make detailed whiteboard sketches with measurements and calculations. These act as the starting point for building prototypes." },
  { title: "Design", body: "We build prototypes with FTC-legal parts, test them, discuss improvements as a team, then refine in OnShape (CAD) to optimize and ensure precision for competition." },
  { title: "Assemble", body: "After sketching, we build working models using available parts. We then create a 3D CAD model in OnShape to make it easier to adjust components and achieve the best version." },
  { title: "Evaluate", body: "We test thoroughly and compare the mechanism to original sketches. As a team we discuss strengths and weaknesses, deciding which parts to keep and which need improvement." },
  { title: "Iterate", body: "Through multiple targeted iterations we make the design simpler, more reliable, and more versatile. After satisfaction we CAD the final design and integrate with the full robot CAD." },
];

/* ─── Page ────────────────────────────────────────────────────────────── */

const SECTIONS = [
  ["robot", "Robot"],
  ["design", "Design process"],
  ["subsystems", "Subsystems"],
  ["timeline", "Build log"],
  ["competitions", "Competitions"],
  ["awards", "Awards"],
  ["outreach", "Outreach"],
  ["teampic", "Team photo"],
] as const;

export default function Season2526() {
  return (
    <>
      <HeroSection />
      <SectionNav />
      <RobotSection />
      <DesignProcessSection />
      <SubsystemsSection />
      <TimelineSection />
      <CompetitionsSection />
      <AwardsSection />
      <OutreachSection />
      <TeamPhotoSection />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="pt-[72px]">
      <div className="grid lg:grid-cols-12 lg:min-h-[calc(100svh-72px)]">
        <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto overflow-hidden bg-surface">
          <img
            src="/season/2526/finalrobot.webp"
            alt="Our finished DECODE robot"
            width={548}
            height={588}
            className="photo drift"
          />
        </div>
        <div className="lg:col-span-7 wrap pt-10 pb-12 lg:pt-14 flex flex-col justify-end gap-12">
          <div>
            <h1 className="t-display lines">
              <span className="line">
                <span data-line style={{ "--i": 0 } as React.CSSProperties}>DECODE</span>
              </span>
              <span className="line">
                <span data-line style={{ "--i": 1 } as React.CSSProperties}>Season 2025–26</span>
              </span>
            </h1>
            <p className="t-lead mt-6 measure-wide after-lines">
              Our second competitive season: two qualifiers, two awards, a
              playoff run as alliance captain, and a robot built through more
              than eight major design iterations.
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-[var(--gutter)] gap-y-5 mt-10 after-lines">
              {[
                { val: "2", label: "Qualifiers" },
                { val: "2", label: "Awards" },
                { val: "7th", label: "Best ranking" },
                { val: "9–5–0", label: "Overall record" },
                { val: "Alliance captain", label: "Alexandria" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="t-small text-muted">{s.label}</dt>
                  <dd className="t-lead font-semibold tabular">{s.val}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 after-lines">
              <Link href="/seasons" className="link">
                <span aria-hidden>←</span> All seasons
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section nav ─────────────────────────────────────────────────────── */

function SectionNav() {
  const [active, setActive] = useState<string>("robot");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 160;
      for (const [id] of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) { setActive(id); break; }
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav aria-label="On this page" className="sticky top-[72px] z-40 bg-navy text-navy-ink">
      <div className="drag-row wrap flex gap-6">
        {SECTIONS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={`py-4 whitespace-nowrap font-semibold underline decoration-[3px] underline-offset-[8px] transition-colors duration-200 ${
              active === id ? "decoration-yellow" : "decoration-transparent text-navy-soft hover:text-navy-ink"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Robot ───────────────────────────────────────────────────────────── */

function RobotSection() {
  return (
    <section id="robot" className="section">
      <div className="wrap grid12 gap-y-10">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Robot overview</h2>
        <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
          <table className="w-full border-collapse">
            <tbody>
              {[
                ["Season game", "DECODE, FTC 2025–26"],
                ["Drive train", "Mecanum, 4-wheel omnidirectional"],
                ["Control system", "REV Control Hub"],
                ["Language", "Java (FTC SDK)"],
                ["Intake", "Claw intake (V4), spring-loaded"],
                ["Transfer", "Horizontal claw-to-claw (V3)"],
                ["Belt system", "Timing belt, dual hex shaft, 1 servo"],
                ["CAD", "OnShape"],
              ].map(([l, v]) => (
                <tr key={l} className="border-b border-ink/15 last:border-0"> {/* taste-skill-ignore: real table */}
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-muted w-[42%] align-top">{l}</th>
                  <td className="py-3 font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8">
            Awards this season:{" "}
            <a href="#awards" className="link">Innovate Award (RTX), 2nd place</a> and the{" "}
            <a href="#awards" className="link">Control Award</a>.
          </p>
        </div>
      </div>

      <div className="wrap grid grid-cols-2 gap-[var(--gutter)] mt-16">
        <figure data-reveal>
          <div className="aspect-[4/3] photo-frame">
            <img src="/season/2526/drivetrain.webp" alt="Mecanum drivetrain" width={456} height={430} loading="lazy" className="photo" />
          </div>
          <figcaption className="t-small text-muted mt-2">The mecanum drivetrain, wired for testing.</figcaption>
        </figure>
        <figure data-reveal>
          <div className="aspect-[4/3] photo-frame">
            <img src="/season/2526/intake.webp" alt="Intake mechanism" width={562} height={430} loading="lazy" className="photo" />
          </div>
          <figcaption className="t-small text-muted mt-2">The intake on the build table.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ─── Design process ──────────────────────────────────────────────────── */

function DesignProcessSection() {
  return (
    <section id="design" className="section bg-navy text-navy-ink">
      <div className="wrap grid12 gap-y-6">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Design process</h2>
        <p className="col-span-12 md:col-start-6 md:col-span-7 t-lead measure-wide" data-reveal>
          Every mechanism on the robot went through this cycle. The intake took
          four major versions, the claw four, and the transfer three.
        </p>
      </div>
      <ol className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[var(--gutter)] gap-y-12 mt-16 list-decimal list-inside marker:font-extrabold marker:text-yellow">
        {DESIGN_STEPS.map((s) => (
          <li key={s.title} data-reveal>
            <span className="t-lead font-semibold">{s.title}</span>
            <p className="mt-3 text-navy-soft measure">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ─── Subsystems ──────────────────────────────────────────────────────── */

function SubsystemsSection() {
  const [active, setActive] = useState(0);
  const cur = SUBSYSTEMS[active];

  return (
    <section id="subsystems" className="section">
      <div className="wrap grid12 gap-y-10">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Subsystems</h2>
        <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Subsystems">
            {SUBSYSTEMS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`min-h-[44px] px-4 font-semibold text-left transition-colors duration-200 ${
                  active === i ? "bg-navy text-navy-ink" : "bg-surface hover:bg-yellow"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div key={active} role="tabpanel" className="mt-10 panel-in">
            <p className="t-small text-muted">{cur.tag}</p>
            <h3 className="t-lead font-semibold">{cur.name}</h3>
            <p className="mt-4 measure-wide">{cur.body}</p>
          </div>
        </div>
      </div>

      <div className="wrap mt-[var(--section)]">
        <div className="grid12 gap-y-4 mb-10">
          <h3 className="col-span-12 md:col-span-5 t-head" data-reveal>Four versions each</h3>
          <p className="col-span-12 md:col-start-6 md:col-span-7 measure-wide" data-reveal>
            The intake and the claw, from first prototype to competition
            version. Each one is modelled in OnShape with a list of what worked
            and what did not.
          </p>
        </div>
        <div data-reveal>
          <IterationExplorer />
        </div>
      </div>
    </section>
  );
}

/* ─── Build log ───────────────────────────────────────────────────────── */

function TimelineSection() {
  return (
    <section id="timeline" className="section bg-surface">
      <div className="wrap grid12 gap-y-6 mb-14">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Build log</h2>
        <p className="col-span-12 md:col-start-6 md:col-span-7 measure-wide" data-reveal>
          From the first research in September to the Alexandria qualifier in
          January, month by month.
        </p>
      </div>
      <ol className="wrap grid gap-y-10">
        {TIMELINE.map((t) => (
          <li key={t.month} className="grid12 gap-y-2" data-reveal>
            <div className="col-span-12 md:col-span-4">
              <p className="t-lead font-semibold">{t.month}</p>
              <p className={`t-small ${t.tagClass === "comp" ? "font-semibold" : "text-muted"}`}>{t.tag}</p>
            </div>
            <p className={`col-span-12 md:col-start-6 md:col-span-7 measure-wide ${t.tagClass === "comp" ? "bg-yellow p-5 -mx-5 md:mx-0" : ""}`}>
              {t.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ─── Competitions ────────────────────────────────────────────────────── */

type Match = { score: number; result: string; label?: string };

function MatchBars({ matches, prefix }: { matches: Match[]; prefix?: string }) {
  const max = 211;
  return (
    <ul className="flex items-end gap-2 h-[220px]" aria-label="Match scores">
      {matches.map((m, j) => {
        const label = m.label ?? `${prefix}${j + 1}`;
        const win = m.result === "W";
        return (
          <li key={label} className="group flex-1 min-w-0 max-w-[72px] h-full flex flex-col justify-end">
            <span className="t-small font-semibold tabular text-center">{m.score}</span>
            <span
              className={`block mt-1 origin-bottom transition-transform duration-300 group-hover:scale-y-[1.03] ${win ? "bg-win" : "bg-loss"}`}
              style={{ height: `${Math.max(8, (m.score / max) * 150)}px` }}
              aria-hidden
            />
            <span className="t-small text-center mt-1 leading-tight">
              {label}
              <span className={`block ${win ? "text-win font-semibold" : "text-loss font-semibold"}`}>{win ? "W" : "L"}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function CompetitionsSection() {
  return (
    <section id="competitions" className="section">
      <div className="wrap grid12 gap-y-6 mb-14">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Competitions</h2>
        <p className="col-span-12 md:col-start-6 md:col-span-7 measure-wide" data-reveal>
          Our alliance score in every match, qualification and playoff. Green
          bars are wins, red bars are losses.
        </p>
      </div>

      <div className="wrap grid gap-y-20">
        {COMPETITIONS.map((comp) => (
          <article key={comp.name} className="grid12 gap-y-8" data-reveal>
            <div className="col-span-12 md:col-span-5">
              <h3 className="t-lead font-semibold">{comp.name}</h3>
              <p className="text-muted">{comp.date}</p>
              <p className="mt-4 inline-block bg-yellow px-3 py-1 font-semibold">{comp.award}</p>
              <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-4 mt-8">
                <div>
                  <dt className="t-small text-muted">Qual ranking</dt>
                  <dd className="font-semibold tabular">{comp.qualRank}</dd>
                </div>
                <div>
                  <dt className="t-small text-muted">Qual record</dt>
                  <dd className="font-semibold tabular">{comp.qualRecord}</dd>
                </div>
                {comp.playoffs && (
                  <>
                    <div>
                      <dt className="t-small text-muted">Alliance</dt>
                      <dd className="font-semibold">{comp.allianceRole}</dd>
                    </div>
                    <div>
                      <dt className="t-small text-muted">Playoff record</dt>
                      <dd className="font-semibold tabular">{comp.playoffRecord}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
            <div className="col-span-12 md:col-start-6 md:col-span-7 grid sm:grid-cols-2 gap-10">
              <div>
                <p className="t-small text-muted mb-4">Qualification matches</p>
                <MatchBars matches={comp.qualMatches} prefix="Q" />
              </div>
              {comp.playoffs && comp.playoffMatches && (
                <div>
                  <p className="t-small text-muted mb-4">Playoff matches</p>
                  <MatchBars matches={comp.playoffMatches} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Awards ──────────────────────────────────────────────────────────── */

function AwardsSection() {
  return (
    <section id="awards" className="grid lg:grid-cols-2">
      {AWARDS.map((award, i) => (
        <article
          key={award.name}
          className={`wrap pt-16 pb-16 md:pt-24 md:pb-24 flex flex-col justify-between gap-16 min-h-[70svh] ${
            i === 0 ? "bg-yellow text-navy" : "bg-blue text-white"
          }`}
        >
          <div data-reveal>
            <h2 className="t-head max-w-[16ch]">{award.name}</h2>
            <p className="t-lead font-semibold mt-4">{award.place}</p>
          </div>
          <div data-reveal>
            <p className="font-semibold">{award.event}, {award.date}</p>
            <p className="mt-3 measure">{award.desc}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ─── Outreach ────────────────────────────────────────────────────────── */

const OUTREACH_PHOTOS = [
  { src: "/season/2526/java.webp", w: 1196, h: 1008 },
  { src: "/season/2526/stemnight.jpg", w: 1067, h: 800 },
  { src: "/season/2526/churchill.jpg", w: 650, h: 433 },
];

function OutreachSection() {
  return (
    <section id="outreach" className="section">
      <div className="wrap grid12 gap-y-6 mb-14">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Outreach</h2>
        <p className="col-span-12 md:col-start-6 md:col-span-7 t-lead measure-wide" data-reveal>
          We reached more than 230 students and families this season through
          workshops, STEAM events and coaching FIRST LEGO League teams.
        </p>
      </div>
      <div className="wrap grid md:grid-cols-3 gap-x-[var(--gutter)] gap-y-14">
        {OUTREACH.map((item, i) => (
          <article key={item.title} data-reveal>
            <div className="aspect-[4/3] photo-frame">
              <img
                src={OUTREACH_PHOTOS[i].src}
                alt={item.title}
                width={OUTREACH_PHOTOS[i].w}
                height={OUTREACH_PHOTOS[i].h}
                loading="lazy"
                className="photo"
              />
            </div>
            <h3 className="t-lead font-semibold mt-5">{item.title}</h3>
            <p className="font-semibold text-accent">{item.students}</p>
            <p className="mt-3">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Team photo ──────────────────────────────────────────────────────── */

function TeamPhotoSection() {
  return (
    <section id="teampic" className="pb-[var(--section)]">
      <figure data-reveal>
        <div className="max-h-[88svh] overflow-hidden">
          <img
            src="/season/2526/teampic.webp"
            alt="Vienna Voltage team photo, Season 2025–26"
            width={1736}
            height={1302}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
        <figcaption className="wrap mt-4">
          Vienna Voltage, FTC Team 27427, Season 2025–26.{" "}
          <Link href="/team" className="link">Meet the team <span className="arrow">→</span></Link>
        </figcaption>
      </figure>
    </section>
  );
}
