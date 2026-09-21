import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PageIntro } from '@/components/sections/PageIntro';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How InStyle Granite & Marble handles personal information submitted through this website.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]}
      />
      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="max-w-prose space-y-6 text-fluid-base text-stone-600">
            <p className="rounded-sm border border-hairline bg-paper p-4 text-fluid-sm">
              <strong className="text-stone-900">TODO(client):</strong> This is placeholder copy and
              structure only. Replace with a policy reviewed by qualified counsel before launch.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">What we collect</h2>
            <p>
              When you submit a quote or contact request, we collect the details you provide — such
              as your name, company, email, phone, location and any files you attach — solely to
              respond to your enquiry.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Analytics</h2>
            <p>
              We use privacy-friendly analytics that run only after you accept via the cookie
              notice. You can decline without affecting your use of the site.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">How we use it</h2>
            <p>
              We use your information to reply to enquiries and provide quotes. We do not sell your
              personal information. TODO(client): confirm data retention, third-party processors
              (e.g. email delivery) and any regional disclosures required.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Contact</h2>
            <p>
              For any privacy question, contact us through the details on our{' '}
              <Link href="/contact" className="link-underline text-stone-900">
                contact page
              </Link>
              . TODO(client): add a dedicated privacy contact and postal address.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
