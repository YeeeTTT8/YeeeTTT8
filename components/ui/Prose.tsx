import ReactMarkdown, { type Components } from 'react-markdown';

/**
 * Styled Markdown renderer for journal bodies. Maps elements to the site's
 * editorial type styles rather than relying on a prose plugin, keeping full
 * control of spacing and colour.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 font-display text-display-sm font-medium text-stone-900">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-2xl font-medium text-stone-900">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 text-fluid-base leading-relaxed text-stone-600">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 space-y-2 pl-1">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 text-fluid-base text-stone-600">
      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-stone-900">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="link-underline font-medium text-stone-900">
      {children}
    </a>
  ),
};

export function Prose({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-prose">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}
