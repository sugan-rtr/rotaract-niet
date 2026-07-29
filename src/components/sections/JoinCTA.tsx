"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { supabase, isSupabaseConfigured, TABLES } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error" | "not-configured";

export default function JoinCTA() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setStatus("not-configured");
      return;
    }

    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from(TABLES.joinRequests).insert({
      name: data.get("name"),
      department: data.get("department"),
      year: data.get("year"),
      email: data.get("email"),
      phone: data.get("phone"),
      reason: data.get("reason"),
    });

    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    form.reset();
  }

  return (
    <section id="join" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.08), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="eyebrow mb-4">Join Rotaract</p>
          <h2 className="text-4xl md:text-6xl font-semibold text-white">
            Become the <span className="text-gradient-gold">Change.</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card-premium mt-12 grid gap-5 p-8 md:p-12 sm:grid-cols-2"
        >
          <Field label="Full Name" name="name" required />
          <Field label="Department" name="department" required />
          <Field label="Year" name="year" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" className="sm:col-span-2" required />

          <label className="sm:col-span-2 block">
            <span className="block text-sm text-[var(--color-text-secondary)] mb-2">Reason for Joining</span>
            <textarea
              name="reason"
              required
              rows={4}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-[var(--color-accent)] outline-none transition-colors"
              placeholder="Tell us what draws you to Rotaract..."
            />
          </label>

          <div className="sm:col-span-2 flex flex-col items-center gap-4 mt-2">
            <MagneticButton variant="gold" type="submit">
              {status === "submitting" ? "Submitting..." : "Submit Application"}
            </MagneticButton>

            {status === "success" && (
              <p className="text-sm text-[var(--color-accent)]">Application received — welcome to the wheel of service.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again in a moment.</p>
            )}
            {status === "not-configured" && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Form storage isn&apos;t connected yet — add your Supabase credentials to <code>.env.local</code> to enable submissions.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-[var(--color-text-secondary)] mb-2">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-[var(--color-accent)] outline-none transition-colors"
      />
    </label>
  );
}
