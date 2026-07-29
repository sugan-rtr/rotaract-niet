"use client";

import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiTrendingUp, FiGlobe, FiMic, FiCamera, FiPieChart } from "react-icons/fi";
import type { IconType } from "react-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { avenuesOfService } from "@/data/content";

const ICONS: Record<string, IconType> = {
  FiUsers,
  FiHeart,
  FiTrendingUp,
  FiGlobe,
  FiMic,
  FiCamera,
  FiPieChart,
};

export default function AvenuesOfService() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Avenues of Service"
          title="Six pillars driving our impact."
          description="We channel our efforts across six key areas to ensure a well-rounded impact on our members, our campus, and the global community."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {avenuesOfService.map((avenue, i) => {
            const Icon = ICONS[avenue.icon];
            return (
              <motion.div
                key={avenue.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="card-premium p-7 group"
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[var(--color-primary)]/30 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon />
                </div>
                <h3 className="mt-5 font-semibold text-white text-lg">{avenue.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {avenue.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
