import React from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

interface SafeMarkdownProps {
  content: string;
  className?: string;
}

export function SafeMarkdown({ content, className = "" }: SafeMarkdownProps) {
  // Convert markdown to raw HTML
  const rawHtml = marked.parse(content, { async: false }) as string;

  // Strict sanitization rules
  const cleanHtml = sanitizeHtml(rawHtml, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "strong",
      "em",
      "code",
      "pre",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      th: ["align"],
      td: ["align"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        // Enforce safe external links
        const href = attribs.href || "";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            ...(isExternal ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {}),
          },
        };
      },
    },
  });

  return (
    <div
      className={`prose prose-navy max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-text-primary prose-a:text-gold-dark hover:prose-a:underline prose-blockquote:border-l-gold prose-blockquote:text-text-secondary ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
