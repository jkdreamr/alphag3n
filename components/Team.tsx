"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Kicker, StaggerGroup, staggerItem } from "./primitives";
import { Tilt, SpotlightCard } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import { TEAM } from "./data";

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute left-[12%] top-[20%] h-72 w-72 rounded-full bg-violet-brand/15 blur-[120px]" />
        <div className="animate-drift-slow absolute right-[10%] bottom-[10%] h-72 w-72 rounded-full bg-electric/15 blur-[120px]" />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Kicker>The Team</Kicker>
          </Reveal>
          <AnimatedHeading
            className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] text-white"
            parts={[
              { text: "Meet the " },
              { text: "executive team", className: "gradient-text-violet" },
            ]}
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-white/55">
              A 9-person executive team of high schoolers building the world&apos;s
              largest Web3 &amp; AI community.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} variants={staggerItem}>
              <Tilt max={9} className="h-full">
                <SpotlightCard className="glass ring-gradient h-full rounded-3xl p-6 text-center">
                  <div
                    className="relative mx-auto w-fit"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-violet-brand/40 to-electric/40 blur-xl" />
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={m.image}
                        alt={`${m.name}, ${m.role}`}
                        width={320}
                        height={320}
                        className="h-40 w-40 object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-850 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-electric-cyan">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-7 font-display text-lg font-700 text-white">
                    {m.name}
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                    {m.role}
                  </div>
                </SpotlightCard>
              </Tilt>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
