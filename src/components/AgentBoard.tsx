"use client";

import { motion } from "framer-motion";

export type AgentId = "nlp" | "data" | "ops" | "api";
export type InPort = "whatsapp" | "email" | "crm";
export type OutPort = "billing" | "erp" | "reports";
export type Actor = AgentId | "orchestrator" | "all";

export type Highlight = {
  in?: InPort;
  hub?: boolean;
  actor?: Actor;
  out?: OutPort;
};

export type Leg = {
  d: string;
  start: number;
  duration: number;
  external: boolean;
};

export type Pt = readonly [number, number];
type Block = { x: number; y: number; w: number; h: number };
type Caption = { x: number; y: number; anchor: "start" | "middle" | "end" };

export type Scene = {
  width: number;
  height: number;
  hub: Block;
  workers: Record<AgentId, Block>;
  ports: Record<InPort | OutPort, Block>;
  routes: {
    in: Record<InPort, Pt[]>;
    workers: Record<AgentId, Pt[]>;
    out: Record<OutPort, Pt[]>;
  };
  captions: { in: Caption; agents?: Caption; out: Caption };
};

export const AGENT_IDS: AgentId[] = ["nlp", "data", "ops", "api"];
export const IN_PORTS: InPort[] = ["whatsapp", "email", "crm"];
export const OUT_PORTS: OutPort[] = ["billing", "erp", "reports"];

const PULSE_LENGTH = 0.22;

const block = (x: number, y: number, w: number, h: number): Block => ({
  x,
  y,
  w,
  h,
});

export function routePath(points: Pt[]) {
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
    .join("");
}

export function routeLength(points: Pt[]) {
  return points.reduce((sum, [x, y], i) => {
    if (i === 0) return 0;
    const [px, py] = points[i - 1];
    return sum + Math.hypot(x - px, y - py);
  }, 0);
}

/** Plan view of the same baseplate that ProcessAssembly shows in isometric:
 *  requests enter on one side, the hub dispatches to a worker, results leave
 *  on the other. Phones get a transposed layout so labels stay legible. */
export function buildScene(vertical: boolean): Scene {
  if (vertical) {
    return {
      width: 360,
      height: 300,
      hub: block(138, 118, 84, 60),
      workers: {
        nlp: block(20, 116, 72, 28),
        ops: block(20, 152, 72, 28),
        data: block(268, 116, 72, 28),
        api: block(268, 152, 72, 28),
      },
      ports: {
        whatsapp: block(20, 36, 96, 24),
        email: block(132, 36, 96, 24),
        crm: block(244, 36, 96, 24),
        billing: block(20, 250, 96, 24),
        erp: block(132, 250, 96, 24),
        reports: block(244, 250, 96, 24),
      },
      routes: {
        in: {
          whatsapp: [
            [68, 60],
            [68, 90],
            [180, 90],
            [180, 118],
          ],
          email: [
            [180, 60],
            [180, 118],
          ],
          crm: [
            [292, 60],
            [292, 90],
            [180, 90],
            [180, 118],
          ],
        },
        workers: {
          nlp: [
            [138, 130],
            [92, 130],
          ],
          ops: [
            [138, 166],
            [92, 166],
          ],
          data: [
            [222, 130],
            [268, 130],
          ],
          api: [
            [222, 166],
            [268, 166],
          ],
        },
        out: {
          billing: [
            [180, 178],
            [180, 218],
            [68, 218],
            [68, 250],
          ],
          erp: [
            [180, 178],
            [180, 250],
          ],
          reports: [
            [180, 178],
            [180, 218],
            [292, 218],
            [292, 250],
          ],
        },
      },
      captions: {
        in: { x: 20, y: 24, anchor: "start" },
        out: { x: 20, y: 292, anchor: "start" },
      },
    };
  }

  return {
    width: 640,
    height: 280,
    hub: block(278, 110, 84, 60),
    workers: {
      nlp: block(186, 47, 72, 30),
      data: block(382, 47, 72, 30),
      ops: block(186, 203, 72, 30),
      api: block(382, 203, 72, 30),
    },
    ports: {
      whatsapp: block(30, 57, 84, 26),
      email: block(30, 127, 84, 26),
      crm: block(30, 197, 84, 26),
      billing: block(526, 57, 84, 26),
      erp: block(526, 127, 84, 26),
      reports: block(526, 197, 84, 26),
    },
    routes: {
      in: {
        whatsapp: [
          [114, 70],
          [170, 70],
          [170, 140],
          [278, 140],
        ],
        email: [
          [114, 140],
          [278, 140],
        ],
        crm: [
          [114, 210],
          [170, 210],
          [170, 140],
          [278, 140],
        ],
      },
      workers: {
        nlp: [
          [278, 124],
          [222, 124],
          [222, 77],
        ],
        data: [
          [362, 124],
          [418, 124],
          [418, 77],
        ],
        ops: [
          [278, 156],
          [222, 156],
          [222, 203],
        ],
        api: [
          [362, 156],
          [418, 156],
          [418, 203],
        ],
      },
      out: {
        billing: [
          [362, 140],
          [470, 140],
          [470, 70],
          [526, 70],
        ],
        erp: [
          [362, 140],
          [526, 140],
        ],
        reports: [
          [362, 140],
          [470, 140],
          [470, 210],
          [526, 210],
        ],
      },
    },
    captions: {
      in: { x: 30, y: 34, anchor: "start" },
      agents: { x: 320, y: 34, anchor: "middle" },
      out: { x: 610, y: 34, anchor: "end" },
    },
  };
}

