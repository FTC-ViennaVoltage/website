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

type TagStyle = { bg: string; text: string; border?: string };

/* One color family per subteam; the subteam's lead gets a brighter
   shade, a stronger tint, and an outlined chip. Team leadership is gold. */
const TAG_COLORS: Record<string, TagStyle> = {
  Captain: { bg: "rgba(251,191,36,.18)", text: "#fcd34d", border: "rgba(251,191,36,.45)" },
  "Vice Captain": { bg: "rgba(251,191,36,.10)", text: "#fbbf24", border: "rgba(251,191,36,.28)" },
  "Build Lead": { bg: "rgba(52,211,153,.16)", text: "#6ee7b7", border: "rgba(52,211,153,.45)" },
  Build: { bg: "rgba(52,211,153,.10)", text: "#34d399" },
  "Software Lead": { bg: "rgba(167,139,250,.16)", text: "#c4b5fd", border: "rgba(167,139,250,.45)" },
  Software: { bg: "rgba(167,139,250,.10)", text: "#a78bfa" },
  "Outreach Lead": { bg: "rgba(244,114,182,.16)", text: "#f9a8d4", border: "rgba(244,114,182,.45)" },
  Outreach: { bg: "rgba(244,114,182,.10)", text: "#f472b6" },
};

const FALLBACK_TAG: TagStyle = { bg: "rgba(107,127,153,.12)", text: "#6b7f99" };

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

/* The lead's highest-ranking leadership tag — used for card accents */
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
    name: "Joseph B",
    photo: "josephbobek.webp",
    tags: ["Build"],
    bio: "Langley '29. I am part of Langley FRC's build team in addition to FTC. I also do competitive wrestling.",
  },
  {
    name: "Bryan T",
    photo: "bryantan.webp",
    tags: ["Build"],
    bio: "TJ '29. I love learning about STEM and applying my knowledge in the real world. For example, statistically speaking, K-Pop is mid at best. 😉",
  },
  {
    name: "Isaac L",
    photo: "IL",
    tags: ["Build", "Outreach"],
    bio: "Langley '29. I like to spend time with friends and like connecting to new people.",
  },
  {
    name: "Caden O",
    initials: "CO",
    tags: ["Software"],
    bio: "Langley '28. I have a deep passion for problem solving across STEM and life as a whole.",
  },
  {
    name: "Leo W",
    photo: "leowang.png",
    tags: ["Software"],
    bio: "Langley '2029. I like math and computer science.",
  },
  {
    name: "Landon Y",
    initials: "LY",
    tags: ["Software"],
    bio: "My name is Landon, and I am a rising 10th grade student at TJ. I enjoy robotics and coding.",
  },
  {
    name: "Robert L",
    photo: "robertliu.webp",
    tags: ["Outreach"],
    bio: "Langley '29. I like networking and teaching kids computer science.",
  },
  {
    name: "Ryan I",
    initials: "RI",
    tags: ["Outreach"],
    bio: "TJHSST '29",
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

  const leads = members
    .filter(isLead)
    .sort((a, b) => tagRank(leadTag(a)!) - tagRank(leadTag(b)!));
  const rest = members.filter((m) => !isLead(m));

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-accent mb-3 text-center fade-in">
          Team Members
        </p>

        <h3 className="fade-in text-center text-sm font-semibold tracking-[0.1em] uppercase text-muted mt-12 mb-6">
          Leadership
        </h3>
        <div className="flex flex-wrap justify-center gap-5">
          {leads.map((member) => (
            <LeadCard key={member.name} member={member} />
          ))}
        </div>

        <h3 className="fade-in text-center text-sm font-semibold tracking-[0.1em] uppercase text-muted mt-14 mb-6">
          Members
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {rest.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ member, size, ring }: { member: Member; size: string; ring?: string }) {
  const ringStyle = ring ? { boxShadow: `0 0 0 3px ${ring}` } : undefined;
  return member.photo ? (
    <div className={`${size} rounded-full overflow-hidden flex-shrink-0`} style={ringStyle}>
      <img
        src={`/photos/${member.photo}`}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
  ) : (
    <div
      className={`${size} rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-muted`}
      style={{ background: "var(--bg3)", ...ringStyle }}
    >
      {member.initials}
    </div>
  );
}

function TagChips({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {sortTags(tags).map((tag) => {
        const color = TAG_COLORS[tag] ?? FALLBACK_TAG;
        return (
          <span
            key={tag}
            className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: color.bg,
              color: color.text,
              border: `1px solid ${color.border ?? "transparent"}`,
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function LeadCard({ member }: { member: Member }) {
  const accent = TAG_COLORS[leadTag(member)!] ?? FALLBACK_TAG;
  return (
    <div className="fade-in flex flex-col items-center text-center bg-card border border-border rounded-2xl p-7 transition-all duration-300 hover:border-[rgba(59,130,246,.35)] hover:-translate-y-1 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
      <Avatar member={member} size="w-24 h-24" ring={accent.border ?? accent.bg} />
      <h3 className="font-sans text-voltage-primary font-semibold text-lg mt-4 mb-2">
        {member.name}
      </h3>
      <TagChips tags={member.tags} />
      <p className="text-muted text-sm leading-[1.7] mt-3">{member.bio}</p>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="fade-in flex flex-col items-center text-center bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:border-[rgba(59,130,246,.35)] hover:-translate-y-1 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]">
      <Avatar member={member} size="w-16 h-16" />
      <h3 className="font-sans text-voltage-primary font-semibold text-[0.95rem] mt-3 mb-2">
        {member.name}
      </h3>
      <TagChips tags={member.tags} />
      <p className="text-muted text-[0.8rem] leading-[1.6] mt-3">{member.bio}</p>
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
