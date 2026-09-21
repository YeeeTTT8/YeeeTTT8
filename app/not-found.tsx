import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 font-display text-display-lg font-medium text-stone-900">
            This page has moved on
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-fluid-lg text-stone-600">
            The page you&rsquo;re after isn&rsquo;t here. Let&rsquo;s get you back to the stone.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/" variant="dark" size="lg">
              Back to home
            </Button>
            <Button href="/collections" variant="outline" size="lg">
              Browse collections
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