const COLORS = {
  board: "#2E1065",
  trace: "rgba(255,255,255,0.26)",
  external: "#22D3EE",
  internal: "#FFFFFF",
  caption: "rgba(255,255,255,0.6)",
  portIdle: "rgba(34,211,238,0.14)",
  portStroke: "rgba(34,211,238,0.55)",
  portText: "rgba(255,255,255,0.88)",
  portTextActive: "#083344",
  workerIdle: "#DDD6FE",
  workerText: "#3B1F66",
  hub: "#A78BFA",
  hubText: "#2E1065",
};

const settle = { duration: 0.28, ease: "easeOut" as const };

type AgentBoardProps = {
  scene: Scene;
  highlight: Highlight;
  legs: Leg[];
  cycleId: number;
  staticMode: boolean;
  hubLabel: string;
  agentLabels: Record<AgentId, string>;
  portLabels: Record<InPort | OutPort, string>;
  captions: { in: string; agents: string; out: string };
};

function Caption({
  caption,
  text,
}: {
  caption: Caption | undefined;
  text: string;
}) {
  if (!caption) return null;

  return (
    <text
      x={caption.x}
      y={caption.y}
      textAnchor={caption.anchor}
      fontSize={8}
      letterSpacing="0.16em"
      fill={COLORS.caption}
      className="font-mono"
    >
      {text.toUpperCase()}
    </text>
  );
}

function Port({
  block: b,
  label,
  active,
}: {
  block: Block;
  label: string;
  active: boolean;
}) {
  return (
    <g>
      <motion.rect
        x={b.x - 4}
        y={b.y - 4}
        width={b.w + 8}
        height={b.h + 8}
        rx={10}
        fill={COLORS.external}
        filter="url(#ac-glow)"
        initial={false}
        animate={{ opacity: active ? 0.55 : 0 }}
        transition={settle}
      />
      <motion.rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx={6}
        stroke={COLORS.portStroke}
        strokeWidth={1}
        initial={false}
        animate={{ fill: active ? COLORS.external : COLORS.portIdle }}
        transition={settle}
      />
      <motion.text
        x={b.x + b.w / 2}
        y={b.y + b.h / 2 + 3.2}
        textAnchor="middle"
        fontSize={9}
        letterSpacing="0.06em"
        className="font-mono"
        initial={false}
        animate={{ fill: active ? COLORS.portTextActive : COLORS.portText }}
        transition={settle}
      >
        {label}
      </motion.text>
    </g>
  );
}

