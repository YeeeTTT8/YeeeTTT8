'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

type Consent = 'accepted' | 'declined' | 'unset';
const STORAGE_KEY = 'instyle-consent';

/**
 * Consent-gated GA4. Renders a minimal cookie notice (bottom-left, never
 * covering primary content). Analytics scripts load only after the visitor
 * accepts AND a measurement ID is configured. Choice persists in localStorage.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>('unset');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (stored === 'accepted' || stored === 'declined') setConsent(stored);
    } catch {
      // localStorage unavailable (private mode / blocked) — treat as unset.
    }
  }, []);

  const choose = (value: Consent) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore persistence failures.
    }
  };

  const showAnalytics = mounted && consent === 'accepted' && gaId.length > 0;
  const showNotice = mounted && consent === 'unset';

  return (
    <>
      {showAnalytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {showNotice ? (
        <div
          role="dialog"
          aria-label="Cookie notice"
          className="fixed bottom-4 left-4 z-[60] max-w-sm rounded-sm border border-hairline bg-paper p-5 shadow-lg"
        >
          <p className="text-fluid-sm text-stone-600">
            We use privacy-friendly analytics to understand how the site is used. No tracking runs
            until you accept.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="rounded-sm bg-stone-900 px-4 py-2 text-fluid-sm font-medium text-paper hover:bg-black"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose('declined')}
              className="rounded-sm border border-stone-300 px-4 py-2 text-fluid-sm font-medium text-stone-900 hover:border-stone-900"
            >
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
