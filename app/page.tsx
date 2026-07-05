import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsCTA from "@/components/NewsCTA";
import Conference from "@/components/Conference";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Sponsors from "@/components/Sponsors";
import Social from "@/components/Social";
import Team from "@/components/Team";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import MarqueeBand from "@/components/MarqueeBand";
import { ScrollProgress, CursorGlow } from "@/components/effects";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <NewsCTA />
        <Conference />
        <MarqueeBand />
        <Vision />
        <Services />
        <Stats />
        <Sponsors />
        <MarqueeBand reverse />
        <Social />
        <Team />
        <Community />
      </main>
      <Footer />
    </>
  );
}
