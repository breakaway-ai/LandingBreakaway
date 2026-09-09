import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type AgentId = 'nlp' | 'data' | 'ops' | 'api';
type ActiveAgent = AgentId | 'orchestrator' | 'all';

type LogLine = {
  key: string;
  gapMin: number;
  gapMax: number;
  tone: string;
  agent: ActiveAgent;
};

type LogEntry = {
  id: number;
  line: LogLine;
  timestamp: string;
};

/** Percentages of the map box; the hub sits at its center. */
const HUB = { x: 50, y: 50 };

const nodes: {
  key: string;
  id: AgentId;
  x: number;
  y: number;
  dot: string;
  glow: 'primary' | 'accent';
}[] = [
  { key: 'hero.nodeAgent1', id: 'nlp', x: 14, y: 22, dot: 'bg-primary-soft', glow: 'primary' },
  { key: 'hero.nodeAgent2', id: 'data', x: 86, y: 22, dot: 'bg-accent', glow: 'accent' },
  { key: 'hero.nodeAgent3', id: 'ops', x: 14, y: 78, dot: 'bg-primary-soft', glow: 'primary' },
  { key: 'hero.nodeAgent4', id: 'api', x: 86, y: 78, dot: 'bg-accent', glow: 'accent' },
];

const ARC_RINGS = [
  { radius: 30, dash: '14 18', opacity: 0.08 },
  { radius: 39, dash: '5 14', opacity: 0.06 },
  { radius: 47, dash: '22 12', opacity: 0.05 },
];

const logPool: LogLine[] = [
  { key: 'console.pool.data1', gapMin: 8, gapMax: 18, tone: 'text-white/60', agent: 'data' },
  { key: 'console.pool.data2', gapMin: 5, gapMax: 14, tone: 'text-white/60', agent: 'data' },
  { key: 'console.pool.data3', gapMin: 10, gapMax: 20, tone: 'text-primary-soft', agent: 'data' },
  { key: 'console.pool.data4', gapMin: 7, gapMax: 16, tone: 'text-white/60', agent: 'data' },
  { key: 'console.pool.api1', gapMin: 3, gapMax: 9, tone: 'text-white/60', agent: 'api' },
  { key: 'console.pool.api2', gapMin: 4, gapMax: 11, tone: 'text-accent', agent: 'api' },
  { key: 'console.pool.api3', gapMin: 6, gapMax: 13, tone: 'text-white/60', agent: 'api' },
  { key: 'console.pool.api4', gapMin: 8, gapMax: 15, tone: 'text-accent', agent: 'api' },
  { key: 'console.pool.nlp1', gapMin: 9, gapMax: 17, tone: 'text-white/60', agent: 'nlp' },
  { key: 'console.pool.nlp2', gapMin: 6, gapMax: 14, tone: 'text-primary-soft', agent: 'nlp' },
  { key: 'console.pool.nlp3', gapMin: 5, gapMax: 12, tone: 'text-white/60', agent: 'nlp' },
  { key: 'console.pool.nlp4', gapMin: 11, gapMax: 19, tone: 'text-primary-soft', agent: 'nlp' },
  { key: 'console.pool.ops1', gapMin: 10, gapMax: 18, tone: 'text-white/60', agent: 'ops' },
  { key: 'console.pool.ops2', gapMin: 7, gapMax: 15, tone: 'text-primary-soft', agent: 'ops' },
  { key: 'console.pool.ops3', gapMin: 4, gapMax: 10, tone: 'text-accent', agent: 'ops' },
  { key: 'console.pool.ops4', gapMin: 3, gapMax: 8, tone: 'text-accent', agent: 'ops' },
  { key: 'console.pool.orch1', gapMin: 12, gapMax: 22, tone: 'text-primary-bright', agent: 'orchestrator' },
  { key: 'console.pool.orch2', gapMin: 8, gapMax: 16, tone: 'text-primary-bright', agent: 'orchestrator' },
  { key: 'console.pool.orch3', gapMin: 6, gapMax: 14, tone: 'text-primary-soft', agent: 'orchestrator' },
  { key: 'console.pool.all1', gapMin: 7, gapMax: 13, tone: 'text-accent', agent: 'all' },
  { key: 'console.pool.all2', gapMin: 5, gapMax: 11, tone: 'text-accent', agent: 'all' },
  { key: 'console.pool.all3', gapMin: 9, gapMax: 16, tone: 'text-primary-bright', agent: 'all' },
];

/** Rows rendered vs. rows visible: the extra one is clipped above the fold so
 *  lines leave the viewport before they unmount. */
const ROWS = 7;
const ROW_HEIGHT = 21;
const VISIBLE_HEIGHT = (ROWS - 1) * ROW_HEIGHT;

