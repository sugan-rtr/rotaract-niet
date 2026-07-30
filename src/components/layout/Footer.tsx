"use client";

import { FiArrowUp, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { navLinks } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[var(--color-bg-raised)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#" className="flex items-center gap-2 font-display font-semibold text-xl text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Rotaract NIET Logo" className="w-8 h-8 rounded-full" />
            Rotaract&nbsp;NIET
          </a>
          <p className="mt-4 max-w-sm text-sm text-[var(--color-text-secondary)] leading-relaxed">
            The Rotaract Club of NIET — service, leadership, and fellowship for
            the next generation of changemakers.
          </p>
          <div className="mt-6 flex items-center gap-4 text-lg text-[var(--color-text-secondary)]">
            <a href="https://www.instagram.com/rotaract_club_of_niet?igsh=MTN1ZXp5dDN0cGVuOQ==" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors"><FiInstagram /></a>
            <a href="https://www.linkedin.com/in/rotaract-club-of-niet-52a769216" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors"><FiLinkedin /></a>
            <a href="mailto:rotaractclubofniet@gmail.com" aria-label="Email" className="hover:text-[var(--color-accent)] transition-colors"><FiMail /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">Developed By</h3>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-bold tracking-wide text-white/90">Sugan K</span>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Sugan K LinkedIn" 
                className="text-[#0a66c2] hover:text-[#004182] transition-colors text-xl"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:"
                aria-label="Sugan K Email"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-xl"
              >
                <FiMail />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="text-center md:text-left">&copy; {year} Rotaract Club NIET. All rights reserved.</span>

          <a
            href="#"
            className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
            aria-label="Back to top"
          >
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
