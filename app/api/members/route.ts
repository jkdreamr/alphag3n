import { NextRequest, NextResponse } from "next/server";
import { ConfigurationError } from "@/lib/env";
import { normalizeMemberInput, ValidationError } from "@/lib/member-validation";
import { syncMemberToResend } from "@/lib/resend-contacts";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const SUCCESS_MESSAGE =
  "Welcome to ALPHAG3N. You’ll now receive community updates.";

function safeErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") return { kind: "unknown" };
  const value = error as { name?: string; code?: string; status?: number };
  return { name: value.name, code: value.code, status: value.status };
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(
      { status: "error", message: "Please submit the membership form from the website." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json(
      { status: "error", message: "That submission is too large." },
      { status: 413 },
    );
  }

  let input: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 20_000) throw new ValidationError("That submission is too large.");
    input = JSON.parse(rawBody) as Record<string, unknown>;
  } catch (error) {
    const message = error instanceof ValidationError
      ? error.message
      : "Please submit a valid membership form.";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }

  // Honeypot submissions receive a generic success response but are never stored.
  if (typeof input.website === "string" && input.website.trim()) {
    return NextResponse.json({ status: "success", message: SUCCESS_MESSAGE }, { status: 201 });
  }

  let member;
  try {
    member = normalizeMemberInput(input);
  } catch (error) {
    const message = error instanceof ValidationError
      ? error.message
      : "Please check the form and try again.";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from("members")
      .select("id")
      .eq("email", member.email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    const now = new Date().toISOString();
    const { data: saved, error: saveError } = await supabase
      .from("members")
      .upsert({
        first_name: member.firstName,
        last_name: member.lastName,
        email: member.email,
        gender: member.gender,
        gender_self_description: member.genderSelfDescription,
        school: member.school,
        graduation_year: member.graduationYear,
        city: member.city,
        country: member.country,
        discord_username: member.discordUsername,
        interests: member.interests,
        how_heard: member.howHeard,
        email_consent: true,
        email_consent_at: now,
        membership_status: "active",
        source: "website",
        resend_sync_status: "pending",
      }, { onConflict: "email" })
      .select("id")
      .single();

    if (saveError || !saved) throw saveError ?? new Error("Member was not saved.");

    try {
      const resendResult = await syncMemberToResend(member);
      const { error: syncUpdateError } = await supabase
        .from("members")
        .update({
          resend_sync_status: resendResult.status,
          ...(resendResult.contactId ? { resend_contact_id: resendResult.contactId } : {}),
        })
        .eq("id", saved.id);

      if (syncUpdateError) {
        console.error("Member Resend status update failed", safeErrorDetails(syncUpdateError));
      }
    } catch (error) {
      console.error("Member Resend sync failed", safeErrorDetails(error));
      await supabase
        .from("members")
        .update({ resend_sync_status: "failed" })
        .eq("id", saved.id);
    }

    return NextResponse.json({
      status: existing ? "already_registered" : "success",
      message: existing
        ? "You’re already part of the ALPHAG3N community. Your information is up to date."
        : SUCCESS_MESSAGE,
    }, { status: existing ? 200 : 201 });
  } catch (error) {
    console.error("Membership signup failed", safeErrorDetails(error));
    const unavailable = error instanceof ConfigurationError;
    return NextResponse.json(
      {
        status: "error",
        message: unavailable
          ? "Membership signup is temporarily unavailable. Please try again soon."
          : "Something went wrong while joining. Please try again in a moment.",
      },
      { status: 503 },
    );
  }
}
