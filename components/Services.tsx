"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Kicker } from "./primitives";
import { Tilt } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import { SERVICES } from "./data";
import { ArrowRight } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      {/* illustration */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: flipped ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.8, ease }}
        className={`group relative flex justify-center ${flipped ? "md:order-2" : ""}`}
      >
        <Tilt className="relative" max={14}>
          <div className="absolute inset-0 -z-10 rounded-full bg-electric/15 blur-[70px] transition-all duration-500 group-hover:bg-violet-brand/25" />
          <div className="ring-gradient grid h-64 w-64 place-items-center rounded-full bg-gradient-to-br from-white to-slate-200 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.55)] sm:h-72 sm:w-72" style={{ transform: "translateZ(40px)" }}>
            <motion.div
              animate={reduce ? {} : { y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
              className="relative h-40 w-40 transition-[filter] duration-300 group-hover:[filter:drop-shadow(3px_0_0_rgba(255,45,100,0.75))_drop-shadow(-3px_0_0_rgba(34,211,238,0.75))]"
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="160px"
                className="object-contain p-2 mix-blend-multiply"
              />
            </motion.div>
          </div>
          <span
            className="absolute -right-2 -top-2 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-ink-850 font-mono text-sm text-electric-cyan"
            style={{ transform: "translateZ(70px)" }}
          >
            0{index + 1}
          </span>
        </Tilt>
      </motion.div>

      {/* text */}
      <div className={flipped ? "md:order-1" : ""}>
        <Reveal>
          <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-700 text-white">
            {service.title}
          </h3>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
            {service.body}
          </p>
        </Reveal>
        {service.cta && (
          <Reveal delay={0.16}>
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-7"
            >
              {service.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift-slow absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-electric/10 blur-[130px]" />
        <div className="animate-drift absolute right-[6%] bottom-[14%] h-72 w-72 rounded-full bg-violet-brand/12 blur-[130px]" />
      </div>
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker>Services</Kicker>
          </Reveal>
          <AnimatedHeading
            className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] text-white"
            parts={[
              { text: "What does " },
              { text: "ALPHAG3N", className: "gradient-text-cyan" },
              { text: " offer?" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
