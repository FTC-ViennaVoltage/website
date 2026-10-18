"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SeasonDetailProps {
  seasonName: string;
  gameName: string;
  seasonShort: string;
}

/* ─── Data ─── */

const subsystems = [
  { name: "Drivetrain", tag: "HW", description: "Placeholder — describe your drivetrain design, gear ratios, wheel type, and any design trade-offs here." },
  { name: "Intake/Scoring", tag: "HW", description: "Placeholder — describe how the robot picks up and scores game elements, mechanism type, iterations." },
  { name: "Lift/Extension", tag: "HW", description: "Placeholder — describe your linear slides, arm, or other extension mechanism and its range of motion." },
  { name: "Autonomous", tag: "SW", description: "Placeholder — describe your autonomous strategy, path planning approach, and reliability." },
  { name: "TeleOp", tag: "SW", description: "Placeholder — describe driver control scheme, automation assists, and field-centric modes." },
  { name: "Sensors", tag: "HW", description: "Placeholder — describe sensors used (distance, color, IMU, encoders) and how they integrate with software." },
];

const milestones = [
  { date: "Month Year", title: "Kickoff & game analysis", tag: "Planning", tagClass: "hw", body: "Placeholder — describe what you learned at kickoff, initial game analysis, strategy brainstorming, and early prototyping ideas." },
  { date: "Month Year", title: "Drivetrain prototype", tag: "Hardware", tagClass: "hw", body: "Placeholder — describe first physical prototype, materials chosen, assembly challenges, and lessons learned." },
  { date: "Month Year", title: "First autonomous program", tag: "Software", tagClass: "sw", body: "Placeholder — describe your first working autonomous, testing methodology, and accuracy results." },
  { date: "Month Year", title: "Scoring mechanism iteration", tag: "Hardware", tagClass: "hw", body: "Placeholder — log a key design iteration, what failed, what improved, and quantitative results." },
  { date: "Month Year", title: "Scrimmage / qualifier results", tag: "Competition", tagClass: "test", body: "Placeholder — summarize competition performance, match results, and adjustments made." },
];

const posts = [
  { cat: "competition", title: "Add your competition update title here", body: "Placeholder — describe match results, alliance selections, and key moments from the event.", date: "Month DD, 2026" },
  { cat: "build", title: "Add a build milestone update here", body: "Placeholder — share a significant build milestone, design decision, or mechanical improvement.", date: "Month DD, 2026" },
  { cat: "outreach", title: "Add an outreach event update here", body: "Placeholder — describe a community outreach event, demo, or mentorship activity.", date: "Month DD, 2026" },
  { cat: "team", title: "Add a team news update here", body: "Placeholder — share team news such as new members, sponsorships, or milestones.", date: "Month DD, 2026" },
  { cat: "build", title: "Add another build or software update", body: "Placeholder — document another iteration, software feature, or testing session.", date: "Month DD, 2026" },
  { cat: "team", title: "Season kickoff recap", body: "Placeholder — recap the season kickoff event, team goals, and initial excitement.", date: "Month DD, 2025" },
];

const navLinks = ["Robot", "Subsystems", "Build Log", "Updates", "Awards"];
const navIds = ["robot", "subsystems", "buildlog", "updates", "awards"];
const filterOptions = ["All", "Competition", "Build", "Outreach", "Team"];

/* ─── Component ─── */

