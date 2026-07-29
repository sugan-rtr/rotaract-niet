"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryCategories, galleryItems } from "@/data/content";

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Gallery" title="Moments from the year." align="left" />

        <div className="mt-8 flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                filter === cat
                  ? "bg-[var(--color-accent)] text-[#0a0a12] font-medium"
                  : "border border-white/10 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {filtered.map((item) => (
            <motion.button
              key={item.image}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(item.image)}
              className="relative block w-full overflow-hidden rounded-2xl break-inside-avoid group"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={480}
                height={340}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <FiX />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-3xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="Gallery preview" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
