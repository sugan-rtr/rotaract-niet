"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 md:px-10 pointer-events-none transition-all duration-500"
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || open
            ? "mt-3 md:mt-4 max-w-5xl bg-[rgba(13,20,48,0.75)] backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(255,215,0,0.05)] py-2.5 px-5 sm:px-8"
            : "mt-0 md:mt-2 max-w-6xl bg-transparent backdrop-blur-none border border-transparent py-5 md:py-6 px-4 md:px-8 shadow-none"
        }`}
      >
        <div className="flex items-center justify-start lg:w-[180px] xl:w-[200px] shrink-0">
          <a
            href="#"
            className="group flex items-center gap-2.5 font-display font-semibold text-lg tracking-tight text-white transition-opacity duration-300 hover:opacity-95 whitespace-nowrap"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Rotaract NIET Logo" className="w-8 h-8 rounded-full shadow-[0_0_10px_var(--color-accent)] shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>Rotaract&nbsp;NIET</span>
          </a>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-3 py-1.5 text-[13px] xl:text-sm font-medium tracking-wide transition-all duration-300 block whitespace-nowrap border ${
                      isActive
                        ? "text-[var(--color-accent)] bg-white/10 border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                        : "text-[var(--color-text-secondary)] border-transparent hover:text-white hover:bg-white/[0.08] hover:border-white/10"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden lg:flex items-center justify-end lg:w-[180px] xl:w-[200px] shrink-0">
          <MagneticButton
            href="#contact"
            variant="gold"
            className="!rounded-full !py-2 !px-5 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.35)] active:scale-95 whitespace-nowrap"
          >
            Contact Us
          </MagneticButton>
        </div>

        <div className="flex lg:hidden items-center justify-end">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 active:scale-95"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto lg:hidden mt-3 w-full max-w-5xl rounded-3xl bg-[rgba(13,20,48,0.92)] backdrop-blur-2xl border border-white/15 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(255,215,0,0.08)] overflow-hidden"
          >
            <ul className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 border ${
                        isActive
                          ? "bg-white/12 text-[var(--color-accent)] border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                          : "text-white/85 border-transparent hover:text-white hover:bg-white/[0.08] hover:border-white/10"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10 flex justify-center">
              <MagneticButton
                href="#contact"
                variant="gold"
                onClick={() => setOpen(false)}
                className="w-full !rounded-full !py-3 !px-6 text-sm font-medium flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(255,215,0,0.25)] whitespace-nowrap"
              >
                Contact Us
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

