# ALPHAG3N membership setup

The website stores members in Supabase and optionally mirrors consenting members
to a Resend Segment for Broadcasts. Supabase remains the source of truth.

## Required Vercel environment variables

Add these variables to the existing ALPHAG3N Vercel project for Production (and
Preview if signup testing is desired there):

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_SEGMENT_ID=
RESEND_WEBHOOK_SECRET=
```

`NEXT_PUBLIC_SUPABASE_URL` is the Supabase project URL. Despite the name, it is
only consumed by server code today and is safe to expose. The service-role key,
Resend API key, and webhook secret are server-only secrets and must never use a
`NEXT_PUBLIC_` prefix.

The signup still works when the three Resend variables are absent: the Supabase
member is saved with `resend_sync_status = 'pending'`. Supabase credentials are
required for signup to accept real members.

Do not commit `.env.local` or any real credential.

## Supabase

1. Create or select the ALPHAG3N Supabase project.
2. Open the SQL editor and run
   `supabase/migrations/20260817000000_membership.sql` once.
3. In Project Settings → API, copy the project URL into
   `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the server service-role key into `SUPABASE_SERVICE_ROLE_KEY` in Vercel.
   Never put this key in browser code or a public variable.
5. Redeploy the existing Vercel project after adding the variables.
6. Submit a test membership, confirm the normalized row in `public.members`, and
   delete the test row afterward.

The migration enables and forces Row Level Security, grants no access to the
anonymous or authenticated browser roles, and defines no public policies. The
server-side `/api/members` and `/api/resend/webhook` routes are the only website
paths that use the service role.

## Resend Contacts and Broadcasts

1. Use the ALPHAG3N Resend account and verify `alphag3n.com` following Resend's
   domain instructions.
2. Create a Segment named **ALPHAG3N Members**.
3. Copy its Segment ID into `RESEND_SEGMENT_ID`.
4. Create a Resend API key with the contact permissions needed by the integration
   and add it to Vercel as `RESEND_API_KEY`.
5. In Resend → Webhooks, create a webhook for `contact.updated` pointing to:

   ```text
   https://www.alphag3n.com/api/resend/webhook
   ```

6. Copy that webhook's signing secret into `RESEND_WEBHOOK_SECRET` in Vercel.
   The endpoint rejects unsigned or incorrectly signed payloads. When Resend
   reports a globally unsubscribed contact, it updates the matching Supabase row
   to `email_consent = false` and `membership_status = 'unsubscribed'`.
7. Redeploy after configuring or changing environment variables.
8. Submit a temporary test member, verify the contact appears in the ALPHAG3N
   Members Segment, then delete the test contact and Supabase row.

To send a community announcement, create a Broadcast in the secure Resend
dashboard, choose the **ALPHAG3N Members** Segment, add Resend's unsubscribe link,
preview/test the message, and schedule or send it there. There is intentionally no
public bulk-email API in this repository.

Resend handles Broadcast unsubscribe links and updates the Contact's global
unsubscribe state. The signed webhook mirrors that state back to Supabase.

## Optional spam-protection enhancement

The first version uses strict server-side validation, request-size limits, and a
hidden honeypot field. If automated abuse becomes material, add Cloudflare
Turnstile to the existing form and verify its token server-side; this requires a
Turnstile site key and secret and is not required for initial deployment.
