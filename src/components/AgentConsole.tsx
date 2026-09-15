"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AgentBoard, {
  buildScene,
  routeLength,
  routePath,
  type Actor,
  type Highlight,
  type InPort,
  type Leg,
  type OutPort,
  type Pt,
  type Scene,
} from "./AgentBoard";

type Tone = "neutral" | "primary" | "accent";

type LogLine = {
  key: string;
  gap: readonly [number, number];
  tone: Tone;
  actor: Actor;
  from: InPort;
  to: OutPort;
};

type LogEntry = {
  id: number;
  line: LogLine;
  timestamp: string;
};

type Cycle = { id: number; legs: Leg[] };

type CycleEvent = { at: number; highlight: Highlight; log?: boolean };

const logPool: LogLine[] = [
  { key: "console.pool.data1", gap: [8, 18], tone: "neutral", actor: "data", from: "email", to: "reports" },
  { key: "console.pool.data2", gap: [5, 14], tone: "neutral", actor: "data", from: "crm", to: "erp" },
  { key: "console.pool.data3", gap: [10, 20], tone: "primary", actor: "data", from: "email", to: "billing" },
  { key: "console.pool.data4", gap: [7, 16], tone: "neutral", actor: "data", from: "crm", to: "reports" },
  { key: "console.pool.api1", gap: [3, 9], tone: "neutral", actor: "api", from: "crm", to: "erp" },
  { key: "console.pool.api2", gap: [4, 11], tone: "accent", actor: "api", from: "whatsapp", to: "erp" },
  { key: "console.pool.api3", gap: [6, 13], tone: "neutral", actor: "api", from: "crm", to: "reports" },
  { key: "console.pool.api4", gap: [8, 15], tone: "accent", actor: "api", from: "crm", to: "erp" },
  { key: "console.pool.nlp1", gap: [9, 17], tone: "neutral", actor: "nlp", from: "whatsapp", to: "reports" },
  { key: "console.pool.nlp2", gap: [6, 14], tone: "primary", actor: "nlp", from: "whatsapp", to: "reports" },
  { key: "console.pool.nlp3", gap: [5, 12], tone: "neutral", actor: "nlp", from: "whatsapp", to: "erp" },
  { key: "console.pool.nlp4", gap: [11, 19], tone: "primary", actor: "nlp", from: "email", to: "billing" },
  { key: "console.pool.ops1", gap: [10, 18], tone: "neutral", actor: "ops", from: "crm", to: "reports" },
  { key: "console.pool.ops2", gap: [7, 15], tone: "primary", actor: "ops", from: "email", to: "erp" },
  { key: "console.pool.ops3", gap: [4, 10], tone: "accent", actor: "ops", from: "whatsapp", to: "erp" },
  { key: "console.pool.ops4", gap: [3, 8], tone: "accent", actor: "ops", from: "crm", to: "billing" },
  { key: "console.pool.orch1", gap: [12, 22], tone: "primary", actor: "orchestrator", from: "whatsapp", to: "reports" },
  { key: "console.pool.orch2", gap: [8, 16], tone: "primary", actor: "orchestrator", from: "whatsapp", to: "erp" },
  { key: "console.pool.orch3", gap: [6, 14], tone: "primary", actor: "orchestrator", from: "email", to: "billing" },
  { key: "console.pool.all1", gap: [7, 13], tone: "accent", actor: "all", from: "whatsapp", to: "billing" },
  { key: "console.pool.all2", gap: [5, 11], tone: "accent", actor: "all", from: "crm", to: "erp" },
  { key: "console.pool.all3", gap: [9, 16], tone: "primary", actor: "all", from: "email", to: "reports" },
];

/** One extra row is rendered above the visible area so lines leave before
 *  they unmount. */
const ROWS = 11;
const ROW_HEIGHT = 26;
const FIRST_TIMESTAMP = 9 * 3600 + 41 * 60 + 12;

