"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { boardMembers } from "@/data/content";

export default function BoardMembers() {
  return (
    <section id="board" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Board Members" title="The team running the wheel this year." align="center" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {boardMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className="group card-premium overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center gap-4 pb-5"
                  style={{ background: "linear-gradient(0deg, rgba(0,0,128,0.55), transparent 60%)" }}
                >
                  <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`} className="text-white hover:text-[var(--color-accent)] text-lg"><FiLinkedin /></a>
                  <a href={member.instagram} aria-label={`${member.name} on Instagram`} className="text-white hover:text-[var(--color-accent)] text-lg"><FiInstagram /></a>
                  <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`} className="text-white hover:text-[var(--color-accent)] text-lg"><FiMail /></a>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-white text-sm md:text-base">{member.name}</p>
                <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
