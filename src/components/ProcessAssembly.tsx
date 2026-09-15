"use client";

import { useSyncExternalStore } from "react";
import { motion, type Variants } from "framer-motion";

type ProcessAssemblyProps = {
  activeStep: number;
  hubLabel: string;
  workerLabels: string[];
  staticMode?: boolean;
};

/* ------------------------------------------------------------------ */
/* Projection                                                          */
/* ------------------------------------------------------------------ */

/** Pixels per board unit. */
const U = 22;
const COS = Math.cos(Math.PI / 6);
/** Flattened dimetric: 0.5 would be true isometric; 0.36 keeps an 18x10
 *  board wide instead of tall. */
const KY = 0.36;
const ORIGIN = { x: 374, y: 50 };
const BOARD = { w: 18, d: 10, t: 0.6 };

type Pt = { X: number; Y: number };

function iso(x: number, y: number, z = 0): Pt {
  return {
    X: ORIGIN.x + (x - y) * COS * U,
    Y: ORIGIN.y + (x + y) * KY * U - z * U,
  };
}

const pt = (p: Pt) => `${p.X.toFixed(2)} ${p.Y.toFixed(2)}`;
const poly = (...pts: Pt[]) => `M${pts.map(pt).join("L")}Z`;
const line = (...pts: Pt[]) => `M${pts.map(pt).join("L")}`;

type Box = { x: number; y: number; w: number; d: number; h: number; z?: number };

function boxFaces({ x, y, w, d, h, z = 0 }: Box) {
  return {
    top: poly(
      iso(x, y, z + h),
      iso(x + w, y, z + h),
      iso(x + w, y + d, z + h),
      iso(x, y + d, z + h),
    ),
    left: poly(
      iso(x, y + d, z + h),
      iso(x + w, y + d, z + h),
      iso(x + w, y + d, z),
      iso(x, y + d, z),
    ),
    right: poly(
      iso(x + w, y, z + h),
      iso(x + w, y + d, z + h),
      iso(x + w, y + d, z),
      iso(x + w, y, z),
    ),
  };
}

/** A circle of radius r lying on the ground plane projects to an
 *  axis-aligned ellipse. */
