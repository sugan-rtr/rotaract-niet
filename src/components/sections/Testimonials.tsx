"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading eyebrow="Testimonials" title="What people say after working with us." align="center" />

        <div className="relative mt-14 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 md:p-12 text-center"
            >
              <p className="text-lg md:text-xl text-white leading-relaxed">&ldquo;{current.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-white">{current.name}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {current.role} &middot; <span className="text-[var(--color-accent)]">{current.type}</span>
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[var(--color-accent)]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
