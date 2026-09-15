"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { createProjection, type Box } from "@/lib/iso";

/* ------------------------------------------------------------------ */
/* Projection & scene                                                  */
/* ------------------------------------------------------------------ */

const P = createProjection({ unit: 26, ky: 0.36, origin: { x: 300, y: 80 } });
const { iso, line, boxFaces, groundEllipse, ellipsePath } = P;
const U = P.unit;

const FLOOR = { w: 26, d: 8, t: 0.6 };
const BELT = { x0: 3.2, x1: 23, y: 4.5, width: 1.8, h: 0.18 };
/** Board units per second on the belt. */
const SPEED = 3;

type StationId = "nlp" | "data" | "ops" | "api";
type InDock = "whatsapp" | "email" | "crm";
type OutDock = "erp" | "billing" | "reports";

const STATION = { w: 1.6, d: 1.4, y: 1.6, h: 1.5 };
const ARM = { w: 0.5, y0: 3.0, y1: 5.6, z: 1.55, h: 0.2 };
const HEAD = { w: 0.9, y0: 4.05, y1: 4.95, z: 1.3, h: 0.25 };
const STATIONS: { id: StationId; cx: number }[] = [
  { id: "nlp", cx: 6.5 },
  { id: "data", cx: 11 },
  { id: "ops", cx: 15.5 },
  { id: "api", cx: 20 },
];

const TOWER: Box = { x: 12.2, y: 0.2, w: 2, d: 1.4, h: 2.6 };
const TOWER_CENTER = { x: TOWER.x + TOWER.w / 2, y: TOWER.y + TOWER.d / 2 };

const DOCK = { w: 1.1, d: 1.1, h: 0.25 };
const DOCK_YS = [0.9, 3.45, 6.0];
const IN_X = 1.2;
const OUT_X = 23.8;
const IN_DOCKS: { id: InDock; y: number }[] = [
  { id: "whatsapp", y: DOCK_YS[0] },
  { id: "email", y: DOCK_YS[1] },
  { id: "crm", y: DOCK_YS[2] },
];
const OUT_DOCKS: { id: OutDock; y: number }[] = [
  { id: "erp", y: DOCK_YS[0] },
  { id: "billing", y: DOCK_YS[1] },
  { id: "reports", y: DOCK_YS[2] },
];

const ITEM = { size: 1.05, h: 0.22, lift: 0.6 };

const FLOOR_FACES = boxFaces({
  x: 0,
  y: 0,
  w: FLOOR.w,
  d: FLOOR.d,
  h: FLOOR.t,
  z: -FLOOR.t,
});
const BELT_FACES = boxFaces({
  x: BELT.x0,
  y: BELT.y - BELT.width / 2,
  w: BELT.x1 - BELT.x0,
  d: BELT.width,
  h: BELT.h,
});
const BELT_LINE = line(
  iso(BELT.x0, BELT.y, BELT.h + 0.02),
  iso(BELT.x1, BELT.y, BELT.h + 0.02),
);
const BELT_SECONDS = (BELT.x1 - BELT.x0) / SPEED;

const STUDS = Array.from({ length: FLOOR.w * FLOOR.d }, (_, i) =>
  groundEllipse((i % FLOOR.w) + 0.5, Math.floor(i / FLOOR.w) + 0.5, 0, 0.18),
);

const TOWER_TOP = iso(TOWER_CENTER.x, TOWER_CENTER.y, TOWER.h);
const RING = groundEllipse(TOWER_CENTER.x, TOWER_CENTER.y, TOWER.h + 0.35, 1.7);
const RING_PATH = ellipsePath(RING.cx, RING.cy, RING.rx, RING.ry);

const ITEM_BOX: Box = {
  x: -ITEM.size / 2,
  y: -ITEM.size / 2,
  w: ITEM.size,
  d: ITEM.size,
  h: ITEM.h,
};
const ITEM_FACES = boxFaces(ITEM_BOX);
const ITEM_MARKS = [-0.28, -0.04, 0.2].map((y, i) =>
  line(iso(-0.34, y, ITEM.h), iso(i === 2 ? 0.02 : 0.34, y, ITEM.h)),
);
const ITEM_CHECK = line(
  iso(-0.3, 0.04, ITEM.h),
  iso(-0.06, 0.3, ITEM.h),
  iso(0.34, -0.22, ITEM.h),
);

