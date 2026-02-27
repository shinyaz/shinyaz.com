export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract h2/h3 headings with their IDs and text from HTML content.
 * Designed for server-side use with Velite's `content` (HTML) field.
 */
export function extractHeadings(html: string): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Strip inline HTML tags to get plain text
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (id && text) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}
