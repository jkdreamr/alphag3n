"use client";

import { Sparkle } from "./icons";

const WORDS = [
  "Web3",
  "Artificial Intelligence",
  "Hackathons",
  "Conferences",
  "Community",
  "Resources",
  "Blockchain",
  "Builders",
];

export default function MarqueeBand({
  reverse = false,
  duration = 34,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  const items = [...WORDS, ...WORDS];
  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-violet-brand/10 via-ink-900/60 to-electric/10 py-6"
      aria-hidden
    >
      <div
        className={`kinetic-track ${reverse ? "rev" : ""}`}
        style={{ ["--kinetic-duration" as string]: `${duration}s` }}
      >
        {items.map((w, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            <span
              className={`font-display text-2xl font-700 uppercase tracking-tight sm:text-4xl ${
                i % 2 === 0 ? "text-white/85" : "text-outline"
              }`}
            >
              {w}
            </span>
            <Sparkle className="h-4 w-4 flex-none text-electric-cyan sm:h-5 sm:w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}
