"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutPillars } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden card-premium"
          >
            <Image
              src="/images/about/IMG_1910.JPG"
              alt="Rotaract Club NIET members at a community service project"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="About Rotaract"
              title="A global network, run entirely by students."
              description="Rotaract is Rotary International's network for young adults aged 18+, built around four pillars. At NIET, that means students designing, funding, and running real service projects — not just attending them."
            />

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {aboutPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="card-premium p-6"
                >
                  <h3 className="font-semibold text-white text-lg">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
