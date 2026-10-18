"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ────────────────────────────────────────────────────────────── */

type Member = {
  name: string;
  photo?: string;
  initials?: string;
  tags: string[];
  bio: string;
};

/* Leadership tags first, then subteams — controls chip order and lead sorting */
const TAG_ORDER = [
  "Captain",
  "Vice Captain",
  "Build Lead",
  "Software Lead",
  "Outreach Lead",
  "Build",
  "Software",
  "Outreach",
];

const LEAD_TAGS = new Set(TAG_ORDER.slice(0, 5));

const tagRank = (tag: string) => {
  const i = TAG_ORDER.indexOf(tag);
  return i === -1 ? TAG_ORDER.length : i;
};

const sortTags = (tags: string[]) =>
  [...tags].sort((a, b) => tagRank(a) - tagRank(b));

const isLead = (m: Member) => m.tags.some((t) => LEAD_TAGS.has(t));

/* The lead's highest-ranking leadership tag — sorts the leadership list */
const leadTag = (m: Member) => sortTags(m.tags).find((t) => LEAD_TAGS.has(t));

const PLACEHOLDER_BIO =
  "Placeholder — add your grade and a bit about what you work on.";

const members: Member[] = [
  {
    name: "Harry B",
    photo: "harrybai.png",
    tags: ["Captain", "Build", "Software", "Outreach"],
    bio: "Langley '29. I listen to K-Pop and I'm a certified vibecoder.",
  },
  {
    name: "Oliver Y",
    photo: "olivery.png",
    tags: ["Build", "Outreach", "Vice Captain"],
    bio: "TJHSST '29. I'm an avid hockey fan (go Caps!) and I'm interested in all things science and engineering.",
  },
  {
    name: "Fionn M",
    photo: "fionnmoloney.webp",
    tags: ["Build Lead"],
    bio: "Langley '29",
  },
  {
    name: "Karim A",
    photo: "karima.png",
    tags: ["Software Lead", "Build"],
    bio: "LHS '29. NVCC '29 CS. Rewrote this entire website from scratch.",
  },
  {
    name: "Essam M",
    initials: "EM",
    tags: ["Outreach Lead", "Build"],
    bio: "Hey! I'm Essam, I love research, community involvement, and teaching. Additionally, I used to despise pickles, now I like them.",
  },
  {
    name: "Dalton S",
    photo: "daltonsheng.png",
    tags: ["Build"],
    bio: "Oakton '29. I'm a fencer outside of school and I like doing CAD a lot.",
  },
  {
    name: "Ethan H",
    photo: "ethanhahn.webp",
    tags: ["Build"],
    bio: "I like doing anything engineering related especially CAD.",
  },
  {
    name: "Adan L",
    photo: "adanli.webp",
    tags: ["Build"],
    bio: "Langley 2029 + Langley SciOly 25-26 Season. I like aerospace and I do martial arts.",
  },
  {
    name: "Bryan T",
    photo: "bryantan.webp",
    tags: ["Build"],
    bio: "TJ '29. I love learning about STEM and applying my knowledge in the real world. For example, statistically speaking, K-Pop is mid at best. 😉",
  },
  {
    name: "Caden O",
    initials: "CO",
    tags: ["Software"],
    bio: "Langley '28. I have a deep passion for problem solving across STEM and life as a whole.",
  },
  {
    name: "Landon Y",
    initials: "LY",
    tags: ["Software"],
    bio: "My name is Landon, and I am a rising 10th grade student at TJ. I enjoy robotics and coding.",
  },
  {
    name: "Ryan I",
    initials: "RI",
    tags: ["Outreach"],
    bio: "TJHSST '29",
  },
  {
    name: "Alex W",
    initials: "AW",
    tags: ["Build"],
    bio: "McLean '30"
  },
  {
    name: "Brandon Q",
    initials: "BQ",
    tags: ["Outreach"],
    bio: "TJHSST '29"
  },
  {
    name: "Benjamin W",
    initials: "BW",
    tags: ["Software"],
    bio: "TJHSST '29"
  },
];

type Advisor = {
  name: string;
  role: string;
  bio: string;
};

const advisors: Advisor[] = [
  {
    name: "Jing Feng",
    role: "Team Mentor",
    bio: "Harry's mom. Will help guide the team through the logistics.",
  },
  {
    name: "Faculty Advisor",
    role: "Advisor",
    bio: PLACEHOLDER_BIO,
  },
];

/* Subteam filter: a lead counts toward the subteam they lead */
const SUBTEAMS = ["Build", "Software", "Outreach"] as const;
type Filter = "Everyone" | (typeof SUBTEAMS)[number];

const inSubteam = (m: Member, f: Filter) =>
  f === "Everyone" ||
  m.tags.some((t) => t === f || t === `${f} Lead`) ||
  m.tags.includes("Captain");

