"use client";

import { Reveal, Kicker } from "./primitives";
import { Magnetic, Meteors } from "./effects";
import { LINKS } from "./data";
import { Discord, ArrowRight } from "./icons";

export default function Community() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="shell">
        <div className="conic-border relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#141a33] via-ink-900 to-[#0d1120] p-10 text-center sm:p-16">
          <Meteors count={14} />
          <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#5865F2]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-violet-brand/25 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <Reveal className="flex justify-center">
              <Kicker>Website</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,4.5vw,3rem)] font-700 leading-[1.08] text-white">
                Please join the Discord server to{" "}
                <span className="gradient-text-violet">receive updates.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-md text-white/60">
                Connect with members, get event announcements, and be first to hear
                about the Taiwan Conference 2026.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="flex justify-center">
              <Magnetic className="mt-8">
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="btn gap-2.5 rounded-full bg-[#5865F2] px-8 py-4 text-white shadow-[0_10px_30px_-8px_rgba(88,101,242,0.7)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-8px_rgba(88,101,242,0.85)]"
                >
                  <Discord className="h-5 w-5" />
                  Join the Server
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
