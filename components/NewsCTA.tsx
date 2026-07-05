"use client";

import { motion } from "framer-motion";
import { Reveal, Kicker, StaggerGroup, staggerItem } from "./primitives";
import { Meteors, Magnetic, SpotlightCard } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import { EVENTS } from "./data";
import { ArrowRight } from "./icons";

function StatusBadge({ status }: { status: "Completed" | "Upcoming" }) {
  const upcoming = status === "Upcoming";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-600 uppercase tracking-[0.16em] ${
        upcoming
          ? "border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan"
          : "border-white/15 bg-white/5 text-white/60"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          upcoming ? "animate-pulse bg-electric-cyan" : "bg-white/40"
        }`}
      />
      {status}
    </span>
  );
}

export default function NewsCTA() {
  return (
    <section id="events" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="ring-gradient relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 p-6 sm:p-12">
          {/* brand banner backdrop */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url(/assets/conf-screenshot.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950/90" />
          <Meteors count={16} />

          <div className="relative">
            <div className="max-w-2xl">
              <Reveal>
                <Kicker>What&apos;s Happening</Kicker>
              </Reveal>
              <AnimatedHeading
                className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-700 leading-[1.05] text-white"
                parts={[
                  { text: "Events & " },
                  { text: "Announcements", className: "gradient-text-violet" },
                ]}
              />
            </div>

            <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2">
              {EVENTS.map((ev) => (
                <motion.div key={ev.id} variants={staggerItem}>
                  <SpotlightCard className="glass ring-gradient flex h-full flex-col rounded-3xl p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                        {ev.tag}
                      </span>
                      <StatusBadge status={ev.status} />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-700 text-white">
                      {ev.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/60">
                      {ev.body}
                    </p>
                    <Magnetic className="mt-6 self-start">
                      <a
                        href={ev.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          ev.status === "Upcoming"
                            ? "btn-primary text-sm"
                            : "btn-ghost text-sm"
                        }
                      >
                        {ev.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Magnetic>
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
