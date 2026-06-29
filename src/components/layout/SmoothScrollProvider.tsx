"use client";

/**
 * SmoothScrollArea
 *
 * A reliable cross-device scroll container:
 * - Native overflow-y-auto (never snaps back, works on iOS/Android/Desktop)
 * - CSS scroll-behavior: smooth for intra-page anchor scrolling
 * - Scrollbar completely hidden on all browsers
 * - No JS scroll library — no conflicts, no snap-back
 */
export function SmoothScrollArea({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden ${className}`}
      style={{
        scrollBehavior: "smooth",
        // Hide scrollbar on all browsers
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Hide webkit scrollbar via inline style injection */}
      <style>{`
        .workspace-scroll-area::-webkit-scrollbar { display: none; }
      `}</style>
      {children}
    </div>
  );
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
