'use server';

import { headers } from 'next/headers';
import { selectionSchema } from '@/lib/validation/selection';
import { rateLimit } from '@/lib/rate-limit';
import { isResendConfigured } from '@/lib/env';

export interface SelectionResult {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Selection request server action — powers both "request samples" and
 * "request a quote for these stones" from the /selection board. Mirrors the
 * quote action: honeypot, IP rate limit, Resend delivery, dev console fallback.
 */
export async function submitSelection(
  _prev: SelectionResult | null,
  formData: FormData,
): Promise<SelectionResult> {
  const hdrs = await headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';
  const limited = rateLimit(`selection:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: `Too many requests. Try again in ${Math.ceil(limited.retryAfterMs / 1000)}s.` };
  }

  const parsed = selectionSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    if (fieldErrors.website) return { ok: true, message: 'Thank you — your request has been received.' };
    return { ok: false, message: 'Please correct the highlighted fields.', fieldErrors };
  }

  const d = parsed.data;
  const kind = d.requestType === 'samples' ? 'Sample request' : 'Quote request';
  const subject = `${kind} — ${d.name} (${d.stones.split(',').length} stones)`;
  const rows: [string, string][] = [
    ['Request', kind],
    ['Name', d.name],
    ['Email', d.email],
    ['Phone', d.phone],
    ['Fulfilment', d.fulfilment === 'ship' ? 'Ship to me' : 'Pick up at showroom'],
    ['Address', d.fulfilment === 'ship' ? d.address || '—' : '—'],
    ['Preferred showroom', d.fulfilment === 'showroom' ? d.preferredShowroom || '—' : '—'],
    ['Stones', d.stones],
    ['Message', d.message || '—'],
  ];
  const html = `<h2>${escapeHtml(subject)}</h2><table>${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;

  if (!isResendConfigured()) {
    console.info('[selection] (no RESEND_API_KEY — logging only)', d);
    return { ok: true, message: 'Thank you — your request has been received.' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL || 'website@example.com',
      to: process.env.QUOTE_RECIPIENT_EMAIL!,
      replyTo: d.email,
      subject,
      html,
    });
    return { ok: true, message: 'Thank you — your request has been received.' };
  } catch (err) {
    console.error('[selection] Resend send failed', err);
    return { ok: false, message: 'Something went wrong. Please try again or call us.' };
  }
}
