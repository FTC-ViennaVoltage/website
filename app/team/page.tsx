"use client";

import { useEffect, useRef } from "react";

/* ─── Data ────────────────────────────────────────────────────────────── */

type Member = {
  name: string;
  photo?: string;
  initials?: string;
  tags: string[];
  bio: string;
};

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Captain: { bg: "rgba(59,130,246,.12)", text: "#3b82f6" },
  "Vice Captain": { bg: "rgba(59,130,246,.12)", text: "#3b82f6" },
  Mechanical: { bg: "rgba(16,185,129,.12)", text: "#10b981" },
  Programming: { bg: "rgba(139,92,246,.12)", text: "#8b5cf6" },
  "Robot Design": { bg: "rgba(245,158,11,.12)", text: "#f59e0b" },
  Design: { bg: "rgba(245,158,11,.12)", text: "#f59e0b" },
  Outreach: { bg: "rgba(236,72,153,.12)", text: "#ec4899" },
};

const PLACEHOLDER_BIO =
  "Placeholder — add your grade and a bit about what you work on.";

const members: Member[] = [
  {
    name: "Harry B",
    photo: "harrybai.png",
    tags: ["Captain", "Robot Design", "Mechanical", "Programming", "Outreach"],
    bio: "Hey guys, my name is Harry, and I am Langley '29. One fun fact about me is that I like listening to K-Pop, A LOT. Certified vibecoder",
  },
  {
    name: "Joshua L",
    initials: "JL",
    tags: ["Robot Design", "Mechanical", "Outreach"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Zakhar L",
    initials: "ZL",
    tags: ["Mechanical", "Programming", "Outreach"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Fionn M",
    initials: "FM",
    tags: ["Robot Design", "Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Dalton S",
    initials: "DS",
    tags: ["Robot Design", "Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Ethan H",
    photo: "ethanhahn.webp",
    tags: ["Robot Design", "Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Max S",
    initials: "MS",
    tags: ["Robot Design", "Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Essam M",
    initials: "EM",
    tags: ["Robot Design", "Mechanical", "Outreach"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Adan L",
    photo: "adanli.webp",
    tags: ["Robot Design", "Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Oliver Y",
    initials: "OY",
    tags: ["Mechanical", "Outreach"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Joseph B",
    initials: "JB",
    tags: ["Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Bryan T",
    initials: "BT",
    tags: ["Mechanical"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Isaac L",
    photo: "isaaclin.png",
    tags: ["Mechanical", "Outreach"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Caden O",
    initials: "CO",
    tags: ["Programming"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Leo W",
    photo: "leowang.png",
    tags: ["Programming"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Landon Y",
    initials: "LY",
    tags: ["Programming"],
    bio: PLACEHOLDER_BIO,
  },
  {
    name: "Karim A",
    initials: "KA",
    tags: ["Programming"],
    bio: "LHS '29. NVCC '29 CS. Rewrote this entire website from scratch.",
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


export default function TeamPage() {
  return (
    <>
      <HeroSection />
      <Divider />
      <MembersSection />
      <Divider />
      <AdvisorsSection />
    </>
  );
}


function HeroSection() {
  return (
    <section
      className="pt-40 pb-20 px-6 text-center border-b border-border"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,.08) 0%, transparent 70%)",
      }}
    >
      <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-4">
        The people behind the robot
      </p>
      <h1 className="font-sans text-[clamp(2.4rem,5vw,3.6rem)] font-bold text-voltage-primary tracking-tight mb-5">
        Meet the Team
      </h1>
      <p className="max-w-[640px] mx-auto text-muted leading-[1.8] text-base">
        Vienna Voltage is made up of multiple high school students from the DMV
        who are passionate about robotics and aspire to do their best when it
        comes to being part of the team.
      </p>
    </section>
  );
}

/* ─── Members ─────────────────────────────────────────────────────────── */

function MembersSection() {
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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3 text-center fade-in">
          Team Members
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {members.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="fade-in bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(59,130,246,.35)] hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        {member.photo ? (
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={`/photos/${member.photo}`}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-muted"
            style={{ background: "var(--bg3)" }}
          >
            {member.initials}
          </div>
        )}

        <div>
          <h3 className="font-sans text-voltage-primary font-semibold text-base">
            {member.name}
          </h3>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.tags.map((tag) => {
          const color = TAG_COLORS[tag] ?? {
            bg: "rgba(107,127,153,.12)",
            text: "#6b7f99",
          };
          return (
            <span
              key={tag}
              className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: color.bg, color: color.text }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Bio */}
      <p className="text-muted text-sm leading-[1.7]">{member.bio}</p>
    </div>
  );
}

/* ─── Advisors ────────────────────────────────────────────────────────── */

function AdvisorsSection() {
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
      className="py-24 px-6"
      style={{ background: "var(--bg2)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3 text-center fade-in">
          Mentors &amp; advisors
        </p>
        <h2 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-bold text-voltage-primary tracking-tight text-center mb-12 fade-in">
          Who guides us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px] mx-auto">
          {advisors.map((advisor, i) => (
            <div
              key={i}
              className="fade-in flex items-start gap-4 bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(59,130,246,.35)]"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold text-muted"
                style={{ background: "var(--bg3)" }}
              >
                ?
              </div>

              <div>
                <h3 className="font-sans text-voltage-primary font-semibold text-base">
                  {advisor.name}
                </h3>
                <p className="text-accent text-[0.75rem] font-medium mb-2">
                  {advisor.role}
                </p>
                <p className="text-muted text-sm leading-[1.7]">
                  {advisor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Divider ─────────────────────────────────────────────────────────── */

function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}
