import logoImage from '../assets/logo.webp';

interface WordmarkProps {
  tone?: 'light' | 'dark';
}

export default function Wordmark({ tone = 'light' }: WordmarkProps) {
  const isDark = tone === 'dark';

  return (
    <span className="inline-flex items-center gap-2">
      {/* The logo artwork is cream-colored, so it gets inverted to read on light surfaces. */}
      <img
        src={logoImage}
        alt=""
        aria-hidden="true"
        className={`h-6 w-auto shrink-0 ${isDark ? '' : 'invert'}`}
      />
      <span
        className={`font-display text-sm font-bold tracking-[0.14em] ${isDark ? 'text-white' : 'text-ink'}`}
      >
        BREAK<span className={isDark ? 'text-primary-soft' : 'text-primary'}>AWAY</span>
      </span>
    </span>
  );
}
