"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_SECTIONS, NAV_ARCHIVE, LINKS } from "./data";
import { ArrowUpRight } from "./icons";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/#top"
      onClick={onClick}
      className="group font-display text-lg font-700 tracking-[0.24em] text-white"
      aria-label="ALPHAG3N home"
    >
      ALPHAG
      <span className="bg-gradient-to-r from-violet-brand to-electric-cyan bg-clip-text text-transparent transition-all group-hover:from-electric-cyan group-hover:to-violet-brand">
        3
      </span>
      N
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_SECTIONS.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: reduce ? 0 : -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-white/10 bg-ink-950/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav className="shell flex h-[68px] items-center justify-between gap-4">
            <Wordmark />

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_SECTIONS.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                      isActive ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setArchiveOpen(true)}
                onMouseLeave={() => setArchiveOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-white/70 transition-colors hover:text-white"
                  aria-expanded={archiveOpen}
                >
                  Conferences
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-3.5 w-3.5 transition-transform ${archiveOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence>
                  {archiveOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full w-64 pt-3"
                    >
                      <div className="glass ring-gradient overflow-hidden rounded-2xl p-2">
                        {NAV_ARCHIVE.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="group/link flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {item.label}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/link:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={LINKS.apply}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                Apply Now
              </a>
            </div>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`h-[2px] w-5 bg-white transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`h-[2px] w-5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-[2px] w-5 bg-white transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
              <div className="flex flex-col gap-1">
                {NAV_SECTIONS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    className="border-b border-white/5 py-3.5 font-display text-2xl text-white/90"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                Conferences & Archive
              </p>
              <div className="mt-3 flex flex-col gap-1">
                {NAV_ARCHIVE.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2 text-white/60"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
              <a
                href={LINKS.apply}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary mt-8"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