export default function SeasonDetail({ seasonName, gameName, seasonShort }: SeasonDetailProps) {
  const [activeNav, setActiveNav] = useState(0);
  const [activeSubsystem, setActiveSubsystem] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");

  // Section nav scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      for (let i = navIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(navIds[i]);
        if (section && section.offsetTop <= scrollY) {
          setActiveNav(i);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = activeFilter === "All"
    ? posts
    : posts.filter((p) => p.cat.toLowerCase() === activeFilter.toLowerCase());

  const sub = subsystems[activeSubsystem];

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="pt-[72px] bg-yellow text-navy">
        <div className="wrap grid12 gap-y-8 pt-10 pb-14 md:pb-20 min-h-[70svh] content-between">
          <p className="col-span-12 t-small after-lines">
            <Link href="/seasons" className="link">Seasons</Link>
            <span> / {seasonName}</span>
          </p>
          <p className="left-zone t-body measure self-end after-lines order-2 min-[900px]:order-1">
            {gameName}: everything about our robot, build process, competition
            results and season updates in one place.
          </p>
          <h1 className="on-axis t-display lines self-end order-1 min-[900px]:order-2">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>{gameName}</span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as React.CSSProperties}>Season {seasonName}</span>
            </span>
          </h1>
        </div>
      </section>

      {/* ─── Section nav ─── */}
      <nav aria-label="On this page" className="sticky top-[72px] z-40 bg-navy text-navy-ink">
        <div className="drag-row wrap flex gap-6">
          {navLinks.map((label, i) => (
            <a
              key={label}
              href={`#${navIds[i]}`}
              aria-current={activeNav === i ? "true" : undefined}
              className={`py-4 whitespace-nowrap font-semibold underline decoration-[3px] underline-offset-[8px] transition-colors duration-200 ${
                activeNav === i ? "decoration-yellow" : "decoration-transparent text-navy-soft hover:text-navy-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── Robot ─── */}
      <section id="robot" className="section">
        <div className="wrap grid12 gap-y-10">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Robot</h2>
          <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["Robot name", "TBD — add your robot’s name"],
                  ["Season", `FIRST Tech Challenge ${seasonShort}`],
                  ["Game", gameName],
                  ["Drive train", "Placeholder — e.g. mecanum, tank, swerve"],
                  ["Control system", "REV Control Hub"],
                  ["Programming language", "Java (FTC SDK)"],
                  ["Dimensions", "Placeholder — L × W × H (in)"],
                  ["Weight", "Placeholder — lbs"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-ink/15 last:border-0"> {/* taste-skill-ignore: real table */}
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-muted w-[42%] align-top">{label}</th>
                    <td className="py-3 font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-8 bg-surface p-5">
              Robot photos go up here once the build is far enough along to show.
            </p>
          </div>
        </div>
        <div className="wrap grid12 gap-y-6 mt-[var(--section)] mb-8">
          <h3 className="col-span-12 md:col-span-5 t-lead font-semibold" data-reveal>Where we left off</h3>
          <p className="col-span-12 md:col-start-6 md:col-span-7 measure-wide" data-reveal>
            Until this season&apos;s robot is ready, here is last season&apos;s, built
            for DECODE.{" "}
            <Link href="/seasons/2526" className="link">See 2025–26 <span className="arrow">→</span></Link>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { src: "/season/2526/finalrobot.webp", alt: "Our 2025–26 robot", w: 548, h: 588 },
            { src: "/season/2526/drivetrain.webp", alt: "Our 2025–26 mecanum drivetrain", w: 456, h: 430 },
            { src: "/season/2526/intake.webp", alt: "Our 2025–26 intake prototype", w: 562, h: 430 },
            { src: "/season/2526/teampic.webp", alt: "The team at the end of the 2025–26 season", w: 1736, h: 1302 },
          ].map((p) => (
            <div key={p.src} className="aspect-square photo-frame" data-reveal>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="photo" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Subsystems ─── */}
      <section id="subsystems" className="section bg-navy text-navy-ink">
        <div className="wrap grid12 gap-y-10">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Subsystems</h2>
          <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Subsystems">
              {subsystems.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  role="tab"
                  aria-selected={activeSubsystem === i}
                  onClick={() => setActiveSubsystem(i)}
                  className={`min-h-[44px] px-4 font-semibold transition-colors duration-200 ${
                    activeSubsystem === i ? "bg-yellow text-navy" : "bg-[#22365a] hover:bg-navy-ink hover:text-navy"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <div key={activeSubsystem} role="tabpanel" className="mt-10 panel-in">
              <p className="t-small text-navy-soft">{sub.tag === "SW" ? "Software" : "Hardware"}</p>
              <h3 className="t-lead font-semibold">{sub.name}</h3>
              <p className="mt-4 measure-wide text-navy-soft">{sub.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Build log ─── */}
      <section id="buildlog" className="section">
        <div className="wrap grid12 mb-14">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Build log</h2>
        </div>
        <ol className="wrap grid gap-y-10">
          {milestones.map((m) => (
            <li key={m.title} className="grid12 gap-y-2" data-reveal>
              <div className="col-span-12 md:col-span-4">
                <p className="t-lead font-semibold">{m.title}</p>
                <p className="t-small text-muted">{m.date} · {m.tag}</p>
              </div>
              <p className="col-span-12 md:col-start-6 md:col-span-7 measure-wide">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Updates ─── */}
      <section id="updates" className="section bg-surface">
        <div className="wrap grid12 gap-y-8 mb-12 items-end">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Season updates</h2>
          <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter updates">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setActiveFilter(opt)}
                  aria-pressed={activeFilter === opt}
                  className={`min-h-[44px] px-4 font-semibold transition-colors duration-200 ${
                    activeFilter === opt ? "bg-navy text-navy-ink" : "bg-bg hover:bg-yellow"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="t-small text-muted mt-3" aria-live="polite">
              Showing {filteredPosts.length} update{filteredPosts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <ul className="wrap grid md:grid-cols-2 gap-x-[var(--gutter)] gap-y-12">
          {filteredPosts.map((post, i) => (
            <li key={`${post.title}-${i}`} className="panel-in">
              <p className="t-small text-muted capitalize">{post.cat} · {post.date}</p>
              <h3 className="t-lead font-semibold mt-1">{post.title}</h3>
              <p className="mt-3 measure-wide">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Awards ─── */}
      <section id="awards" className="section">
        <div className="wrap grid12 gap-y-6">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Awards and results</h2>
          <p className="col-span-12 md:col-start-6 md:col-span-7 t-lead measure-wide" data-reveal>
            Awards will appear here once the season gets going.
          </p>
          {/* TODO: Add awards here — event name, award title, date */}
        </div>
      </section>
    </div>
  );
}
