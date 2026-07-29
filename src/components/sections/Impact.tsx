"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { impactStats } from "@/data/content";

export default function Impact() {
  return (
    <section id="impact" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,0,128,0.35), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Our Impact" title="Measured in hours, not headlines." align="center" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-premium px-4 py-8 text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-semibold text-gradient-gold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
