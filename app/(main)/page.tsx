import Link from "next/link";
import IterationExplorer from "@/components/iteration-explorer";
import DragRow from "@/components/drag-row";

export default function Home() {
  return (
    <>
      <Hero />
      <Season />
      <BuiltFourTimes />
      <About />
      <Gallery />
      <Join />
    </>
  );
}

/* ─── Hero: masthead mosaic, title on the axis ─────────────────────── */

function Hero() {
  return (
    <section className="pt-[72px] min-h-[100svh] flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-[1.1fr_1.6fr_1.1fr_0.7fr] h-[38svh] md:h-[45svh] overflow-hidden">
        <div className="overflow-hidden hidden md:block">
          <img
            src="/season/2526/drivetrain.webp"
            alt="Our mecanum drivetrain on the shop floor, wired and ready for testing"
            width={456}
            height={430}
            className="photo drift"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src="/season/2526/java.webp"
            alt="Middle school students writing Java in the class we taught at Herbert Hoover Middle School"
            width={1196}
            height={1008}
            className="photo drift"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src="/season/2526/finalrobot.webp"
            alt="Our finished DECODE robot, 2025–26"
            width={548}
            height={588}
            className="photo drift"
          />
        </div>
        <div className="bg-yellow hidden md:block" />
      </div>

      <div className="wrap grid12 flex-1 content-end gap-y-8 pt-10 pb-[clamp(28px,6vh,72px)]">
        <div className="left-zone self-end order-2 min-[900px]:order-1">
          <p className="t-body measure after-lines">
            A high school FIRST Tech Challenge team from Northern Virginia. We
            design, build and code a new competition robot every season, and
            teach younger students to build their own.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 after-lines">
            <Link href="/get-involved" className="btn">
              Get involved
            </Link>
            <Link href="/seasons/2526" className="link">
              Our 2025–26 season <span className="arrow">→</span>
            </Link>
          </div>
        </div>
        <h1 className="on-axis t-display lines order-1 min-[900px]:order-2 self-end">
          <span className="line">
            <span data-line style={{ "--i": 0 } as React.CSSProperties}>
              Vienna Voltage
            </span>
          </span>
          <span className="line">
            <span data-line style={{ "--i": 1 } as React.CSSProperties}>
              FTC Team 27427
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}

/* ─── Season figures: photograph with two colour tiles ─────────────── */

function Season() {
  return (
    <section className="pt-[var(--section)]">
      <div className="wrap grid12 mb-10">
        <h2 className="on-axis t-head" data-reveal>
          Last season, in two numbers
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="col-span-2 aspect-[4/3] overflow-hidden" data-reveal>
          <img
            src="/season/2526/teampic.webp"
            alt="The Vienna Voltage team with our robot, 2025–26"
            width={1736}
            height={1302}
            loading="lazy"
            className="photo"
          />
        </div>
        <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2">
          <div className="bg-yellow text-navy p-6 md:p-7 aspect-square md:aspect-auto" data-reveal>
            <p className="t-display tabular">
              7th
            </p>
            <p className="mt-3 max-w-[24ch]">
              of 24 teams at the Alexandria qualifier, where we led alliance 5 into the playoffs.
            </p>
          </div>
          <div className="bg-navy text-navy-ink p-6 md:p-7 aspect-square md:aspect-auto" data-reveal>
            <p className="t-display">2</p>
            <p className="mt-3 max-w-[26ch]">
              awards: the Innovate Award, 2nd place, at Richmond and the Control
              Award at Alexandria.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap grid12 mt-8">
        <p className="on-axis measure-wide" data-reveal>
          Nine wins and five losses across two qualifiers, with a high score of
          211.{" "}
          <Link href="/seasons/2526" className="link whitespace-nowrap">
            Every match from DECODE <span className="arrow">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── Built four times: V1 against V4, then the explorer ───────────── */

function BuiltFourTimes() {
  return (
    <section className="mt-[var(--section)] bg-navy text-navy-ink pt-[var(--section)] pb-[var(--section)] overflow-hidden">
      <div className="wrap grid12 gap-y-6">
        <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>
          Built four times
        </h2>
        <p className="col-span-12 md:col-start-7 md:col-span-6 measure-wide" data-reveal>
          Every mechanism goes through the same cycle: sketch it, prototype it,
          test it, model it in CAD, and do it again. The intake took four
          versions and so did the claw. Our record of what failed and why won
          the Innovate Award at Richmond.
        </p>
      </div>

      <div className="md:wrap md:grid12 mt-12 md:mt-[12vh] md:h-[clamp(150px,22vw,330px)] md:overflow-hidden" aria-hidden>
        <div className="md:col-span-6 h-[30svh] md:h-auto overflow-hidden wrap md:px-0" data-reveal>
          <p className="font-extrabold leading-[0.8] tracking-[-0.06em] text-[62vw] md:text-[clamp(180px,34vw,520px)] text-navy-soft">
            V1
          </p>
        </div>
        <div className="md:col-start-7 md:col-span-6 h-[30svh] md:h-auto overflow-hidden wrap md:px-0 bg-bg text-navy md:bg-transparent md:text-navy-ink pt-4 md:pt-0" data-reveal>
          <p className="font-extrabold leading-[0.8] tracking-[-0.06em] text-[62vw] md:text-[clamp(180px,34vw,520px)]">
            V4
          </p>
        </div>
      </div>

      <div className="wrap mt-16" data-reveal>
        <IterationExplorer dark />
      </div>
    </section>
  );
}

/* ─── About: who we are and what we teach ──────────────────────────── */

const FACTS = [
  { label: "Java class", value: "Herbert Hoover MS, about 30 students" },
  { label: "STEAM night", value: "Kent Gardens ES, 200+ families" },
  { label: "FLL coaching", value: "Churchill Road ES, 2 new teams" },
  { label: "Home", value: "Vienna and McLean, Virginia" },
];

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid12 gap-y-6">
        <h2 className="col-span-12 t-head" data-reveal>
          Students teaching students
        </h2>
        <p className="col-span-12 md:col-span-7 lg:col-span-6 t-lead" data-reveal>
          Vienna Voltage is a community-organized team of high school students
          from across Northern Virginia. We compete in FIRST Tech Challenge, and
          we spend as much time teaching younger kids as we do building.
        </p>
      </div>

      <div className="wrap grid12 gap-y-4 mt-[72px]">
        <figure className="col-span-12 md:col-span-8 relative" data-reveal>
          <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
            <img
              src="/season/2526/stemnight.jpg"
              alt="Team members showing elementary students how our robot works at Kent Gardens STEAM night"
              width={1067}
              height={800}
              loading="lazy"
              className="photo"
            />
          </div>
          <figcaption className="md:absolute md:top-0 md:right-0 md:w-[320px] bg-bg pt-4 md:p-5">
            STEAM night at Kent Gardens Elementary. More than 200 families met
            the robot and asked how their kids could start a team.
          </figcaption>
        </figure>

        <div className="col-span-12 md:col-span-4" data-reveal>
          <div className="bg-yellow text-navy p-6 md:p-7 aspect-[3/2] md:aspect-auto md:h-[60%] flex flex-col justify-between">
            <p className="t-display">
              230+
            </p>
            <p className="max-w-[22ch]">students and families reached in 2025–26</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-4 mt-5 t-small">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="font-semibold">{f.label}</dt>
                <dd className="text-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/team" className="link inline-block mt-6">
            Meet the team <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery: a drag row of mixed modules ─────────────────────────── */

type Shot = { src: string; alt: string; w: number; h: number; contain?: boolean };

const SHOTS: Record<string, Shot> = {
  robot: { src: "/season/2526/finalrobot.webp", alt: "The finished DECODE robot", w: 548, h: 588 },
  drivetrain: { src: "/season/2526/drivetrain.webp", alt: "Mecanum drivetrain during wiring", w: 456, h: 430 },
  intake: { src: "/season/2526/intake.webp", alt: "Intake prototype on the build table", w: 562, h: 430 },
  team: { src: "/season/2526/teampic.webp", alt: "Team photo, 2025–26", w: 1736, h: 1302 },
  claw: { src: "/season/2526/claw4.webp", alt: "CAD render of the final claw", w: 372, h: 232, contain: true },
  intake4: { src: "/season/2526/intake4.webp", alt: "CAD render of the final intake", w: 280, h: 232, contain: true },
  steam: { src: "/season/2526/stemnight.jpg", alt: "Demonstrating the robot at STEAM night", w: 1067, h: 800 },
  java: { src: "/season/2526/java.webp", alt: "Teaching Java at Herbert Hoover Middle School", w: 1196, h: 1008 },
  churchill: { src: "/season/2526/churchill.jpg", alt: "Churchill Road Elementary, where we coach two FLL teams", w: 650, h: 433 },
};

function Img({ s }: { s: Shot }) {
  return (
    <div className={`photo-frame h-full ${s.contain ? "bg-white" : ""}`}>
      <img
        src={s.src}
        alt={s.alt}
        width={s.w}
        height={s.h}
        loading="lazy"
        draggable={false}
        className={s.contain ? "w-full h-full object-contain p-6" : "photo"}
      />
    </div>
  );
}

function Gallery() {
  const tall = "shrink-0 h-full aspect-[3/4] w-auto max-md:w-[72vw] max-md:aspect-auto";
  const pair = "shrink-0 h-full grid grid-rows-2 gap-2 md:gap-3 w-[calc(68svh*0.66)] max-md:w-[64vw]";
  const wide = "shrink-0 h-full aspect-[16/10] w-auto max-md:w-[88vw] max-md:aspect-auto";

  return (
    <section className="pb-[var(--section)]">
      <div className="wrap flex items-baseline justify-between mb-8">
        <h2 className="t-head" data-reveal>
          From the build season
        </h2>
        <p className="text-muted tabular shrink-0" data-reveal>
          9 pictures
        </p>
      </div>
      <DragRow label="Photographs from the 2025–26 season" className="pl-[var(--margin)] md:pl-[6vw]">
        <div className="flex gap-2 md:gap-3 h-[62svh] md:h-[68svh] pr-[var(--margin)] w-max">
          <div className={tall}><Img s={SHOTS.robot} /></div>
          <div className={pair}>
            <Img s={SHOTS.drivetrain} />
            <Img s={SHOTS.intake} />
          </div>
          <div className={wide}><Img s={SHOTS.team} /></div>
          <div className={pair}>
            <Img s={SHOTS.claw} />
            <Img s={SHOTS.intake4} />
          </div>
          <div className={tall}><Img s={SHOTS.steam} /></div>
          <div className={wide}><Img s={SHOTS.java} /></div>
          <div className={tall}><Img s={SHOTS.churchill} /></div>
        </div>
      </DragRow>
    </section>
  );
}

/* ─── Join: three photographs, then a field ────────────────────────── */

function Join() {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="col-span-2 md:col-span-1 aspect-[4/3] md:aspect-auto md:h-[40svh] overflow-hidden">
          <img src="/season/2526/intake.webp" alt="An intake prototype mid-build" width={562} height={430} loading="lazy" className="photo" />
        </div>
        <div className="aspect-square md:aspect-auto md:h-[40svh] overflow-hidden">
          <img src="/season/2526/churchill.jpg" alt="Churchill Road Elementary School" width={650} height={433} loading="lazy" className="photo" />
        </div>
        <div className="aspect-square md:aspect-auto md:h-[40svh] overflow-hidden">
          <img src="/season/2526/stemnight.jpg" alt="Kids gathered around our robot at STEAM night" width={1067} height={800} loading="lazy" className="photo" />
        </div>
      </div>

      <div className="bg-blue text-white wrap grid12 gap-y-8 pt-14 pb-14 min-h-[44svh]">
        <div className="col-span-12 md:col-span-8 lg:col-span-7" data-reveal>
          <p className="t-lead font-semibold">
            Sponsor a season, volunteer, or bring us to your school.{" "}
            <a href="mailto:ftcviennavoltage@gmail.com" className="link-bar">
              Write to the team
            </a>
            .
          </p>
          <p className="mt-8">ftcviennavoltage@gmail.com</p>
          <p>
            Prefer to give?{" "}
            <Link href="/donate" className="link">
              Donate to the team
            </Link>
          </p>
        </div>
        <figure className="col-span-12 md:col-start-11 md:col-span-2 self-end justify-self-end w-[96px] md:w-[150px]">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="/photos/harrybai.png" alt="Harry B, team captain" width={800} height={800} loading="lazy" className="photo" />
          </div>
          <figcaption className="t-small mt-2">Harry B, captain</figcaption>
        </figure>
      </div>
    </section>
  );
}
