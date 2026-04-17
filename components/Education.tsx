"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BadgeCheck, Star } from "lucide-react";

const degrees = [
  {
    degree: "Master of Science — Artificial Intelligence",
    school: "Udacity Institute of AI & Technology",
    period: "Dec 2025 – Dec 2027",
    status: "In Progress",
    statusColor: "#10b981",
    color: "#06b6d4",
    note: "Active graduate study in AI theory, ML, and applied intelligent systems.",
  },
  {
    degree: "Master of Science — Software Development",
    school: "Maryville University of Saint Louis",
    period: "Sep 2018 – May 2020",
    status: "GPA 4.0",
    statusColor: "#06b6d4",
    color: "#7c3aed",
    note: "Perfect 4.0 GPA across graduate-level software engineering coursework.",
  },
  {
    degree: "Bachelor of Science — School of Informatics",
    school: "IUPUI",
    period: "Jan 2015 – May 2018",
    status: "GPA 3.97",
    statusColor: "#7c3aed",
    color: "#10b981",
    note: "Graduated with Highest Distinction — top 10% of class. Tutoring, Dev Club.",
  },
  {
    degree: "Associate of Science — Computer Programming",
    school: "Vincennes University",
    period: "2013 – 2015",
    status: "Foundation",
    statusColor: "#f59e0b",
    color: "#f59e0b",
    note: "The starting point — computer programming fundamentals.",
  },
];

const certifications = [
  {
    name: "AI Essentials",
    issuer: "Google",
    issued: "Nov 2025",
    color: "#06b6d4",
  },
  {
    name: "CompTIA Project+",
    issuer: "CompTIA",
    issued: "Jan 2017",
    color: "#7c3aed",
  },
];

const honors = [
  {
    title: "Highest Distinction",
    org: "IUPUI",
    desc: "Graduated in top 10% — GPA 3.9–4.0.",
    icon: Star,
    color: "#f59e0b",
  },
  {
    title: "Golden Key Honor Society",
    org: "International",
    desc: "Awarded to the top 15% of college students by academic achievement.",
    icon: Award,
    color: "#06b6d4",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#040a14" }}
    >
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)",
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
            05 / Education
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Four degrees.{" "}
          <span className="gradient-text">Two Master's.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base mb-14 max-w-xl"
          style={{ color: "#64748b" }}
        >
          A consistent record of academic excellence — 4.0 at the master's level,
          3.97 as an undergrad, and now a second M.S. in AI underway.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-6 mb-14">
          {/* Degree cards */}
          <div className="flex flex-col gap-4">
            {degrees.map((d, i) => (
              <motion.div
                key={d.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                className="glass-card rounded-xl p-5 flex gap-4 group"
              >
                <div
                  className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${d.color}12`,
                    border: `1px solid ${d.color}30`,
                  }}
                >
                  <GraduationCap size={18} style={{ color: d.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3
                      className="font-semibold text-sm leading-snug"
                      style={{ color: "#e2e8f0" }}
                    >
                      {d.degree}
                    </h3>
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: `${d.statusColor}15`,
                        border: `1px solid ${d.statusColor}30`,
                        color: d.statusColor,
                      }}
                    >
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs mt-1 font-mono" style={{ color: d.color }}>
                    {d.school}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                    {d.period}
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "#475569" }}>
                    {d.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications + Honors */}
          <div className="flex flex-col gap-6">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <BadgeCheck size={16} style={{ color: "#10b981" }} />
                <h3
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: "#10b981" }}
                >
                  Certifications
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div>
                      <p
                        className="font-mono text-sm font-medium"
                        style={{ color: "#e2e8f0" }}
                      >
                        {cert.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: cert.color }}>
                        {cert.issuer}
                      </p>
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#475569" }}
                    >
                      {cert.issued}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Honors */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Award size={16} style={{ color: "#f59e0b" }} />
                <h3
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: "#f59e0b" }}
                >
                  Honors & Awards
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {honors.map((honor) => {
                  const Icon = honor.icon;
                  return (
                    <div key={honor.title} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${honor.color}12`,
                          border: `1px solid ${honor.color}25`,
                        }}
                      >
                        <Icon size={14} style={{ color: honor.color }} />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "#e2e8f0" }}
                        >
                          {honor.title}
                        </p>
                        <p className="text-xs mt-0.5 font-mono" style={{ color: honor.color }}>
                          {honor.org}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#475569" }}>
                          {honor.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* GPA highlight card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="rounded-xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(124,58,237,0.06) 100%)",
                border: "1px solid rgba(6, 182, 212, 0.15)",
              }}
            >
              <div className="flex justify-center gap-10">
                {[
                  { value: "4.0", label: "M.S. GPA" },
                  { value: "3.97", label: "B.S. GPA" },
                  { value: "Top 10%", label: "IUPUI Class" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-2xl font-bold gradient-text"
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-xs tracking-wider uppercase mt-1"
                      style={{ color: "#475569" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
