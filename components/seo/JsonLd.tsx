/**
 * Renders a JSON-LD script tag. Content is our own trusted structured data, so
 * dangerouslySetInnerHTML is appropriate here; we still escape "<" to avoid any
 * chance of breaking out of the script context.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
