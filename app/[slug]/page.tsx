import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchivePage from "@/components/ArchivePage";
import { ScrollProgress, CursorGlow } from "@/components/effects";
import { ARCHIVE, ARCHIVE_SLUGS } from "@/components/archive-data";

export function generateStaticParams() {
  return ARCHIVE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = ARCHIVE[params.slug];
  if (!page) return { title: "Not found | ALPHAG3N" };
  const desc =
    page.kind === "event"
      ? page.tagline ?? `${page.name} — ALPHAG3N`
      : page.tagline;
  return {
    title: `${page.name} | ALPHAG3N`,
    description: desc,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = ARCHIVE[params.slug];
  if (!page) notFound();

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <ArchivePage page={page} />
      </main>
      <Footer />
    </>
  );
}
