import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale: Locale;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

function getMobilePageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 2) pages.push("ellipsis");
  if (current !== 1 && current !== total) pages.push(current);
  if (current < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages, basePath, locale }: PaginationProps) {
  if (totalPages <= 1) return null;

  const t = getDictionary(locale);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  function pageHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  const linkClass = "rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent transition-colors";
  const disabledClass = "rounded-md border border-border px-3 py-1.5 text-sm opacity-40";

  function renderPages(pages: (number | "ellipsis")[]) {
    return pages.map((p, i) =>
      p === "ellipsis" ? (
        <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">…</span>
      ) : p === currentPage ? (
        <span key={p} className="rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm text-background" aria-current="page">
          {p}
        </span>
      ) : (
        <Link key={p} href={pageHref(p)} className={linkClass}>
          {p}
        </Link>
      )
    );
  }

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {prevPage ? (
        <Link href={pageHref(prevPage)} className={linkClass}>
          {t.pagination.prev}
        </Link>
      ) : (
        <span className={disabledClass}>{t.pagination.prev}</span>
      )}
      <span className="contents md:hidden">{renderPages(getMobilePageNumbers(currentPage, totalPages))}</span>
      <span className="hidden md:contents">{renderPages(getPageNumbers(currentPage, totalPages))}</span>
      {nextPage ? (
        <Link href={pageHref(nextPage)} className={linkClass}>
          {t.pagination.next}
        </Link>
      ) : (
        <span className={disabledClass}>{t.pagination.next}</span>
      )}
    </nav>
  );
}