/** Board units per millisecond; legs get their duration from route length. */
const SPEED = 0.34;
const DWELL = { hub: 220, work: 520, orchestrate: 780, out: 460 };
const IDLE_MIN_MS = 500;
const IDLE_MAX_MS = 1300;
const FIRST_CYCLE_MS = 900;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const NARROW_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const TONE_CLASS: Record<Tone, string> = {
  neutral: "text-ink-soft",
  primary: "text-primary",
  accent: "text-[#0E7490]",
};

const MARKER_CLASS: Record<Actor, string> = {
  nlp: "bg-primary-soft",
  data: "bg-primary-soft",
  ops: "bg-primary-soft",
  api: "bg-primary-soft",
  orchestrator: "bg-primary",
  all: "bg-accent",
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomLine(excludeKey?: string) {
  const candidates = excludeKey
    ? logPool.filter((line) => line.key !== excludeKey)
    : logPool;
  return candidates[randomInt(0, candidates.length - 1)];
}

function formatTimestamp(seconds: number) {
  const normalized = ((seconds % 86_400) + 86_400) % 86_400;

  return [
    Math.floor(normalized / 3600),
    Math.floor(normalized / 60) % 60,
    normalized % 60,
  ]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function createEntry(id: number, line: LogLine, clock: number): LogEntry {
  return { id, line, timestamp: formatTimestamp(clock) };
}

function createInitialState(): { entries: LogEntry[]; clock: number } {
  let clock = FIRST_TIMESTAMP;

  const entries = Array.from({ length: ROWS }, (_, index) => {
    const line = logPool[index % logPool.length];
    clock += line.gap[0];
    return createEntry(index, line, clock);
  });

  return { entries, clock };
}

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

const subscribeReducedMotion = subscribeMedia(REDUCED_MOTION_QUERY);
const subscribeNarrow = subscribeMedia(NARROW_QUERY);
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getNarrow = () => window.matchMedia(NARROW_QUERY).matches;
const getServerFalse = () => false;

function leg(points: Pt[], start: number, external: boolean): Leg {
  return {
    d: routePath(points),
    start,
    duration: routeLength(points) / SPEED,
    external,
  };
}

/** The packet's itinerary: port → hub → (worker → hub) → port. Highlights and
 *  the ledger line are scheduled off the same clock so the block lights up
 *  the instant the pulse reaches it. */
function buildPlan(scene: Scene, line: LogLine) {
  const legs: Leg[] = [];
  const events: CycleEvent[] = [{ at: 0, highlight: { in: line.from } }];

  const inbound = leg(scene.routes.in[line.from], 0, true);
  legs.push(inbound);
  let t = inbound.duration;

  if (line.actor === "orchestrator" || line.actor === "all") {
    events.push({
      at: t,
      highlight: { hub: true, actor: line.actor === "all" ? "all" : undefined },
      log: true,
    });
    t += DWELL.orchestrate;
  } else {
    events.push({ at: t, highlight: { hub: true } });
    t += DWELL.hub;

    const route = scene.routes.workers[line.actor];
    const toWorker = leg(route, t, false);
    legs.push(toWorker);
    t += toWorker.duration;
    events.push({ at: t, highlight: { actor: line.actor }, log: true });
    t += DWELL.work;

    const back = leg([...route].reverse(), t, false);
    legs.push(back);
    t += back.duration;
    events.push({ at: t, highlight: { hub: true } });
    t += DWELL.hub;
  }

  const outbound = leg(scene.routes.out[line.to], t, true);
  legs.push(outbound);
  events.push({ at: t, highlight: {} });
  t += outbound.duration;
  events.push({ at: t, highlight: { out: line.to } });
  t += DWELL.out;
  events.push({ at: t, highlight: {} });

  return { legs, events, total: t };
}

export default function AgentConsole() {
  const t = useTranslations();
  const [initialState] = useState(createInitialState);
  const [entries, setEntries] = useState(initialState.entries);
  const [highlight, setHighlight] = useState<Highlight>({});
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const nextIdRef = useRef(ROWS);
  const clockRef = useRef(initialState.clock);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerFalse,
  );
  const narrow = useSyncExternalStore(subscribeNarrow, getNarrow, getServerFalse);
  const scene = useMemo(() => buildScene(narrow), [narrow]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers = new Set<number>();
    const at = (ms: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const pushEntry = (line: LogLine) => {
      clockRef.current += randomInt(line.gap[0], line.gap[1]);
      const entry = createEntry(nextIdRef.current, line, clockRef.current);
      nextIdRef.current += 1;
      setEntries((previous) => [...previous.slice(1), entry]);
    };

    const run = (previousKey?: string) => {
      const line = pickRandomLine(previousKey);
      const plan = buildPlan(scene, line);

      setCycle({ id: nextIdRef.current, legs: plan.legs });
      plan.events.forEach((event) =>
        at(event.at, () => {
          setHighlight(event.highlight);
          if (event.log) pushEntry(line);
        }),
      );
      at(plan.total, () => setCycle(null));
      at(plan.total + randomInt(IDLE_MIN_MS, IDLE_MAX_MS), () => run(line.key));
    };

    at(FIRST_CYCLE_MS, () => run());

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      setHighlight({});
      setCycle(null);
    };
  }, [prefersReducedMotion, scene]);

  const newestId = entries[entries.length - 1]?.id;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card-lift ring-1 ring-ink/[0.08] lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <AgentBoard
        scene={scene}
        highlight={highlight}
        legs={cycle?.legs ?? []}
        cycleId={cycle?.id ?? 0}
        staticMode={prefersReducedMotion}
        hubLabel={t("hero.nodeMain")}
        agentLabels={{
          nlp: t("hero.nodeAgent1"),
          data: t("hero.nodeAgent2"),
          ops: t("hero.nodeAgent3"),
          api: t("hero.nodeAgent4"),
        }}
        portLabels={{
          whatsapp: "WhatsApp",
          email: t("console.ports.email"),
          crm: "CRM",
          billing: t("console.ports.billing"),
          erp: "ERP",
          reports: t("console.ports.reports"),
        }}
        captions={{
          in: t("console.inbound"),
          agents: t("console.processing"),
          out: t("console.outbound"),
        }}
      />

      <div className="flex flex-col border-t border-ink/[0.08] text-left lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b border-ink/[0.06] px-5 py-3.5">
          <span className="label text-ink-dim">{t("console.title")}</span>
          <span className="label flex items-center gap-2 text-ink-dim">
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="absolute inset-0 rounded-full bg-primary-bright/50 animate-whatsapp-ring" />
              )}
              <span className="relative h-2 w-2 rounded-full bg-primary-bright" />
            </span>
            {t("console.live")}
          </span>
        </div>

        <div className="mask-fade-top relative h-[134px] flex-1 overflow-hidden md:h-[160px] lg:h-auto">
          <div className="absolute inset-x-0 bottom-2 flex flex-col font-mono text-[10.5px] leading-none sm:text-[11px]">
            {entries.map((entry) => {
              const fresh = entry.id >= ROWS;
              const newest = entry.id === newestId;
              const tone =
                entry.line.tone === "neutral" && newest
                  ? "text-ink"
                  : TONE_CLASS[entry.line.tone];

              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={fresh ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="relative flex shrink-0 items-center gap-3 px-5"
                  style={{ height: ROW_HEIGHT }}
                >
                  {fresh && (
                    <motion.span
                      className="absolute inset-x-2 inset-y-0.5 -z-10 rounded-md bg-primary-wash"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: 0.4 }}
                    />
                  )}
                  <span
                    className={`h-2.5 w-[3px] shrink-0 rounded-full ${MARKER_CLASS[entry.line.actor]}`}
                  />
                  <span className="shrink-0 tabular-nums text-ink-dim/80">
                    {entry.timestamp}
                  </span>
                  <span className={`truncate ${tone}`}>{t(entry.line.key)}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
