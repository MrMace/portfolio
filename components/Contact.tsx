"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaCodepen } from "react-icons/fa";

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    handle: "@MrMace",
    href: "https://github.com/MrMace",
    color: "#e2e8f0",
    desc: "36+ repos — projects & experiments",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    handle: "macematt",
    href: "https://www.linkedin.com/in/macematt/",
    color: "#06b6d4",
    desc: "8+ yrs experience · M.S. AI in progress",
  },
  {
    icon: FaCodepen,
    label: "CodePen",
    handle: "@mrmace",
    href: "https://codepen.io/mrmace",
    color: "#10b981",
    desc: "Front-end experiments & UI demos",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "matt@mattmace.dev",
    href: "mailto:matt@mattmace.dev",
    color: "#7c3aed",
    desc: "Open to projects and opportunities",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: "#7c3aed" }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "#7c3aed" }}
          >
            08 / Contact
          </span>
          <div className="h-px w-12" style={{ background: "#7c3aed" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          style={{ color: "#e2e8f0", lineHeight: 1.1 }}
        >
          Let's build something{" "}
          <span className="gradient-text">remarkable</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-base max-w-xl mx-auto mb-14 leading-relaxed"
          style={{ color: "#64748b" }}
        >
          Whether you have a project in mind, a role to fill, or just want to
          talk AI and engineering — my inbox is always open.
        </motion.p>

        {/* Social links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="glass-card rounded-xl p-6 flex flex-col items-center gap-3 group transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${link.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${link.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(6, 182, 212, 0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${link.color}12`,
                    border: `1px solid ${link.color}25`,
                  }}
                >
                  <Icon size={20} style={{ color: link.color }} />
                </div>
                <div className="text-center">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#e2e8f0" }}
                  >
                    {link.label}
                  </p>
                  <p
                    className="text-xs font-mono mt-0.5"
                    style={{ color: link.color }}
                  >
                    {link.handle}
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "#475569" }}
                  >
                    {link.desc}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: link.color }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs font-mono" style={{ color: "#334155" }}>
            Built with Next.js · Three.js · Framer Motion · Tailwind CSS
          </p>
          <p className="text-xs mt-2" style={{ color: "#1e293b" }}>
            © {new Date().getFullYear()} Matt Mace. Indianapolis, Indiana.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
