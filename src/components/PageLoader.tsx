import Wordmark from './Wordmark';

export default function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <Wordmark />

      <div
        className="mt-8 h-0.5 w-28 overflow-hidden rounded-full bg-primary/15 motion-reduce:opacity-60"
        aria-hidden="true"
      >
        <div className="loader-shimmer h-full w-1/2 rounded-full bg-primary" />
      </div>
    </div>
  );
}
