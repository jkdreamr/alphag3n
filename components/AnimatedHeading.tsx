"use client";

import { motion, type Variants } from "framer-motion";

type Part = { text: string; className?: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Always renders the same DOM on server and client (identical per-word spans).
// Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
export default function AnimatedHeading({
  parts,
  className = "",
  as = "h2",
}: {
  parts: Part[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const MotionTag = motion[as] as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {parts.map((part, pi) =>
        part.text
          .split(" ")
          .filter(Boolean)
          .map((w, wi) => (
            <motion.span
              key={`${pi}-${wi}`}
              variants={word}
              className={`mr-[0.26em] inline-block ${part.className ?? ""}`}
            >
              {w}
            </motion.span>
          ))
      )}
    </MotionTag>
  );
}
