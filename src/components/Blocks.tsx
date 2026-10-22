import type { Block } from '../content/types';
import { RichText } from './RichText';
import { CodeBlock } from './CodeBlock';
import { Icon } from './Icon';

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h':
            return (
              <h3 key={i} className="prose__h">
                <RichText text={b.text} />
              </h3>
            );
          case 'p':
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i} className={b.ordered ? 'prose__ol' : 'prose__ul'}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichText text={it} />
                  </li>
                ))}
              </Tag>
            );
          }
          case 'code':
            return <CodeBlock key={i} code={b.code} lang={b.lang} />;
          case 'table':
            return (
              <div key={i} className="table-wrap" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) =>
                          k === 0 ? (
                            <th key={k} scope="row">
                              <RichText text={cell} />
                            </th>
                          ) : (
                            <td key={k}>
                              <RichText text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'note':
            return (
              <aside key={i} className="note">
                <Icon name="alert" size={18} />
                <p>
                  <RichText text={b.text} />
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
