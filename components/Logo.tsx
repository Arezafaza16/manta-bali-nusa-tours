interface LogoProps {
  className?: string;
}

/**
 * Manta Balinusa Tour logo mark — an amber mountain with an upward arrow
 * (adventure / growth) above a sky-blue boat and water lines. Two-tone, fixed
 * brand colors so it reads correctly on any background.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Manta Balinusa Tour"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mountain */}
      <path
        d="M13 41 L29 15 Q30.5 12.6 32 15 L47 41 Z"
        fill="#f7941e"
      />
      {/* Upward arrow */}
      <path
        d="M22 39 C27 29 35 24.5 45.5 17.5"
        fill="none"
        stroke="#f7941e"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <path
        d="M45.5 17.5 L37.5 18.4 M45.5 17.5 L45.2 25.6"
        fill="none"
        stroke="#f7941e"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Boat hull */}
      <path
        d="M13 46 Q32 60 51 46 Q32 51.5 13 46 Z"
        fill="#33a7dd"
      />
      {/* Water / speed lines */}
      <path
        d="M5 44 H11.5 M3.5 48 H10 M6 51.8 H11.5"
        fill="none"
        stroke="#33a7dd"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
