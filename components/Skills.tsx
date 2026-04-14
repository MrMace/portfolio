"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    label: "Technical",
    color: "#06b6d4",
    skills: [
      { name: "PHP", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "HTML / CSS", level: 90 },
      { name: "SQL / MariaDB", level: 78 },
      { name: "Enterprise Systems Config", level: 84 },
    ],
  },
  {
    label: "Systems & Quality",
    color: "#7c3aed",
    skills: [
      { name: "Platform Validation & Testing", level: 85 },
      { name: "Data Integrity Management", level: 84 },
      { name: "Cross-functional Collaboration", level: 90 },
      { name: "Documentation & Training", level: 86 },
      { name: "Continuous Improvement", level: 82 },
    ],
  },
  {
    label: "Data & AI",
    color: "#10b981",
    skills: [
      { name: "SQL & Data Analysis", level: 82 },
      { name: "Statistical Analysis", level: 74 },
      { name: "Data-Driven Decision Making", level: 85 },
      { name: "ML Fundamentals (M.S.)", level: 68 },
      { name: "AI-Augmented Workflows", level: 78 },
    ],
  },
];

const techBadges = [
  "PHP", "JavaScript", "Python", "SQL / MariaDB", "HTML/CSS",
  "LIMS", "21 CFR Part 11", "Data Integrity", "Audit Trails",
  "Statistical Analysis", "OOS Workflows", "Data Quality",
  "System Validation", "Root Cause Analysis", "Process Improvement",
  "Docker", "FastAPI", "React / TypeScript",
];

function SkillBar({
  name,
  level,
  color,
  delay,
  inView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm" style={{ color: "#94a3b8" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#040a14" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
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
          <div className="h-px w-12" style={{ background: "#7c3aed" }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "#7c3aed" }}
          >
            04 / Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#e2e8f0" }}
        >
          The{" "}
          <span className="gradient-text">stack</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base mb-14 max-w-xl"
          style={{ color: "#64748b" }}
        >
          Enterprise platform engineering, data integrity, and quality systems —
          backed by two Master's degrees, 8 years in production, and a self-built LIMS.
        </motion.p>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + ci * 0.1, duration: 0.6 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <h3
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={0.3 + ci * 0.1 + si * 0.06}
                  inView={inView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p
            className="text-xs font-mono tracking-widest uppercase mb-5"
            style={{ color: "#475569" }}
          >
            Also working with
          </p>
          <div className="flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.04, duration: 0.3 }}
                className="px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(6, 182, 212, 0.12)",
                  color: "#64748b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
                  e.currentTarget.style.color = "#06b6d4";
                  e.currentTarget.style.background = "rgba(6, 182, 212, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.12)";
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
