import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { useI18n } from '../i18n/I18nProvider';
import { useToast } from './Toast';
import { copyText } from '../utils/clipboard';

/** Copy-to-clipboard button with localized feedback (inline state + toast). */
export function CopyButton({
  text,
  label,
  showLabel = false,
  className = '',
}: {
  text: string;
  /** Accessible label; defaults to the generic "Copy". */
  label?: string;
  showLabel?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(text);
    toast(ok ? t.copy.success : t.copy.fail, ok ? 'ok' : 'error');
    if (ok) {
      setDone(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(false), 1600);
    }
  };

  const a11y = label ?? t.copy.code;
  return (
    <button
      type="button"
      className={`copy-btn ${done ? 'is-done' : ''} ${className}`}
      onClick={onClick}
      aria-label={showLabel ? undefined : a11y}
      title={a11y}
    >
      <Icon name={done ? 'check' : 'copy'} size={15} />
      {showLabel && <span>{done ? t.copy.copied : a11y}</span>}
    </button>
  );
}
