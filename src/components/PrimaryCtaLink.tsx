"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { getPrimaryCtaHref, isExternalBookingUrl } from "@/config/booking";
import { Link } from "@/i18n/navigation";

const logoSrc = "/images/logos/logo.svg";

const slotVariants = {
  rest: { width: 0, marginRight: 0 },
  hover: { width: 18, marginRight: 8 },
};

const markEase = [0.22, 1, 0.36, 1] as const;

const markVariants = {
  rest: {
    opacity: 0,
    scale: 0.45,
    transition: { duration: 0.25, ease: markEase },
  },
  hover: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: 0.12, ease: markEase },
  },
};

const slotTransition = {
  type: "tween" as const,
  duration: 0.6,
  ease: markEase,
};

function CtaHoverMark() {
  return (
    <motion.span
      variants={slotVariants}
      transition={slotTransition}
      className="inline-flex h-[18px] shrink-0 overflow-hidden"
    >
      <motion.img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        variants={markVariants}
        className="h-[18px] w-[18px] max-w-none origin-center"
      />
    </motion.span>
  );
}

interface PrimaryCtaLinkProps {
  onHome: boolean;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function PrimaryCtaLink({
  onHome,
  className,
  onClick,
  children,
}: PrimaryCtaLinkProps) {
  const href = getPrimaryCtaHref("#contact");
  const external = isExternalBookingUrl(href);
  const [hovered, setHovered] = useState(false);
  const hoverHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  const inner = (
    <motion.span
      initial="rest"
      animate={hovered ? "hover" : "rest"}
      className="inline-flex items-center"
    >
      <CtaHoverMark />
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        {...hoverHandlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={onHome ? href : "/#contact"}
      className={className}
      onClick={onClick}
      {...hoverHandlers}
    >
      {inner}
    </Link>
  );
}
