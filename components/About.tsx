"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Code2, Brain, Layers } from "lucide-react";

const highlights = [
  {
    icon: Layers,
    title: "Enterprise Systems Management",
    desc: "8+ years owning and improving a complex SaaS platform — configuration, maintenance, validation, and continuous improvement at scale.",
    color: "#06b6d4",
  },
  {
    icon: Code2,
    title: "Cross-Functional SME",
    desc: "Engineering escalation point across dev, support, and operations — driving root cause resolution and process documentation across teams.",
    color: "#7c3aed",
  },
  {
    icon: Brain,
    title: "Data Integrity & Quality Focus",
    desc: "Ensuring platform reliability, data accuracy, and system integrity across millions of users — with formal validation and release procedures.",
    color: "#10b981",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      {/* Glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-12" style={{ background: "#06b6d4" }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "#06b6d4" }}
          >
            01 / About
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ color: "#e2e8f0", lineHeight: 1.1 }}
            >
              Learning by{" "}
              <span className="gradient-text">building</span>,<br />
              one commit at a time.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="space-y-4 text-base leading-relaxed"
              style={{ color: "#94a3b8" }}
            >
              <p>
                I'm <span style={{ color: "#e2e8f0" }}>Matt Mace</span>, a
                platform engineer and enterprise systems specialist based in
                Indianapolis. For 8+ years I've worked at MyNetWire managing a
                large-scale SaaS platform that powers thousands of websites for
                millions of users.
              </p>
              <p>
                My work centers on{" "}
                <span style={{ color: "#e2e8f0" }}>data integrity, system reliability, and cross-functional collaboration</span>{" "}
                — owning complex platform issues as the engineering SME, driving
                continuous improvement, and partnering across dev, support, and
                operations. Outside of my day role, I've built a full-stack{" "}
                <span style={{ color: "#06b6d4" }}>LIMS with 21 CFR Part 11 compliance</span>
                {" "}— including electronic signatures, immutable audit trails, and OOS workflows.
              </p>
              <p>
                Academically, I hold an{" "}
                <span style={{ color: "#06b6d4" }}>
                  M.S. in Software Development (4.0 GPA)
                </span>{" "}
                and a B.S. in Informatics (3.97, Highest Distinction). I'm now
                pursuing a second Master's in Artificial Intelligence — applying
                data-driven thinking to every system I work on.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-2 mt-8"
              style={{ color: "#475569" }}
            >
              <MapPin size={14} style={{ color: "#06b6d4" }} />
              <span className="text-sm font-mono">Indianapolis, Indiana</span>
            </motion.div>
          </div>

          {/* Right: highlight cards */}
          <div className="flex flex-col gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="glass-card rounded-xl p-6 flex gap-4"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `rgba(${
                      item.color === "#06b6d4"
                        ? "6,182,212"
                        : item.color === "#7c3aed"
                        ? "124,58,237"
                        : "16,185,129"
                    }, 0.12)`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "#e2e8f0" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Terminal snippet */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="rounded-xl p-5 font-mono text-sm"
              style={{
                background: "#0d1117",
                border: "1px solid rgba(6, 182, 212, 0.1)",
              }}
            >
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
              </div>
              <div style={{ color: "#475569" }}>
                <span style={{ color: "#06b6d4" }}>~/portfolio</span>{" "}
                <span style={{ color: "#7c3aed" }}>❯</span>{" "}
                <span style={{ color: "#e2e8f0" }}>cat about.json</span>
              </div>
              <div className="mt-2" style={{ color: "#94a3b8" }}>
                {"{"}<br />
                &nbsp;&nbsp;<span style={{ color: "#06b6d4" }}>"role"</span>:{" "}
                <span style={{ color: "#10b981" }}>"Platform & Systems Engineer"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: "#06b6d4" }}>"focus"</span>:{" "}
                <span style={{ color: "#10b981" }}>"Data Integrity"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: "#06b6d4" }}>"studying"</span>:{" "}
                <span style={{ color: "#10b981" }}>"M.S. Artificial Intelligence"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: "#06b6d4" }}>"status"</span>:{" "}
                <span style={{ color: "#10b981" }}>"Open to opportunities"</span><br />
                {"}"}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
