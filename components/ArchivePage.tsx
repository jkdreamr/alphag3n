"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Reveal,
  Kicker,
  Counter,
  StaggerGroup,
  staggerItem,
} from "./primitives";
import AnimatedHeading from "./AnimatedHeading";
import { SpotlightCard, Meteors, Magnetic } from "./effects";
import Sponsors from "./Sponsors";
import { LINKS } from "./data";
import { ArrowRight, ArrowUpRight, Pin, Sparkle } from "./icons";
import type {
  ArchivePage as TArchivePage,
  EventPage,
  BlogPage,
  NewsPage,
} from "./archive-data";

/* ---------- shared hero ---------- */
function PageHero({
  kicker,
  name,
  tagline,
  hero,
  meta,
  badge,
}: {
  kicker: string;
  name: string;
  tagline?: string;
  hero?: string;
  meta?: { icon?: "date" | "pin"; text: string }[];
  badge?: { label: string; upcoming: boolean };
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {hero ? (
          <>
            <Image
              src={hero}
              alt=""
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
          </>
        ) : (
          <div className="aurora absolute inset-0 opacity-50" />
        )}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <Meteors count={12} />
      </div>

      <div className="shell pb-14 sm:pb-20">
        <Reveal className="flex items-center gap-3">
          <Kicker>{kicker}</Kicker>
          {badge && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-600 uppercase tracking-[0.16em] ${
                badge.upcoming
                  ? "border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan"
                  : "border-white/15 bg-white/5 text-white/60"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  badge.upcoming ? "animate-pulse bg-electric-cyan" : "bg-white/40"
                }`}
              />
              {badge.label}
            </span>
          )}
        </Reveal>

        <AnimatedHeading
          as="h1"
          className="mt-5 max-w-4xl font-display text-[clamp(2.1rem,5.5vw,4rem)] font-700 leading-[1.03] text-white"
          parts={[{ text: name }]}
        />

        {tagline && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
              {tagline}
            </p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              {meta.map((m) => (
                <span
                  key={m.text}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80"
                >
                  {m.icon === "pin" ? (
                    <Pin className="h-4 w-4 text-electric-cyan" />
                  ) : (
                    <Sparkle className="h-3.5 w-3.5 text-electric-cyan" />
                  )}
                  {m.text}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function BackBar() {
  return (
    <div className="shell pb-24 pt-4">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to home
        </Link>
        <Magnetic>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-sm"
          >
            Join the Community
            <ArrowRight className="h-4 w-4" />
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

/* ---------- masonry photo gallery ---------- */
function PhotoGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <section className="shell py-12">
      <Reveal>
        <Kicker>Photos</Kicker>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((src, i) => (
            <div
              key={src}
              className="ring-gradient group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${name} photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- event page ---------- */
function EventView({ p }: { p: EventPage }) {
  const kind = /hackathon/i.test(p.name) ? "Hackathon" : "Conference";
  return (
    <>
      <PageHero
        kicker={kind}
        name={p.name}
        tagline={p.tagline}
        hero={p.hero}
        badge={{ label: p.status, upcoming: p.status === "Upcoming" }}
        meta={[
          { icon: "date", text: p.date },
          { icon: "pin", text: p.location },
          ...(p.partner ? [{ icon: "date" as const, text: p.partner }] : []),
        ]}
      />

      {p.comingSoon && (
        <div className="shell -mt-4 pb-10">
          <Reveal>
            <div className="conic-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#141a33] to-ink-900 p-8 text-center sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-brand/25 blur-3xl" />
              <p className="relative font-display text-2xl font-700 text-white sm:text-3xl">
                More information{" "}
                <span className="gradient-text-violet">coming soon!</span>
              </p>
              <p className="relative mx-auto mt-3 max-w-md text-white/55">
                Join the community to be first to know when details drop.
              </p>
              <Magnetic className="mt-6">
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm"
                >
                  Get Notified
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      )}

      {p.prize && (
        <section className="shell py-10">
          <Reveal>
            <div className="ring-gradient relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-brand/15 via-ink-900 to-electric/15 p-8 sm:p-10">
              <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
                <div className="font-display text-[clamp(2.4rem,6vw,4rem)] font-700 leading-none gradient-text-cyan">
                  {p.prize.amount}
                </div>
                <p className="text-white/70">{p.prize.note}</p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {p.intro && (
        <section className="shell py-12">
          <div className="max-w-3xl">
            <Reveal>
              <Kicker>About</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-[17px] leading-relaxed text-white/75">
                {p.intro}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {p.stats && (
        <section className="shell py-8">
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {p.stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <SpotlightCard className="glass ring-gradient h-full rounded-2xl p-6 text-center">
                  <div className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-700 leading-none gradient-text">
                    {/^\d+$/.test(s.value) ? (
                      <Counter to={parseInt(s.value, 10)} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.14em] text-white/50">
                    {s.label}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </StaggerGroup>
        </section>
      )}

      {p.highlights && (
        <section className="shell py-12">
          <Reveal>
            <Kicker>Highlights</Kicker>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {p.highlights.map((h) => (
              <motion.div key={h.title} variants={staggerItem}>
                <SpotlightCard className="glass ring-gradient h-full rounded-3xl p-7">
                  <div className="mb-4 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-electric-cyan to-violet-brand shadow-glow" />
                  <h3 className="font-display text-lg font-700 text-white">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {h.body}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </StaggerGroup>
        </section>
      )}

      {p.eligibility && (
        <section className="shell py-10">
          <Reveal>
            <div className="glass ring-gradient rounded-3xl p-8">
              <h3 className="font-display text-xl font-700 text-white">
                Eligibility
              </h3>
              <ul className="mt-4 space-y-3">
                {p.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-white/70">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-electric-cyan" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      )}

      {p.schedule && (
        <section className="shell py-12">
          <Reveal>
            <Kicker>Schedule</Kicker>
          </Reveal>
          <div className="mt-8 space-y-4">
            {p.schedule.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass ring-gradient grid gap-4 rounded-2xl p-6 sm:grid-cols-[220px_1fr]">
                  <div>
                    {s.day && (
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-brand">
                        {s.day}
                      </div>
                    )}
                    <div className="mt-1 font-display font-700 text-electric-cyan">
                      {s.time}
                    </div>
                  </div>
                  <div>
                    <div className="font-display font-600 text-white">
                      {s.title}
                    </div>
                    {s.body && (
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {s.body}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.speakers && p.speakers.length > 0 && (
        <section className="shell py-12">
          <Reveal>
            <Kicker>Speakers, Mentors &amp; Judges</Kicker>
          </Reveal>
          <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {p.speakers.map((src, i) => (
              <motion.div key={src} variants={staggerItem}>
                <SpotlightCard className="glass ring-gradient overflow-hidden rounded-2xl">
                  <div className="group relative aspect-square overflow-hidden">
                    <Image
                      src={src}
                      alt={`${p.name} speaker ${i + 1}`}
                      fill
                      sizes="(max-width:640px) 45vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </StaggerGroup>
        </section>
      )}

      {p.gallery && p.gallery.length > 0 && <PhotoGallery images={p.gallery} name={p.name} />}

      {p.faqs && (
        <section className="shell py-12">
          <Reveal>
            <Kicker>FAQ</Kicker>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {p.faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="glass ring-gradient group rounded-2xl p-5">
                  <summary className="flex cursor-pointer items-center justify-between font-display font-600 text-white marker:content-['']">
                    {f.q}
                    <span className="ml-3 text-electric-cyan transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.showSponsors && <Sponsors />}

      <BackBar />
    </>
  );
}

/* ---------- blog page ---------- */
function BlogView({ p }: { p: BlogPage }) {
  return (
    <>
      <PageHero kicker="Blog" name={p.name} tagline={p.tagline} />
      <section className="shell py-6">
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {p.posts.map((post) => (
            <motion.article key={post.title} variants={staggerItem}>
              <SpotlightCard className="glass ring-gradient flex h-full flex-col overflow-hidden rounded-3xl">
                {post.image && (
                  <div className="group relative -mx-px -mt-px overflow-hidden border-b border-white/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={420}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.read}</span>
                </div>
                <h2 className="mt-4 font-display text-xl font-700 text-white">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-brand to-electric text-sm font-700 text-white">
                    {post.author.charAt(0)}
                  </span>
                  <span className="text-sm text-white/70">{post.author}</span>
                </div>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </StaggerGroup>
      </section>
      <BackBar />
    </>
  );
}

/* ---------- news page ---------- */
function NewsView({ p }: { p: NewsPage }) {
  return (
    <>
      <PageHero kicker="News" name={p.name} tagline={p.tagline} hero={p.hero} />
      <section className="shell space-y-10 py-6">
        {p.items.map((item) => (
          <Reveal key={item.title}>
            <div className="glass ring-gradient rounded-3xl p-7 sm:p-9">
              {(item.location || item.date) && (
                <div className="flex flex-wrap gap-2">
                  {item.location && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                      <Pin className="h-3.5 w-3.5 text-electric-cyan" />
                      {item.location}
                    </span>
                  )}
                  {item.date && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                      {item.date}
                    </span>
                  )}
                </div>
              )}
              <h2 className="mt-4 font-display text-2xl font-700 leading-tight text-white">
                {item.title}
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/65">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {p.gallery && p.gallery.length > 0 && (
        <PhotoGallery images={p.gallery} name="ALPHAG3N news" />
      )}
      <BackBar />
    </>
  );
}

export default function ArchivePage({ page }: { page: TArchivePage }) {
  if (page.kind === "blog") return <BlogView p={page} />;
  if (page.kind === "news") return <NewsView p={page} />;
  return <EventView p={page} />;
}
