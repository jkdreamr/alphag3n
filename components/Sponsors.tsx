"use client";

import Image from "next/image";
import { Reveal, Kicker } from "./primitives";
import AnimatedHeading from "./AnimatedHeading";
import { SPONSORS } from "./data";

function MithrilMark() {
  return (
    <div className="flex items-center gap-2 text-[#17171a]">
      <svg viewBox="0 0 40 40" className="h-7 w-7 flex-none" aria-hidden>
        <g stroke="#17171a" strokeWidth="2.6" strokeLinecap="round">
          <line x1="20" y1="6" x2="20" y2="34" />
          <line x1="6" y1="20" x2="34" y2="20" />
          <line x1="10.1" y1="10.1" x2="29.9" y2="29.9" />
          <line x1="29.9" y1="10.1" x2="10.1" y2="29.9" />
        </g>
        <circle cx="30.5" cy="10.5" r="3.1" fill="#F5391E" />
      </svg>
      <span className="font-display text-[1.35rem] font-700 tracking-[0.02em]">
        MITHRIL
      </span>
    </div>
  );
}

function LogoTile({ s }: { s: (typeof SPONSORS)[number] }) {
  return (
    <div className="group mx-3 flex h-24 w-48 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/[0.94] px-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-electric-cyan/50 hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.5)]">
      {s.name === "Mithril" ? (
        <MithrilMark />
      ) : (
        <Image
          src={s.src}
          alt={`${s.name} logo`}
          width={180}
          height={70}
          className="max-h-14 w-auto object-contain grayscale-[0.15] transition-all duration-300 group-hover:grayscale-0"
        />
      )}
    </div>
  );
}

function Row({
  items,
  reverse = false,
}: {
  items: typeof SPONSORS;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="mask-fade-x group relative flex overflow-hidden py-2">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: "38s" }}
      >
        {loop.map((s, i) => (
          <LogoTile key={s.name + i} s={s} />
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const half = Math.ceil(SPONSORS.length / 2);
  const rowA = SPONSORS.slice(0, half);
  const rowB = SPONSORS.slice(half);

  return (
    <section id="sponsors" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* backdrop glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-electric/10 blur-[130px]" />
      </div>

      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker>Sponsors</Kicker>
          </Reveal>
          <AnimatedHeading
            className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] text-white"
            parts={[
              { text: "Our " },
              { text: "Sponsors", className: "gradient-text" },
            ]}
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-white/55">
              Backed by leaders across Web3, AI, and venture — powering the next
              generation of builders.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14 flex flex-col gap-3">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </Reveal>
    </section>
  );
}