const FIRST_TIMESTAMP = 9 * 3600 + 41 * 60 + 12;
const TICK_MIN_MS = 1200;
const TICK_MAX_MS = 2200;

const nodeTransition = { duration: 0.35, ease: 'easeOut' as const };

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGap(line: LogLine) {
  return randomInt(line.gapMin, line.gapMax);
}

function pickRandomLine(excludeKey?: string) {
  const candidates = excludeKey ? logPool.filter((line) => line.key !== excludeKey) : logPool;
  return candidates[randomInt(0, candidates.length - 1)];
}

function formatTimestamp(seconds: number) {
  const normalized = ((seconds % 86_400) + 86_400) % 86_400;

  return [Math.floor(normalized / 3600), Math.floor(normalized / 60) % 60, normalized % 60]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

function createEntry(id: number, line: LogLine, clockSeconds: number): LogEntry {
  return { id, line, timestamp: formatTimestamp(clockSeconds) };
}

function createInitialState(): { entries: LogEntry[]; clock: number } {
  let clock = FIRST_TIMESTAMP;
  let previousKey: string | undefined;

  const entries = Array.from({ length: ROWS }, (_, index) => {
    const line = pickRandomLine(previousKey);
    previousKey = line.key;
    clock += randomGap(line);

    return createEntry(index, line, clock);
  });

  return { entries, clock };
}

function isNodeActive(nodeId: AgentId, activeAgent: ActiveAgent) {
  return activeAgent === nodeId || activeAgent === 'all';
}

function isOrchestratorActive(activeAgent: ActiveAgent) {
  return activeAgent === 'orchestrator' || activeAgent === 'all';
}

type ControlCenterBackdropProps = {
  activeAgent: ActiveAgent;
  prefersReducedMotion: boolean;
};

function ControlCenterBackdrop({ activeAgent, prefersReducedMotion }: ControlCenterBackdropProps) {
  const orchestratorActive = isOrchestratorActive(activeAgent);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.16)_0%,rgba(27,20,36,0)_60%)]" />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.07) 0.5px, transparent 0.5px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Circular decorations live in a centered square so they never stretch. */}
      <div className="absolute left-1/2 top-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2">
        {[0, 1].map((layer) => (
          <div
            key={layer}
            className={`absolute inset-0 motion-reduce:animate-none ${
              layer === 0 ? 'animate-spin-slow' : 'animate-spin-slow-reverse'
            }`}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
              {ARC_RINGS.map((ring) => (
                <circle
                  key={`${layer}-${ring.radius}`}
                  cx={HUB.x}
                  cy={HUB.y}
                  r={ring.radius}
                  fill="none"
                  stroke="white"
                  strokeOpacity={ring.opacity * (layer === 0 ? 1 : 0.8)}
                  strokeWidth="0.35"
                  strokeDasharray={ring.dash}
                />
              ))}
            </svg>
          </div>
        ))}

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <g stroke="white" strokeOpacity={orchestratorActive ? 0.12 : 0.05} strokeWidth="0.25" strokeDasharray="1 3">
            <line x1="4" y1="50" x2="96" y2="50" />
            <line x1="50" y1="4" x2="50" y2="96" />
          </g>
        </svg>

        {!prefersReducedMotion &&
          [0, 1.2, 2.4].map((delay) => (
            <div key={delay} className="absolute inset-0 flex items-center justify-center">
              <span
                className="h-[62%] w-[62%] rounded-full border border-primary-soft/25 animate-scan-ring"
                style={{ animationDelay: `${delay}s` }}
              />
            </div>
          ))}
      </div>

      {/* Spokes span the full box so they land exactly on each agent node. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="spoke-primary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="spoke-accent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {nodes.map((node) => {
          const active = isNodeActive(node.id, activeAgent);

          return (
            <g key={node.id}>
              <line
                x1={HUB.x}
                y1={HUB.y}
                x2={node.x}
                y2={node.y}
                stroke="white"
                strokeOpacity={active ? 0.16 : 0.06}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {active && (
                <line
                  x1={HUB.x}
                  y1={HUB.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.glow === 'accent' ? 'url(#spoke-accent)' : 'url(#spoke-primary)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={100}
                  strokeDasharray="10 90"
                  className={prefersReducedMotion ? '' : 'animate-data-flow'}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* HUD corner brackets */}
      <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/10" />
      <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/10" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/10" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/10" />
    </div>
  );
}

