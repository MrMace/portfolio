"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaCodepen } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "AI Vision", href: "#ai-vision" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? "rgba(3, 7, 18, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(6, 182, 212, 0.1)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div
                className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                  filter: "blur(4px)",
                }}
              />
              <div
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                }}
              >
                MM
              </div>
            </div>
            <span
              className="font-semibold text-sm tracking-widest uppercase"
              style={{ color: "rgba(226, 232, 240, 0.9)" }}
            >
              Matt Mace
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{ color: "rgba(148, 163, 184, 0.8)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#06b6d4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(148, 163, 184, 0.8)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons + mobile toggle */}
          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/MrMace", icon: FaGithub },
              { href: "https://www.linkedin.com/in/macematt/", icon: FaLinkedinIn },
              { href: "https://codepen.io/mrmace", icon: FaCodepen },
            ].map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                style={{
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  color: "rgba(148, 163, 184, 0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.6)";
                  e.currentTarget.style.color = "#06b6d4";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(6, 182, 212, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.2)";
                  e.currentTarget.style.color = "rgba(148, 163, 184, 0.8)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={16} />
              </a>
            ))}

            <button
              className="md:hidden p-2"
              style={{ color: "#94a3b8" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(3, 7, 18, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(6, 182, 212, 0.1)",
            }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm py-2 transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/MrMace" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/macematt/" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8" }}>
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
