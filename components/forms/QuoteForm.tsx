'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  quoteSchema,
  type QuoteInput,
  projectTypes,
  timelines,
  MAX_FILE_BYTES,
} from '@/lib/validation/quote';
import { submitQuote, type QuoteResult } from '@/app/actions/quote';
import { materials } from '@/content/materials';
import { locations } from '@/content/locations';
import { cn } from '@/lib/utils';
import { AlertCircle, Loader2, Paperclip } from 'lucide-react';

interface QuoteFormProps {
  /** Prefill the "stone of interest" field (from a stone detail page). */
  initialStone?: string;
  /** Prefill audience toggle. */
  initialAudience?: 'homeowner' | 'trade';
}

const fieldBase =
  'w-full rounded-sm border border-stone-300 bg-paper px-4 py-3 text-fluid-base text-stone-900 ' +
  'placeholder:text-stone-600/60 focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-brass';

export function QuoteForm({ initialStone = '', initialAudience = 'homeowner' }: QuoteFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [serverResult, setServerResult] = useState<QuoteResult | null>(null);
  const [pending, setPending] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      audience: initialAudience,
      stone: initialStone,
      projectType: 'Kitchen',
      timeline: 'Just exploring',
      website: '',
    },
  });

  const audience = watch('audience');

  const onSubmit = async (values: QuoteInput) => {
    setFileError(null);
    const file = fileRef.current?.files?.[0];
    if (file && file.size > MAX_FILE_BYTES) {
      setFileError('File is too large (max 10 MB).');
      return;
    }

    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ''));
    if (file) fd.append('attachment', file);

    setPending(true);
    const result = await submitQuote(null, fd);
    setPending(false);
    setServerResult(result);

    if (result.ok) {
      router.push('/contact/thank-you');
    }
  };

  const err = (name: keyof QuoteInput) => errors[name]?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Audience toggle */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
          I&rsquo;m a
        </legend>
        <div className="mt-3 inline-flex rounded-sm border border-stone-300 p-1">
          {(['homeowner', 'trade'] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setValue('audience', a)}
              aria-pressed={audience === a}
              className={cn(
                'rounded-sm px-5 py-2 text-fluid-sm font-medium transition-colors',
                audience === a ? 'bg-stone-900 text-paper' : 'text-stone-600 hover:text-stone-900',
              )}
            >
              {a === 'homeowner' ? 'Homeowner' : 'Trade / B2B'}
            </button>
          ))}
        </div>
        <input type="hidden" {...register('audience')} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={err('name')} required>
          <input className={fieldBase} autoComplete="name" {...register('name')} />
        </Field>
        <Field label={audience === 'trade' ? 'Company' : 'Company (optional)'} error={err('company')}>
          <input className={fieldBase} autoComplete="organization" {...register('company')} />
        </Field>
        <Field label="Email" error={err('email')} required>
          <input type="email" className={fieldBase} autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Phone" error={err('phone')} required>
          <input type="tel" className={fieldBase} autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="City & State" error={err('location')} required>
          <input className={fieldBase} placeholder="Houston, TX" {...register('location')} />
        </Field>
        <Field label="Project type" error={err('projectType')} required>
          <select className={fieldBase} {...register('projectType')}>
            {projectTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Material interest (optional)" error={err('materialInterest')}>
          <select className={fieldBase} {...register('materialInterest')}>
            <option value="">No preference</option>
            {materials.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={err('timeline')} required>
          <select className={fieldBase} {...register('timeline')}>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred showroom (optional)" error={err('preferredShowroom')}>
          <select className={fieldBase} {...register('preferredShowroom')}>
            <option value="">No preference</option>
            {locations.map((l) => (
              <option key={l.slug} value={`${l.city}, ${l.state}`}>
                {l.city}, {l.state} ({l.brand})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Stone of interest (optional)" error={err('stone')}>
          <input className={fieldBase} {...register('stone')} />
        </Field>
      </div>

      <Field label="Message" error={err('message')} required>
        <textarea
          rows={5}
          className={cn(fieldBase, 'resize-y')}
          placeholder="Tell us about your project — rooms, dimensions, the look you're after."
          {...register('message')}
        />
      </Field>

      {/* File upload */}
      <div>
        <label htmlFor="attachment" className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
          Drawings or reference (optional)
        </label>
        <div className="mt-3 flex items-center gap-3">
          <label
            htmlFor="attachment"
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-stone-300 px-4 py-2.5 text-fluid-sm text-stone-900 hover:border-stone-900"
          >
            <Paperclip className="h-4 w-4" aria-hidden />
            Attach file
          </label>
          <span className="text-fluid-sm text-stone-600">PDF, image or DWG · max 10 MB</span>
        </div>
        <input
          ref={fileRef}
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,.dwg,image/*,application/pdf"
          className="sr-only"
          onChange={() => setFileError(null)}
        />
        {fileError ? <FieldError>{fileError}</FieldError> : null}
      </div>

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {serverResult && !serverResult.ok ? (
        <p className="flex items-start gap-2 rounded-sm border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-fluid-sm text-stone-900" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
          {serverResult.message}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-4 text-fluid-base font-medium text-paper transition-colors hover:bg-[#a50d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
          {pending ? 'Sending…' : 'Send request'}
        </button>
        <p className="text-fluid-sm text-stone-600">We&rsquo;ll reply by email or phone.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
      {error ? <FieldError>{error}</FieldError> : null}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1.5 block text-fluid-sm text-brand-red" role="alert">
      {children}
    </span>
  );
}
