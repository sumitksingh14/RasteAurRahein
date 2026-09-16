/**
 * Serialises a JSON-LD object to a string that is safe to embed inside a
 * <script type="application/ld+json"> tag.
 *
 * JSON.stringify alone is insufficient because an attacker could craft a value
 * containing "</script>" which would break out of the script block and inject
 * arbitrary HTML. Replacing every "<" with its Unicode escape "\u003c" prevents
 * that without changing the semantic meaning of the data.
 *
 * Ref: https://nextjs.org/docs/app/guides/json-ld (Next.js 16 docs)
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
