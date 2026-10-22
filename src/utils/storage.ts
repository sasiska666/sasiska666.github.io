/**
 * localStorage access that never throws.
 * Private windows, disabled cookies or sandboxed iframes can make
 * `localStorage` unavailable — the site must keep working without it.
 */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* preference simply won't persist */
  }
}
