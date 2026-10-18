import Link from "next/link";
import CopyEmail from "@/components/copy-email";

const EMAIL = "ftcviennavoltage@gmail.com";
const mail = (subject: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

const ways = [
  {
    title: "Partner with us",
    desc: "We're looking to collaborate with elementary and middle schools, libraries and community organizations to bring robotics education to more students.",
    subject: "Partnering with Vienna Voltage",
    action: "Propose a partnership",
  },
  {
    title: "Volunteer",
    desc: "Support outreach events, workshops and demonstrations. Volunteers help make STEM education more accessible to young learners in our area.",
    subject: "Volunteering with Vienna Voltage",
    action: "Offer to volunteer",
  },
  {
    title: "Sponsor our team",
    desc: "Businesses and organizations can support robotics equipment, competition travel and outreach, with sponsorship recognition on our site and materials.",
    subject: "Sponsoring Vienna Voltage",
    action: "Ask about sponsorship",
  },
  {
    title: "Spread the word",
    desc: "Share our mission with schools, friends and organizations that might want to support STEM and robotics education in our community.",
    subject: "Hello from a Vienna Voltage supporter",
    action: "Say hello",
  },
];

export default function GetInvolved() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[72px]">
        <div className="wrap grid12 gap-y-8 pt-[clamp(64px,14vh,160px)] pb-[clamp(56px,10vh,120px)] items-end">
          <p className="left-zone t-body measure after-lines order-2 min-[900px]:order-1">
            Whether you&apos;re a student, teacher, parent, business or community
            organization, there&apos;s a role for you in building the next
            generation of engineers and problem-solvers.
          </p>
          <h1 className="on-axis t-display lines order-1 min-[900px]:order-2">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>Get involved</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Photo band */}
      <div className="grid grid-cols-3 md:grid-cols-4 h-[30svh] md:h-[44svh]">
        <div className="overflow-hidden">
          <img src="/season/2526/stemnight.jpg" alt="Showing our robot to elementary students at STEAM night" width={1067} height={800} className="photo drift" />
        </div>
        <div className="overflow-hidden">
          <img src="/season/2526/java.webp" alt="The Java class we taught at Herbert Hoover Middle School" width={1196} height={1008} className="photo drift" />
        </div>
        <div className="overflow-hidden">
          <img src="/season/2526/churchill.jpg" alt="Churchill Road Elementary, home of the two FLL teams we coach" width={650} height={433} className="photo drift" />
        </div>
        <div className="overflow-hidden hidden md:block">
          <img src="/season/2526/teampic.webp" alt="The Vienna Voltage team" width={1736} height={1302} className="photo drift" />
        </div>
      </div>

      {/* Ways to help */}
      <section className="section">
        <div className="wrap grid12 mb-14">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Four ways to help</h2>
        </div>
        <ul className="wrap grid gap-y-3">
          {ways.map((w) => (
            <li key={w.title} data-reveal>
              <a
                href={mail(w.subject)}
                className="group grid12 gap-y-3 bg-surface hover:bg-yellow transition-colors duration-200 p-6 md:p-8"
              >
                <h3 className="col-span-12 md:col-span-4 t-lead font-semibold">{w.title}</h3>
                <p className="col-span-12 md:col-start-6 md:col-span-5 measure-wide">{w.desc}</p>
                <p className="col-span-12 md:col-span-2 md:text-right font-semibold self-end">
                  {w.action} <span className="arrow">→</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="section bg-navy text-navy-ink">
        <div className="wrap grid12 gap-y-10">
          <h2 className="col-span-12 md:col-span-5 t-head" data-reveal>Contact the team</h2>
          <div className="col-span-12 md:col-start-6 md:col-span-7" data-reveal>
            <p className="t-lead measure-wide">
              Interested in partnering, volunteering or sponsoring? Write to us
              and a team member will reply.
            </p>
            <dl className="grid sm:grid-cols-3 gap-6 mt-10">
              <div>
                <dt className="t-small text-navy-soft">Email</dt>
                <dd className="font-semibold break-all">{EMAIL}</dd>
              </div>
              <div>
                <dt className="t-small text-navy-soft">Instagram</dt>
                <dd>
                  <a
                    href="https://instagram.com/viennavoltagerobotics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold link"
                  >
                    @viennavoltagerobotics
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-small text-navy-soft">FTC team number</dt>
                <dd className="font-semibold tabular">27427</dd>
              </div>
            </dl>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <a href={`mailto:${EMAIL}`} className="btn btn-yellow">
                Send an email
              </a>
              <CopyEmail email={EMAIL} />
              <Link href="/donate" className="link ml-3">
                Donate instead <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