export default function TeamPage() {
  const [filter, setFilter] = useState<Filter>("Everyone");

  const leads = members
    .filter(isLead)
    .sort((a, b) => tagRank(leadTag(a)!) - tagRank(leadTag(b)!));
  const rest = members.filter((m) => !isLead(m));
  const shownLeads = leads.filter((m) => inSubteam(m, filter));
  const shownRest = rest.filter((m) => inSubteam(m, filter));

  return (
    <>
      <Hero />

      <section className="section !pb-0" aria-labelledby="roster">
        <div className="wrap grid12 gap-y-8 items-end">
          <h2 id="roster" className="col-span-12 md:col-span-5 t-head" data-reveal>
            {members.length} students
          </h2>
          <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
            <p className="t-small text-muted mb-2">Show</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by subteam">
              {(["Everyone", ...SUBTEAMS] as Filter[]).map((f) => {
                const n = members.filter((m) => inSubteam(m, f)).length;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`min-h-[44px] px-4 font-semibold transition-colors duration-200 ${
                      filter === f ? "bg-navy text-navy-ink" : "bg-surface hover:bg-yellow"
                    }`}
                  >
                    {f} <span className="tabular opacity-70">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16" aria-labelledby="leadership">
        <div className="wrap grid12 mb-8">
          <h3 id="leadership" className="on-axis t-lead font-semibold">
            Leadership
          </h3>
        </div>
        <ul className="wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[var(--gutter)] gap-y-12">
          {shownLeads.map((m) => (
            <li key={m.name} className="panel-in">
              <Portrait member={m} />
              <p className="t-lead font-semibold mt-4">{m.name}</p>
              <Roles tags={m.tags} />
              <p className="mt-3 text-muted">{m.bio}</p>
            </li>
          ))}
        </ul>
        {shownLeads.length === 0 && (
          <p className="wrap text-muted">No leads in this subteam.</p>
        )}
      </section>

      <section className="pt-24 pb-[var(--section)]" aria-labelledby="members">
        <div className="wrap grid12 mb-8">
          <h3 id="members" className="on-axis t-lead font-semibold">
            Members
          </h3>
        </div>
        <ul className="wrap grid12 gap-y-2">
          {shownRest.map((m) => (
            <li
              key={m.name}
              className="col-span-12 grid grid-cols-[64px_1fr] md:grid-cols-[subgrid] md:col-span-12 gap-x-[var(--gutter)] items-center bg-surface/60 hover:bg-surface transition-colors duration-200 p-3 md:p-0 md:pr-4 panel-in"
            >
              <div className="md:col-span-1 w-16 h-16 md:w-20 md:h-20 overflow-hidden">
                <Portrait member={m} small />
              </div>
              <div className="md:col-span-4 md:pl-2">
                <p className="font-semibold">{m.name}</p>
                <Roles tags={m.tags} />
              </div>
              <p className="col-span-2 md:col-start-6 md:col-span-7 text-muted mt-2 md:mt-0 md:py-4">
                {m.bio}
              </p>
            </li>
          ))}
        </ul>
        {shownRest.length === 0 && (
          <p className="wrap text-muted">No members in this subteam.</p>
        )}
      </section>

      <Advisors />
    </>
  );
}

function Hero() {
  return (
    <section className="pt-[72px]">
      <div className="wrap grid12 gap-y-8 pt-[clamp(64px,12vh,140px)] pb-12 items-end">
        <p className="left-zone t-body measure after-lines order-2 min-[900px]:order-1">
          High school students from across the DMV who design, build, code and
          teach together. Every one of them is on at least one subteam: build,
          software or outreach.
        </p>
        <h1 className="on-axis t-display lines order-1 min-[900px]:order-2">
          <span className="line">
            <span data-line style={{ "--i": 0 } as React.CSSProperties}>
              Meet the team
            </span>
          </span>
        </h1>
      </div>
      <div className="h-[42svh] md:h-[62svh] overflow-hidden">
        <img
          src="/season/2526/teampic.webp"
          alt="The Vienna Voltage team with our 2025–26 robot"
          width={1736}
          height={1302}
          className="photo drift object-[50%_40%]"
        />
      </div>
    </section>
  );
}

function Portrait({ member, small }: { member: Member; small?: boolean }) {
  return member.photo ? (
    <div className={`${small ? "w-full h-full" : "aspect-[4/5]"} overflow-hidden bg-surface photo-frame`}>
      <img
        src={`/photos/${member.photo}`}
        alt={member.name}
        loading="lazy"
        className="photo"
      />
    </div>
  ) : (
    <div
      className={`${small ? "w-full h-full" : "aspect-[4/5]"} bg-navy text-yellow flex items-end p-3`}
      aria-hidden
    >
      <span className={`font-extrabold tracking-[-0.05em] leading-none ${small ? "t-body" : "t-head"}`}>
        {member.initials}
      </span>
    </div>
  );
}

function Roles({ tags }: { tags: string[] }) {
  const sorted = sortTags(tags);
  return (
    <p className="t-small">
      {sorted.map((t, i) => (
        <span key={t} className={LEAD_TAGS.has(t) ? "font-semibold" : "text-muted"}>
          {t}
          {i < sorted.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

function Advisors() {
  return (
    <section className="section bg-surface">
      <div className="wrap grid12 gap-y-10">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>
          Who guides us
        </h2>
        <ul className="col-span-12 md:col-start-6 md:col-span-7 grid gap-10 md:grid-cols-2">
          {advisors.map((a, i) => (
            <li key={i} data-reveal>
              <p className="t-lead font-semibold">{a.name}</p>
              <p className="t-small text-muted">{a.role}</p>
              <p className="mt-3">{a.bio}</p>
            </li>
          ))}
        </ul>
        <p className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
          Want to mentor or advise the team?{" "}
          <Link href="/get-involved" className="link">
            Get in touch <span className="arrow">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
