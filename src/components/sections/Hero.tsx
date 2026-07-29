"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import StarsBackground from "@/components/ui/stars";

const HEADLINE_LINES = ["We Lead.", "We Grow.", "We Last."]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};


export default function Hero() {
  return (
    <StarsBackground className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-[650px] text-left"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col min-h-screen pt-24"
            >

              <h1 className="font-semibold text-[clamp(3.2rem,11vw,8rem)] leading-[0.95] tracking-tight">
                {HEADLINE_LINES.map((line, i) => {
                  const isLast = i === 2;
                  const lineDelay = 0.2 + i * 0.2;
                  return (
                    <span key={line} className="block overflow-hidden">
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, y: 40, scale: isLast ? 0.92 : 1 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.8, ease: "easeOut", delay: lineDelay },
                          },
                        }}
                        className={isLast ? "block text-gradient-gold origin-left" : "block text-white"}
                      >
                        {line}
                      </motion.span>
                    </span>
                  );
                })}
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut", delay: 0.8 },
                  },
                }}
                className="mt-8 max-w-xl text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed"
              >
                Rotaract Club of Nehru Institue Of Engineering And Technology empowers students through leadership, community service,
                innovation, and lifelong friendships.
              </motion.p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 130, damping: 14, delay: 1.0 },
                    },
                  }}
                >
                  <MagneticButton href="#events" variant="gold">Explore Events</MagneticButton>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 130, damping: 14, delay: 1.15 },
                    },
                  }}
                >
                  <MagneticButton href="#contact" variant="ghost">Contact Us</MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="relative z-10 mx-auto mt-16 flex flex-col items-center gap-2"
        >
          <div className="h-10 w-6 rounded-full border border-white/25 flex justify-center pt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-bounce" />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">Scroll</span>
        </motion.div>
      </section>
    </StarsBackground>
  );
}

