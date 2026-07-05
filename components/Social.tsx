"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Kicker, StaggerGroup, staggerItem } from "./primitives";
import AnimatedHeading from "./AnimatedHeading";
import { SOCIALS, ArrowUpRight } from "./icons";

const HANDLE: Record<string, string> = {
  Discord: "Join the server",
  Instagram: "@alphag3n",
  YouTube: "@alphag3n",
  TikTok: "@alphag3n",
};

export default function Social() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift-slow absolute right-[14%] top-[16%] h-72 w-72 rounded-full bg-electric-cyan/10 blur-[130px]" />
      </div>
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker>Social Media</Kicker>
          </Reveal>
          <AnimatedHeading
            className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] text-white"
            parts={[
              { text: "Our " },
              { text: "Social Media", className: "gradient-text-cyan" },
            ]}
          />
          <Reveal delay={0.12}>
            <p className="mt-5 text-white/55">
              Follow us on social media to stay updated on ALPHAG3N, connect with
              other members, and receive news on upcoming events.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map(({ name, href, Icon }) => (
            <motion.a
              key={name}
              variants={staggerItem}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group glass ring-gradient relative overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-electric/10 blur-2xl transition-all duration-500 group-hover:bg-violet-brand/25" />
              <div className="relative flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors group-hover:text-electric-cyan">
                  <Icon className="h-7 w-7" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <div className="relative mt-6 font-display text-lg font-600 text-white">
                {name}
              </div>
              <div className="relative text-sm text-white/45">{HANDLE[name]}</div>
            </motion.a>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
