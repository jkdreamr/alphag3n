"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, Kicker } from "./primitives";
import { LINKS } from "./data";
import { ArrowRight } from "./icons";

export default function Conference() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="shell">
        <div
          ref={ref}
          className="ring-gradient relative min-h-[520px] overflow-hidden rounded-[32px] border border-white/10 sm:min-h-[560px]"
        >
          {/* parallax image */}
          <motion.div
            style={reduce ? {} : { y, scale }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/assets/stanford-campus.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-ink-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />

          {/* content card */}
          <div className="relative flex min-h-[520px] items-center sm:min-h-[560px]">
            <div className="w-full p-7 sm:p-14">
              <div className="max-w-xl">
                <Reveal>
                  <Kicker>Conference</Kicker>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-700 leading-[1.05] text-white">
                    ALPHAG3N&apos;s First Web3 and AI Conference{" "}
                    <span className="gradient-text-cyan">@ Stanford</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
                    Check out our first Web3 and AI conference for teenagers that
                    was held at Stanford in April. With many invited prominent
                    speakers in the industry and hands-on workshops, over 100
                    students came to participate, learn, connect, and have fun!
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <a
                    href={LINKS.stanford}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost mt-8"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="mt-9 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                    {[
                      { k: "100+", v: "Students" },
                      { k: "Stanford", v: "Campus · April" },
                      { k: "Web3 × AI", v: "Talks & Workshops" },
                    ].map((s) => (
                      <div key={s.v}>
                        <div className="font-display text-xl font-700 text-white">
                          {s.k}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-white/45">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
