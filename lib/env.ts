export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ConfigurationError(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseEnv() {
  return {
    url: required("NEXT_PUBLIC_SUPABASE_URL"),
    serviceRoleKey: required("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

export function getResendSyncEnv() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim();

  if (!apiKey || !segmentId) return null;
  return { apiKey, segmentId };
}

export function getResendWebhookEnv() {
  return {
    apiKey: required("RESEND_API_KEY"),
    webhookSecret: required("RESEND_WEBHOOK_SECRET"),
  };
}
