import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale: Locale;
}

export function Pagination({ currentPage, totalPages, basePath, locale }: PaginationProps) {
  if (totalPages <= 1) return null;

  const t = getDictionary(locale);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  function pageHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Pagination">
      {prevPage ? (
        <Link
          href={pageHref(prevPage)}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent transition-colors md:px-3 md:py-1.5"
        >
          {t.pagination.prev}
        </Link>
      ) : (
        <span className="rounded-md border border-border px-4 py-2 text-sm opacity-40 md:px-3 md:py-1.5">
          {t.pagination.prev}
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={pageHref(nextPage)}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent transition-colors md:px-3 md:py-1.5"
        >
          {t.pagination.next}
        </Link>
      ) : (
        <span className="rounded-md border border-border px-4 py-2 text-sm opacity-40 md:px-3 md:py-1.5">
          {t.pagination.next}
        </span>
      )}
    </nav>
  );
}
