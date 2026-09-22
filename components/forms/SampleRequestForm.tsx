'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectionSchema, type SelectionInput } from '@/lib/validation/selection';
import { submitSelection, type SelectionResult } from '@/app/actions/selection';
import { useSelection } from '@/lib/selection';
import { locations } from '@/content/locations';
import { cn } from '@/lib/utils';
import { AlertCircle, Loader2 } from 'lucide-react';

const fieldBase =
  'w-full rounded-sm border border-stone-300 bg-paper px-4 py-3 text-fluid-base text-stone-900 ' +
  'placeholder:text-stone-600/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

/**
 * Request form for the selection board — submits the saved stones as a sample
 * or quote request (ship or showroom pickup) via the selection server action.
 */
export function SampleRequestForm({ nameBySlug }: { nameBySlug: Record<string, string> }) {
  const router = useRouter();
  const { slugs, clear } = useSelection();
  const [result, setResult] = useState<SelectionResult | null>(null);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SelectionInput>({
    resolver: zodResolver(selectionSchema),
    defaultValues: { requestType: 'samples', fulfilment: 'ship', stones: 'x', website: '' },
  });

  const requestType = watch('requestType');
  const fulfilment = watch('fulfilment');

  const onSubmit = async (values: SelectionInput) => {
    const stones = slugs.map((s) => nameBySlug[s]).filter(Boolean).join(', ');
    if (!stones) {
      setResult({ ok: false, message: 'Your selection is empty.' });
      return;
    }
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ''));
    fd.set('stones', stones);

    setPending(true);
    const res = await submitSelection(null, fd);
    setPending(false);
    setResult(res);
    if (res.ok) {
      clear();
      router.push('/contact/thank-you');
    }
  };

  const err = (n: keyof SelectionInput) => errors[n]?.message;
  const toggleCls = (active: boolean) =>
    cn(
      'rounded-sm px-5 py-2 text-fluid-sm font-medium transition-colors',
      active ? 'bg-stone-900 text-paper' : 'text-stone-600 hover:text-stone-900',
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <input type="hidden" {...register('stones')} />

      {/* Request type */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
          I&rsquo;d like to
        </legend>
        <div className="mt-3 inline-flex rounded-sm border border-stone-300 p-1">
          <button type="button" onClick={() => setValue('requestType', 'samples')} aria-pressed={requestType === 'samples'} className={toggleCls(requestType === 'samples')}>
            Request samples
          </button>
          <button type="button" onClick={() => setValue('requestType', 'quote')} aria-pressed={requestType === 'quote'} className={toggleCls(requestType === 'quote')}>
            Request a quote
          </button>
        </div>
        <input type="hidden" {...register('requestType')} />
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={err('name')} required>
          <input className={fieldBase} autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Email" error={err('email')} required>
          <input type="email" className={fieldBase} autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Phone" error={err('phone')} required>
          <input type="tel" className={fieldBase} autoComplete="tel" {...register('phone')} />
        </Field>
      </div>

      {/* Fulfilment */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
          {requestType === 'samples' ? 'How would you like your samples?' : 'How should we reach you?'}
        </legend>
        <div className="mt-3 inline-flex rounded-sm border border-stone-300 p-1">
          <button type="button" onClick={() => setValue('fulfilment', 'ship')} aria-pressed={fulfilment === 'ship'} className={toggleCls(fulfilment === 'ship')}>
            Ship to me
          </button>
          <button type="button" onClick={() => setValue('fulfilment', 'showroom')} aria-pressed={fulfilment === 'showroom'} className={toggleCls(fulfilment === 'showroom')}>
            Pick up at showroom
          </button>
        </div>
        <input type="hidden" {...register('fulfilment')} />
      </fieldset>

      {fulfilment === 'ship' ? (
        <Field label="Shipping address" error={err('address')} required>
          <textarea rows={3} className={cn(fieldBase, 'resize-y')} placeholder="Street, city, state, ZIP" {...register('address')} />
        </Field>
      ) : (
        <Field label="Preferred showroom" error={err('preferredShowroom')}>
          <select className={fieldBase} {...register('preferredShowroom')}>
            <option value="">No preference</option>
            {locations.map((l) => (
              <option key={l.slug} value={`${l.city}, ${l.state}`}>
                {l.city}, {l.state} ({l.brand})
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Message (optional)" error={err('message')}>
        <textarea rows={3} className={cn(fieldBase, 'resize-y')} placeholder="Anything we should know about your project?" {...register('message')} />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="website">Leave empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {result && !result.ok ? (
        <p role="alert" className="flex items-start gap-2 rounded-sm border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-fluid-sm text-stone-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || slugs.length === 0}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-4 text-fluid-base font-medium text-paper transition-colors hover:bg-[#a50d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
        {pending ? 'Sending…' : requestType === 'samples' ? 'Request these samples' : 'Request a quote'}
      </button>
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
      {error ? (
        <span role="alert" className="mt-1.5 block text-fluid-sm text-brand-red">
          {error}
        </span>
      ) : null}
    </label>
  );
}
