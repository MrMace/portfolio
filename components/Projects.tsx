"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Gamepad2, FileText, Music, Network, Lock, PaintBucket } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Simple LIMS",
    description:
      "Full-stack Laboratory Information Management System built to pharmaceutical compliance standards. Features 21 CFR Part 11 electronic signatures, immutable audit trail logging, out-of-specification (OOS) workflow management with manager approval gates, chain-of-custody tracking, and statistical anomaly detection via Z-score analysis. Role-based access across administrator, quality manager, and technician tiers.",
    tech: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Docker", "scikit-learn", "JWT", "21 CFR Part 11"],
    github: "https://github.com/MrMace/Simple_LIMS",
    icon: Network,
    color: "#06b6d4",
    featured: true,
    tag: "Pharma / LIMS",
  },
  {
    title: "Multiplayer Tetris",
    description:
      "Real-time multiplayer Tetris built with WebSockets. Multiple players compete live with synchronized game state — no server lag, no cheating.",
    tech: ["JavaScript", "WebSockets", "Node.js", "HTML Canvas"],
    github: "https://github.com/MrMace/Tetris",
    icon: Gamepad2,
    color: "#7c3aed",
    featured: false,
    tag: "Real-time",
  },
  {
    title: "Python Socket Client/Server",
    description:
      "Low-level socket programming in Python — a client-server architecture demonstrating network communication, message routing, and connection handling.",
    tech: ["Python", "Sockets", "Networking", "TCP/IP"],
    github: "https://github.com/MrMace/Development-of-a-Python-Socket-Client-and-Server",
    icon: Network,
    color: "#7c3aed",
    featured: false,
    tag: "Networking",
  },
  {
    title: "Text Editor",
    description:
      "Browser-based text editor with persistent localStorage — write your content and it survives browser restarts. Clean, distraction-free interface.",
    tech: ["JavaScript", "LocalStorage", "HTML", "CSS"],
    github: "https://github.com/MrMace/textEditor",
    icon: FileText,
    color: "#10b981",
    featured: false,
    tag: "Web App",
  },
  {
    title: "Media Player",
    description:
      "Full-stack media player with PHP backend, MySQL for media library management, and a custom JavaScript player frontend with playlist support.",
    tech: ["PHP", "JavaScript", "MySQL", "HTML/CSS"],
    github: "https://github.com/MrMace/MediaPlayer",
    icon: Music,
    color: "#f59e0b",
    featured: false,
    tag: "Full Stack",
  },
  {
    title: "Python Certificate Auth",
    description:
      "Certificate-based authentication system implemented in Python — exploring PKI, digital signatures, and secure session management from first principles.",
    tech: ["Python", "Cryptography", "PKI", "Auth"],
    github: "https://github.com/MrMace/Python_Cert_Auth",
    icon: Lock,
    color: "#ec4899",
    featured: false,
    tag: "Security",
  },
  {
    title: "Shape Painter",
    description:
      "Python graphics utility for drawing and manipulating geometric shapes programmatically — a clean exploration of computational geometry.",
    tech: ["Python", "Graphics", "Geometry"],
    github: "https://gist.github.com/MrMace",
    icon: PaintBucket,
    color: "#06b6d4",
    featured: false,
    tag: "Utility",
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
      className={`glass-card rounded-xl p-6 flex flex-col group relative overflow-hidden ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Top glow on hover */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
            }}
          >
            <Icon size={18} style={{ color: project.color }} />
          </div>
          <div>
            <h3
              className="font-semibold text-base"
              style={{ color: "#e2e8f0" }}
            >
              {project.title}
            </h3>
            <span
              className="text-xs font-mono"
              style={{ color: project.color }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#64748b",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = project.color;
              e.currentTarget.style.borderColor = `${project.color}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <FaGithub size={14} />
          </a>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{ color: "#64748b" }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full font-mono"
            style={{
              background: `${project.color}10`,
              border: `1px solid ${project.color}25`,
              color: project.color,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#030712" }}
    >
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-12" style={{ background: "#10b981" }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "#10b981" }}
          >
            06 / Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Things I've{" "}
          <span className="gradient-text">built</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base mb-12 max-w-xl"
          style={{ color: "#64748b" }}
        >
          From real-time multiplayer systems to authentication pipelines —
          a collection of projects built to understand how things actually work.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://github.com/MrMace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-200 no-underline"
            style={{
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(16, 185, 129, 0.06)";
              e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.6)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaGithub size={16} />
            View all on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
