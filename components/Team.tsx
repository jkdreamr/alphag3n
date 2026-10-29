"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Kicker, StaggerGroup, staggerItem } from "./primitives";
import { Tilt, SpotlightCard } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import {
  EXECUTIVE_TEAM,
  PREVIOUS_TEAM,
  UPCOMING_TEAM,
  type TeamMember,
} from "./data";

function TeamGrid({
  members,
  label,
  compact = false,
}: {
  members: TeamMember[];
  label: string;
  compact?: boolean;
}) {
  return (
    <StaggerGroup
      className={`mx-auto mt-8 grid items-start gap-6 sm:grid-cols-2 ${
        compact ? "max-w-3xl" : "max-w-5xl lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {members.map((member, index) => {
        const cardLabel = member.name ?? `${label} member ${index + 1}`;

        return (
          <motion.div key={`${member.image}-${index}`} variants={staggerItem}>
            <Tilt max={9}>
              <SpotlightCard className="glass ring-gradient rounded-3xl p-6 text-center">
                <div
                  className="relative mx-auto w-fit"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-violet-brand/40 to-electric/40 blur-xl" />
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={member.image}
                      alt={
                        member.name
                          ? `${member.name}${member.role ? `, ${member.role}` : ""}`
                          : cardLabel
                      }
                      width={320}
                      height={320}
                      className="h-48 w-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-850 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-electric-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {member.name && (
                  <div className="mt-7 font-display text-lg font-700 text-white">
                    {member.name}
                  </div>
                )}
                {member.role && (
                  <div className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                    {member.role}
                  </div>
                )}
              </SpotlightCard>
            </Tilt>
          </motion.div>
        );
      })}
    </StaggerGroup>
  );
}

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
              { text: "team", className: "gradient-text-violet" },
            ]}
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-white/55">
              A student-led founding team building the world&apos;s largest Web3
              &amp; AI community.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-20">
          <div>
            <Reveal>
              <h3 className="text-center font-display text-2xl font-700 text-white">
                Executive Team
              </h3>
            </Reveal>
            <TeamGrid members={EXECUTIVE_TEAM} label="Executive team" compact />
          </div>

          <div>
            <Reveal>
              <h3 className="text-center font-display text-2xl font-700 text-white">
                Previous
              </h3>
            </Reveal>
            <TeamGrid members={PREVIOUS_TEAM} label="Previous team" />
          </div>

          <div>
            <Reveal>
              <h3 className="text-center font-display text-2xl font-700 text-white">
                Upcoming
              </h3>
            </Reveal>
            <TeamGrid members={UPCOMING_TEAM} label="Upcoming team" compact />
          </div>
        </div>
      </div>
    </section>
  );
}
