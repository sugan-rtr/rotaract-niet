"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowUpRight, FiCalendar, FiMapPin } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/data/content";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Featured Projects" title="Recent work, out in the field." align="left" />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="card-premium overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-[var(--color-bg)]/80 px-3 py-1 text-xs font-medium text-[var(--color-accent)] backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1.5"><FiCalendar /> {project.date}</span>
                  <span className="flex items-center gap-1.5"><FiMapPin /> {project.location}</span>
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                  {project.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:gap-2.5 transition-all"
                >
                  Read More <FiArrowUpRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
