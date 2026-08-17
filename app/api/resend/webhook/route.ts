import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getResendWebhookEnv } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const id = request.headers.get("svix-id");
    const timestamp = request.headers.get("svix-timestamp");
    const signature = request.headers.get("svix-signature");
    if (!id || !timestamp || !signature) {
      return new NextResponse("Invalid webhook", { status: 400 });
    }

    const payload = await request.text();
    const { apiKey, webhookSecret } = getResendWebhookEnv();
    const resend = new Resend(apiKey);
    const event = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    });

    if (event.type !== "contact.updated" || !event.data.unsubscribed) {
      return NextResponse.json({ received: true });
    }

    const supabase = getSupabaseAdmin();
    const memberUpdate = {
      email_consent: false,
      membership_status: "unsubscribed",
      resend_sync_status: "synced",
    };

    const { data: updatedById, error: idError } = await supabase
      .from("members")
      .update(memberUpdate)
      .eq("resend_contact_id", event.data.id)
      .select("id");
    if (idError) throw idError;

    if (!updatedById?.length) {
      const { error: emailError } = await supabase
        .from("members")
        .update(memberUpdate)
        .eq("email", event.data.email.trim().toLowerCase());
      if (emailError) throw emailError;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const invalidSignature = error instanceof Error && (
      error.name.toLowerCase().includes("webhook") ||
      /signature|timestamp/i.test(error.message)
    );
    if (!invalidSignature) {
      console.error("Resend webhook processing failed", {
        name: error instanceof Error ? error.name : "unknown",
      });
    }
    return new NextResponse(
      invalidSignature ? "Invalid webhook" : "Webhook unavailable",
      { status: invalidSignature ? 400 : 503 },
    );
  }
}
