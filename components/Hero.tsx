"use client";

import { motion, useReducedMotion } from "framer-motion";
import ParticleField from "./ParticleField";
import { Aurora, Magnetic } from "./effects";
import { LINKS } from "./data";
import { ArrowRight, Sparkle } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease, delay },
  });

  return (
    <section
      id="top"
      className="grain relative flex min-h-dvh items-center overflow-hidden pt-24"
    >
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Aurora className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
        {/* aurora glows */}
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-electric/20 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[8%] h-[380px] w-[380px] rounded-full bg-violet-brand/25 blur-[120px]" />
        {/* vignette + bottom fade into next section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,9,0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="shell relative z-10 py-16 text-center">
        {/* announcement pill */}
        <motion.a
          {...rise(0.05)}
          href="#events"
          className="group ring-gradient mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-4 text-sm text-white/80 backdrop-blur-md transition-colors hover:text-white"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-brand to-electric px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
            <Sparkle className="h-3 w-3" />
            Soon
          </span>
          Taiwan Conference 2026 — coming soon
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.a>

        {/* wordmark */}
        <motion.h1
          {...rise(0.1)}
          className="mt-8 select-none font-display font-700 leading-[0.92] tracking-tight"
        >
          <span
            className="glitch text-glow block text-[clamp(3.4rem,16vw,12rem)] text-white"
            data-text="ALPHAG3N"
            tabIndex={0}
          >
            ALPHAG3N
          </span>
        </motion.h1>

        {/* tagline */}
        <motion.p
          {...rise(0.18)}
          className="mx-auto mt-6 max-w-3xl text-balance font-display text-[clamp(1.35rem,3.4vw,2.6rem)] font-500 leading-[1.15]"
        >
          The World&apos;s Largest{" "}
          <span className="gradient-text-cyan">Web3 and AI</span>{" "}
          Highschool Community
        </motion.p>

        <motion.p
          {...rise(0.24)}
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55"
        >
          Connecting and teaching the generation that will lead the future of
          technology — through world-class resources, once-in-a-lifetime events,
          and a global community.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...rise(0.32)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Join the Community
              <ArrowRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#events" className="btn-ghost w-full sm:w-auto">
              Explore Events
            </a>
          </Magnetic>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          {...rise(0.42)}
          className="mt-16 flex items-center justify-center"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-electric-cyan"
              animate={reduce ? {} : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
