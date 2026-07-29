"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "gold",
  className,
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "gold" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const ref = useMagnetic<HTMLAnchorElement | HTMLButtonElement>(0.25);
  const styles = cn("magnetic transition-transform duration-300", variant === "gold" ? "btn-gold" : "btn-ghost", className);

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      className={styles}
    >
      {children}
    </button>
  );
}
