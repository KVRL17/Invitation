/**
 * Footer — intentionally minimal.
 */
export function Footer() {
  return (
    <footer className="relative px-5 py-10 text-center">
      <div className="mx-auto mb-4 h-px w-24 bg-gold/40" aria-hidden="true" />
      <p className="font-serif text-sm italic text-ink-soft sm:text-base">
        Made with{' '}
        <span className="inline-block align-middle text-rose" aria-hidden="true">
          ❤
        </span>{' '}
        for our special beginning.
      </p>
    </footer>
  );
}
