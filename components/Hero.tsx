"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), {
  ssr: false,
  loading: () => null,
});

const ROTATING_PHRASES = [
  "Platform Engineer",
  "Data Integrity Specialist",
  "AI Graduate Student",
  "Enterprise Systems SME",
  "Data & Quality Focused",
];

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const current = ROTATING_PHRASES[phraseIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % ROTATING_PHRASES.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span className="font-mono" style={{ color: "#06b6d4" }}>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      style={{ background: "#030712" }}
    >
      {/* Neural network canvas background */}
      <NeuralCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6, 182, 212, 0.06) 0%, rgba(124, 58, 237, 0.04) 40%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Scan line */}
      <div className="scanline" style={{ zIndex: 2 }} />

      {/* Content */}
      <div
        className="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-24"
        style={{ zIndex: 3 }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: "rgba(6, 182, 212, 0.08)",
            border: "1px solid rgba(6, 182, 212, 0.25)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#10b981",
              boxShadow: "0 0 6px #10b981",
              animation: "pulse-ring 2s ease-out infinite",
            }}
          />
          <span
            className="text-xs tracking-widest uppercase font-mono"
            style={{ color: "#06b6d4" }}
          >
            Open to opportunities
          </span>
          <Zap size={12} style={{ color: "#10b981" }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4"
          style={{ lineHeight: 1.0 }}
        >
          <span className="gradient-text">Matt</span>
          <br />
          <span
            style={{
              color: "#e2e8f0",
              textShadow: "0 0 40px rgba(6, 182, 212, 0.15)",
            }}
          >
            Mace
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-light mb-6 h-10 flex items-center"
          style={{ color: "#94a3b8" }}
        >
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
          style={{ color: "rgba(148, 163, 184, 0.75)" }}
        >
          8 years on a SaaS platform serving millions of users. Builder of a
          21 CFR Part 11-compliant LIMS. Two Master's degrees — the second in
          <span style={{ color: "#e2e8f0" }}> Artificial Intelligence</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(6, 182, 212, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View My Work
          </a>
          <a
            href="https://www.linkedin.com/in/macematt/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300"
            style={{
              background: "transparent",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              color: "#06b6d4",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6, 182, 212, 0.08)";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.8)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex gap-10 mt-12 mb-20"
        >
          {[
            { value: "8+", label: "Yrs at MyNetWire" },
            { value: "2×", label: "Master's Degrees" },
            { value: "4.0", label: "Graduate GPA" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold gradient-text">
                {stat.value}
              </span>
              <span
                className="text-xs tracking-wider uppercase mt-1"
                style={{ color: "#475569" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span
          className="text-xs tracking-widest uppercase font-mono"
          style={{ color: "rgba(71, 85, 105, 0.8)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(6, 182, 212, 0.5)" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
