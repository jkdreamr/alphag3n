import "server-only";

import { Resend } from "resend";
import type { MemberInput } from "./member-validation";
import { getResendSyncEnv } from "./env";

export type ResendSyncResult = {
  status: "synced" | "pending" | "failed";
  contactId?: string;
};

function isConflict(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const value = error as { message?: string; statusCode?: number; name?: string };
  return value.statusCode === 409 || /already|conflict|duplicate|exist/i.test(
    `${value.name ?? ""} ${value.message ?? ""}`,
  );
}

export async function syncMemberToResend(member: MemberInput): Promise<ResendSyncResult> {
  const env = getResendSyncEnv();
  if (!env) return { status: "pending" };

  const resend = new Resend(env.apiKey);
  const createResult = await resend.contacts.create({
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    unsubscribed: false,
    segments: [{ id: env.segmentId }],
  });

  if (!createResult.error && createResult.data) {
    return { status: "synced", contactId: createResult.data.id };
  }
  if (!isConflict(createResult.error)) {
    return { status: "failed" };
  }

  const updateResult = await resend.contacts.update({
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    unsubscribed: false,
  });
  if (updateResult.error || !updateResult.data) return { status: "failed" };

  const segmentResult = await resend.contacts.segments.add({
    email: member.email,
    segmentId: env.segmentId,
  });
  if (segmentResult.error && !isConflict(segmentResult.error)) {
    return { status: "failed", contactId: updateResult.data.id };
  }

  return { status: "synced", contactId: updateResult.data.id };
}
