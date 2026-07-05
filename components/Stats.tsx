"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Kicker, Counter, StaggerGroup, staggerItem } from "./primitives";
import { SpotlightCard } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import { STATS } from "./data";

export default function Stats() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute left-[20%] top-[10%] h-80 w-80 rounded-full bg-violet-fuchsia/12 blur-[130px]" />
        <div className="animate-drift-slow absolute right-[16%] bottom-[12%] h-72 w-72 rounded-full bg-electric/12 blur-[130px]" />
      </div>
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* datamosh art */}
          <Reveal className="order-2 lg:order-1">
            <div className="group relative mx-auto max-w-md">
              <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-violet-fuchsia/30 to-electric/30 blur-[80px]" />
              <motion.div
                animate={reduce ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="ring-gradient overflow-hidden rounded-[28px] border border-white/10 will-change-transform"
              >
                <Image
                  src="/assets/img-66247.jpg"
                  alt="ALPHAG3N generative datamosh artwork"
                  width={640}
                  height={462}
                  className="h-full w-full object-cover mix-blend-lighten"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
              </motion.div>
            </div>
          </Reveal>

          {/* numbers */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Kicker>By the numbers</Kicker>
            </Reveal>
            <AnimatedHeading
              className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-700 leading-[1.05] text-white"
              parts={[
                { text: "ALPHAG3N " },
                { text: "In Numbers", className: "gradient-text" },
              ]}
            />

            <StaggerGroup className="mt-10 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <motion.div key={s.label} variants={staggerItem}>
                  <SpotlightCard className="glass ring-gradient h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="font-display text-[clamp(2rem,5vw,3rem)] font-700 leading-none gradient-text-cyan">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-white/50">
                      {s.label}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