export default function AgentConsole() {
  const { t } = useTranslation();
  const initialStateRef = useRef(createInitialState());
  const [entries, setEntries] = useState(initialStateRef.current.entries);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const nextIdRef = useRef(ROWS);
  const clockRef = useRef(initialStateRef.current.clock);

  const activeAgent = entries[entries.length - 1]?.line.agent ?? 'data';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);

    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeoutId = 0;

    const scheduleNext = () => {
      const delay = randomInt(TICK_MIN_MS, TICK_MAX_MS);

      timeoutId = window.setTimeout(() => {
        setEntries((previous) => {
          const lastLine = previous[previous.length - 1]?.line;
          const line = pickRandomLine(lastLine?.key);
          clockRef.current += randomGap(line);

          const nextEntry = createEntry(nextIdRef.current, line, clockRef.current);
          nextIdRef.current += 1;

          return [...previous.slice(1), nextEntry];
        });

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  const orchestratorActive = isOrchestratorActive(activeAgent);

  return (
    <div className="rounded-[22px] bg-night p-5 shadow-console sm:p-6">
      {/* Live control map */}
      <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
        <ControlCenterBackdrop
          activeAgent={activeAgent}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Wrappers own the centering; inner elements own the scaling. */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-[130px] w-[130px] rounded-full blur-2xl animate-orbit-pulse motion-reduce:animate-none ${
              orchestratorActive ? 'bg-primary/45' : 'bg-primary/20'
            }`}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex flex-col items-center gap-2"
            animate={{ scale: prefersReducedMotion ? 1 : orchestratorActive ? 1.18 : 1 }}
            transition={nodeTransition}
          >
            {orchestratorActive && (
              <span className="absolute left-1/2 top-4 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/30 blur-md motion-reduce:hidden" />
            )}
            <span
              className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-2 transition-all duration-300 ${
                orchestratorActive
                  ? 'bg-node-primary ring-primary-soft shadow-node-glow-primary'
                  : 'bg-node-idle ring-white/15'
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-primary-bright ${
                  !prefersReducedMotion && orchestratorActive ? 'animate-node-active-pulse' : ''
                }`}
              />
            </span>
            <motion.span
              className={`whitespace-nowrap font-mono text-[9px] ${
                orchestratorActive ? 'text-primary-soft' : 'text-white/40'
              }`}
              animate={{ opacity: orchestratorActive ? 1 : 0.4 }}
              transition={nodeTransition}
            >
              {t('hero.nodeMain')}
            </motion.span>
          </motion.div>
        </div>

        {nodes.map((node) => {
          const nodeActive = isNodeActive(node.id, activeAgent);
          const glowClass =
            node.glow === 'accent' ? 'shadow-node-glow-accent' : 'shadow-node-glow-primary';
          const ringClass =
            node.glow === 'accent'
              ? 'ring-accent bg-node-accent'
              : 'ring-primary-soft bg-node-primary';

          return (
            <div
              key={node.key}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <motion.div
                className="relative flex flex-col items-center gap-1.5"
                animate={{ scale: prefersReducedMotion ? 1 : nodeActive ? 1.18 : 1 }}
                transition={nodeTransition}
              >
                {nodeActive && (
                  <span
                    className={`absolute left-1/2 top-3.5 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md motion-reduce:hidden ${
                      node.glow === 'accent' ? 'bg-accent/35' : 'bg-primary-soft/40'
                    }`}
                  />
                )}
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full ring-2 transition-all duration-300 ${
                    nodeActive ? `${ringClass} ${glowClass}` : 'bg-node-idle ring-white/10'
                  }`}
                >
                  <span
                    className={`rounded-full ${node.dot} ${nodeActive ? 'h-2 w-2' : 'h-1.5 w-1.5'} ${
                      !prefersReducedMotion && nodeActive ? 'animate-node-active-pulse' : ''
                    }`}
                  />
                </span>
                <motion.span
                  className={`whitespace-nowrap font-mono text-[9px] ${
                    nodeActive
                      ? node.glow === 'accent'
                        ? 'text-accent'
                        : 'text-primary-soft'
                      : 'text-white/30'
                  }`}
                  animate={{ opacity: nodeActive ? 1 : 0.3 }}
                  transition={nodeTransition}
                >
                  {t(node.key)}
                </motion.span>
              </motion.div>
            </div>
          );
        })}
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

        <div className="mask-fade-top relative overflow-hidden" style={{ height: VISIBLE_HEIGHT }}>
          <div className="absolute inset-x-0 bottom-0 flex flex-col font-mono text-[10.5px] leading-none sm:text-[11px]">
            {entries.map((entry, position) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex shrink-0 items-center gap-3"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="shrink-0 text-white/30">{entry.timestamp}</span>
                <span className={`truncate ${entry.line.tone}`}>{t(entry.line.key)}</span>
                {position === entries.length - 1 && (
                  <span className="h-3 w-[6px] shrink-0 bg-primary-bright animate-blink motion-reduce:animate-none" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
