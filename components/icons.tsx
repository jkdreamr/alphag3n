import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Discord = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden>
    <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.2.36-.43.845-.588 1.23a18.27 18.27 0 0 0-4.594 0A11.4 11.4 0 0 0 10.11 3a19.74 19.74 0 0 0-4.432 1.369C2.533 8.146 1.667 11.83 2.1 15.462a19.9 19.9 0 0 0 6.073 3.058c.492-.67.93-1.382 1.307-2.13a12.9 12.9 0 0 1-2.06-.99c.173-.126.342-.258.505-.393a14.2 14.2 0 0 0 12.148 0c.165.14.334.271.505.393-.657.389-1.35.72-2.062.99.377.748.814 1.46 1.307 2.13a19.86 19.86 0 0 0 6.073-3.058c.507-4.21-.867-7.86-3.586-11.093ZM9.352 13.6c-1.19 0-2.164-1.093-2.164-2.437 0-1.343.955-2.437 2.164-2.437 1.21 0 2.183 1.104 2.164 2.437 0 1.344-.955 2.437-2.164 2.437Zm5.296 0c-1.19 0-2.164-1.093-2.164-2.437 0-1.343.955-2.437 2.164-2.437 1.21 0 2.183 1.104 2.164 2.437 0 1.344-.955 2.437-2.164 2.437Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} {...p} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Youtube = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden>
    <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  </svg>
);

export const Tiktok = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.4v13.67a2.45 2.45 0 0 1-2.45 2.42 2.45 2.45 0 0 1-.16-4.9c.14 0 .28.01.42.03v-3.44a5.9 5.9 0 0 0-.42-.02 5.84 5.84 0 1 0 5.84 5.84V9.01a7.62 7.62 0 0 0 4.5 1.46V7.06a4.28 4.28 0 0 1-3.27-1.24Z" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" {...p} aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" {...p} aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" {...p} aria-hidden>
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden>
    <path d="M12 2c.4 3.6 2.4 5.6 6 6-3.6.4-5.6 2.4-6 6-.4-3.6-2.4-5.6-6-6 3.6-.4 5.6-2.4 6-6Z" />
  </svg>
);

export const SOCIALS = [
  { name: "Discord", href: "https://discord.gg/FSS54eqeBG", Icon: Discord },
  { name: "Instagram", href: "https://instagram.com/alphag3n", Icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/@alphag3n", Icon: Youtube },
  { name: "TikTok", href: "https://www.tiktok.com/@alphag3n", Icon: Tiktok },
];
