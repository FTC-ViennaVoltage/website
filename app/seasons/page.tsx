import Link from "next/link";

export default function SeasonsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[72px]">
        <div className="wrap grid12 gap-y-8 pt-[clamp(64px,14vh,160px)] pb-[clamp(56px,10vh,120px)] items-end">
          <p className="left-zone t-body measure after-lines order-2 min-[900px]:order-1">
            Each season is a new game, a new robot and a new story. Pick a year
            to see the robot, the build log, competition results and everything
            in between.
          </p>
          <h1 className="on-axis t-display lines order-1 min-[900px]:order-2">
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                Our seasons
              </span>
            </span>
          </h1>
        </div>
      </section>

      {/* 2026–27: current season, a field of yellow */}
      <Link
        href="/seasons/2627"
        className="group block bg-yellow text-navy"
        aria-label="2026–27 season, BIOBUZZ, current season"
      >
        <div className="wrap grid12 gap-y-6 pt-14 pb-14 md:pt-20 md:pb-20 items-end">
          <div className="col-span-12 md:col-span-7" data-reveal>
            <h2 className="t-display tabular">2026–27</h2>
            <p className="font-semibold mt-3">Current season</p>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5" data-reveal>
            <p className="t-head">BIOBUZZ</p>
            <p className="mt-3 measure">
              Competitions, awards and rankings will appear here as the season
              goes.
            </p>
            <p className="link mt-6 inline-block">
              View season <span className="arrow">→</span>
            </p>
          </div>
        </div>
      </Link>

      {/* 2025–26: last season, photograph and figures */}
      <Link
        href="/seasons/2526"
        className="group block"
        aria-label="2025–26 season, DECODE"
      >
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[78svh] photo-frame">
            <img
              src="/season/2526/teampic.webp"
              alt="The team with our DECODE robot, 2025–26"
              width={1736}
              height={1302}
              loading="lazy"
              className="photo"
            />
          </div>
          <div className="md:col-span-5 bg-navy text-navy-ink wrap pt-12 pb-12 md:pt-16 md:pb-16 flex flex-col justify-between gap-12">
            <div data-reveal>
              <h2 className="t-display tabular">2025–26</h2>
              <p className="font-semibold text-navy-soft mt-3">Last season</p>
              <p className="t-head mt-6">DECODE</p>
            </div>
            <div data-reveal>
              <dl className="grid grid-cols-3 gap-[var(--gutter)]">
                <div>
                  <dt className="t-small text-navy-soft">Qualifiers</dt>
                  <dd className="t-lead font-semibold tabular">2</dd>
                </div>
                <div>
                  <dt className="t-small text-navy-soft">Awards</dt>
                  <dd className="t-lead font-semibold tabular">2</dd>
                </div>
                <div>
                  <dt className="t-small text-navy-soft">Best rank</dt>
                  <dd className="t-lead font-semibold tabular">7th</dd>
                </div>
              </dl>
              <p className="link mt-8 inline-block">
                View season <span className="arrow">→</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
