"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, Sparkles, Cpu, Workflow, BrainCircuit, Rocket } from "lucide-react";

const beliefs = [
  {
    icon: BrainCircuit,
    title: "Academic foundation",
    body: "Pursuing a Master's in AI isn't just a credential — it's building the theoretical foundation to actually understand what these models are doing, not just how to prompt them.",
    color: "#06b6d4",
  },
  {
    icon: Workflow,
    title: "Applied to real engineering",
    body: "I work on a platform serving millions of users. That's the lens through which I evaluate AI — not demos, but production implications: reliability, latency, and real user impact.",
    color: "#7c3aed",
  },
  {
    icon: Rocket,
    title: "The compounding edge",
    body: "Combining platform engineering experience with graduate-level AI study creates a rare perspective: someone who can build the system and understand the intelligence layer on top of it.",
    color: "#10b981",
  },
];

const tools = [
  { name: "Claude API", desc: "LLM integration + agentic workflows" },
  { name: "Cursor / Windsurf", desc: "AI-native code editors" },
  { name: "Claude Code", desc: "AI pair programming in the terminal" },
  { name: "Prompt Engineering", desc: "Crafting high-signal instructions" },
  { name: "RAG Pipelines", desc: "Grounding LLMs in real data" },
  { name: "Vector Stores", desc: "Semantic search & memory" },
];

export default function AISection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section
      id="ai-vision"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#040a14" }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Big glow */}
      <motion.div
        style={{
          y,
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%)",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
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
            07 / AI Vision
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "#e2e8f0", lineHeight: 1.1 }}
          >
            Studying AI.{" "}
            <br />
            <span className="gradient-text">Building with it.</span>
          </h2>
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "#64748b" }}
          >
            I'm pursuing a Master's degree in AI while working full-time as a
            platform engineer. That combination — production systems experience
            and graduate-level AI study — is where I'm placing my bet on the
            future of this industry.
          </p>
        </motion.div>

        {/* Belief cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {beliefs.map((belief, i) => {
            const Icon = belief.icon;
            return (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                className="glass-card rounded-xl p-6 relative overflow-hidden group"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${belief.color}10 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${belief.color}12`,
                    border: `1px solid ${belief.color}25`,
                  }}
                >
                  <Icon size={22} style={{ color: belief.color }} />
                </div>
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: "#e2e8f0" }}
                >
                  {belief.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {belief.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tools / workflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="rounded-2xl p-8"
          style={{
            background: "rgba(6, 182, 212, 0.03)",
            border: "1px solid rgba(6, 182, 212, 0.12)",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles size={18} style={{ color: "#06b6d4" }} />
            <h3
              className="font-semibold text-lg"
              style={{ color: "#e2e8f0" }}
            >
              My AI Toolchain
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 group cursor-default"
                style={{ background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(6, 182, 212, 0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(6, 182, 212, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{
                    background: "#06b6d4",
                    boxShadow: "0 0 6px #06b6d4",
                  }}
                />
                <div>
                  <p
                    className="font-mono text-sm font-medium"
                    style={{ color: "#e2e8f0" }}
                  >
                    {tool.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                    {tool.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl font-light italic max-w-3xl mx-auto"
            style={{ color: "rgba(148, 163, 184, 0.6)" }}
          >
            "The engineers who understand AI at a technical level won't just
            use better tools —
            <span style={{ color: "#e2e8f0" }}>
              {" "}they'll build things that weren't possible before.
            </span>"
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
