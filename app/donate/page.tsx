const USES = [
  {
    title: "Robotics equipment",
    description: "Motors, sensors, electronics, building materials and the engineering tools we use throughout the FTC season.",
    photo: { src: "/season/2526/drivetrain.webp", alt: "Our mecanum drivetrain, built from donated parts", w: 456, h: 430 },
  },
  {
    title: "Competitions",
    description: "FTC registration fees, tournament participation, travel, and the team resources we need to compete.",
    photo: { src: "/season/2526/teampic.webp", alt: "The team at a 2025–26 qualifier", w: 1736, h: 1302 },
  },
  {
    title: "STEM outreach",
    description: "Workshops, demonstrations and hands-on robotics activities for elementary and middle school students.",
    photo: { src: "/season/2526/java.webp", alt: "Our Java class at Herbert Hoover Middle School", w: 1196, h: 1008 },
  },
  {
    title: "Future growth",
    description: "Expanding our outreach and creating more chances for students to discover STEM.",
    photo: { src: "/season/2526/stemnight.jpg", alt: "Elementary students meeting our robot at STEAM night", w: 1067, h: 800 },
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[72px]">
        <div className="wrap grid12 gap-y-8 pt-[clamp(64px,14vh,160px)] pb-[clamp(56px,10vh,120px)] items-end">
          <p className="left-zone t-body measure after-lines order-2 min-[900px]:order-1">
            Your gift builds robots, pays for FTC events, grows our STEM
            outreach, and puts real tools in the hands of the students who
            will build after us.
          </p>
          <h1 className="on-axis t-display lines order-1 min-[900px]:order-2">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>Donate</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Two ways to give */}
      <section className="grid md:grid-cols-2">
        <a
          href="https://hcb.hackclub.com/donations/start/27427-vienna-voltage"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-blue text-white wrap pt-14 pb-14 md:pt-20 md:pb-20 min-h-[48svh] flex flex-col justify-between gap-10 hover:bg-[#163fb3] transition-colors duration-200"
        >
          <p className="font-semibold" data-reveal>Official donation page</p>
          <div data-reveal>
            <p className="t-head">
              Give directly <span className="arrow">→</span>
            </p>
            <p className="mt-3 measure opacity-90">
              Through Hack Club HCB. Opens in a new tab.
            </p>
          </div>
        </a>
        <a
          href="https://gofund.me/e5f7d42bb"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-yellow text-navy wrap pt-14 pb-14 md:pt-20 md:pb-20 min-h-[48svh] flex flex-col justify-between gap-10 hover:bg-[#ffe04d] transition-colors duration-200"
        >
          <p className="font-semibold" data-reveal>GoFundMe</p>
          <div data-reveal>
            <p className="t-head">
              Give on GoFundMe <span className="arrow">→</span>
            </p>
            <p className="mt-3 measure">Our team fundraiser. Opens in a new tab.</p>
          </div>
        </a>
      </section>

      {/* Where it goes */}
      <section className="section">
        <div className="wrap grid12 gap-y-6 mb-14">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Where it goes</h2>
          <p className="col-span-12 md:col-start-6 md:col-span-7 t-lead measure-wide" data-reveal>
            Every contribution helps Vienna Voltage bring robotics education and
            competitive STEM to our community.
          </p>
        </div>
        <div className="wrap grid sm:grid-cols-2 gap-x-[var(--gutter)] gap-y-14">
          {USES.map((u) => (
            <article key={u.title} data-reveal>
              <div className="aspect-[16/10] photo-frame">
                <img src={u.photo.src} alt={u.photo.alt} width={u.photo.w} height={u.photo.h} loading="lazy" className="photo" />
              </div>
              <h3 className="t-lead font-semibold mt-5">{u.title}</h3>
              <p className="mt-2 measure-wide">{u.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
