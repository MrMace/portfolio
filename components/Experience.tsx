"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Website Support Engineer / CMS Platform Engineer",
    company: "MyNetWire",
    period: "Apr 2018 – Present",
    duration: "8+ yrs",
    color: "#06b6d4",
    bullets: [
      "Act as Subject Matter Expert (SME) for complex, high-impact platform issues — partnering across development, support, and operations to drive resolution and maintain system integrity.",
      "Maintain and continuously improve enterprise-scale SaaS systems serving millions of users, with emphasis on data integrity, reliability, and performance.",
      "Participate in systematic platform validation, testing, and release procedures to ensure functionality, quality, and consistency prior to deployment.",
      "Develop and maintain internal documentation, training materials, and best practices to standardize workflows and improve team effectiveness.",
      "Drive continuous improvement initiatives across platform systems, processes, and quality standards.",
      "Collaborate cross-functionally with the development team to configure, enhance, and optimize platform systems at scale.",
    ],
    tech: ["PHP", "JavaScript", "HTML/CSS", "MariaDB", "PhpStorm", "CMS Architecture"],
  },
  {
    title: "Freelance Developer",
    company: "Independent",
    period: "Jan 2014 – Present",
    duration: "12 yrs",
    color: "#7c3aed",
    bullets: [
      "Design and develop websites, web applications, and custom CMS solutions for clients.",
      "Manage full project lifecycle: requirements, scope, timelines, budgets, and delivery.",
      "Build responsive, maintainable front-end and back-end code across a range of tech stacks.",
      "Perform testing, debugging, and optimization to ensure quality, performance, and stability.",
      "Gather and analyze client requirements, translating business needs into accurate, data-driven technical solutions.",
    ],
    tech: ["PHP", "JavaScript", "HTML/CSS", "MySQL", "CMS", "Client Management"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#030712" }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

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
            03 / Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Where I've{" "}
          <span className="gradient-text">worked</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base mb-14 max-w-xl"
          style={{ color: "#64748b" }}
        >
          Eight years in production on a platform serving millions of users.
          Over a decade of freelance client work alongside.
        </motion.p>

        <div className="flex flex-col gap-8">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company + job.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.7 }}
              className="glass-card rounded-2xl p-7 relative overflow-hidden group"
            >
              {/* Left color bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: job.color }}
              />

              {/* Top hover line */}
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${job.color}, transparent)`,
                }}
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${job.color}12`,
                      border: `1px solid ${job.color}30`,
                    }}
                  >
                    <Briefcase size={18} style={{ color: job.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg leading-tight"
                      style={{ color: "#e2e8f0" }}
                    >
                      {job.title}
                    </h3>
                    <p
                      className="font-mono text-sm mt-0.5"
                      style={{ color: job.color }}
                    >
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:text-right flex-shrink-0">
                  <div>
                    <p
                      className="text-sm font-mono"
                      style={{ color: "#94a3b8" }}
                    >
                      {job.period}
                    </p>
                    <p
                      className="text-xs mt-0.5 font-semibold"
                      style={{ color: job.color }}
                    >
                      {job.duration}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 pl-1">
                {job.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: job.color }}
                    />
                    <span style={{ color: "#64748b" }}>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{
                      background: `${job.color}10`,
                      border: `1px solid ${job.color}25`,
                      color: job.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
