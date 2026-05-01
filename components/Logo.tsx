type Props = { className?: string; variant?: 'light' | 'dark' };

export function Logo({ className, variant = 'dark' }: Props) {
  const isLight = variant === 'light';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`} aria-label="Mediterra Fresh">
      <svg
        width="34"
        height="34"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="15.5" stroke={isLight ? '#fdfbf6' : '#3a4720'} strokeOpacity="0.25" />
        <path
          d="M16 7c-3.3 3.5-5 6.2-5 9.5a5 5 0 0 0 10 0c0-3.3-1.7-6-5-9.5z"
          fill={isLight ? '#fdfbf6' : '#5b722c'}
        />
        <path
          d="M16 8v15"
          stroke={isLight ? '#3a4720' : '#3a4720'}
          strokeOpacity={isLight ? 0.45 : 0.6}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.15rem] leading-none tracking-tight">
        <span className={`font-medium ${isLight ? 'text-cream-50' : 'text-olive-900'}`}>
          Mediterra
        </span>
        <span className={`font-normal italic ms-1.5 ${isLight ? 'text-cream-200/85' : 'text-terracotta-600'}`}>
          Fresh
        </span>
      </span>
    </span>
  );
}