function groundEllipse(x: number, y: number, z: number, r: number) {
  const c = iso(x, y, z);
  return {
    cx: c.X,
    cy: c.Y,
    rx: r * Math.SQRT2 * COS * U,
    ry: r * Math.SQRT2 * KY * U,
  };
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M${(cx - rx).toFixed(2)} ${cy.toFixed(2)}A${rx} ${ry} 0 1 0 ${(cx + rx).toFixed(2)} ${cy.toFixed(2)}A${rx} ${ry} 0 1 0 ${(cx - rx).toFixed(2)} ${cy.toFixed(2)}Z`;
}

/* ------------------------------------------------------------------ */
/* Scene data                                                          */
/* ------------------------------------------------------------------ */

type Kind = "hub" | "worker" | "port";

type Piece = Box & {
  id: string;
  kind: Kind;
  /** Step index (0-based) at which the piece lands. */
  step: number;
  /** Stagger order inside its step. */
  order: number;
  label?: string;
  labelIndex?: number;
};

const PIECES: Piece[] = [
  { id: "hub", kind: "hub", step: 1, order: 0, x: 7.5, y: 3.5, w: 3, d: 3, h: 2.6 },
  { id: "w1", kind: "worker", step: 2, order: 0, x: 3, y: 2, w: 2, d: 2, h: 1.4, labelIndex: 0 },
  { id: "w2", kind: "worker", step: 2, order: 1, x: 13, y: 2, w: 2, d: 2, h: 1.4, labelIndex: 1 },
  { id: "w3", kind: "worker", step: 2, order: 2, x: 3, y: 6, w: 2, d: 2, h: 1.4, labelIndex: 2 },
  { id: "w4", kind: "worker", step: 2, order: 3, x: 13, y: 6, w: 2, d: 2, h: 1.4, labelIndex: 3 },
  { id: "crm", kind: "port", step: 3, order: 0, x: 16, y: 4.3, w: 1.6, d: 1.4, h: 0.35, label: "CRM" },
  { id: "wa", kind: "port", step: 3, order: 1, x: 9.6, y: 8.3, w: 1.6, d: 1.4, h: 0.35, label: "WhatsApp" },
  { id: "erp", kind: "port", step: 3, order: 2, x: 0.6, y: 8.3, w: 1.6, d: 1.4, h: 0.35, label: "ERP" },
];

/** Painter's algorithm: pieces further back (smaller x + y) draw first. */
const SORTED_PIECES = [...PIECES].sort(
  (a, b) => a.x + a.y + a.w + a.d - (b.x + b.y + b.w + b.d),
);

/** Right-angle circuit traces from the hub to each port, on the board surface. */
const TRACES = [
  { id: "crm", d: line(iso(10.5, 5), iso(16, 5)), order: 0 },
  { id: "wa", d: line(iso(10.4, 6.5), iso(10.4, 8.3)), order: 1 },
  { id: "erp", d: line(iso(8.2, 6.5), iso(8.2, 9), iso(2.2, 9)), order: 2 },
];

const FACE_COLORS: Record<Kind | "board", { top: string; left: string; right: string; stroke: string }> = {
  board: { top: "rgba(255,255,255,0.10)", left: "rgba(91,33,182,0.6)", right: "rgba(46,16,101,0.75)", stroke: "rgba(255,255,255,0.4)" },
  hub: { top: "#A78BFA", left: "#7C3AED", right: "#4C1D95", stroke: "rgba(255,255,255,0.55)" },
  worker: { top: "#EDE9FE", left: "#C4B5FD", right: "#A78BFA", stroke: "rgba(255,255,255,0.65)" },
  port: { top: "#22D3EE", left: "#0891B2", right: "#0E7490", stroke: "rgba(255,255,255,0.5)" },
};

const BOARD_FACES = boxFaces({ x: 0, y: 0, w: BOARD.w, d: BOARD.d, h: BOARD.t, z: -BOARD.t });

const STUDS = Array.from({ length: BOARD.w * BOARD.d }, (_, i) => {
  const x = (i % BOARD.w) + 0.5;
  const y = Math.floor(i / BOARD.w) + 0.5;
  return groundEllipse(x, y, 0, 0.2);
});

const HUB = PIECES[0];
const HUB_CENTER = { x: HUB.x + HUB.w / 2, y: HUB.y + HUB.d / 2 };
const RING = groundEllipse(HUB_CENTER.x, HUB_CENTER.y, HUB.h + 0.35, 2.7);
const RING_PATH = ellipsePath(RING.cx, RING.cy, RING.rx, RING.ry);

/** Scan band sweeps 20 board units along the x axis. */
const SCAN_TRAVEL = { x: 20 * COS * U, y: 20 * KY * U };
const SCAN_BAND = poly(iso(-1, 0), iso(-0.2, 0), iso(-0.2, BOARD.d), iso(-1, BOARD.d));
const SCAN_EDGE = line(iso(-0.2, 0), iso(-0.2, BOARD.d));

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Desktop keeps side air; phones crop to the board so it stays legible. */
const VIEWBOX = {
  wide: { x: 0, y: 30, w: 900, h: 262 },
  narrow: { x: 170, y: 30, w: 560, h: 262 },
};

const NARROW_QUERY = "(max-width: 640px)";

function subscribeNarrow(onChange: () => void) {
  const mq = window.matchMedia(NARROW_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getNarrow = () => window.matchMedia(NARROW_QUERY).matches;
const getNarrowServer = () => false;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function PieceBlock({
  piece,
  visible,
  loop,
  staticMode,
  label,
}: {
  piece: Piece;
  visible: boolean;
  loop: boolean;
  staticMode: boolean;
  label?: string;
}) {
  const faces = boxFaces(piece);
  const colors = FACE_COLORS[piece.kind];
  const delay = piece.order * 0.09;
  const center = iso(piece.x + piece.w / 2, piece.y + piece.d / 2, piece.h);
  const ring = groundEllipse(
    piece.x + piece.w / 2,
    piece.y + piece.d / 2,
    0,
    Math.max(piece.w, piece.d) * 0.7,
  );

  return (
    <g>
      {/* Snap ring at the footprint, fired once on landing. */}
      {visible && !staticMode && (
        <motion.ellipse
          key={`${piece.id}-ring`}
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke="#fff"
          strokeWidth={1.5}
          initial={{ opacity: 0.85, scale: 0.35 }}
          animate={{ opacity: 0, scale: 1.9 }}
          transition={{ duration: 0.75, delay: delay + 0.3, ease: "easeOut" }}
        />
      )}

      <motion.g
        initial={false}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={
          staticMode
            ? { duration: 0 }
            : visible
              ? {
                  y: { type: "spring", stiffness: 300, damping: 26, mass: 1, delay },
                  opacity: { duration: 0.2, delay },
                }
              : {
                  y: { duration: 0.35, ease: "easeIn" },
                  opacity: { duration: 0.25 },
                }
        }
      >
        <path d={faces.left} fill={colors.left} stroke={colors.stroke} strokeWidth={0.6} strokeLinejoin="round" />
        <path d={faces.right} fill={colors.right} stroke={colors.stroke} strokeWidth={0.6} strokeLinejoin="round" />
        <path d={faces.top} fill={colors.top} stroke={colors.stroke} strokeWidth={0.8} strokeLinejoin="round" />

        {piece.kind === "hub" && (
          <>
            <motion.circle
              cx={center.X}
              cy={center.Y - 8}
              r={12}
              fill="#fff"
              filter="url(#pa-glow)"
              animate={
                loop
                  ? { scale: [1, 1.3, 1], opacity: [0.35, 0.75, 0.35] }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={
                loop
                  ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5 }
              }
            />
            <circle cx={center.X} cy={center.Y - 8} r={4.5} fill="#fff" />
            <text
              x={center.X}
              y={center.Y + 14}
              textAnchor="middle"
              fontSize={9}
              letterSpacing="0.1em"
              fill="#2E1065"
              className="font-mono"
            >
              {label?.toUpperCase()}
            </text>
          </>
        )}

        {piece.kind === "worker" && (
          <>
            {loop && (
              <motion.path
                d={faces.top}
                fill="#fff"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: piece.order * 0.42,
                  ease: "easeInOut",
                }}
              />
            )}
            <text
              x={center.X}
              y={center.Y + 3.5}
              textAnchor="middle"
              fontSize={9}
              letterSpacing="0.1em"
              fill="#3B1F66"
              className="font-mono"
            >
              {label?.toUpperCase()}
            </text>
          </>
        )}

        {piece.kind === "port" && (
          <text
            x={center.X}
            y={center.Y + 28}
            textAnchor="middle"
            fontSize={9}
            letterSpacing="0.08em"
            fill="rgba(255,255,255,0.85)"
            className="font-mono"
          >
            {piece.label}
          </text>
        )}
      </motion.g>
    </g>
  );
}

function Trace({
  d,
  visible,
  order,
  staticMode,
}: {
  d: string;
  visible: boolean;
  order: number;
  staticMode: boolean;
}) {
  const delay = 0.25 + order * 0.12;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#22D3EE"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 0.9 : 0 }}
        transition={
          staticMode
            ? { duration: 0 }
            : visible
              ? {
                  pathLength: { duration: 0.6, delay, ease: "easeOut" },
                  opacity: { duration: 0.2, delay },
                }
              : { duration: 0.3 }
        }
      />
      {!staticMode && (
        <motion.g
          initial={false}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, delay: visible ? delay + 0.55 : 0 }}
        >
          <path
            d={d}
            pathLength={100}
            strokeDasharray="14 86"
            className="animate-data-flow"
            style={{ animationDuration: "2.2s", animationDelay: `${order * 0.5}s` }}
            fill="none"
            stroke="#fff"
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        </motion.g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

const blueprint: Record<"outline" | "faces" | "studs" | "footprints", Variants> = {
  outline: {
    hidden: { pathLength: 0, opacity: 1 },
    shown: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: "easeInOut" } },
  },
  faces: {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration: 0.6, delay: 0.7 } },
  },
  studs: {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration: 0.8, delay: 1 } },
  },
  footprints: {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration: 0.5, delay: 1.3 } },
  },
};

export default function ProcessAssembly({
  activeStep,
  hubLabel,
  workerLabels,
  staticMode = false,
}: ProcessAssemblyProps) {
  const loop = !staticMode && activeStep >= 4;
  const scanning = !staticMode && activeStep === 0;
  const isVisible = (step: number) => staticMode || activeStep >= step;
  const narrow = useSyncExternalStore(subscribeNarrow, getNarrow, getNarrowServer);
  const vb = narrow ? VIEWBOX.narrow : VIEWBOX.wide;

  return (
    <div
      aria-hidden="true"
      className="relative mt-2 w-full [@media(max-height:620px)]:hidden"
      style={{
        aspectRatio: `${vb.w} / ${vb.h}`,
        maxHeight: "clamp(9rem, 32vh, 19rem)",
      }}
    >
      <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-[50%] bg-[#2e1065]/40 blur-2xl" />

      {/* Clipped on purpose: pieces fall in from the top edge of the frame. */}
      <motion.svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full"
        initial={staticMode ? false : "hidden"}
        whileInView={staticMode ? undefined : "shown"}
        viewport={{ once: true, amount: 0.3 }}
      >
        <defs>
          <clipPath id="pa-board-clip">
            <path d={BOARD_FACES.top} />
          </clipPath>
          <filter id="pa-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <motion.g
          animate={{ y: loop ? [0, -4, 0] : 0 }}
          transition={
            loop
              ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.5, ease: EASE_OUT }
          }
        >
          {/* Baseplate */}
          <motion.g variants={blueprint.faces}>
            <path d={BOARD_FACES.left} fill={FACE_COLORS.board.left} />
            <path d={BOARD_FACES.right} fill={FACE_COLORS.board.right} />
            <path d={BOARD_FACES.top} fill={FACE_COLORS.board.top} />
          </motion.g>
          <motion.path
            variants={blueprint.outline}
            d={BOARD_FACES.top}
            fill="none"
            stroke={FACE_COLORS.board.stroke}
            strokeWidth={1}
          />
          <motion.g variants={blueprint.studs} fill="#fff" fillOpacity={0.14}>
            {STUDS.map((s, i) => (
              <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
            ))}
          </motion.g>

          {/* Blueprint footprints: the design, before the pieces exist. */}
          <motion.g variants={blueprint.footprints}>
            {PIECES.map((piece) => (
              <motion.path
                key={piece.id}
                d={boxFaces({ ...piece, h: 0 }).top}
                fill="rgba(255,255,255,0.05)"
                stroke="#fff"
                strokeWidth={0.9}
                strokeDasharray="3 3"
                initial={false}
                animate={{ opacity: isVisible(piece.step) ? 0 : 0.75 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.g>

          {/* Analysis scan */}
          {scanning && (
            <g clipPath="url(#pa-board-clip)">
              <motion.g
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: [0, SCAN_TRAVEL.x],
                  y: [0, SCAN_TRAVEL.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  repeatDelay: 1.3,
                  ease: "linear",
                }}
              >
                <path d={SCAN_BAND} fill="#fff" fillOpacity={0.14} />
                <path d={SCAN_EDGE} stroke="#fff" strokeOpacity={0.8} strokeWidth={1.4} />
              </motion.g>
            </g>
          )}

          {/* Integration traces sit on the surface, under the blocks. */}
          {TRACES.map((trace) => (
            <Trace
              key={trace.id}
              d={trace.d}
              order={trace.order}
              visible={isVisible(3)}
              staticMode={staticMode}
            />
          ))}

          {SORTED_PIECES.map((piece) => (
            <PieceBlock
              key={piece.id}
              piece={piece}
              visible={isVisible(piece.step)}
              loop={loop}
              staticMode={staticMode}
              label={
                piece.kind === "hub"
                  ? hubLabel
                  : piece.labelIndex !== undefined
                    ? workerLabels[piece.labelIndex]
                    : undefined
              }
            />
          ))}

          {/* Learning loop */}
          <motion.g
            initial={false}
            animate={{ opacity: loop ? 1 : 0 }}
            transition={{ duration: 0.6, delay: loop ? 0.2 : 0 }}
          >
            <path
              d={RING_PATH}
              fill="none"
              stroke="#fff"
              strokeOpacity={0.55}
              strokeWidth={1.2}
              strokeDasharray="3 6"
            />
            {loop && (
              <path
                d={RING_PATH}
                pathLength={100}
                strokeDasharray="9 91"
                className="animate-data-flow"
                style={{ animationDuration: "3.4s" }}
                fill="none"
                stroke="#fff"
                strokeWidth={2.8}
                strokeLinecap="round"
                filter="url(#pa-glow)"
              />
            )}
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