function Worker({
  block: b,
  label,
  active,
}: {
  block: Block;
  label: string;
  active: boolean;
}) {
  return (
    <g>
      <motion.rect
        x={b.x - 5}
        y={b.y - 5}
        width={b.w + 10}
        height={b.h + 10}
        rx={10}
        fill={COLORS.internal}
        filter="url(#ac-glow)"
        initial={false}
        animate={{ opacity: active ? 0.75 : 0 }}
        transition={settle}
      />
      <motion.rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx={6}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={0.8}
        initial={false}
        animate={{ fill: active ? COLORS.internal : COLORS.workerIdle }}
        transition={settle}
      />
      <text
        x={b.x + b.w / 2}
        y={b.y + b.h / 2 + 3.2}
        textAnchor="middle"
        fontSize={9}
        letterSpacing="0.1em"
        fill={COLORS.workerText}
        className="font-mono"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

export default function AgentBoard({
  scene,
  highlight,
  legs,
  cycleId,
  staticMode,
  hubLabel,
  agentLabels,
  portLabels,
  captions,
}: AgentBoardProps) {
  const { hub } = scene;
  const hubActive = Boolean(highlight.hub);
  const core = { x: hub.x + hub.w / 2, y: hub.y + hub.h / 2 - 8 };

  return (
    <svg
      viewBox={`0 0 ${scene.width} ${scene.height}`}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full"
      style={{ backgroundColor: COLORS.board }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="ac-studs"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="1.6" fill="#fff" fillOpacity="0.09" />
        </pattern>
        <filter id="ac-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="ac-pulse" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#ac-studs)" />

      <Caption caption={scene.captions.in} text={captions.in} />
      <Caption caption={scene.captions.agents} text={captions.agents} />
      <Caption caption={scene.captions.out} text={captions.out} />

      <g
        fill="none"
        stroke={COLORS.trace}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {IN_PORTS.map((id) => (
          <path key={id} d={routePath(scene.routes.in[id])} />
        ))}
        {AGENT_IDS.map((id) => (
          <path key={id} d={routePath(scene.routes.workers[id])} />
        ))}
        {OUT_PORTS.map((id) => (
          <path key={id} d={routePath(scene.routes.out[id])} />
        ))}
      </g>

      {!staticMode &&
        legs.map((leg, i) => {
          const stroke = leg.external ? COLORS.external : COLORS.internal;
          const transition = {
            pathOffset: {
              delay: leg.start / 1000,
              duration: leg.duration / 1000,
              ease: "linear" as const,
            },
            opacity: {
              delay: leg.start / 1000,
              duration: leg.duration / 1000,
              times: [0, 0.15, 0.85, 1],
              ease: "linear" as const,
            },
          };

          return (
            <g key={`${cycleId}-${i}`} fill="none" strokeLinecap="round">
              <motion.path
                d={leg.d}
                stroke={stroke}
                strokeWidth={7}
                strokeOpacity={0.35}
                filter="url(#ac-pulse)"
                initial={{ pathLength: PULSE_LENGTH, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: 1 - PULSE_LENGTH, opacity: [0, 1, 1, 0] }}
                transition={transition}
              />
              <motion.path
                d={leg.d}
                stroke={stroke}
                strokeWidth={3}
                initial={{ pathLength: PULSE_LENGTH, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: 1 - PULSE_LENGTH, opacity: [0, 1, 1, 0] }}
                transition={transition}
              />
            </g>
          );
        })}

      {IN_PORTS.map((id) => (
        <Port
          key={id}
          block={scene.ports[id]}
          label={portLabels[id]}
          active={highlight.in === id}
        />
      ))}
      {OUT_PORTS.map((id) => (
        <Port
          key={id}
          block={scene.ports[id]}
          label={portLabels[id]}
          active={highlight.out === id}
        />
      ))}

      {AGENT_IDS.map((id) => (
        <Worker
          key={id}
          block={scene.workers[id]}
          label={agentLabels[id]}
          active={highlight.actor === id || highlight.actor === "all"}
        />
      ))}

      <g>
        <motion.rect
          x={hub.x - 6}
          y={hub.y - 6}
          width={hub.w + 12}
          height={hub.h + 12}
          rx={14}
          fill={COLORS.hub}
          filter="url(#ac-glow)"
          initial={false}
          animate={{ opacity: hubActive ? 0.85 : 0.3 }}
          transition={settle}
        />
        <rect
          x={hub.x}
          y={hub.y}
          width={hub.w}
          height={hub.h}
          rx={8}
          fill={COLORS.hub}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={0.8}
        />
        <motion.circle
          cx={core.x}
          cy={core.y}
          r={11}
          fill="#fff"
          filter="url(#ac-glow)"
          initial={false}
          animate={{ opacity: hubActive ? 0.9 : 0.4, scale: hubActive ? 1.25 : 1 }}
          transition={settle}
        />
        <circle cx={core.x} cy={core.y} r={5} fill="#fff" />
        <text
          x={hub.x + hub.w / 2}
          y={hub.y + hub.h - 10}
          textAnchor="middle"
          fontSize={8}
          letterSpacing="0.12em"
          fill={COLORS.hubText}
          className="font-mono"
        >
          {hubLabel.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
