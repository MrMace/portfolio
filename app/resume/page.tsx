"use client";

import { useRef } from "react";
import { Download, ExternalLink, MapPin, Globe } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Action bar — hidden when printing */}
      <div
        className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(3, 7, 18, 0.95)",
          borderBottom: "1px solid rgba(6, 182, 212, 0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <a
          href="/"
          className="text-sm font-mono transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#06b6d4")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          ← mattmace.dev
        </a>
        <div className="flex gap-3">
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
            style={{
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#06b6d4",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6, 182, 212, 0.08)";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
            }}
          >
            <ExternalLink size={14} />
            Open in new tab
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
              color: "#fff",
              boxShadow: "0 0 16px rgba(6, 182, 212, 0.3)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume document */}
      <div
        className="resume-page min-h-screen pt-16"
        style={{ background: "#fff" }}
      >
        <div
          className="max-w-[820px] mx-auto px-10 py-10"
          style={{ color: "#111827" }}
        >
          {/* Header */}
          <div className="border-b-2 pb-5 mb-6" style={{ borderColor: "#0891b2" }}>
            <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
              Matthew Mace
            </h1>
            <p className="text-lg mt-1 font-medium" style={{ color: "#0891b2" }}>
              CMS Platform Engineer · Data Integrity · AI Graduate Student
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ color: "#475569" }}>
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                Indianapolis, Indiana
              </span>
              <span className="flex items-center gap-1">
                <Globe size={13} />
                mattmace.dev
              </span>
              <span className="flex items-center gap-1">
                <FaLinkedinIn size={13} />
                linkedin.com/in/macematt
              </span>
              <span className="flex items-center gap-1">
                <FaGithub size={13} />
                github.com/MrMace
              </span>
            </div>
          </div>

          {/* Summary */}
          <Section title="Summary">
            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
              CMS Platform Engineer with 8+ years of experience on a large-scale SaaS platform serving millions of users
              across thousands of websites. Specializes in PHP, JavaScript, HTML/CSS, SQL, and CMS architecture.
              Serves as the engineering escalation point for complex, high-impact platform issues — driving data integrity,
              system reliability, continuous improvement, and cross-functional collaboration. Independently built a
              21 CFR Part 11-compliant Laboratory Information Management System (LIMS) with electronic signatures,
              immutable audit trails, and OOS workflow management. Holds an M.S. in Software Development (4.0 GPA)
              and a B.S. in Informatics (3.97 GPA, Highest Distinction). Currently pursuing an M.S. in Artificial Intelligence.
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <Job
              title="Website Support Engineer / CMS Platform Engineer"
              company="MyNetWire"
              period="Apr 2018 – Present"
              bullets={[
                "Act as Subject Matter Expert (SME) for complex, high-impact platform issues — partnering across development, support, and operations to drive resolution and maintain system integrity.",
                "Maintain and continuously improve enterprise-scale SaaS systems serving millions of users, with emphasis on data integrity, reliability, and performance.",
                "Develop and enhance features within a custom CMS — UI improvements, performance optimizations, and functionality upgrades across thousands of active websites.",
                "Participate in systematic platform validation, testing, and release procedures to ensure functionality, quality, and consistency prior to deployment.",
                "Develop and maintain internal documentation, training materials, and best practices to standardize workflows and improve team effectiveness.",
                "Drive continuous improvement initiatives across platform systems, processes, and quality standards.",
                "Utilize PHP, JavaScript, HTML, CSS, and PhpStorm to deliver clean, efficient, and maintainable code.",
              ]}
            />
            <Job
              title="Freelance Developer"
              company="Independent"
              period="Jan 2014 – Present"
              bullets={[
                "Design and develop websites, web applications, and custom CMS solutions for clients.",
                "Manage full project lifecycle: requirements, scope, timelines, budgets, and delivery.",
                "Gather and analyze client requirements, translating business needs into accurate, data-driven technical solutions.",
                "Build responsive, maintainable front-end and back-end code across a range of tech stacks.",
                "Perform testing, debugging, and optimization to ensure quality, performance, and stability.",
              ]}
            />
            <Job
              title="Spatial Communications Technician"
              company="DISH Network"
              period="Oct 2014 – May 2016"
              bullets={[
                "Installed and calibrated satellite dishes, antennas, receivers, and other communication equipment.",
                "Diagnosed and resolved technical issues including signal interference and connectivity problems.",
              ]}
            />
          </Section>

          {/* Projects */}
          <Section title="Notable Projects">
            <div className="space-y-3">
              <Project
                title="Simple LIMS"
                tech="Python · FastAPI · PostgreSQL · React · TypeScript · Docker · scikit-learn"
                desc="Full-stack Laboratory Information Management System built to pharmaceutical compliance standards. Features 21 CFR Part 11 electronic signatures, immutable audit trail logging, out-of-specification (OOS) workflow management with manager approval gates, chain-of-custody tracking, and statistical anomaly detection via Z-score analysis. Role-based access across administrator, quality manager, and technician tiers."
                url="github.com/MrMace/Simple_LIMS"
              />
              <Project
                title="Multiplayer Tetris"
                tech="JavaScript · WebSockets · Node.js · HTML Canvas"
                desc="Real-time multiplayer Tetris with synchronized game state over WebSockets."
                url="github.com/MrMace/Tetris"
              />
              <Project
                title="Python Socket Client/Server"
                tech="Python · TCP/IP · Networking"
                desc="Low-level socket programming demonstrating client-server architecture, message routing, and connection handling."
                url="github.com/MrMace/Development-of-a-Python-Socket-Client-and-Server"
              />
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm" style={{ color: "#374151" }}>
              <SkillRow label="Languages" value="PHP, JavaScript, Python, HTML/CSS, SQL" />
              <SkillRow label="Platform" value="CMS Architecture, SaaS Systems, REST APIs" />
              <SkillRow label="Database" value="MariaDB, MySQL, PostgreSQL" />
              <SkillRow label="Quality" value="Data Integrity, System Validation, Audit Trails" />
              <SkillRow label="Compliance" value="21 CFR Part 11, OOS Workflows" />
              <SkillRow label="Tools" value="PhpStorm, Docker, Git, FastAPI, React" />
              <SkillRow label="AI / Data" value="Prompt Engineering, ML Fundamentals, Statistical Analysis" />
              <SkillRow label="Soft Skills" value="Cross-functional Leadership, Documentation, Root Cause Analysis" />
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <Degree
              degree="Master of Science — Artificial Intelligence"
              school="Udacity Institute of AI & Technology"
              period="Dec 2025 – Dec 2027 (Expected)"
            />
            <Degree
              degree="Master of Science — Software Development"
              school="Maryville University of Saint Louis"
              period="Sep 2018 – May 2020"
              note="GPA: 4.0"
            />
            <Degree
              degree="Bachelor of Science — School of Informatics"
              school="IUPUI"
              period="Jan 2015 – May 2018"
              note="GPA: 3.97 · Highest Distinction (Top 10%)"
            />
            <Degree
              degree="Associate of Science — Computer Programming"
              school="Vincennes University"
              period="2013 – 2015"
            />
          </Section>

          {/* Certifications & Honors */}
          <div className="grid grid-cols-2 gap-8">
            <Section title="Certifications">
              <ul className="text-sm space-y-1" style={{ color: "#374151" }}>
                <li>AI Essentials — Google <span style={{ color: "#6b7280" }}>(Nov 2025)</span></li>
                <li>CompTIA Project+ — CompTIA <span style={{ color: "#6b7280" }}>(Jan 2017)</span></li>
              </ul>
            </Section>
            <Section title="Honors & Awards">
              <ul className="text-sm space-y-1" style={{ color: "#374151" }}>
                <li>Highest Distinction — IUPUI <span style={{ color: "#6b7280" }}>(Top 10%, GPA 3.9–4.0)</span></li>
                <li>Golden Key International Honour Society <span style={{ color: "#6b7280" }}>(Top 15%)</span></li>
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-xs font-bold tracking-widest uppercase mb-3 pb-1"
        style={{
          color: "#0891b2",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Job({ title, company, period, bullets }: {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="mb-5">
      <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
        <div>
          <span className="font-semibold text-sm" style={{ color: "#0f172a" }}>{title}</span>
          <span className="text-sm" style={{ color: "#0891b2" }}> · {company}</span>
        </div>
        <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{period}</span>
      </div>
      <ul className="space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#0891b2" }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Project({ title, tech, desc, url }: {
  title: string;
  tech: string;
  desc: string;
  url: string;
}) {
  return (
    <div className="text-sm">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="font-semibold" style={{ color: "#0f172a" }}>{title}</span>
        <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{url}</span>
      </div>
      <p className="text-xs font-mono mb-0.5" style={{ color: "#0891b2" }}>{tech}</p>
      <p style={{ color: "#374151" }}>{desc}</p>
    </div>
  );
}

function Degree({ degree, school, period, note }: {
  degree: string;
  school: string;
  period: string;
  note?: string;
}) {
  return (
    <div className="mb-3 text-sm">
      <div className="flex items-start justify-between flex-wrap gap-1">
        <div>
          <span className="font-semibold" style={{ color: "#0f172a" }}>{degree}</span>
          {note && <span className="ml-2 text-xs font-mono" style={{ color: "#0891b2" }}>{note}</span>}
        </div>
        <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{period}</span>
      </div>
      <p style={{ color: "#6b7280" }}>{school}</p>
    </div>
  );
}

function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-0.5">
      <span className="font-semibold flex-shrink-0 w-28" style={{ color: "#0f172a" }}>{label}:</span>
      <span style={{ color: "#374151" }}>{value}</span>
    </div>
  );
}
