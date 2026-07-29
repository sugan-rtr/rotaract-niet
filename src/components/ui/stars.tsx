"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export interface StarsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function StarsBackground({ children, className }: StarsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState<Star[][]>([[], [], []]);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transform amounts for different layers
  const x1 = useTransform(smoothX, [-1, 1], [-15, 15]);
  const y1 = useTransform(smoothY, [-1, 1], [-15, 15]);

  const x2 = useTransform(smoothX, [-1, 1], [-30, 30]);
  const y2 = useTransform(smoothY, [-1, 1], [-30, 30]);

  const x3 = useTransform(smoothX, [-1, 1], [-45, 45]);
  const y3 = useTransform(smoothY, [-1, 1], [-45, 45]);

  useEffect(() => {
    setMounted(true);
    const generateStars = (count: number, minSize: number, maxSize: number): Star[] => {
      const colors = ["#ffffff", "#ffd700", "#aeb8d0", "#f8fafc", "#e2e8f0"];
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 110 - 5, // Bleed outside [0, 100]% to accommodate translation
        y: Math.random() * 110 - 5,
        size: Math.random() * (maxSize - minSize) + minSize,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
    };

    setLayers([
      generateStars(60, 1, 1.6),
      generateStars(45, 1.5, 2.2),
      generateStars(35, 2, 3.0),
    ]);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2 || 1);
    const normY = (e.clientY - centerY) / (rect.height / 2 || 1);
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={clsx("relative z-0 w-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {mounted && (
          <>
            {/* Deep background stars */}
            <motion.div style={{ x: x1, y: y1 }} className="absolute inset-0">
              {layers[0].map((star) => (
                <StarPoint key={star.id} star={star} />
              ))}
            </motion.div>

            {/* Midground stars */}
            <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0">
              {layers[1].map((star) => (
                <StarPoint key={star.id} star={star} />
              ))}
            </motion.div>

            {/* Foreground stars */}
            <motion.div style={{ x: x3, y: y3 }} className="absolute inset-0">
              {layers[2].map((star) => (
                <StarPoint key={star.id} star={star} />
              ))}
            </motion.div>
          </>
        )}
      </div>

      {children}
    </div>
  );
}

function StarPoint({ star }: { star: Star }) {
  return (
    <motion.span
      className="absolute rounded-full"
      style={{
        top: `${star.y}%`,
        left: `${star.x}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        backgroundColor: star.color,
        boxShadow: star.size > 2 ? `0 0 6px ${star.color}` : undefined,
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.85, 1.15, 0.85],
      }}
      transition={{
        duration: star.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: star.delay,
      }}
    />
  );
}

export default StarsBackground;
