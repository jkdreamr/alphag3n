"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Kicker, StaggerGroup, staggerItem } from "./primitives";
import { SpotlightCard } from "./effects";
import AnimatedHeading from "./AnimatedHeading";

const PILLARS = [
  {
    title: "Best-in-class Resources",
    desc: "From beginner to expert-level content, written by our team and community.",
  },
  {
    title: "Once-in-a-lifetime Events",
    desc: "Hackathons and conferences at places like Stanford — and beyond.",
  },
  {
    title: "A Strong Global Community",
    desc: "Like-minded teens connecting and building through the digital world.",
  },
];

export default function Vision() {
  const reduce = useReducedMotion();
  return (
    <section id="vision" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute right-[6%] top-[12%] h-80 w-80 rounded-full bg-violet-brand/12 blur-[130px]" />
        <div className="animate-drift-slow absolute left-[2%] bottom-[8%] h-72 w-72 rounded-full bg-electric/10 blur-[130px]" />
      </div>
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* text */}
          <div>
            <Reveal>
              <Kicker>Vision</Kicker>
            </Reveal>
            <AnimatedHeading
              className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] text-white"
              parts={[
                { text: "What is " },
                { text: "ALPHAG3N?", className: "gradient-text" },
              ]}
            />
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/70">
                ALPHAG3N is the largest Web3 and AI community for high schoolers.
                Working with sponsors such as{" "}
                <span className="font-600 text-white">Coinbase</span>, we believe
                that current high schoolers will be the leading generation of
                future tech. ALPHAG3N&apos;s mission is to connect and teach
                like-minded teens through the digital world — we provide the best
                resources, once-in-a-lifetime events, and a strong community.
              </p>
            </Reveal>

            <StaggerGroup className="mt-10 flex flex-col gap-3">
              {PILLARS.map((p) => (
                <motion.div key={p.title} variants={staggerItem}>
                  <SpotlightCard className="glass ring-gradient flex items-start gap-4 rounded-2xl p-4 transition-transform duration-300 hover:translate-x-1">
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-electric-cyan to-violet-brand shadow-glow" />
                    <div>
                      <div className="font-display font-600 text-white">
                        {p.title}
                      </div>
                      <div className="text-sm text-white/55">{p.desc}</div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

          {/* AG monogram */}
          <Reveal delay={0.1} className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-violet-brand/25 blur-[90px]" />
              <motion.div
                animate={reduce ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="will-change-transform"
              >
                <Image
                  src="/assets/ag-logo.png"
                  alt="ALPHAG3N monogram"
                  width={460}
                  height={594}
                  className="h-auto w-[240px] drop-shadow-[0_20px_60px_rgba(124,58,237,0.4)] sm:w-[340px]"
                  priority={false}
                />
              </motion.div>
              {/* orbiting ring */}
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="animate-spin-slow h-[360px] w-[360px] rounded-full border border-dashed border-white/10" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