const ORIGIN_PT = iso(0, 0, 0);
/** Screen offset that moves geometry drawn at the board origin to (x, y). */
const offset = (x: number, y: number) => {
  const p = iso(x, y, 0);
  return { x: p.X - ORIGIN_PT.X, y: p.Y - ORIGIN_PT.Y };
};

const dockCenter = (x: number, y: number) => ({
  x: x + DOCK.w / 2,
  y: y + DOCK.d / 2,
});

/* ------------------------------------------------------------------ */
/* Job schedule                                                        */
/* ------------------------------------------------------------------ */

type Job = {
  id: number;
  from: InDock;
  station: StationId;
  to: OutDock;
};

type Schedule = {
  total: number;
  outer: { x: number[]; y: number[]; times: number[] };
  opacity: { values: number[]; times: number[] };
  lift: { values: number[]; times: number[] };
  flip: { values: number[]; times: number[] };
  swap: { times: number[] };
  events: {
    at: number;
    stationOn: number;
    stationOff: number;
    outOn: number;
    outOff: number;
  };
};

const T = {
  appear: 0.45,
  merge: 0.8,
  lift: 0.3,
  flip: 0.5,
  lower: 0.3,
  diverge: 0.8,
  drop: 0.5,
};

function buildSchedule(job: Job): Schedule {
  const inDock = IN_DOCKS.find((d) => d.id === job.from)!;
  const outDock = OUT_DOCKS.find((d) => d.id === job.to)!;
  const station = STATIONS.find((s) => s.id === job.station)!;

  const p0 = dockCenter(IN_X, inDock.y);
  const p1 = { x: BELT.x0 + 0.4, y: BELT.y };
  const p2 = { x: station.cx, y: BELT.y };
  const p3 = { x: BELT.x1 - 0.4, y: BELT.y };
  const p4 = dockCenter(OUT_X, outDock.y);

  const t1 = T.appear;
  const t2 = t1 + T.merge;
  const t3 = t2 + (p2.x - p1.x) / SPEED;
  const t4 = t3 + T.lift + T.flip + T.lower;
  const t5 = t4 + (p3.x - p2.x) / SPEED;
  const t6 = t5 + T.diverge;
  const total = t6 + T.drop;

  const points = [p0, p0, p1, p2, p2, p3, p4, p4].map((p) => offset(p.x, p.y));
  const outerTimes = [0, t1, t2, t3, t4, t5, t6, total].map((t) => t / total);

  const liftTimes = [0, t1, t3, t3 + T.lift, t4 - T.lower, t4, t6, total].map(
    (t) => t / total,
  );
  const liftValues = [
    -0.9 * U,
    0,
    0,
    -ITEM.lift * U,
    -ITEM.lift * U,
    0,
    0,
    0.5 * U,
  ];

  const flipMid = t3 + T.lift + T.flip / 2;
  const flipTimes = [0, t3 + T.lift, flipMid, t4 - T.lower, total].map(
    (t) => t / total,
  );

  return {
    total,
    outer: {
      x: points.map((p) => p.x),
      y: points.map((p) => p.y),
      times: outerTimes,
    },
    opacity: {
      values: [0, 1, 1, 0],
      times: [0, 0.3 / total, (t6 + 0.15) / total, 1],
    },
    lift: { values: liftValues, times: liftTimes },
    flip: { values: [1, 1, 0.06, 1, 1], times: flipTimes },
    swap: { times: [0, (flipMid - 0.02) / total, (flipMid + 0.02) / total, 1] },
    events: {
      at: 0,
      stationOn: t3,
      stationOff: t4,
      outOn: t6 - 0.1,
      outOff: total,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Colors                                                              */
/* ------------------------------------------------------------------ */

const C = {
  floor: {
    top: "#7C3AED",
    left: "#6D28D9",
    right: "#4C1D95",
    stroke: "rgba(255,255,255,0.35)",
  },
  belt: {
    top: "#241B31",
    left: "#1B1424",
    right: "#130D1B",
    stroke: "rgba(255,255,255,0.14)",
  },
  station: {
    top: "#FFFFFF",
    left: "#EDE9FE",
    right: "#DDD6FE",
    stroke: "rgba(76,29,149,0.35)",
  },
  tower: {
    top: "#A78BFA",
    left: "#8B5CF6",
    right: "#6D28D9",
    stroke: "rgba(255,255,255,0.55)",
  },
  dock: {
    top: "#22D3EE",
    left: "#0891B2",
    right: "#0E7490",
    stroke: "rgba(255,255,255,0.5)",
  },
  dockActive: "#A5F3FC",
  raw: {
    top: "#F5F3FF",
    left: "#DDD6FE",
    right: "#C4B5FD",
    stroke: "rgba(76,29,149,0.4)",
  },
  done: {
    top: "#7C3AED",
    left: "#6D28D9",
    right: "#4C1D95",
    stroke: "rgba(255,255,255,0.6)",
  },
  accent: "#22D3EE",
};

type Palette = { top: string; left: string; right: string; stroke: string };

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Block({
  box,
  palette,
  strokeWidth = 0.7,
}: {
  box: Box;
  palette: Palette;
  strokeWidth?: number;
}) {
  const f = boxFaces(box);
  return (
    <g stroke={palette.stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
      <path d={f.left} fill={palette.left} />
      <path d={f.right} fill={palette.right} />
      <path d={f.top} fill={palette.top} />
    </g>
  );
}

function Tile({ processed }: { processed: boolean }) {
  const palette = processed ? C.done : C.raw;
  return (
    <g stroke={palette.stroke} strokeWidth={0.7} strokeLinejoin="round">
      <path d={ITEM_FACES.left} fill={palette.left} />
      <path d={ITEM_FACES.right} fill={palette.right} />
      <path d={ITEM_FACES.top} fill={palette.top} />
      {processed ? (
        <path
          d={ITEM_CHECK}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <g
          stroke="#7C3AED"
          strokeOpacity={0.55}
          strokeWidth={1.4}
          strokeLinecap="round"
        >
          {ITEM_MARKS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      )}
    </g>
  );
}

function Dock({
  x,
  y,
  active,
  label,
  side,
  staticMode,
}: {
  x: number;
  y: number;
  active: boolean;
  label?: string;
  side: "in" | "out";
  staticMode: boolean;
}) {
  const box: Box = { x, y, w: DOCK.w, d: DOCK.d, h: DOCK.h };
  const f = boxFaces(box);
  const c = dockCenter(x, y);
  const ring = groundEllipse(c.x, c.y, 0, 1);
  /* Labels sit off the board, one unit past the edge, like drawing callouts. */
  const labelPos =
    side === "in" ? iso(-0.5, c.y + 0.9, 0) : iso(FLOOR.w + 0.5, c.y - 0.9, 0);

  return (
    <g>
      {active && !staticMode && (
        <motion.ellipse
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.5}
          initial={{ opacity: 0.9, scale: 0.4 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
      <g stroke={C.dock.stroke} strokeWidth={0.7} strokeLinejoin="round">
        <path d={f.left} fill={C.dock.left} />
        <path d={f.right} fill={C.dock.right} />
        <motion.path
          d={f.top}
          initial={false}
          animate={{ fill: active ? C.dockActive : C.dock.top }}
          transition={{ duration: 0.3 }}
        />
      </g>
      {label && (
        <text
          x={labelPos.X}
          y={labelPos.Y + 3}
          textAnchor={side === "in" ? "end" : "start"}
          fontSize={9}
          letterSpacing="0.08em"
          className="font-mono fill-ink-dim"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Station({
  cx,
  active,
  label,
}: {
  cx: number;
  active: boolean;
  label?: string;
}) {
  const body: Box = {
    x: cx - STATION.w / 2,
    y: STATION.y,
    w: STATION.w,
    d: STATION.d,
    h: STATION.h,
  };
  const top = iso(cx, STATION.y + STATION.d / 2, STATION.h);

  return (
    <g>
      <Block box={body} palette={C.station} />
      {label && (
        <motion.text
          x={top.X}
          y={top.Y + 3.5}
          textAnchor="middle"
          fontSize={8.5}
          letterSpacing="0.1em"
          className="font-mono"
          initial={false}
          animate={{ fill: active ? "#6D28D9" : "#3B1F66" }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
}

function StationArm({
  cx,
  active,
  staticMode,
}: {
  cx: number;
  active: boolean;
  staticMode: boolean;
}) {
  const arm: Box = {
    x: cx - ARM.w / 2,
    y: ARM.y0,
    w: ARM.w,
    d: ARM.y1 - ARM.y0,
    h: ARM.h,
    z: ARM.z,
  };
  const head: Box = {
    x: cx - HEAD.w / 2,
    y: HEAD.y0,
    w: HEAD.w,
    d: HEAD.y1 - HEAD.y0,
    h: HEAD.h,
    z: HEAD.z,
  };
  const light = groundEllipse(cx, BELT.y, HEAD.z + HEAD.h, 0.16);
  const beamTop = iso(cx, BELT.y, HEAD.z);
  const beamBottom = iso(cx, BELT.y, ITEM.lift + ITEM.h);

  return (
    <g>
      <Block box={arm} palette={C.station} strokeWidth={0.6} />
      <Block box={head} palette={C.station} strokeWidth={0.6} />
      <motion.ellipse
        cx={light.cx}
        cy={light.cy}
        rx={light.rx}
        ry={light.ry}
        initial={false}
        animate={{ fill: active ? C.accent : "rgba(124,58,237,0.35)" }}
        transition={{ duration: 0.25 }}
      />
      {active && (
        <motion.line
          x1={beamTop.X}
          y1={beamTop.Y}
          x2={beamBottom.X}
          y2={beamBottom.Y}
          stroke={C.accent}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={
            staticMode ? { opacity: 0.8 } : { opacity: [0.2, 0.95, 0.2] }
          }
          transition={{
            duration: 0.7,
            repeat: staticMode ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </g>
  );
}

function Job3D({ schedule }: { schedule: Schedule }) {
  const { total } = schedule;
  return (
    <motion.g
      initial={{ x: schedule.outer.x[0], y: schedule.outer.y[0], opacity: 0 }}
      animate={{
        x: schedule.outer.x,
        y: schedule.outer.y,
        opacity: schedule.opacity.values,
      }}
      transition={{
        x: { duration: total, times: schedule.outer.times, ease: "linear" },
        y: { duration: total, times: schedule.outer.times, ease: "linear" },
        opacity: {
          duration: total,
          times: schedule.opacity.times,
          ease: "linear",
        },
      }}
    >
      <motion.g
        initial={{ y: schedule.lift.values[0] }}
        animate={{ y: schedule.lift.values }}
        transition={{
          duration: total,
          times: schedule.lift.times,
          ease: "easeInOut",
        }}
      >
        <motion.g
          initial={{ scaleX: 1 }}
          animate={{ scaleX: schedule.flip.values }}
          transition={{
            duration: total,
            times: schedule.flip.times,
            ease: "easeInOut",
          }}
        >
          <motion.g
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              duration: total,
              times: schedule.swap.times,
              ease: "linear",
            }}
          >
            <Tile processed={false} />
          </motion.g>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{
              duration: total,
              times: schedule.swap.times,
              ease: "linear",
            }}
          >
            <Tile processed />
          </motion.g>
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/* Runtime                                                             */
/* ------------------------------------------------------------------ */

type Active = Record<string, number>;

const SPAWN_FIRST_MS = 700;
const SPAWN_MIN_MS = 2400;
const SPAWN_MAX_MS = 3200;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const NARROW_QUERY = "(max-width: 640px)";

/** Phones crop to the belt and stations; the docks peek in from the corners. */
const VIEWBOX = {
  wide: { x: 0, y: 40, w: 1000, h: 400 },
  narrow: { x: 320, y: 90, w: 460, h: 290 },
};

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

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(list: readonly T[], exclude?: T): T {
  const pool = exclude === undefined ? list : list.filter((v) => v !== exclude);
  return pool[randomInt(0, pool.length - 1)];
}

const STATIC_JOBS: { x: number; y: number; z: number; processed: boolean }[] = [
  { ...dockCenter(IN_X, DOCK_YS[1]), z: 0, processed: false },
  { x: 7.8, y: BELT.y, z: 0, processed: false },
  { x: STATIONS[1].cx, y: BELT.y, z: ITEM.lift, processed: true },
  { x: 18.2, y: BELT.y, z: 0, processed: true },
  { ...dockCenter(OUT_X, DOCK_YS[0]), z: 0, processed: true },
];

export default function AgentConsole() {
  const t = useTranslations();
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerFalse,
  );
  const narrow = useSyncExternalStore(
    subscribeNarrow,
    getNarrow,
    getServerFalse,
  );

  const [jobs, setJobs] = useState<{ job: Job; schedule: Schedule }[]>([]);
  const [active, setActive] = useState<Active>({});
  const [beam, setBeam] = useState<{ id: number; station: StationId } | null>(
    null,
  );
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers = new Set<number>();
    const at = (seconds: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, seconds * 1000);
      timers.add(id);
    };
    const bump = (key: string, delta: number) =>
      setActive((prev) => ({
        ...prev,
        [key]: Math.max(0, (prev[key] ?? 0) + delta),
      }));

    let lastStation: StationId | undefined;

    const spawn = () => {
      const job: Job = {
        id: nextIdRef.current++,
        from: pick(IN_DOCKS).id,
        station: pick(
          STATIONS.map((s) => s.id),
          lastStation,
        ),
        to: pick(OUT_DOCKS).id,
      };
      lastStation = job.station;
      const schedule = buildSchedule(job);
      const { events } = schedule;

      setJobs((prev) => [...prev, { job, schedule }]);
      setBeam({ id: job.id, station: job.station });

      bump(`in:${job.from}`, 1);
      at(T.appear + 0.3, () => bump(`in:${job.from}`, -1));
      at(events.stationOn, () => bump(`st:${job.station}`, 1));
      at(events.stationOff, () => bump(`st:${job.station}`, -1));
      at(events.outOn, () => bump(`out:${job.to}`, 1));
      at(events.outOff, () => bump(`out:${job.to}`, -1));
      at(schedule.total + 0.1, () =>
        setJobs((prev) => prev.filter((entry) => entry.job.id !== job.id)),
      );

      at(randomInt(SPAWN_MIN_MS, SPAWN_MAX_MS) / 1000, spawn);
    };

    at(SPAWN_FIRST_MS / 1000, spawn);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      setJobs([]);
      setActive({});
      setBeam(null);
    };
  }, [prefersReducedMotion]);

  const staticMode = prefersReducedMotion;
  const isActive = (key: string) =>
    staticMode ? false : (active[key] ?? 0) > 0;
  const stationLabel: Record<StationId, string> = {
    nlp: t("hero.nodeAgent1"),
    data: t("hero.nodeAgent2"),
    ops: t("hero.nodeAgent3"),
    api: t("hero.nodeAgent4"),
  };
  const dockLabel: Record<InDock | OutDock, string> = {
    whatsapp: "WhatsApp",
    email: t("console.ports.email"),
    crm: "CRM",
    erp: "ERP",
    billing: t("console.ports.billing"),
    reports: t("console.ports.reports"),
  };
  const showLabels = !narrow;
  const beamTarget = beam ? STATIONS.find((s) => s.id === beam.station)! : null;
  const vb = narrow ? VIEWBOX.narrow : VIEWBOX.wide;

  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{
        aspectRatio: `${vb.w} / ${vb.h}`,
        maxHeight: "min(62vh, 520px)",
      }}
    >
      <div className="pointer-events-none absolute bottom-[3%] left-1/2 h-14 w-[70%] -translate-x-1/2 rounded-[50%] bg-primary/25 blur-3xl" />

      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full"
        style={
          narrow
            ? {
                maskImage:
                  "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              }
            : undefined
        }
      >
        <defs>
          <filter id="ac-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Floor */}
        <path d={FLOOR_FACES.left} fill={C.floor.left} />
        <path d={FLOOR_FACES.right} fill={C.floor.right} />
        <path
          d={FLOOR_FACES.top}
          fill={C.floor.top}
          stroke={C.floor.stroke}
          strokeWidth={1}
        />
        <g fill="#fff" fillOpacity={0.12}>
          {STUDS.map((s, i) => (
            <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
          ))}
        </g>

        {/* Belt */}
        <g stroke={C.belt.stroke} strokeWidth={0.7} strokeLinejoin="round">
          <path d={BELT_FACES.left} fill={C.belt.left} />
          <path d={BELT_FACES.right} fill={C.belt.right} />
          <path d={BELT_FACES.top} fill={C.belt.top} />
        </g>
        <path
          d={BELT_LINE}
          pathLength={100}
          strokeDasharray="4 12"
          className={staticMode ? "" : "animate-data-flow"}
          style={{ animationDuration: `${BELT_SECONDS.toFixed(2)}s` }}
          fill="none"
          stroke="#A78BFA"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Orchestrator */}
        <Block box={TOWER} palette={C.tower} />
        <motion.circle
          cx={TOWER_TOP.X}
          cy={TOWER_TOP.Y - 6}
          r={11}
          fill="#fff"
          filter="url(#ac-glow)"
          animate={
            staticMode
              ? { opacity: 0.45 }
              : { scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }
          }
          transition={{
            duration: 2.8,
            repeat: staticMode ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <circle cx={TOWER_TOP.X} cy={TOWER_TOP.Y - 6} r={4} fill="#fff" />
        {showLabels && (
          <text
            x={TOWER_TOP.X}
            y={RING.cy - RING.ry - 12}
            textAnchor="middle"
            fontSize={9}
            letterSpacing="0.1em"
            className="font-mono fill-ink-dim"
          >
            {t("hero.nodeMain")}
          </text>
        )}
        <path
          d={RING_PATH}
          fill="none"
          stroke="#fff"
          strokeOpacity={0.45}
          strokeWidth={1}
          strokeDasharray="3 6"
        />
        {!staticMode && (
          <path
            d={RING_PATH}
            pathLength={100}
            strokeDasharray="10 90"
            className="animate-data-flow"
            style={{ animationDuration: "4s" }}
            fill="none"
            stroke="#fff"
            strokeWidth={2.4}
            strokeLinecap="round"
            filter="url(#ac-glow)"
          />
        )}

        {/* Stations */}
        {STATIONS.map((s) => (
          <Station
            key={s.id}
            cx={s.cx}
            active={isActive(`st:${s.id}`) || (staticMode && s.id === "data")}
            label={showLabels ? stationLabel[s.id].toUpperCase() : undefined}
          />
        ))}

        {/* Docks */}
        {IN_DOCKS.map((d) => (
          <Dock
            key={d.id}
            x={IN_X}
            y={d.y}
            active={isActive(`in:${d.id}`)}
            label={showLabels ? dockLabel[d.id] : undefined}
            side="in"
            staticMode={staticMode}
          />
        ))}
        {OUT_DOCKS.map((d) => (
          <Dock
            key={d.id}
            x={OUT_X}
            y={d.y}
            active={isActive(`out:${d.id}`)}
            label={showLabels ? dockLabel[d.id] : undefined}
            side="out"
            staticMode={staticMode}
          />
        ))}

        {/* Assignment beam */}
        {beam && beamTarget && (
          <motion.path
            key={beam.id}
            d={line(
              TOWER_TOP,
              iso(beamTarget.cx, STATION.y + STATION.d / 2, STATION.h),
            )}
            fill="none"
            stroke="#fff"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
            transition={{ duration: 1, times: [0, 0.35, 1], ease: "easeOut" }}
          />
        )}

        {/* Arms hang over the belt; items travel under them. */}
        {STATIONS.map((s) => (
          <StationArm
            key={s.id}
            cx={s.cx}
            active={isActive(`st:${s.id}`) || (staticMode && s.id === "data")}
            staticMode={staticMode}
          />
        ))}

        {/* Jobs */}
        {staticMode
          ? STATIC_JOBS.map((j, i) => {
              const o = offset(j.x, j.y);
              return (
                <g key={i} transform={`translate(${o.x} ${o.y - j.z * U})`}>
                  <Tile processed={j.processed} />
                </g>
              );
            })
          : jobs.map(({ job, schedule }) => (
              <Job3D key={job.id} schedule={schedule} />
            ))}
      </svg>
    </div>
  );
}
