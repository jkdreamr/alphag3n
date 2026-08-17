import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinForm from "@/components/JoinForm";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Kicker, Reveal } from "@/components/primitives";
import { Aurora, CursorGlow, Meteors, ScrollProgress } from "@/components/effects";

export const metadata: Metadata = {
  title: "Become an ALPHAG3N Member | ALPHAG3N",
  description:
    "Join ALPHAG3N's global community of high school students interested in AI, Web3, technology, entrepreneurship, and building the future.",
};

export default function JoinPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Aurora className="absolute inset-0 opacity-55" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
          <div className="absolute left-1/2 top-20 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-electric/15 blur-[140px]" />
          <Meteors count={14} />
        </div>

        <section className="shell pb-20 pt-8 sm:pb-28 sm:pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="flex justify-center">
              <Kicker>Membership</Kicker>
            </Reveal>
            <AnimatedHeading
              as="h1"
              className="mt-5 font-display text-[clamp(2.5rem,7vw,5rem)] font-700 leading-[1.02] text-white"
              parts={[
                { text: "Become an " },
                { text: "ALPHAG3N Member", className: "gradient-text-violet" },
              ]}
            />
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/60 sm:text-lg">
                Join a global community of high school students interested in AI,
                Web3, technology, entrepreneurship, and building the future. Members
                receive updates about ALPHAG3N events, opportunities, resources, and
                community announcements.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="mx-auto mt-10 max-w-4xl sm:mt-14">
            <JoinForm />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
