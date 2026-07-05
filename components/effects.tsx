"use client";

import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
  type PointerEvent as RPointerEvent,
} from "react";

/* ---------- Global cursor-follow glow ---------- */
const GLOW = 420;

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 260, damping: 34, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 34, mass: 0.5 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX - GLOW / 2);
      y.set(e.clientY - GLOW / 2);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] rounded-full"
      style={{
        x: sx,
        y: sy,
        width: GLOW,
        height: GLOW,
        background:
          "radial-gradient(circle, rgba(124,58,237,0.13), rgba(59,130,246,0.07) 40%, transparent 70%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}

/* ---------- Top scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet-brand via-electric to-electric-cyan"
      aria-hidden
    />
  );
}

/* ---------- Aurora animated background ---------- */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden>
      <div className="aurora" />
    </div>
  );
}

/* ---------- Spotlight card (mouse-follow glow) ---------- */
export function SpotlightCard({
  children,
  className = "",
  spotColor = "rgba(139,92,246,0.22)",
}: {
  children: ReactNode;
  className?: string;
  spotColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx,50%) var(--my,50%), ${spotColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}

/* ---------- 3D tilt ---------- */
export function Tilt({
  children,
  className = "",
  max = 12,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  max?: number;
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 18 });

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: reduce ? 0 : sx,
        rotateY: reduce ? 0 : sy,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Meteors ---------- */
export function Meteors({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        top: `${(i * 53) % 40}%`,
        delay: `${(i % 7) * 0.9}s`,
        duration: `${4 + (i % 5)}s`,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
