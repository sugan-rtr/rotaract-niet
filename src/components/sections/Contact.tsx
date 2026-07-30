"use client";

import { motion } from "framer-motion";
import { FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";

const contactDetails = [
  { icon: FiMail, label: "Email", value: "rotaractclubofniet@gmail.com", href: "mailto:rotaractclubofniet@gmail.com" },
  { icon: FiPhone, label: "Phone", value: "+91 94868 01406", href: "tel:+919486801406" },
  { icon: FiMapPin, label: "Address", value: "Nehru Gardens, Nehru College Road, T.M Palayam, Coimbatore, Tamil Nadu 641105", href: "#" },
  { icon: FiInstagram, label: "Instagram", value: "@rotaract_club_of_niet", href: "https://www.instagram.com/rotaract_club_of_niet?igsh=MTN1ZXp5dDN0cGVuOQ==" },
  { icon: FiLinkedin, label: "LinkedIn", value: "Rotaract Club of NIET", href: "https://www.linkedin.com/in/rotaract-club-of-niet-52a769216" },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading eyebrow="Contact" title="Come find us on campus." align="left" />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="card-premium overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]"
          >
            <iframe
              title="NIET Campus Map"
              src="https://www.google.com/maps?q=Nehru+Gardens,+Nehru+College+Road,+T.M+Palayam,+Coimbatore,+Tamil+Nadu+641105&output=embed"
              className="w-full h-full grayscale invert-[0.92] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <div className="grid gap-4">
            {contactDetails.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-premium flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/30 text-[var(--color-accent)] text-lg">
                  <item.icon />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{item.label}</span>
                  <span className="block text-white text-sm md:text-base">{item.value}</span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
