import type { ProjectStatus } from '../data/projects';

/** Deterministic PRNG so every project always gets the same cover. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 16;
const ROWS = 9;
const CELL = 20;

/**
 * Generated cover: a bit-matrix whose "fill level" mirrors the project status —
 * concept = wireframe, experimental = partially lit, in progress = mostly lit.
 */
export function ProjectCover({ seed, status, label }: { seed: number; status: ProjectStatus; label: string }) {
  const rnd = mulberry32(seed);
  const density = status === 'concept' ? 0.12 : status === 'experimental' ? 0.32 : 0.52;
  const cells: { x: number; y: number; kind: 'on' | 'off' | 'hot' }[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const r = rnd();
      cells.push({ x, y, kind: r < density * 0.18 ? 'hot' : r < density ? 'on' : 'off' });
    }
  }
  const w = COLS * CELL;
  const h = ROWS * CELL;
  return (
    <svg
      className={`pcover pcover--${status}`}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={w} height={h} className="pcover__bg" />
      {cells.map((c, i) =>
        c.kind === 'off' ? (
          <rect key={i} x={c.x * CELL + 9} y={c.y * CELL + 9} width="2" height="2" className="pcover__dot" />
        ) : (
          <rect
            key={i}
            x={c.x * CELL + 3}
            y={c.y * CELL + 3}
            width={CELL - 6}
            height={CELL - 6}
            className={c.kind === 'hot' ? 'pcover__hot' : 'pcover__on'}
          />
        ),
      )}
    </svg>
  );
}
