"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Part = { text: string; className?: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AnimatedHeading({
  parts,
  className = "",
  as = "h2",
}: {
  parts: Part[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.h2;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className}>
        {parts.map((p, i) => (
          <span key={i} className={p.className}>
            {p.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {parts.map((part, pi) =>
        part.text.split(" ").map((w, wi) => (
          <span
            key={`${pi}-${wi}`}
            className={`inline-block overflow-hidden ${part.className ?? ""}`}
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
            {" "}
          </span>
        ))
      )}
    </MotionTag>
  );
}
