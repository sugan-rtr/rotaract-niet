"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { eventsTimeline } from "@/data/content";

export default function EventsTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <section id="events" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Events Timeline" title="A year, one wheel-turn at a time." align="left" />
      </div>

      <div className="mt-14 mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-4 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-dim)] to-[var(--color-accent)] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [scrollbar-width:thin]"
        >
          {eventsTimeline.map((event, i) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="snap-start shrink-0 w-[280px] md:w-[320px] card-premium overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image src={event.image} alt={event.title} fill sizes="320px" className="object-cover" />
              </div>
              <div className="p-5">
                <span className="eyebrow">{event.date}</span>
                <h3 className="mt-2 font-semibold text-white">{event.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">Scroll sideways to move through the year →</p>
      </div>
    </section>
  );
}
