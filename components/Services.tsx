"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Kicker } from "./primitives";
import { Tilt } from "./effects";
import AnimatedHeading from "./AnimatedHeading";
import { SERVICES } from "./data";
import { ArrowRight } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- gradient service icons ---------- */
function Grad({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="55%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
  );
}

function ServiceIcon({ id, className }: { id: string; className?: string }) {
  const gid = `svc-${id}`;
  const stroke = `url(#${gid})`;
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "speaker-series") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden>
        <Grad id={gid} />
        <rect x="24" y="7" width="16" height="31" rx="8" {...common} />
        <path d="M17 31a15 15 0 0 0 30 0" {...common} />
        <path d="M32 46v9M24 55h16" {...common} />
        <path d="M28.5 16h7M28.5 22h7M28.5 28h7" {...common} />
      </svg>
    );
  }
  if (id === "resources") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden>
        <Grad id={gid} />
        <path
          d="M32 17C26 12.5 15 12.5 9 14.5v33c6-2 17-2 23 2.5 6-4.5 17-4.5 23-2.5v-33C49 12.5 38 12.5 32 17Z"
          {...common}
        />
        <path d="M32 17v33" {...common} />
      </svg>
    );
  }
  // events → calendar
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <Grad id={gid} />
      <rect x="9" y="14" width="46" height="42" rx="7" {...common} />
      <path d="M9 26h46M20 8v11M44 8v11" {...common} />
      <path
        d="M19 36h4M30 36h4M41 36h4M19 46h4M30 46h4"
        {...common}
        strokeWidth={3}
      />
    </svg>
  );
}

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
      {/* visual */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: flipped ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.8, ease }}
        className={`group relative flex justify-center ${flipped ? "md:order-2" : ""}`}
      >
        <Tilt className="relative" max={12}>
          {/* ambient glow */}
          <div className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-br from-violet-brand/30 to-electric/30 blur-[70px] transition-all duration-500 group-hover:from-violet-fuchsia/40 group-hover:to-electric-cyan/40" />

          <div
            className="conic-border glass relative grid h-64 w-64 place-items-center overflow-hidden rounded-[36px] sm:h-72 sm:w-72"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* blueprint texture + inner sheen */}
            <div className="bg-grid absolute inset-0 opacity-[0.12]" />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-electric/25 blur-2xl" />

            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
              className="relative"
            >
              <ServiceIcon
                id={service.id}
                className="h-28 w-28 drop-shadow-[0_6px_20px_rgba(96,165,250,0.45)] sm:h-32 sm:w-32"
              />
            </motion.div>
          </div>

          <span
            className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-ink-850 font-mono text-sm text-electric-cyan shadow-glow"
            style={{ transform: "translateZ(60px)" }}
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
