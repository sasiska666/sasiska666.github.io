import { CopyButton } from './CopyButton';

/** Lightweight comment/prompt highlighting — no syntax-highlighting dependency. */
function renderLine(line: string, i: number) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith('#')) {
    return (
      <span key={i} className="cl cl--comment">
        {line}
        {'\n'}
      </span>
    );
  }
  if (trimmed.startsWith('$ ')) {
    const idx = line.indexOf('$ ');
    return (
      <span key={i} className="cl">
        {line.slice(0, idx)}
        <span className="cl--prompt">$ </span>
        {line.slice(idx + 2)}
        {'\n'}
      </span>
    );
  }
  const hashAt = line.search(/\s#\s/);
  if (hashAt > 0) {
    return (
      <span key={i} className="cl">
        {line.slice(0, hashAt)}
        <span className="cl--comment">{line.slice(hashAt)}</span>
        {'\n'}
      </span>
    );
  }
  return (
    <span key={i} className="cl">
      {line}
      {'\n'}
    </span>
  );
}

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span className="code__lang">{lang ?? 'text'}</span>
        <CopyButton text={code} showLabel />
      </figcaption>
      <pre tabIndex={0} translate="no">
        <code>{code.split('\n').map(renderLine)}</code>
      </pre>
    </figure>
  );
}
