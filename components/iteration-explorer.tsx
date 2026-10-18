"use client";

import { useState } from "react";

/* The DECODE intake and claw, version by version (from the 2025–26 portfolio) */
const VERSIONS = [
  {
    v: "V1",
    when: "October",
    intake: { src: "/season/2526/intake1.webp", note: "Took game pieces from one direction only, and the wide back jammed." },
    claw: { src: "/season/2526/claw1.webp", note: "Good reach, poor grip." },
  },
  {
    v: "V2",
    when: "November",
    intake: { src: "/season/2526/intake2.webp", note: "The right width at last, but it still jammed and only worked one way." },
    claw: { src: "/season/2526/claw2.webp", note: "Held on better, but not every time." },
  },
  {
    v: "V3",
    when: "Late November",
    intake: { src: "/season/2526/intake3.webp", note: "Fast across the field, not yet reliable." },
    claw: { src: "/season/2526/claw3.webp", note: "A better fit on the block, still unreliable." },
  },
  {
    v: "V4",
    when: "December",
    intake: { src: "/season/2526/intake4.webp", note: "Far more consistent and more control over each pickup, for a little speed." },
    claw: { src: "/season/2526/claw4.webp", note: "Consistent and reliable: spring-loaded printed fingers with rubber inserts." },
  },
];

export default function IterationExplorer({ dark = false }: { dark?: boolean }) {
  const [i, setI] = useState(VERSIONS.length - 1);
  const cur = VERSIONS[i];
  const soft = dark ? "text-navy-soft" : "text-muted";

  return (
    <div>
      <div className="grid12 gap-y-6 items-end">
        <div className="col-span-12 md:col-span-5">
          <p className="t-lead font-semibold" aria-live="polite">
            {cur.v}, {cur.when} 2025
          </p>
          <p className={`t-small ${soft}`}>
            Drag the slider or pick a version.
          </p>
        </div>
        <div className="col-span-12 md:col-span-7">
          <input
            type="range"
            min={0}
            max={VERSIONS.length - 1}
            step={1}
            value={i}
            onChange={(e) => setI(Number(e.target.value))}
            aria-label="Design version"
            aria-valuetext={cur.v}
            className={`vv-range w-full ${dark ? "vv-range-dark" : ""}`}
          />
          <div className="grid grid-cols-4 mt-2">
            {VERSIONS.map((ver, j) => (
              <button
                key={ver.v}
                type="button"
                onClick={() => setI(j)}
                aria-pressed={i === j}
                className={`min-h-[44px] font-extrabold transition-colors duration-200 ${
                  j === 0 ? "text-left" : j === VERSIONS.length - 1 ? "text-right" : "text-center"
                } ${i === j ? "" : `${soft} hover:opacity-100 opacity-70`}`}
              >
                {ver.v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gutter)] mt-8">
        {(["intake", "claw"] as const).map((part) => (
          <figure key={part}>
            <div className="bg-white aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img
                key={cur[part].src}
                src={cur[part].src}
                alt={`${part === "intake" ? "Intake" : "Claw"} ${cur.v}, CAD render`}
                width={372}
                height={260}
                className="w-[78%] h-[78%] object-contain panel-in"
              />
            </div>
            <figcaption className="mt-3">
              <span className="font-semibold">
                {part === "intake" ? "Intake" : "Claw"} {cur.v}.
              </span>{" "}
              <span key={cur[part].note} className="panel-in inline-block">
                {cur[part].note}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
