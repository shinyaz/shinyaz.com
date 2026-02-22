"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

interface SocialShareProps {
  url: string;
  title: string;
  locale: Locale;
}

export function SocialShare({ url, title, locale }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const t = getDictionary(locale);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Hatena Bookmark uses s/ prefix for https URLs
  const hatenaUrl = url.replace(/^https:\/\//, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <div className="mt-8 border-t border-border pt-8">
      <p className="mb-3 text-sm font-medium text-muted-foreground">
        {t.share.label}
      </p>
      <div className="flex gap-2">
        {/* X (Twitter) */}
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on X"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Hatena Bookmark */}
        <a
          href={`https://b.hatena.ne.jp/entry/s/${hatenaUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on Hatena Bookmark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.47 2H3.53A1.45 1.45 0 0 0 2 3.47v17.06A1.45 1.45 0 0 0 3.47 22h16.06c.4.05.8-.1 1.09-.38.29-.28.44-.67.38-1.07V3.47c.06-.4-.09-.79-.38-1.08A1.45 1.45 0 0 0 20.47 2zm-3.2 14.65a1.55 1.55 0 0 1-.46 1.11 1.6 1.6 0 0 1-2.23 0 1.55 1.55 0 0 1-.46-1.11c0-.42.16-.82.46-1.12a1.6 1.6 0 0 1 2.23 0c.3.3.46.7.46 1.12zm-.13-3.87h-2.2V5.73h2.2v7.05zM11.2 16.65H6.83V5.73h4.14v2.06H8.97v2.44h2.96v2.06H8.97v2.31h2.23v2.05z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* Copy URL */}
        <button
          onClick={handleCopy}
          className={buttonClass}
          aria-label={copied ? t.share.copied : t.share.copyLink}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
