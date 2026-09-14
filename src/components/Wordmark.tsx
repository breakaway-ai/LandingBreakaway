"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logoImage = "/images/logos/logo.webp";

const expandEase = [0.22, 1, 0.36, 1] as const;
const collapseEase = [0.7, 0, 0.84, 0] as const;

interface WordmarkProps {
  tone?: "light" | "dark";
  compact?: boolean;
}

export default function Wordmark({ tone = "light", compact }: WordmarkProps) {
  const isDark = tone === "dark";
  const wordClass = `overflow-hidden whitespace-nowrap font-display text-sm font-bold tracking-[0.14em] ${
    isDark ? "text-white" : "text-ink"
  }`;

  return (
    <span className="inline-flex items-center">
      {/* The logo artwork is cream-colored, so it gets inverted to read on light surfaces. */}
      <Image
        src={logoImage}
        alt=""
        aria-hidden="true"
        width={127}
        height={128}
        className={`h-6 w-auto shrink-0 ${isDark ? "" : "invert"}`}
      />
      {compact === undefined ? (
        <span className={`ml-2 ${wordClass}`}>
          BREAKAWAY
          <span className={isDark ? "text-primary-soft" : "text-primary"}>
            AI
          </span>
        </span>
      ) : (
        <motion.span
          initial={false}
          animate={{
            opacity: compact ? 0 : 1,
            maxWidth: compact ? 0 : 168,
            marginLeft: compact ? 0 : 8,
          }}
          transition={{
            type: "tween",
            duration: 0.85,
            ease: compact ? expandEase : collapseEase,
          }}
          className={wordClass}
        >
          BREAKAWAY
          <span className={isDark ? "text-primary-soft" : "text-primary"}>
            AI
          </span>
        </motion.span>
      )}
    </span>
  );
}
