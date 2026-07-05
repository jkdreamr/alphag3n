import Link from "next/link";
import { NAV_ARCHIVE } from "@/components/data";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-dvh items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,9,0.85)_100%)]" />
      </div>

      <div className="shell py-24 text-center">
        <p className="font-display text-[clamp(5rem,20vw,12rem)] font-700 leading-none gradient-text-cyan text-glow">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-700 text-white sm:text-3xl">
          This page drifted off the network.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">
            Explore instead
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {NAV_ARCHIVE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
