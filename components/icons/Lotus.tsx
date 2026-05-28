interface LotusProps {
  className?: string;
}

export default function Lotus({ className }: LotusProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Center petal */}
      <path d="M50 70 C46 54 38 38 38 20 C41 32 45 46 50 52 C55 46 59 32 62 20 C62 38 54 54 50 70 Z" />
      {/* Left inner petal */}
      <path d="M50 70 C40 58 24 52 12 40 C20 44 32 50 50 58" />
      {/* Right inner petal */}
      <path d="M50 70 C60 58 76 52 88 40 C80 44 68 50 50 58" />
      {/* Left outer petal */}
      <path d="M12 40 C8 30 16 26 50 58" />
      {/* Right outer petal */}
      <path d="M88 40 C92 30 84 26 50 58" />
      {/* Base / water line */}
      <path d="M28 70 C36 67 43 70 50 70 C57 70 64 67 72 70" />
    </svg>
  );
}
