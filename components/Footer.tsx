"use client";

import { Reveal, Kicker } from "./primitives";
import { LINKS } from "./data";
import { SOCIALS, Phone, Mail, Pin } from "./icons";

const CONTACT = [
  { Icon: Phone, label: "Phone", value: LINKS.phone, href: `tel:${LINKS.phone.replace(/\s/g, "")}` },
  { Icon: Mail, label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
  { Icon: Pin, label: "Location", value: "San Francisco, California", href: null },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-ink-950 pt-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-grid bg-grid-fade opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[820px] -translate-x-1/2 rounded-full bg-electric/10 blur-[130px]" />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* contact */}
          <div>
            <Reveal>
              <Kicker>Contact</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-700 leading-[1.05] text-white">
                Get in <span className="gradient-text-violet">touch</span>
              </h2>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3">
              {CONTACT.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/10 bg-white/5 text-electric-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                        {label}
                      </span>
                      <span className="block text-white/85">{value}</span>
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="glass flex items-center gap-4 rounded-2xl p-3.5 transition-colors hover:border-electric-cyan/40"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="glass flex items-center gap-4 rounded-2xl p-3.5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* sponsorships */}
          <div className="lg:pt-16">
            <Reveal>
              <div className="glass ring-gradient rounded-3xl p-8">
                <h3 className="font-display text-2xl font-700 text-white">
                  Contact &amp; Sponsorships
                </h3>
                <p className="mt-4 leading-relaxed text-white/60">
                  If you have any questions or would like to sponsor ALPHAG3N or an
                  event, please contact us at the given email address.
                </p>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="btn-primary mt-7 text-sm"
                >
                  {LINKS.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 sm:flex-row">
          <div className="font-display text-lg font-700 tracking-[0.24em] text-white">
            ALPHAG
            <span className="text-electric-cyan">3</span>N
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:text-electric-cyan"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-white/40">© 2025 by ALPHAG3N</p>
        </div>
      </div>
    </footer>
  );
}
