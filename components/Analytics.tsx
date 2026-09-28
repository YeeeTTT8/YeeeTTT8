'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

type Consent = 'accepted' | 'declined' | 'unset';
const STORAGE_KEY = 'instyle-consent';

/**
 * Consent-gated GA4. Renders a slim cookie bar along the bottom edge (above
 * the mobile action bar) so it never sits over the hero's calls to action. Analytics scripts load only after the visitor
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
          className="fixed inset-x-0 bottom-[4.5rem] z-[60] border-t border-white/10 bg-stone-900/95 text-paper backdrop-blur-sm lg:bottom-0"
        >
          <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
            <p className="text-[13px] leading-snug text-paper/80">
              We use privacy-friendly analytics to understand how the site is used. No tracking runs
              until you accept.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-sm bg-paper px-4 py-1.5 text-[13px] font-medium text-stone-900 transition-colors hover:bg-brass hover:text-paper"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => choose('declined')}
                className="rounded-sm border border-paper/30 px-4 py-1.5 text-[13px] font-medium text-paper transition-colors hover:border-paper"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
