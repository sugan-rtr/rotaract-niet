"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiMessageSquare } from "react-icons/fi";
import { president, secretary } from "@/data/content";

export default function LeadershipMessages() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-5xl px-6 md:px-10 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-premium relative overflow-hidden p-8 md:p-14 grid gap-10 md:grid-cols-[auto_1fr] md:items-center"
        >
          <FiMessageSquare className="absolute -top-4 -left-2 text-[8rem] text-[var(--color-accent)]/5" aria-hidden="true" />

          <div className="relative h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden ring-2 ring-[var(--color-accent)]/40 mx-auto md:mx-0">
            <Image src={president.photo} alt={president.name} fill sizes="160px" className="object-cover" />
          </div>

          <div className="relative">
            <p className="eyebrow mb-4">President&apos;s Message</p>
            <p className="text-xl md:text-2xl leading-relaxed text-white font-display">
              &ldquo;{president.quote}&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">{president.name}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{president.role}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="card-premium relative overflow-hidden p-8 md:p-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:text-right"
        >
          <FiMessageSquare className="absolute -top-4 -right-2 text-[8rem] text-[var(--color-accent)]/5" aria-hidden="true" />

          <div className="relative order-2 md:order-1 text-center md:text-right">
            <p className="eyebrow mb-4 md:flex md:justify-end">Secretary&apos;s Message</p>
            <p className="text-xl md:text-2xl leading-relaxed text-white font-display">
              &ldquo;{secretary.quote}&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">{secretary.name}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{secretary.role}</p>
            </div>
          </div>

          <div className="relative h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden ring-2 ring-[var(--color-accent)]/40 mx-auto md:mx-0 order-1 md:order-2">
            <Image src={secretary.photo} alt={secretary.name} fill sizes="160px" className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
