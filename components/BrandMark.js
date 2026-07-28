/**
 * The PromptForums brain mark on the brand gradient. Used in the header and
 * footer in place of the emoji. `className` controls the size (e.g. h-8 w-8).
 */
export default function BrandMark({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="PromptForums"
    >
      <defs>
        <linearGradient id="pfBrandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="0.5" stopColor="#db2777" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="512" height="512" rx="116" fill="url(#pfBrandGrad)" />
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M256 140 c-30 -34 -96 -30 -116 6 c-40 4 -58 44 -40 78 c-26 22 -22 66 12 82 c2 34 40 56 76 44 c18 16 50 16 68 0" />
        <path d="M256 140 c30 -34 96 -30 116 6 c40 4 58 44 40 78 c26 22 22 66 -12 82 c-2 34 -40 56 -76 44" />
        <path d="M256 148 L256 368" />
        <path d="M212 214 c-34 10 -36 52 -6 66 c-30 14 -28 56 6 66" />
        <path d="M300 214 c34 10 36 52 6 66 c30 14 28 56 -6 66" />
      </g>
    </svg>
  );
}
