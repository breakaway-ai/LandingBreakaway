import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const nodes = [
  { key: 'hero.nodeAgent1', left: '17%', top: '20%', dot: 'bg-primary-soft' },
  { key: 'hero.nodeAgent2', left: '83%', top: '20%', dot: 'bg-accent' },
  { key: 'hero.nodeAgent3', left: '13%', top: '70%', dot: 'bg-primary-soft' },
  { key: 'hero.nodeAgent4', left: '87%', top: '70%', dot: 'bg-accent' },
];

const logLines = [
  { key: 'console.line1', gap: 16, tone: 'text-white/45' },
  { key: 'console.line2', gap: 2, tone: 'text-white/45' },
  { key: 'console.line3', gap: 14, tone: 'text-primary-soft' },
  { key: 'console.line4', gap: 14, tone: 'text-white/45' },
  { key: 'console.line5', gap: 9, tone: 'text-accent' },
  { key: 'console.line6', gap: 11, tone: 'text-white/45' },
];

/** Rows rendered vs. rows visible: the extra one is clipped above the fold so
 *  lines leave the viewport before they unmount. */
const ROWS = 7;
const ROW_HEIGHT = 21;
const VISIBLE_HEIGHT = (ROWS - 1) * ROW_HEIGHT;

const FIRST_TIMESTAMP = 9 * 3600 + 41 * 60 + 12;
const CYCLE_SECONDS = logLines.reduce((total, line) => total + line.gap, 0);

function timestampAt(index: number) {
  const offset = index % logLines.length;
  let seconds = FIRST_TIMESTAMP + Math.floor(index / logLines.length) * CYCLE_SECONDS;

  for (let i = 0; i < offset; i += 1) seconds += logLines[i].gap;
  seconds %= 86_400;

  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

export default function AgentConsole() {
  const { t } = useTranslation();
  const [oldest, setOldest] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => setOldest((prev) => prev + 1), 1600);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-[22px] bg-night p-5 shadow-console sm:p-6">
      {/* Orbital agent map */}
      <div className="relative h-[180px] sm:h-[210px]">
        {[130, 200, 270].map((size, i) => (
          <div
            key={size}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
            style={{ width: size, height: size, animationDelay: `${i * 0.8}s` }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[130px] w-[130px] rounded-full bg-primary/20 blur-2xl animate-orbit-pulse" />

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-primary-soft" />
          </span>
          <span className="font-mono text-[9px] text-white/40">{t('hero.nodeMain')}</span>
        </div>

        {nodes.map((node) => (
          <div
            key={node.key}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: node.left, top: node.top }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-white/10">
              <span className={`h-1.5 w-1.5 rounded-full ${node.dot}`} />
            </span>
            <span className="font-mono text-[9px] text-white/35">{t(node.key)}</span>
          </div>
        ))}
      </div>

      {/* Live activity log */}
      <div className="mt-4 border-t border-white/[0.07] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="label text-white/35">{t('console.title')}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="label text-white/35">{t('console.agents')}</span>
          </span>
        </div>

        <div
          className="mask-fade-top relative overflow-hidden"
          style={{ height: VISIBLE_HEIGHT }}
        >
          <div className="absolute inset-x-0 bottom-0 flex flex-col font-mono text-[10.5px] leading-none sm:text-[11px]">
            {Array.from({ length: ROWS }, (_, offset) => oldest + offset).map((index, position) => {
              const line = logLines[index % logLines.length];

              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="flex shrink-0 items-center gap-3"
                  style={{ height: ROW_HEIGHT }}
                >
                  <span className="shrink-0 text-white/25">{timestampAt(index)}</span>
                  <span className={`truncate ${line.tone}`}>{t(line.key)}</span>
                  {position === ROWS - 1 && (
                    <span className="h-3 w-[6px] shrink-0 bg-primary-soft/80 animate-blink motion-reduce:animate-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
