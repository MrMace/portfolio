"use client";

import { Download, MapPin, Globe } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Action bar - hidden when printing */}
      <div
        className="no-print sticky top-0 z-50 flex items-center justify-between px-6 py-3"
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
          &larr; mattmace.dev
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

      {/* Resume document */}
      <div
        className="resume-page min-h-screen"
        style={{ background: "#fff" }}
      >
        <div
          className="max-w-[820px] mx-auto px-10 py-6"
          style={{ color: "#111827" }}
        >
          {/* Header */}
          <div className="border-b-2 pb-3 mb-4" style={{ borderColor: "#0891b2" }}>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
              Matthew Mace
            </h1>
            <p className="text-base mt-0.5 font-medium" style={{ color: "#0891b2" }}>
              Software Engineer · Full-Stack Web
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm" style={{ color: "#475569" }}>
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
              Software engineer with 8+ years on a SaaS platform serving millions of users. Full-stack across
              PHP, JavaScript/TypeScript, Python, and SQL. Early adopter of AI development tools, using Claude Code
              and Cursor daily to build, debug, and ship faster. M.S. Software Development (4.0 GPA).
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <Job
              title="Website Support Engineer / CMS Platform Engineer"
              company="MyNetWire"
              period="Apr 2018 – Present"
              bullets={[
                "Escalation point for complex, high-impact platform issues across development, support, and operations.",
                "Integrated the Stripe API and built a tool to migrate users from legacy Stripe accounts to Stripe Custom accounts, working directly with Stripe.",
                "Build and improve features in a custom CMS running thousands of active websites for millions of users.",
                "Early adopter of AI coding tools (Claude Code, Cursor); use them daily for debugging, code review, and documentation.",
                "Run validation, testing, and release checks before deployment.",
                "Write internal docs and training materials that standardize team workflows.",
              ]}
            />
            <Job
              title="Freelance Developer"
              company="Independent"
              period="Jan 2014 – Present"
              bullets={[
                "Design and build websites, web apps, and custom CMS solutions for clients.",
                "Own the full project lifecycle: requirements, scope, budget, and delivery.",
              ]}
            />
            <Job
              title="Internship"
              company="Indiana State Police"
              period="May 2016 – Aug 2016"
              bullets={[
                "Assisted with criminal investigations by gathering and analyzing evidence, conducting interviews, and preparing detailed reports.",
                "Supported administrative tasks including data entry, record-keeping, and document organization.",
              ]}
            />
            <Job
              title="Spatial Communications Technician"
              company="DISH Network"
              period="Oct 2014 – May 2016"
              bullets={[
                "Installed, aligned, and calibrated satellite dishes, antennas, and receivers at residential and commercial locations.",
                "Diagnosed and resolved technical issues including signal interference and equipment malfunctions; provided customer guidance on system use and troubleshooting.",
              ]}
            />
          </Section>

          {/* Projects */}
          <Section title="Projects">
            <Project
              name="Circle City Martial Arts & Fitness"
              href="https://ccmaf-site.vercel.app"
              link="ccmaf-site.vercel.app"
              bullets={[
                "Client site for an Indianapolis gym: Next.js 16, TypeScript, Tailwind, and Supabase on Vercel.",
                "Admin panel lets the owner edit content and the class schedule and read contact messages, no developer needed.",
              ]}
            />
            <Project
              name="Simple LIMS"
              href="https://github.com/MrMace/Simple_LIMS"
              link="github.com/MrMace/Simple_LIMS"
              bullets={[
                "Full-stack lab information system with e-signatures, audit trails, approval workflows, and Z-score anomaly detection.",
                "Python, FastAPI, PostgreSQL, React, TypeScript, and Docker, with role-based access.",
              ]}
            />
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 text-sm" style={{ color: "#374151" }}>
              <SkillRow label="AI" value="Claude Code, Cursor, Claude API, Prompt Engineering" />
              <SkillRow label="Languages" value="PHP, JavaScript, TypeScript, Python, SQL, HTML/CSS" />
              <SkillRow label="Frameworks" value="Next.js, React, FastAPI, Tailwind CSS" />
              <SkillRow label="Platform" value="CMS Architecture, SaaS, REST APIs, Stripe API" />
              <SkillRow label="Database" value="MariaDB, MySQL, PostgreSQL, Supabase" />
              <SkillRow label="Tools" value="Git, Docker, Vercel, PhpStorm" />
              <SkillRow label="Quality" value="Testing & Release, Data Integrity, Root Cause Analysis" />
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <Degree
              degree="Master of Science in Software Development"
              school="Maryville University of Saint Louis"
              period="Sep 2018 – May 2020"
              note="GPA: 4.0"
            />
            <Degree
              degree="Bachelor of Science"
              school="School of Informatics and Computing, Indiana University–Purdue University Indianapolis (IUPUI)"
              period="Jan 2015 – May 2018"
              note="GPA: 3.97 · Highest Distinction (Top 10%)"
            />
            <Degree
              degree="Associate of Science in Computer Programming"
              school="Vincennes University"
              period="2013 – 2015"
            />
          </Section>

          {/* Certifications & Honors */}
          <div className="grid grid-cols-2 gap-4">
            <Section title="Certifications">
              <ul className="text-sm space-y-1" style={{ color: "#374151" }}>
                <li>AI Essentials, Google <span style={{ color: "#6b7280" }}>(Nov 2025)</span></li>
                <li>CompTIA Project+ <span style={{ color: "#6b7280" }}>(Jan 2017)</span></li>
              </ul>
            </Section>
            <Section title="Honors & Awards">
              <ul className="text-sm space-y-1" style={{ color: "#374151" }}>
                <li>Highest Distinction, IUPUI <span style={{ color: "#6b7280" }}>(Top 10%, GPA 3.9–4.0)</span></li>
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
    <div className="mb-4">
      <h2
        className="text-xs font-bold tracking-widest uppercase mb-2 pb-1"
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
    <div className="mb-3">
      <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
        <div>
          <span className="font-semibold text-sm" style={{ color: "#0f172a" }}>{title}</span>
          <span className="text-sm" style={{ color: "#0891b2" }}> · {company}</span>
        </div>
        <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{period}</span>
      </div>
      <ul className="space-y-0.5">
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

function Project({ name, href, link, bullets }: {
  name: string;
  href: string;
  link: string;
  bullets: string[];
}) {
  return (
    <div className="mb-2 text-sm">
      <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
        <span className="font-semibold" style={{ color: "#0f172a" }}>{name}</span>
        <a href={href} className="text-xs font-mono" style={{ color: "#0891b2" }}>{link}</a>
      </div>
      <ul className="space-y-0.5">
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

function Degree({ degree, school, period, note }: {
  degree: string;
  school: string;
  period: string;
  note?: string;
}) {
  return (
    <div className="mb-2 text-sm">
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
