'use client';

/**
 * Skip-to-Content Link Component
 *
 * Allows keyboard users to bypass repetitive navigation and jump directly to main content
 * Required for WCAG 2.1 Level A compliance (Success Criterion 2.4.1)
 *
 * Features:
 * - Visually hidden by default
 * - Becomes visible when focused (keyboard navigation)
 * - Positioned at top-left when visible
 * - High z-index to appear above all content
 * - Smooth scroll to target element
 *
 * Usage:
 * ```tsx
 * <SkipLink href="#main-content">Skip to main content</SkipLink>
 * ```
 *
 * Then in your main content:
 * ```tsx
 * <main id="main-content" tabIndex={-1}>
 *   ...content here...
 * </main>
 * ```
 */

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-[9999]
        focus:bg-purple-600
        focus:text-white
        focus:px-4
        focus:py-2
        focus:rounded-lg
        focus:font-medium
        focus:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-purple-400
        focus:ring-offset-2
        focus:ring-offset-black
        transition-all
      "
      onClick={(e) => {
        // Smooth scroll to target element
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Set focus to target element for screen readers
          if (target instanceof HTMLElement) {
            target.focus();
          }
        }
      }}
    >
      {children}
    </a>
  );
}

/**
 * Multiple Skip Links Component
 *
 * For pages with multiple navigation landmarks
 *
 * Usage:
 * ```tsx
 * <SkipLinks links={[
 *   { href: '#main-content', label: 'Skip to main content' },
 *   { href: '#navigation', label: 'Skip to navigation' },
 *   { href: '#footer', label: 'Skip to footer' }
 * ]} />
 * ```
 */

interface SkipLinksProps {
  links: Array<{
    href: string;
    label: string;
  }>;
}

export function SkipLinks({ links }: SkipLinksProps) {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[9999] focus-within:flex focus-within:flex-col focus-within:gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="
            bg-purple-600
            text-white
            px-4
            py-2
            rounded-lg
            font-medium
            shadow-lg
            outline-none
            ring-2
            ring-purple-400
            ring-offset-2
            ring-offset-black
            focus:ring-4
            transition-all
            hover:bg-purple-700
          "
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(link.href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              if (target instanceof HTMLElement) {
                target.focus();
              }
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
