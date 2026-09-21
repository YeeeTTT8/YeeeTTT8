'use server';

import { headers } from 'next/headers';
import { quoteSchema, MAX_FILE_BYTES, ALLOWED_FILE_TYPES } from '@/lib/validation/quote';
import { rateLimit } from '@/lib/rate-limit';
import { isResendConfigured } from '@/lib/env';

export interface QuoteResult {
  ok: boolean;
  message: string;
  /** Field-level errors keyed by field name. */
  fieldErrors?: Record<string, string>;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Quote-form server action. Validates input and any attachment, rate-limits by
 * IP, and sends via Resend when configured. Without RESEND_API_KEY it logs the
 * submission to the server console and reports success so the flow is testable
 * in dev.
 */
export async function submitQuote(_prev: QuoteResult | null, formData: FormData): Promise<QuoteResult> {
  const hdrs = await headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';

  const limited = rateLimit(`quote:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return {
      ok: false,
      message: `Too many submissions. Please try again in ${Math.ceil(limited.retryAfterMs / 1000)}s.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot filled → silently accept without sending (don't tip off bots).
    if (fieldErrors.website) {
      return { ok: true, message: 'Thank you — your request has been received.' };
    }
    return { ok: false, message: 'Please correct the highlighted fields.', fieldErrors };
  }

  const data = parsed.data;

  // Validate optional file attachment.
  const file = formData.get('attachment');
  let attachment: { filename: string; content: string } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, message: 'File is too large (max 10 MB).', fieldErrors: { attachment: 'Max 10 MB.' } };
    }
    if (file.type && !ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        ok: false,
        message: 'Unsupported file type. Use PDF, image or DWG.',
        fieldErrors: { attachment: 'Use PDF, image or DWG.' },
      };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = { filename: file.name, content: buffer.toString('base64') };
  }

  const subject = `Quote request — ${data.name}${data.company ? ` (${data.company})` : ''}`;
  const rows: [string, string][] = [
    ['Audience', data.audience === 'trade' ? 'Trade / B2B' : 'Homeowner'],
    ['Name', data.name],
    ['Company', data.company || '—'],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Location', data.location],
    ['Project type', data.projectType],
    ['Material interest', data.materialInterest || '—'],
    ['Timeline', data.timeline],
    ['Preferred showroom', data.preferredShowroom || '—'],
    ['Stone of interest', data.stone || '—'],
    ['Message', data.message],
  ];
  const html = `<h2>${escapeHtml(subject)}</h2><table>${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;

  if (!isResendConfigured()) {
    // Dev / unconfigured: log and succeed so the flow is testable.
    console.info('[quote] (no RESEND_API_KEY — logging only)', {
      ...data,
      attachment: attachment ? `${attachment.filename} (${file instanceof File ? file.size : 0} bytes)` : null,
    });
    return { ok: true, message: 'Thank you — your request has been received.' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL || 'website@example.com',
      to: process.env.QUOTE_RECIPIENT_EMAIL!,
      replyTo: data.email,
      subject,
      html,
      ...(attachment ? { attachments: [attachment] } : {}),
    });
    return { ok: true, message: 'Thank you — your request has been received.' };
  } catch (err) {
    console.error('[quote] Resend send failed', err);
    return {
      ok: false,
      message: 'Something went wrong sending your request. Please try again or call us.',
    };
  }
}
