"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Discord } from "./icons";
import { LINKS } from "./data";
import { INTEREST_OPTIONS } from "@/lib/member-validation";

type FormStatus = {
  kind: "idle" | "error" | "success";
  message: string;
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-electric-cyan/60 focus:ring-2 focus:ring-electric-cyan/15 disabled:cursor-not-allowed disabled:opacity-60";
const labelClass =
  "font-mono text-[11px] font-500 uppercase tracking-[0.16em] text-white/60";

const genderOptions = [
  { value: "", label: "Prefer not to answer" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "self_describe", label: "Prefer to self-describe" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const currentYear = new Date().getUTCFullYear();
const graduationYears = Array.from({ length: 15 }, (_, index) => currentYear - 2 + index);

function optionalValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export default function JoinForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", message: "" });
  const [gender, setGender] = useState("");
  const [otherSelected, setOtherSelected] = useState(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status.kind === "success") successHeading.current?.focus();
  }, [status.kind]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setStatus({ kind: "error", message: "Please complete the required fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ kind: "idle", message: "" });
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: optionalValue(formData, "firstName"),
          lastName: optionalValue(formData, "lastName"),
          email: optionalValue(formData, "email"),
          gender: optionalValue(formData, "gender"),
          genderSelfDescription: optionalValue(formData, "genderSelfDescription"),
          school: optionalValue(formData, "school"),
          graduationYear: optionalValue(formData, "graduationYear"),
          city: optionalValue(formData, "city"),
          country: optionalValue(formData, "country"),
          discordUsername: optionalValue(formData, "discordUsername"),
          interests: formData.getAll("interests"),
          otherInterest: optionalValue(formData, "otherInterest"),
          howHeard: optionalValue(formData, "howHeard"),
          emailConsent: formData.get("emailConsent") === "true",
          website: optionalValue(formData, "website"),
        }),
      });

      const result = await response.json() as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong while joining. Please try again in a moment.");
      }

      setStatus({
        kind: "success",
        message: result.message || "Welcome to ALPHAG3N.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error
          ? error.message
          : "Something went wrong while joining. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (status.kind === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass ring-gradient relative overflow-hidden rounded-[32px] p-8 text-center sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="relative mx-auto max-w-xl">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-electric-cyan/30 bg-electric-cyan/10 text-2xl text-electric-cyan">
            ✓
          </div>
          <h2
            ref={successHeading}
            tabIndex={-1}
            className="mt-6 font-display text-4xl font-700 text-white outline-none sm:text-5xl"
          >
            You&apos;re <span className="gradient-text-cyan">in.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/65">
            {status.message} You&apos;ll receive updates about events, opportunities,
            resources, and the community.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Explore ALPHAG3N
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Discord className="h-5 w-5" />
              Join the Discord
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      aria-busy={submitting}
      aria-describedby="join-form-status join-privacy"
      className="glass ring-gradient rounded-[32px] p-6 sm:p-9 lg:p-11"
    >
      <fieldset disabled={submitting} className="contents">
        <legend className="sr-only">ALPHAG3N membership information</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First name <span className="text-electric-cyan">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              maxLength={80}
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last name <span className="text-electric-cyan">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              maxLength={80}
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-electric-cyan">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="my-9 border-t border-white/10 pt-8">
          <p className="font-display text-xl font-600 text-white">
            Tell us a little more <span className="text-white/35">— optional</span>
          </p>
          <p className="mt-2 text-sm text-white/45">
            This helps us share more relevant events and opportunities.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="gender" className={labelClass}>Gender (optional)</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className={inputClass}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-ink-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {gender === "self_describe" && (
            <div>
              <label htmlFor="genderSelfDescription" className={labelClass}>
                Self-description (optional)
              </label>
              <input
                id="genderSelfDescription"
                name="genderSelfDescription"
                type="text"
                maxLength={80}
                className={inputClass}
              />
            </div>
          )}
          <div>
            <label htmlFor="school" className={labelClass}>School</label>
            <input
              id="school"
              name="school"
              type="text"
              maxLength={160}
              autoComplete="organization"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="graduationYear" className={labelClass}>Graduation year</label>
            <select id="graduationYear" name="graduationYear" className={inputClass}>
              <option value="" className="bg-ink-900">Select a year</option>
              {graduationYears.map((year) => (
                <option key={year} value={year} className="bg-ink-900">{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>City</label>
            <input
              id="city"
              name="city"
              type="text"
              maxLength={100}
              autoComplete="address-level2"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>Country</label>
            <input
              id="country"
              name="country"
              type="text"
              maxLength={100}
              autoComplete="country-name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="discordUsername" className={labelClass}>Discord username</label>
            <input
              id="discordUsername"
              name="discordUsername"
              type="text"
              maxLength={80}
              autoComplete="off"
              placeholder="username"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="howHeard" className={labelClass}>
              How did you hear about ALPHAG3N?
            </label>
            <input
              id="howHeard"
              name="howHeard"
              type="text"
              maxLength={160}
              className={inputClass}
            />
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className={labelClass}>Areas of interest</legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {INTEREST_OPTIONS.map((interest) => (
              <label
                key={interest}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm text-white/65 transition hover:border-white/20 hover:text-white has-[:focus-visible]:border-electric-cyan/60 has-[:checked]:border-electric-cyan/35 has-[:checked]:bg-electric-cyan/[0.07] has-[:checked]:text-white"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  onChange={interest === "Other" ? (event) => setOtherSelected(event.target.checked) : undefined}
                  className="mt-0.5 h-4 w-4 flex-none accent-cyan-400"
                />
                {interest}
              </label>
            ))}
          </div>
          {otherSelected && (
            <div className="mt-4">
              <label htmlFor="otherInterest" className={labelClass}>Other interest</label>
              <input
                id="otherInterest"
                name="otherInterest"
                type="text"
                maxLength={100}
                className={inputClass}
              />
            </div>
          )}
        </fieldset>

        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="mt-9 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-relaxed text-white/70 has-[:focus-visible]:border-electric-cyan/60 has-[:checked]:border-electric-cyan/30">
          <input
            type="checkbox"
            name="emailConsent"
            value="true"
            required
            className="mt-1 h-4 w-4 flex-none accent-cyan-400"
          />
          <span>
            I agree to receive ALPHAG3N community updates, event announcements,
            opportunities, and related emails. I can unsubscribe at any time.
          </span>
        </label>

        <p id="join-privacy" className="mt-5 text-xs leading-relaxed text-white/40">
          We&apos;ll use your information to manage your ALPHAG3N membership and send
          the updates you&apos;ve agreed to receive. We won&apos;t publicly display your
          information.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Joining..." : "Become a Member"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>

        <div
          id="join-form-status"
          role={status.kind === "error" ? "alert" : "status"}
          aria-live="polite"
          aria-atomic="true"
          className={`mt-4 min-h-6 text-center text-sm ${
            status.kind === "error" ? "text-red-300" : "text-white/50"
          }`}
        >
          {status.message}
        </div>
      </fieldset>
    </form>
  );
}
