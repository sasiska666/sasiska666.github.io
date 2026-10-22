import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { RichText } from '../components/RichText';
import { CopyButton } from '../components/CopyButton';
import { Icon } from '../components/Icon';
import { complete, runCommand, type TLine } from '../utils/terminal';

const PROMPT = 'guest@b1t:~$';
const QUICK = ['help', 'whoami', 'skills', 'projects', 'learn', 'contact'];
const MAX_LINES = 400;

export function Terminal() {
  const { t, lang } = useI18n();
  const [lines, setLines] = useState<TLine[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const exec = (cmd: string) => {
    const res = runCommand(cmd, t, lang);
    if (res.type === 'clear') {
      setLines([]);
      setShowWelcome(false);
    } else {
      setLines((prev) => [...prev, ...res.lines].slice(-MAX_LINES));
    }
    if (cmd.trim()) setHistory((h) => [...h.filter((x) => x !== cmd.trim()), cmd.trim()].slice(-50));
    setCursor(-1);
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      exec(value);
    } else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      if (cursor === -1) return;
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue('');
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'Tab') {
      const c = complete(value);
      if (c) {
        e.preventDefault();
        setValue(c);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      exec('clear');
    }
  };

  const transcript = [
    ...(showWelcome ? t.terminal.welcome.map((w) => w.replace(/`/g, '')) : []),
    ...lines.map((l) => (l.kind === 'in' ? `${PROMPT} ${l.text}` : l.text)),
  ].join('\n');

  const focusInput = () => {
    if (window.getSelection()?.toString()) return; // keep text selection usable
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="terminal" className="section terminal" aria-labelledby="terminal-title">
      <div className="wrap terminal__grid">
        <div className="terminal__side">
          <SectionHead
            id="terminal"
            index="06"
            kicker={t.terminal.kicker}
            title={t.terminal.title}
            intro={t.terminal.intro}
          />
          <div className="terminal__quick" data-reveal>
            <p className="label">{t.terminal.quick}</p>
            <div className="chips">
              {QUICK.map((q) => (
                <button key={q} type="button" className="chip chip--mono" onClick={() => exec(q)} translate="no">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="term" data-reveal>
          <div className="term__bar">
            <span className="term__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term__title" translate="no">
              {t.terminal.windowTitle}
            </span>
            <span className="term__actions">
              <CopyButton text={transcript} label={t.terminal.copyOutput} />
              <button
                type="button"
                className="copy-btn"
                onClick={() => exec('clear')}
                aria-label={t.terminal.clear}
                title={t.terminal.clear}
              >
                <Icon name="x" size={15} />
              </button>
            </span>
          </div>

          <div className="term__screen" ref={screenRef} onClick={focusInput}>
            <div role="log" aria-live="polite" aria-relevant="additions" className="term__log">
              {showWelcome &&
                t.terminal.welcome.map((w, i) => (
                  <p key={`w${i}`} className="tl tl--muted">
                    <RichText text={w} />
                  </p>
                ))}
              {lines.map((l, i) => {
                if (l.kind === 'in') {
                  return (
                    <p key={i} className="tl tl--in">
                      <span className="tl__prompt" aria-hidden="true">
                        {PROMPT}{' '}
                      </span>
                      {l.text}
                    </p>
                  );
                }
                if (l.kind === 'link' && l.href) {
                  return (
                    <p key={i} className="tl tl--link">
                      <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {l.text}
                      </a>
                    </p>
                  );
                }
                return (
                  <p key={i} className={`tl tl--${l.kind}`}>
                    {l.text}
                  </p>
                );
              })}
            </div>

            <form
              className="term__input"
              onSubmit={(e) => {
                e.preventDefault();
                exec(value);
              }}
            >
              <label htmlFor="term-input" className="tl__prompt">
                <span aria-hidden="true">{PROMPT}</span>
                <span className="sr-only">{t.terminal.inputLabel}</span>
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.terminal.placeholder}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                maxLength={200}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
