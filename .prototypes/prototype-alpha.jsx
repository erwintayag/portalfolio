import { useState, useEffect, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────
const DATA = {
  name: "YOUR NAME",
  title: "Full-Stack Developer",
  rpgTitle: "FULL-STACK MAGE · .NET ARCHMAGE · REACT CONJURER",
  location: "Philippines",
  email: "you@email.com",
  linkedin: "linkedin.com/in/yourhandle",
  tagline: "They said the stack was legacy. I made it legend.",
  taglineCV: "Enterprise-forged. Delivered at scale. Still shipping.",
  rpgSummary: "A seasoned conjurer forged in the crucible of enterprise .NET and tempered by the reactive arts of modern frontend sorcery. Eight years of dungeon-clearing have sharpened both the blade of clean architecture and the arcane mastery of cloud infrastructure.",
  skillCategories: [
    {
      id: "backend", label: "Backend", rpgLabel: "Arcane Arts",
      color: "#00ffe5",
      skills: ["C#", ".NET Core", ".NET Framework", "ASP.NET Core", "Blazor", "REST API", "SignalR", "Entity Framework", "LINQ", "Microservices"],
    },
    {
      id: "frontend", label: "Frontend", rpgLabel: "Illusion Craft",
      color: "#39ff14",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "jQuery", "Responsive Design"],
    },
    {
      id: "database", label: "Database", rpgLabel: "Rune Storage",
      color: "#ffd700",
      skills: ["SQL Server", "PostgreSQL", "T-SQL", "MySQL", "Redis", "Entity Framework Core", "Dapper"],
    },
    {
      id: "tools", label: "Tools & Platforms", rpgLabel: "Relics & Artifacts",
      color: "#ff2244",
      skills: ["Azure", "Git", "GitHub", "Azure DevOps", "Docker", "Postman", "Visual Studio", "VS Code", "IIS", "Swagger / OpenAPI"],
    },
    {
      id: "practices", label: "Dev Practices", rpgLabel: "Ancient Disciplines",
      color: "#b97aff",
      skills: ["Agile / Scrum", "SDLC", "Legacy System Modernization", "Code Review", "CI/CD", "System Architecture", "API Design", "Technical Documentation"],
    },
  ],
  innateAbilities: [
    {
      id: "solver", label: "Problem Solver", rpgLabel: "Dungeon Breaker",
      color: "#00ffe5",
      skills: ["Root Cause Analysis", "Debugging", "Architecture Decisions", "Workaround Design", "Trade-off Evaluation", "Incident Response"],
    },
    {
      id: "pragmatist", label: "Pragmatist", rpgLabel: "Iron Realist",
      color: "#ffd700",
      skills: ["Scope Management", "MVP Thinking", "Technical Debt Awareness", "Delivery-Focused", "Risk Assessment", "Done > Perfect"],
    },
    {
      id: "learner", label: "Fast Learner", rpgLabel: "Lore Seeker",
      color: "#39ff14",
      skills: ["Self-Taught Stack Transitions", "Cross-domain Projects", "Rapid Prototyping", "Tech Stack Transitions", "Picks Up Docs Fast"],
    },
    {
      id: "communicator", label: "Communicator", rpgLabel: "Runic Tongue",
      color: "#ff2244",
      skills: ["Stakeholder Reporting", "Technical Writing", "Cross-team Collaboration", "Client Demos", "Non-tech Explanations"],
    },
    {
      id: "ownership", label: "Ownership Mindset", rpgLabel: "Solo Carry",
      color: "#b97aff",
      skills: ["End-to-end Delivery", "Proactive Issue Flagging", "Beyond Job Scope", "Post-launch Support", "Accountability"],
    },
    {
      id: "pressure", label: "Pressure-Tested", rpgLabel: "Last Stand",
      color: "#ff8c00",
      skills: ["Tight Deadline Delivery", "Production Incident Handling", "Multi-project Juggling", "High-stakes Deployments"],
    },
  ],
  careerStart: "2013-09-01",
  guilds: [
    {
      name: "The Iron Citadel Corp", cvName: "Iron Citadel Corp",
      role: "Senior Developer / Tech Lead", rpgRole: "Senior Conjurer / War Council",
      start: "2022-05-01", end: null,
      desc: "Led architecture of enterprise-grade .NET solutions. Managed Azure infrastructure. Mentored junior developers and drove adoption of modern frontend frameworks.",
      rpgDesc: "Ascended to War Council rank, commanding the citadel's most critical arcane infrastructure. Forged scalable .NET constructs, tamed the Azure cloud realm, and mentored rising conjurers in the reactive arts.",
      bullets: [],
      rpgBullets: [],
      tech: [".NET 8", "Azure", "React", "SQL Server", "Azure DevOps", "Docker"],
    },
    {
      name: "Silverlight Solutions", cvName: "Silverlight Solutions",
      role: "Senior Full-Stack Developer", rpgRole: "Full-Stack Enchanter",
      start: "2017-07-01", end: "2022-05-01",
      desc: "Delivered full-stack .NET applications across healthcare and fintech domains. Pioneered React adoption across the team's frontend stack.",
      rpgDesc: "Traversed the domains of healing magic and coin-craft, weaving .NET enchantments and pioneering the reactive illusion arts across the guild's front lines.",
      bullets: [],
      rpgBullets: [],
      tech: [".NET Core", "React", "PostgreSQL", "Docker", "REST API"],
    },
    {
      name: "The Rookery", cvName: "The Rookery",
      role: "Junior Developer", rpgRole: "Apprentice Caster",
      start: "2013-09-01", end: "2017-07-01",
      desc: "Honed foundational C# and SQL skills. Contributed to internal tooling and client-facing web applications.",
      rpgDesc: "Entered the arcane arts as an apprentice, forging the first runes in C# and SQL. Contributed to the guild's inner workings and the enchanted interfaces seen by common folk.",
      bullets: [],
      rpgBullets: [],
      tech: ["ASP.NET MVC", "C#", "jQuery", "SQL Server", "HTML/CSS"],
    },
  ],
  achievements: [
    { title: "DUNGEON MASTER", cvTitle: "Project Leadership", desc: "Led 10+ major project deployments end-to-end", icon: "⚔", unlocked: true, rarity: "LEGENDARY" },
    { title: "POLYGLOT MAGE", cvTitle: "Multi-Stack Proficiency", desc: "Mastered 4+ technology stacks across backend and frontend", icon: "📖", unlocked: true, rarity: "EPIC" },
    { title: "AZURE SOVEREIGN", cvTitle: "Azure Developer Associate", desc: "Microsoft certified Azure Developer Associate", icon: "☁", unlocked: true, rarity: "EPIC" },
    { title: "GUILD VETERAN", cvTitle: "Industry Experience", desc: "8+ years of continuous professional development", icon: "🛡", unlocked: true, rarity: "RARE" },
    { title: "???", cvTitle: "???", desc: "Locked achievement", icon: "🔒", unlocked: false, rarity: "LEGENDARY" },
    { title: "???", cvTitle: "???", desc: "Locked achievement", icon: "🔒", unlocked: false, rarity: "EPIC" },
  ],
  regions: [
    { id: 1, name: "The Arcane Forge", cvName: "Tools & Utilities", desc: "A crafting & developer tools project", x: 20, y: 32 },
    { id: 2, name: "The Iron Guild", cvName: "Enterprise Portal", desc: "Enterprise solutions portal", x: 50, y: 20 },
    { id: 3, name: "The Ember Sanctum", cvName: "Creative Lab", desc: "Creative experiments and prototypes", x: 74, y: 38 },
    { id: 4, name: "The Shadow Market", cvName: "SaaS Project", desc: "SaaS project — coming soon", x: 33, y: 65 },
    { id: 5, name: "The Crystal Spire", cvName: "Open Source", desc: "Open source contributions", x: 65, y: 68 },
  ],
};

const RARITY_COLOR = { LEGENDARY: "#ff2244", EPIC: "#ffd700", RARE: "#00ffe5" };

// ─── HOOKS ────────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 46) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0; setDisplay("");
    const t = setInterval(() => { if (i <= text.length) { setDisplay(text.slice(0, i)); i++; } else clearInterval(t); }, speed);
    return () => clearInterval(t);
  }, [text]);
  return display;
}

function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = ts => { if (!start) start = ts; const p = Math.min((ts - start) / duration, 1); setVal(Math.floor(p * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [target]);
  return val;
}

// ─── DYNAMIC XP CALCULATOR ────────────────────────────────────────────────
function useCareerStats() {
  const start = new Date(DATA.careerStart);
  const now = new Date();
  const totalDays = (now - start) / (1000 * 60 * 60 * 24);
  const totalYears = totalDays / 365.25;
  const level = Math.floor(totalYears);
  const xp = parseFloat(((totalYears - level) * 100).toFixed(1));
  return { level, xp, totalYears: totalYears.toFixed(2) };
}

function useGuildStats(startStr, endStr) {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date();
  const totalDays = (end - start) / (1000 * 60 * 60 * 24);
  const totalYears = totalDays / 365.25;
  const level = Math.floor(totalYears);
  const xp = parseFloat(((totalYears - level) * 100).toFixed(1));
  const fmt = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return { level, xp, totalYears: totalYears.toFixed(1), period: `${fmt(startStr)} – ${endStr ? fmt(endStr) : "Present"}` };
}

// Pure (non-hook) version safe to call inside .map()
function calcGuildStats(startStr, endStr) {
  return useGuildStats(startStr, endStr);
}

// ─── SPIDER / RADAR CHART ─────────────────────────────────────────────────
function SpiderChart({ categories, lightMode, accent, rpgMode, title, maxSkills, size: sizeProp }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 400); return () => clearTimeout(t); }, []);

  const renderSize = sizeProp || 156;
  // VB=200 gives enough internal space for labels at maxR+24 — all within bounds
  const VB = 200;
  const cx = 100;
  const cy = 100;
  const maxR = 52;       // polygon radius
  const labelR = 78;     // label anchor radius: maxR + 26 → range 100±78 = 22–178, inside VB ✓
  const n = categories.length;
  const maxCount = maxSkills || Math.max(...categories.map(c => c.skills.length));

  const point = (i, r) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const rings = [0.25, 0.5, 0.75, 1.0];
  const dataPoints = categories.map((cat, i) => {
    const ratio = animated ? cat.skills.length / maxCount : 0;
    return point(i, ratio * maxR);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

  const gridColor = lightMode ? "rgba(0,100,120,0.14)" : "rgba(0,255,229,0.09)";
  const axisColor = lightMode ? "rgba(0,100,120,0.2)" : "rgba(0,255,229,0.13)";
  const labelColor = lightMode ? "rgba(0,80,100,0.7)" : `${accent}bb`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {title && (
        <div style={{ fontSize: "0.44rem", letterSpacing: "0.14em", color: accent, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "3px", textTransform: "uppercase", opacity: 0.75, textAlign: "center" }}>
          {title}
        </div>
      )}
      {/* VB=200: labels sit at radius 78, max extent 178 — never exceed VB */}
      <svg width={renderSize} height={renderSize} viewBox={`0 0 ${VB} ${VB}`} style={{ display: "block", overflow: "hidden" }}>
        {/* Grid rings */}
        {rings.map((r, ri) => {
          const pts = categories.map((_, i) => point(i, r * maxR));
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";
          return <path key={ri} d={path} fill="none" stroke={gridColor} strokeWidth="0.8" />;
        })}
        {/* Axes */}
        {categories.map((_, i) => {
          const outer = point(i, maxR);
          return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={axisColor} strokeWidth="0.8" />;
        })}
        {/* Data polygon */}
        <path d={dataPath} fill={`${accent}1a`} stroke={accent} strokeWidth="1.6"
          style={{ transition: "all 1.3s cubic-bezier(0.22,1,0.36,1)" }} />
        {/* Vertex dots */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.8" fill={accent}
            style={{ filter: lightMode ? "none" : `drop-shadow(0 0 3px ${accent})`, transition: "all 1.3s cubic-bezier(0.22,1,0.36,1)" }} />
        ))}
        {/* Axis labels — no numbers, text only, contained within VB */}
        {categories.map((cat, i) => {
          const lp = point(i, labelR);
          const anchor = lp.x < cx - 6 ? "end" : lp.x > cx + 6 ? "start" : "middle";
          const label = rpgMode ? cat.rpgLabel : cat.label;
          // Split into max 2 lines at natural word boundary
          const words = label.split(" ");
          const mid = Math.ceil(words.length / 2);
          const l1 = words.slice(0, mid).join(" ");
          const l2 = words.slice(mid).join(" ");
          const lineH = 9; // line height in VB coords
          const baseY = l2 ? lp.y - lineH * 0.4 : lp.y + 3;
          return (
            <g key={i}>
              <text x={lp.x} y={baseY} textAnchor={anchor}
                style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "9.5px", fontWeight: 700, fill: labelColor, letterSpacing: "0.02em" }}>
                {l1}
              </text>
              {l2 && (
                <text x={lp.x} y={baseY + lineH} textAnchor={anchor}
                  style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "9.5px", fontWeight: 700, fill: labelColor, letterSpacing: "0.02em" }}>
                  {l2}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── DUAL SPIDER CHART (responsive) ──────────────────────────────────────
function DualSpiderChart({ skillCategories, innateAbilities, lightMode, accent, rpgMode }) {
  const innateAccent = lightMode ? "#8a6800" : "#ffd700";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0px", alignItems: "center", width: "100%" }}>
      <div style={{ fontSize: "0.42rem", letterSpacing: "0.14em", color: `${accent}88`, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "2px", textTransform: "uppercase", textAlign: "center" }}>
        {rpgMode ? "· Class Abilities ·" : "· Technical ·"}
      </div>
      <SpiderChart
        categories={skillCategories} lightMode={lightMode} accent={accent}
        rpgMode={rpgMode} title=""
        maxSkills={Math.max(...skillCategories.map(c => c.skills.length))}
        size={160}
      />
      <div style={{ height: "1px", background: `${accent}14`, width: "55%", alignSelf: "center", margin: "4px 0" }} />
      <div style={{ fontSize: "0.42rem", letterSpacing: "0.14em", color: `${innateAccent}88`, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "2px", textTransform: "uppercase", textAlign: "center" }}>
        {rpgMode ? "· Innate Abilities ·" : "· Soft Skills ·"}
      </div>
      <SpiderChart
        categories={innateAbilities} lightMode={lightMode} accent={innateAccent}
        rpgMode={rpgMode} title=""
        maxSkills={6}
        size={160}
      />
    </div>
  );
}

// ─── ACCORDION ────────────────────────────────────────────────────────────
function Accordion({ label, sublabel, accent, lightMode, rpgMode, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const borderColor = lightMode ? `${accent}30` : `${accent}22`;
  const headerBg = open ? (lightMode ? `${accent}0d` : `${accent}08`) : "transparent";
  return (
    <div style={{ border: `1px solid ${borderColor}`, borderRadius: "4px", overflow: "hidden", marginBottom: "10px" }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", cursor: "pointer", background: headerBg, transition: "background 0.2s", userSelect: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: rpgMode ? "0.14em" : "0.04em", color: accent, textTransform: rpgMode ? "uppercase" : "none" }}>
            {label}
          </span>
          {sublabel && <span style={{ fontSize: "0.55rem", color: lightMode ? "#6b8090" : "rgba(160,200,210,0.4)", letterSpacing: "0.06em" }}>{sublabel}</span>}
        </div>
        <span style={{ fontSize: "0.65rem", color: accent, display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? "2000px" : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ padding: "14px 16px 16px", borderTop: `1px solid ${borderColor}` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SkillPills({ categories, lightMode, T, rpgMode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {categories.map(cat => {
        const color = lightMode
          ? (cat.color === "#00ffe5" ? "#007a8a" : cat.color === "#39ff14" ? "#1a7a2a" : cat.color === "#ffd700" ? "#8a6800" : cat.color === "#ff2244" ? "#b01030" : cat.color === "#b97aff" ? "#6a40b0" : "#b05800")
          : cat.color;
        const displayLabel = rpgMode ? cat.rpgLabel : cat.label;
        return (
          <div key={cat.id}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "7px", textTransform: "uppercase" }}>
              {displayLabel} <span style={{ color: T.textMuted, fontWeight: 400 }}>· {cat.skills.length}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {cat.skills.map(skill => (
                <span key={skill} style={{
                  background: `${color}10`, border: `1px solid ${color}30`,
                  borderRadius: "3px", padding: "3px 9px",
                  fontSize: "0.65rem", color: lightMode ? T.textStrong : "#c8d8e0",
                  fontFamily: "'Exo 2',sans-serif", fontWeight: 500,
                  letterSpacing: "0.03em", transition: "all 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.target.style.background = `${color}22`; e.target.style.borderColor = `${color}66`; e.target.style.color = color; }}
                  onMouseLeave={e => { e.target.style.background = `${color}10`; e.target.style.borderColor = `${color}30`; e.target.style.color = lightMode ? T.textStrong : "#c8d8e0"; }}
                >{skill}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}


function GlitchOverlay({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${Math.random() * 100}%`,
          height: `${1 + Math.random() * 4}px`,
          background: i % 3 === 0 ? "#00ffe5" : i % 3 === 1 ? "#ff2244" : "#39ff14",
          opacity: 0.6 + Math.random() * 0.4,
          transform: `translateX(${(Math.random() - 0.5) * 40}px)`,
          animation: `glitchBar ${0.08 + Math.random() * 0.12}s ease both`,
          animationDelay: `${i * 0.02}s`,
        }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,255,229,0.04)", animation: "glitchFlash 0.3s ease both" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.4em", color: "#00ffe5", textShadow: "0 0 20px #00ffe5", opacity: 0.8, animation: "glitchFlash 0.3s ease both" }}>
          SYSTEM REBOOT...
        </div>
      </div>
    </div>
  );
}

// ─── RPG COMPONENTS ───────────────────────────────────────────────────────
function ScanlineOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 500, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,229,0.008) 2px, rgba(0,255,229,0.008) 4px)" }} />;
}

function SystemParticles({ opacity = 0.45, color = "#00ffe5" }) {
  const pts = [...Array(16)].map((_, i) => ({
    left: `${(i * 6.4) % 100}%`, top: `${(i * 7.1 + 5) % 100}%`,
    size: 1 + i % 3, dur: 4 + i % 5, delay: i * 0.35,
    color: i % 3 === 0 ? color : i % 3 === 1 ? (color === "#00ffe5" ? "#39ff14" : "#1a7a2a") : (color === "#00ffe5" ? "#ff2244" : "#b01030"),
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {pts.map((p, i) => <div key={i} style={{ position: "absolute", left: p.left, top: p.top, width: p.size, height: p.size, borderRadius: "50%", background: p.color, boxShadow: `0 0 5px ${p.color}`, animation: `floatP ${p.dur}s ease-in-out infinite`, animationDelay: `${p.delay}s`, opacity }} />)}
    </div>
  );
}

function RankBadge({ rank, color }) {
  return <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: "0.6rem", letterSpacing: "0.15em", color, border: `1px solid ${color}`, padding: "2px 7px", borderRadius: "2px", boxShadow: `0 0 6px ${color}44`, textShadow: `0 0 5px ${color}` }}>{rank}</span>;
}

function SystemPanel({ children, style = {}, glowColor = "#00ffe5", lightMode = false, overflowHidden = true }) {
  const corners = ["tl", "tr", "bl", "br"];
  const inkColor = lightMode ? `${glowColor}cc` : glowColor;
  const shadow = lightMode
    ? `0 2px 12px ${glowColor}18, inset 0 0 12px rgba(0,0,0,0.03)`
    : `0 0 18px ${glowColor}10, inset 0 0 24px rgba(0,0,0,0.5)`;
  return (
    <div style={{ background: lightMode ? "rgba(228,234,240,0.95)" : "rgba(4,12,18,0.93)", border: `1px solid ${glowColor}${lightMode ? "33" : "22"}`, borderRadius: "4px", position: "relative", overflow: overflowHidden ? "hidden" : "visible", boxShadow: shadow, ...style }}>
      {corners.map(c => <div key={c} style={{ position: "absolute", top: c[0] === "t" ? 0 : "auto", bottom: c[0] === "b" ? 0 : "auto", left: c[1] === "l" ? 0 : "auto", right: c[1] === "r" ? 0 : "auto", width: 9, height: 9, borderTop: c[0] === "t" ? `1px solid ${inkColor}` : "none", borderBottom: c[0] === "b" ? `1px solid ${inkColor}` : "none", borderLeft: c[1] === "l" ? `1px solid ${inkColor}` : "none", borderRight: c[1] === "r" ? `1px solid ${inkColor}` : "none" }} />)}
      {children}
    </div>
  );
}

function RPGSkillBar({ skill, index, lightMode = false }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), index * 110 + 150); return () => clearTimeout(t); }, [index]);
  // In light mode use darker variants of accent colors for readability
  const barColor = lightMode
    ? (skill.color === "#00ffe5" ? "#007a8a" : skill.color === "#39ff14" ? "#1a7a2a" : "#8a6800")
    : skill.color;
  return (
    <SystemPanel glowColor={barColor} lightMode={lightMode} style={{ padding: "13px 15px", marginBottom: "9px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: lightMode ? "#1c2a35" : "#c8d8e0", letterSpacing: "0.05em" }}>{skill.name}</span>
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <RankBadge rank={skill.rank} color={barColor} />
          <span style={{ color: barColor, fontSize: "0.72rem", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>{skill.level}</span>
        </div>
      </div>
      <div style={{ height: "3px", background: lightMode ? `${barColor}22` : "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: anim ? `${skill.level}%` : "0%", background: `linear-gradient(90deg,${barColor}66,${barColor})`, boxShadow: lightMode ? `0 0 4px ${barColor}66` : `0 0 8px ${barColor}`, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)", position: "relative" }}>
          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: barColor, boxShadow: `0 0 5px ${barColor}` }} />
        </div>
      </div>
    </SystemPanel>
  );
}

// ─── GUILD TIMELINE + CARD FLING ──────────────────────────────────────────
function GuildSection({ rpgMode, lightMode, T }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);       // bumped to retrigger animation
  const [direction, setDirection] = useState(1);   // 1 = forward, -1 = backward

  const accentFor = (i) => {
    const isActive = !DATA.guilds[i].end;
    const base = isActive ? T.accent : (i === 1 ? T.gold : T.accent2);
    if (!lightMode) return base;
    return isActive ? "#007a8a" : i === 1 ? "#8a6800" : "#1a7a2a";
  };

  const select = (i) => {
    if (i === activeIdx) return;
    setDirection(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
    setAnimKey(k => k + 1);
  };

  const guild = DATA.guilds[activeIdx];
  const stats = useGuildStats(guild.start, guild.end);
  const xpAnim = useCountUp(stats.xp, 1400);
  const isActive = !guild.end;
  const accent = accentFor(activeIdx);

  return (
    <>
      <style>{`
        @keyframes sysInit {
          0%   { transform: scaleY(0.03); opacity: 0.6; filter: brightness(2.5); }
          35%  { transform: scaleY(1.018); opacity: 1; filter: brightness(1.4); }
          60%  { transform: scaleY(0.993); filter: brightness(1.1); }
          80%  { transform: scaleY(1.003); }
          100% { transform: scaleY(1); opacity: 1; filter: brightness(1); }
        }
        @keyframes sysScan {
          0%   { top: 0; opacity: 0.55; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes sysBorderFlash {
          0%   { opacity: 1; }
          60%  { opacity: 0.3; }
          100% { opacity: 0; }
        }
        .sys-init {
          animation: sysInit 0.38s cubic-bezier(0.22,1,0.36,1) both;
          transform-origin: top center;
          position: relative;
          overflow: hidden;
        }
        .sys-scan::after {
          content: '';
          position: absolute;
          left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--scan-color, #00ffe5), transparent);
          animation: sysScan 0.38s linear both;
          pointer-events: none;
          z-index: 10;
        }
        .timeline-node { transition: all 0.22s; cursor: pointer; }
        .timeline-node:hover .node-ring { opacity: 0.7 !important; transform: scale(1.18); }
      `}</style>

      {/* ── TIMELINE ── */}
      <div style={{ marginBottom: "28px" }}>
        {/* Circles row — spine runs only through this row */}
        <div style={{ position: "relative", height: "32px", marginBottom: "10px" }}>
          {/* Spine — absolutely fills the circles row, truly pierces nodes */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px",
            background: rpgMode
              ? `linear-gradient(90deg, ${T.accent}55, ${T.gold}55, ${T.accent2}55)`
              : `linear-gradient(90deg, ${T.accent}40, ${T.accent}20, transparent)`,
            transform: "translateY(-50%)", zIndex: 0 }} />

          {/* Nodes row — same flex, z-index above the spine */}
          <div style={{ display: "flex", justifyContent: "space-between", height: "100%",
            position: "relative", zIndex: 2 }}>
            {DATA.guilds.map((g, i) => {
              const ac = accentFor(i);
              const isSelected = i === activeIdx;
              return (
                <div key={i} className="timeline-node" onClick={() => select(i)}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Pulse ring */}
                  <div className="node-ring" style={{ position: "absolute", width: isSelected ? 36 : 24,
                    height: isSelected ? 36 : 24, borderRadius: "50%",
                    border: `1px solid ${ac}`, opacity: isSelected ? 0.45 : 0.12,
                    boxShadow: isSelected ? `0 0 14px ${ac}55` : "none",
                    transition: "all 0.28s" }} />
                  {/* Core dot */}
                  <div style={{ width: isSelected ? 20 : 12, height: isSelected ? 20 : 12,
                    borderRadius: "50%", zIndex: 3, position: "relative",
                    background: isSelected
                      ? ac
                      : (lightMode ? `${ac}33` : `${ac}28`),
                    border: `2px solid ${ac}`,
                    boxShadow: isSelected
                      ? `0 0 12px ${ac}, 0 0 24px ${ac}44, inset 0 0 6px ${ac}66`
                      : "none",
                    transition: "all 0.28s" }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Labels row — separate, below the spine entirely */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {DATA.guilds.map((g, i) => {
            const ac = accentFor(i);
            const isSelected = i === activeIdx;
            const gStats = calcGuildStats(g.start, g.end);
            return (
              <div key={i} className="timeline-node" onClick={() => select(i)}
                style={{ flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                <div style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
                  fontWeight: isSelected ? 700 : 400, fontSize: "0.58rem",
                  color: isSelected ? ac : T.textMuted,
                  letterSpacing: rpgMode ? "0.05em" : "0.01em",
                  lineHeight: 1.3, marginBottom: "2px", transition: "color 0.22s" }}>
                  {rpgMode ? g.name : g.cvName}
                </div>
                <div style={{ fontSize: "0.46rem", color: T.textMuted, letterSpacing: "0.05em", lineHeight: 1.4 }}>
                  {gStats.period.split(" – ")[0]}<br />– {gStats.period.split(" – ")[1]}
                </div>
                {rpgMode && (
                  <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700,
                    fontSize: "0.48rem", color: `${ac}77`, letterSpacing: "0.1em", marginTop: "2px" }}>
                    LV.{gStats.level}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SYSTEM CARD ── */}
      <div key={animKey} className="sys-init sys-scan" style={{ "--scan-color": accent }}>
        {rpgMode ? (
          <SystemPanel glowColor={accent} lightMode={lightMode}
            style={{ animation: isActive ? "cyanPulse 5s ease-in-out infinite" : "none" }}>
            <div style={{ padding: "20px 22px" }}>
              {/* Card header — single clean row, no duplication */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 4,
                    background: lightMode ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.5)",
                    border: `1px solid ${accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", boxShadow: `0 0 10px ${accent}22` }}>
                    {isActive ? "⚔" : "⚜"}
                  </div>
                  <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.56rem",
                    color: accent, letterSpacing: "0.1em",
                    textShadow: lightMode ? "none" : `0 0 6px ${accent}` }}>
                    LV.{stats.level}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                    <span style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "0.88rem",
                      color: T.textStrong, letterSpacing: "0.05em" }}>
                      {guild.rpgRole}
                    </span>
                    {isActive && (
                      <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.48rem",
                        letterSpacing: "0.14em", color: T.accent2,
                        border: `1px solid ${T.accent2}44`, borderRadius: 2, padding: "1px 6px" }}>
                        ◉ ACTIVE GUILD
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.62rem", color: `${accent}cc`, letterSpacing: "0.04em", marginBottom: "8px" }}>
                    {guild.name} · {stats.period} · {stats.totalYears} yrs
                  </div>
                  {/* XP bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.44rem",
                    color: T.textMuted, letterSpacing: "0.08em", marginBottom: "2px" }}>
                    <span>GUILD EXP</span><span>{xpAnim.toFixed(0)} / 100</span>
                  </div>
                  <div style={{ height: 3, background: `${accent}14`, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${xpAnim}%`,
                      background: `linear-gradient(90deg,${accent}55,${accent})`,
                      boxShadow: lightMode ? "none" : `0 0 6px ${accent}88`,
                      transition: "width 0.1s" }} />
                  </div>
                </div>
              </div>
              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(90deg,${accent}22,transparent)`, marginBottom: "14px" }} />
              {/* Description */}
              <p style={{ fontSize: "0.8rem", color: T.text, lineHeight: 1.8, fontWeight: 300, marginBottom: guild.rpgBullets.length ? "10px" : "14px" }}>
                {guild.rpgDesc}
              </p>
              {/* Bullet points — renders when populated */}
              {guild.rpgBullets.length > 0 && (
                <ul style={{ paddingLeft: "16px", marginBottom: "14px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  {guild.rpgBullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "0.78rem", color: T.text, lineHeight: 1.7, fontWeight: 300 }}>
                      <span style={{ color: accent, marginRight: "6px" }}>▸</span>{b}
                    </li>
                  ))}
                </ul>
              )}
              {/* Tech pills */}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {guild.tech.map(t => (
                  <span key={t} style={{ background: `${accent}10`, border: `1px solid ${accent}28`,
                    borderRadius: 2, padding: "2px 8px", fontSize: "0.56rem",
                    color: accent, fontFamily: "'Exo 2',sans-serif", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </SystemPanel>
        ) : (
          /* ── CV CARD ── */
          <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px",
            boxShadow: lightMode ? "0 2px 12px rgba(0,0,0,0.06)" : "none", overflow: "hidden" }}>
            <div style={{ height: "3px", background: `linear-gradient(90deg,${accent},transparent)` }} />
            <div style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "6px",
                    background: lightMode ? `${accent}12` : `${accent}10`,
                    border: `1px solid ${accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    {isActive ? "💼" : "📁"}
                  </div>
                  <div style={{ fontSize: "0.48rem", color: accent, fontWeight: 700 }}>
                    {stats.totalYears}y
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "2px" }}>
                    <span style={{ fontFamily: T.titleFont, fontWeight: 700, fontSize: "0.92rem", color: T.textStrong }}>
                      {guild.role}
                    </span>
                    {isActive && (
                      <span style={{ fontSize: "0.6rem", color: T.accent2, background: `${T.accent2}12`,
                        border: `1px solid ${T.accent2}33`, borderRadius: 3, padding: "1px 7px", fontWeight: 600 }}>
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: accent, fontWeight: 500, marginBottom: "6px" }}>
                    {guild.cvName} · {stats.period}
                  </div>
                  {/* CV XP / duration bar */}
                  <div style={{ height: 2, background: `${accent}14`, borderRadius: 2, overflow: "hidden", maxWidth: "180px" }}>
                    <div style={{ height: "100%", width: `${xpAnim}%`,
                      background: `linear-gradient(90deg,${accent}55,${accent})`, transition: "width 0.1s" }} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.82rem", color: T.text, lineHeight: 1.75, marginBottom: guild.bullets.length ? "10px" : "12px" }}>
                {guild.desc}
              </p>
              {guild.bullets.length > 0 && (
                <ul style={{ paddingLeft: "16px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {guild.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "0.8rem", color: T.text, lineHeight: 1.7 }}>{b}</li>
                  ))}
                </ul>
              )}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {guild.tech.map(t => (
                  <span key={t} style={{ background: lightMode ? `${accent}0e` : `${accent}10`,
                    border: `1px solid ${accent}28`, borderRadius: "4px", padding: "2px 9px",
                    fontSize: "0.68rem", color: accent, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
        <button onClick={() => select(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          style={{ background: "none", border: `1px solid ${activeIdx === 0 ? T.textMuted + "22" : accent + "44"}`,
            borderRadius: 3, padding: "6px 14px", cursor: activeIdx === 0 ? "default" : "pointer",
            fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
            fontSize: "0.58rem", letterSpacing: "0.1em",
            color: activeIdx === 0 ? T.textMuted + "44" : accent,
            transition: "all 0.2s" }}>
          {rpgMode ? "◀ PREV GUILD" : "← Previous"}
        </button>
        <div style={{ fontSize: "0.5rem", color: T.textMuted, letterSpacing: "0.1em" }}>
          {activeIdx + 1} / {DATA.guilds.length}
        </div>
        <button onClick={() => select(Math.min(DATA.guilds.length - 1, activeIdx + 1))}
          disabled={activeIdx === DATA.guilds.length - 1}
          style={{ background: "none", border: `1px solid ${activeIdx === DATA.guilds.length - 1 ? T.textMuted + "22" : accent + "44"}`,
            borderRadius: 3, padding: "6px 14px", cursor: activeIdx === DATA.guilds.length - 1 ? "default" : "pointer",
            fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
            fontSize: "0.58rem", letterSpacing: "0.1em",
            color: activeIdx === DATA.guilds.length - 1 ? T.textMuted + "44" : accent,
            transition: "all 0.2s" }}>
          {rpgMode ? "NEXT GUILD ▶" : "Next →"}
        </button>
      </div>
    </>
  );
}


function CVSection({ title, children, light }) {
  const border = light ? "#e2e8f0" : "#2a3a4a";
  const titleColor = light ? "#1a2a4a" : "#e2eaf2";
  const lineColor = light ? "#3b82f6" : "#00ffe5";
  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: titleColor, whiteSpace: "nowrap" }}>{title}</h2>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,${lineColor},transparent)` }} />
      </div>
      {children}
    </div>
  );
}

function CVSkillBar({ skill, light, index }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), index * 80 + 100); return () => clearTimeout(t); }, [index]);
  const accent = light ? "#3b82f6" : "#00ffe5";
  const bg = light ? "#e9f0fa" : "rgba(0,255,229,0.07)";
  const text = light ? "#1e293b" : "#c8d8e0";
  const sub = light ? "#64748b" : "rgba(160,200,210,0.5)";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", fontWeight: 500, color: text }}>{skill.name}</span>
        <span style={{ fontSize: "0.72rem", color: sub }}>{skill.category}</span>
      </div>
      <div style={{ height: "5px", background: bg, borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: anim ? `${skill.level}%` : "0%", background: `linear-gradient(90deg,${accent}88,${accent})`, borderRadius: "10px", transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
    </div>
  );
}

// ─── TOGGLE BUTTON ────────────────────────────────────────────────────────
function ModeToggle({ rpgMode, setRpgMode, lightMode, setLightMode, triggerGlitch }) {
  const navBg = rpgMode ? "rgba(3,8,13,0.93)" : lightMode ? "rgba(255,255,255,0.95)" : "rgba(15,22,32,0.95)";
  const borderC = rpgMode ? "rgba(0,255,229,0.15)" : lightMode ? "rgba(59,130,246,0.2)" : "rgba(100,160,200,0.15)";

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {/* RPG / Normal toggle */}
      <div
        onClick={() => triggerGlitch(() => setRpgMode(m => !m))}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: rpgMode ? "rgba(0,255,229,0.08)" : lightMode ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${rpgMode ? "rgba(0,255,229,0.35)" : lightMode ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "3px", padding: "5px 10px", cursor: "pointer",
          fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif",
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: rpgMode ? "0.15em" : "0.06em",
          color: rpgMode ? "#00ffe5" : lightMode ? "#3b82f6" : "#94a3b8",
          transition: "all 0.25s",
          userSelect: "none",
        }}
        title="Switch between RPG and Normal view"
      >
        <span>{rpgMode ? "⚔" : "💼"}</span>
        <span>{rpgMode ? "RPG MODE" : "CV MODE"}</span>
      </div>

      {/* Light / Dark toggle */}
      <div
        onClick={() => setLightMode(m => !m)}
        style={{
          width: "32px", height: "32px", borderRadius: "3px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem",
          background: lightMode ? "rgba(59,130,246,0.08)" : "rgba(0,255,229,0.05)",
          border: `1px solid ${lightMode ? "rgba(59,130,246,0.3)" : "rgba(0,255,229,0.2)"}`,
          transition: "all 0.25s",
          userSelect: "none",
        }}
        title="Toggle light/dark mode"
      >
        {lightMode ? "☀️" : "🌙"}
      </div>
    </div>
  );
}

// ─── WORLD MAP REGION ─────────────────────────────────────────────────────
function WorldRegion({ region, onClick, rpgMode }) {
  const [hov, setHov] = useState(false);
  const c = "#00ffe5";
  return (
    <div style={{ position: "absolute", left: `${region.x}%`, top: `${region.y}%`, transform: "translate(-50%,-50%)", zIndex: 10, cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onClick(region)}>
      <div style={{ position: "absolute", inset: hov ? "-12px" : "-6px", borderRadius: "50%", border: `1px solid ${c}`, opacity: hov ? 0.45 : 0.12, transition: "all 0.28s", animation: "pulseR 2.5s ease-in-out infinite" }} />
      <div style={{ width: hov ? 17 : 11, height: hov ? 17 : 11, borderRadius: "50%", background: hov ? `radial-gradient(circle,#fff,${c})` : `radial-gradient(circle,${c},#003030)`, boxShadow: hov ? `0 0 18px ${c},0 0 36px ${c}66` : `0 0 7px ${c}77`, border: `1px solid ${c}`, transition: "all 0.22s", position: "relative", zIndex: 2 }} />
      {hov && (
        <div style={{ position: "absolute", bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", background: "rgba(2,8,12,0.97)", border: `1px solid ${c}33`, borderRadius: "3px", padding: "9px 13px", whiteSpace: "nowrap", zIndex: 20, boxShadow: `0 0 16px ${c}18`, animation: "fadeUp 0.15s ease" }}>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.68rem", color: c, letterSpacing: "0.1em", marginBottom: "2px" }}>{rpgMode ? region.name : region.cvName}</div>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.58rem", color: "rgba(180,210,220,0.55)" }}>⚠ UNDISCOVERED</div>
          <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `4px solid ${c}33` }} />
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [rpgMode, setRpgMode] = useState(true);
  const [lightMode, setLightMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [section, setSection] = useState("hero");
  const [selRegion, setSelRegion] = useState(null);
  const { level, xp, totalYears } = useCareerStats();
  const xpAnimated = useCountUp(xp, 1800);
  const subtitle = useTypewriter(DATA.rpgTitle, 46);

  // No forced dark — RPG light mode is now supported

  const triggerGlitch = useCallback((cb) => {
    setGlitching(true);
    setTimeout(() => { cb(); setGlitching(false); }, 420);
  }, []);

  // ── THEME TOKENS ──
  // Four modes: RPG Dark | RPG Light | CV Dark | CV Light
  const T = rpgMode && !lightMode ? {
    // ── RPG DARK (original) ──
    bg: "#03080d", navBg: "rgba(3,8,13,0.93)", navBorder: "rgba(0,255,229,0.12)",
    text: "#c8d8e0", textMuted: "rgba(160,200,210,0.5)", textStrong: "#fff",
    accent: "#00ffe5", accent2: "#39ff14", danger: "#ff2244", gold: "#ffd700",
    cardBg: "rgba(4,12,18,0.93)", cardBorder: "rgba(0,255,229,0.18)",
    panelBg: "rgba(4,12,18,0.93)", panelGlow: true,
    titleFont: "'Oxanium',sans-serif", bodyFont: "'Exo 2',sans-serif",
    navItemColor: "rgba(160,200,210,0.45)", navActiveColor: "#00ffe5",
    gridColor: "rgba(0,255,229,0.02)", particleOpacity: 0.45,
    scanline: true,
  } : rpgMode && lightMode ? {
    // ── RPG LIGHT (grimoire, cool grey-white) ──
    bg: "#edf0f4", navBg: "rgba(237,240,244,0.97)", navBorder: "rgba(0,160,180,0.18)",
    text: "#1c2a35", textMuted: "#6b8090", textStrong: "#0d1822",
    accent: "#007a8a", accent2: "#1a7a2a", danger: "#b01030", gold: "#8a6800",
    cardBg: "rgba(228,234,240,0.95)", cardBorder: "rgba(0,160,180,0.2)",
    panelBg: "rgba(228,234,240,0.95)", panelGlow: true,
    titleFont: "'Oxanium',sans-serif", bodyFont: "'Exo 2',sans-serif",
    navItemColor: "#6b8090", navActiveColor: "#007a8a",
    gridColor: "rgba(0,140,160,0.04)", particleOpacity: 0.25,
    scanline: false,
  } : !rpgMode && lightMode ? {
    // ── CV LIGHT ──
    bg: "#f0f4f8", navBg: "rgba(255,255,255,0.97)", navBorder: "rgba(59,130,246,0.15)",
    text: "#334155", textMuted: "#94a3b8", textStrong: "#0f172a",
    accent: "#3b82f6", accent2: "#10b981", danger: "#ef4444", gold: "#f59e0b",
    cardBg: "#ffffff", cardBorder: "#e2e8f0",
    panelBg: "#ffffff", panelGlow: false,
    titleFont: "'DM Sans',sans-serif", bodyFont: "'DM Sans',sans-serif",
    navItemColor: "#64748b", navActiveColor: "#3b82f6",
    gridColor: "rgba(59,130,246,0.03)", particleOpacity: 0,
    scanline: false,
  } : {
    // ── CV DARK ──
    bg: "#0d1117", navBg: "rgba(13,17,23,0.96)", navBorder: "rgba(100,160,200,0.12)",
    text: "#b0c4d4", textMuted: "rgba(120,160,185,0.55)", textStrong: "#e2eaf2",
    accent: "#00ffe5", accent2: "#38d9a9", danger: "#f87171", gold: "#fbbf24",
    cardBg: "rgba(20,28,38,0.95)", cardBorder: "rgba(60,100,130,0.22)",
    panelBg: "rgba(20,28,38,0.95)", panelGlow: false,
    titleFont: "'DM Sans',sans-serif", bodyFont: "'DM Sans',sans-serif",
    navItemColor: "rgba(140,180,200,0.5)", navActiveColor: "#00ffe5",
    gridColor: "rgba(0,255,229,0.015)", particleOpacity: 0,
    scanline: false,
  };

  const nav = rpgMode
    ? [{ id: "hero", label: "CHARACTER" }, { id: "guilds", label: "GUILDS" }, { id: "achievements", label: "ACHIEVEMENTS" }, { id: "map", label: "WORLD MAP" }, { id: "contact", label: "SEND RAVEN" }]
    : [{ id: "hero", label: "Profile" }, { id: "guilds", label: "Experience" }, { id: "achievements", label: "Certifications" }, { id: "map", label: "Projects" }, { id: "contact", label: "Contact" }];

  const sharedContentStyle = { padding: "24px", animation: "sectionIn 0.4s ease both" };

  // Sticky sidebar content — shown on all tabs
  const SidebarPanel = () => (
    <SystemPanel glowColor={T.accent} lightMode={lightMode} overflowHidden={false} style={{ padding: "20px 16px", animation: "cyanPulse 4s ease-in-out infinite", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${T.accent}44,transparent)`, animation: "scanDown 3s linear infinite" }} />
      {/* Avatar */}
      <div style={{ width: 80, height: 80, borderRadius: "4px", background: lightMode ? "linear-gradient(135deg,#d4dde8,#c0cdd8)" : "linear-gradient(135deg,#001a20,#003040)", border: `1px solid ${T.accent}44`, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", boxShadow: `0 0 16px ${T.accent}18` }}>🧙</div>
      {/* Class + Level */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginBottom: "3px" }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.55rem", color: `${T.accent}99`, letterSpacing: "0.16em" }}>{rpgMode ? "FULL-STACK MAGE" : "SENIOR DEVELOPER"}</span>
          <span style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.62rem", color: T.accent, background: `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "1px 5px" }}>LV.{level}</span>
        </div>
        <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.82rem", color: T.textStrong, letterSpacing: "0.08em" }}>{DATA.name}</div>
      </div>
      {/* XP */}
      <div style={{ marginBottom: "3px", display: "flex", justifyContent: "space-between", fontSize: "0.46rem", color: T.textMuted, letterSpacing: "0.07em" }}>
        <span>EXP</span><span>{xpAnimated.toFixed(0)} / 100</span>
      </div>
      <div style={{ height: 4, background: `${T.accent}14`, borderRadius: 2, overflow: "hidden", marginBottom: "3px" }}>
        <div style={{ height: "100%", width: `${xpAnimated}%`, background: `linear-gradient(90deg,${T.accent}55,${T.accent})`, boxShadow: `0 0 8px ${T.accent}88`, transition: "width 0.1s" }} />
      </div>
      <div style={{ fontSize: "0.42rem", color: T.textMuted, letterSpacing: "0.05em", marginBottom: "12px", textAlign: "right" }}>1 XP = 3.65 days</div>
      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${T.accent}33,transparent)`, marginBottom: "10px" }} />
      {/* Dual spider */}
      <DualSpiderChart skillCategories={DATA.skillCategories} innateAbilities={DATA.innateAbilities} lightMode={lightMode} accent={T.accent} rpgMode={rpgMode} />
    </SystemPanel>
  );

  // Mobile banner state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mobile banner (portrait / small screens) — compact strip + expandable drawer
  const MobileBanner = () => (
    <div style={{ position: "sticky", top: "58px", zIndex: 150, backdropFilter: "blur(16px)" }}>
      {/* Main banner strip */}
      <div style={{ background: T.navBg, borderBottom: drawerOpen ? "none" : `1px solid ${T.navBorder}`, padding: "8px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 36, height: 36, borderRadius: "3px", background: lightMode ? "linear-gradient(135deg,#d4dde8,#c0cdd8)" : "linear-gradient(135deg,#001a20,#003040)", border: `1px solid ${T.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0, boxShadow: `0 0 10px ${T.accent}15` }}>🧙</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
            <span style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont, fontWeight: 700, fontSize: "0.75rem", color: T.textStrong }}>{DATA.name}</span>
            <span style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.56rem", color: T.accent, background: `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "0px 4px" }}>LV.{level}</span>
          </div>
          <div style={{ fontSize: "0.6rem", color: `${T.accent}88`, letterSpacing: "0.12em", marginBottom: "3px" }}>{rpgMode ? "FULL-STACK MAGE" : "SENIOR DEVELOPER"}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ flex: 1, height: 3, background: `${T.accent}14`, borderRadius: 2, overflow: "hidden", maxWidth: "160px" }}>
              <div style={{ height: "100%", width: `${xpAnimated}%`, background: `linear-gradient(90deg,${T.accent}55,${T.accent})`, boxShadow: `0 0 5px ${T.accent}66`, transition: "width 0.1s" }} />
            </div>
            <span style={{ fontSize: "0.52rem", color: `${T.textMuted}`, opacity: 0.55, letterSpacing: "0.04em" }}>{xpAnimated.toFixed(0)} / 100</span>
          </div>
        </div>
        {/* STATS toggle */}
        <div onClick={() => setDrawerOpen(o => !o)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", padding: "5px 9px", border: `1px solid ${drawerOpen ? T.accent : `${T.accent}28`}`, borderRadius: "3px", background: drawerOpen ? `${T.accent}12` : `${T.accent}05`, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
          <span style={{ fontSize: "0.5rem", color: drawerOpen ? T.accent : `${T.accent}77`, letterSpacing: "0.12em", fontFamily: "'Oxanium',sans-serif", fontWeight: 700 }}>STATS</span>
          <span style={{ fontSize: "0.6rem", color: drawerOpen ? T.accent : `${T.accent}77`, display: "inline-block", transform: drawerOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▾</span>
        </div>
      </div>
      {/* Expandable drawer */}
      <div style={{ maxHeight: drawerOpen ? "640px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease", background: T.navBg, borderBottom: drawerOpen ? `1px solid ${T.navBorder}` : "none" }}>
        <div style={{ padding: "12px 14px 16px", display: "flex", flexDirection: "column", gap: "0px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: "0.48rem", color: `${T.accent}99`, letterSpacing: "0.14em", marginBottom: "2px", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>· CLASS ABILITIES ·</div>
            <SpiderChart categories={DATA.skillCategories} lightMode={lightMode} accent={T.accent} rpgMode={rpgMode} title="" maxSkills={Math.max(...DATA.skillCategories.map(c => c.skills.length))} size={180} />
          </div>
          <div style={{ height: "1px", background: `${T.accent}14`, width: "70%", margin: "4px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: "0.48rem", color: `${T.gold}99`, letterSpacing: "0.14em", marginBottom: "2px", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>· INNATE ABILITIES ·</div>
            <SpiderChart categories={DATA.innateAbilities} lightMode={lightMode} accent={lightMode ? "#8a6800" : T.gold} rpgMode={rpgMode} title="" maxSkills={6} size={180} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.bodyFont, position: "relative", overflow: "hidden", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Oxanium:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(0,255,229,0.2);color:#fff;}
        @keyframes floatP{0%,100%{transform:translateY(0) scale(1);opacity:.4;}50%{transform:translateY(-22px) scale(1.3);opacity:.75;}}
        @keyframes pulseR{0%,100%{transform:scale(1);opacity:.3;}50%{transform:scale(1.4);opacity:0;}}
        @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(5px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
        @keyframes sectionIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes scanDown{0%{top:0;opacity:.7;}100%{top:100%;opacity:0;}}
        @keyframes glitchBar{0%{opacity:1;transform:scaleX(1);}100%{opacity:0;transform:scaleX(0.2);}}
        @keyframes glitchFlash{0%{opacity:.6;}50%{opacity:.2;}100%{opacity:0;}}
        @keyframes bootLine{from{width:0;}to{width:100%;}}
        @keyframes cyanPulse{0%,100%{box-shadow:0 0 10px rgba(0,255,229,.15);}50%{box-shadow:0 0 28px rgba(0,255,229,.45),0 0 50px rgba(0,255,229,.2);}}
        @keyframes redPulse{0%,100%{box-shadow:0 0 10px rgba(255,34,68,.12);}50%{box-shadow:0 0 28px rgba(255,34,68,.4),0 0 50px rgba(255,34,68,.15);}}
        .nav-btn{background:none;border:none;cursor:pointer;transition:all .22s;border-bottom:1px solid transparent;}
        .nav-btn:hover{opacity:1 !important;}
        input,textarea{width:100%;border-radius:4px;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit;}
        input::placeholder,textarea::placeholder{opacity:.4;}
      `}</style>

      <GlitchOverlay active={glitching} />
      {T.scanline && <ScanlineOverlay />}
      {T.particleOpacity > 0 && <SystemParticles opacity={T.particleOpacity} color={rpgMode && lightMode ? "#007a8a" : "#00ffe5"} />}

      {/* Grid bg — themed */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${T.gridColor} 1px,transparent 1px),linear-gradient(90deg,${T.gridColor} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />

      {/* RPG Light: cool grey-white frosted vignette blobs */}
      {rpgMode && lightMode && (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "5%", left: "5%", width: 420, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,140,160,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "6%", width: 360, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,122,42,0.05) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(176,16,48,0.03) 0%, transparent 70%)" }} />
        </div>
      )}

      {/* CV Light mode subtle pattern */}
      {!rpgMode && lightMode && <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: "58px", background: T.navBg, borderBottom: `1px solid ${T.navBorder}`, backdropFilter: "blur(16px)", transition: "all 0.3s" }}>
        {/* Logo */}
        <div style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif", fontWeight: 800, fontSize: rpgMode ? "0.85rem" : "1rem", letterSpacing: rpgMode ? "0.2em" : "0.02em", color: T.accent, textShadow: rpgMode ? `0 0 12px ${T.accent}88` : "none", whiteSpace: "nowrap" }}>
          {rpgMode ? "⬡ SYSTEM" : "YN"}
        </div>

        {/* Nav items */}
        <div style={{ display: "flex", gap: "2px" }}>
          {nav.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => { setSection(n.id); setSelRegion(null); }} style={{
              fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif",
              fontSize: rpgMode ? "0.6rem" : "0.78rem",
              fontWeight: rpgMode ? 700 : 500,
              letterSpacing: rpgMode ? "0.16em" : "0.02em",
              padding: "10px 14px",
              color: section === n.id ? T.navActiveColor : T.navItemColor,
              borderBottom: section === n.id ? `2px solid ${T.navActiveColor}` : "1px solid transparent",
              textShadow: section === n.id && rpgMode ? `0 0 10px ${T.navActiveColor}` : "none",
              textTransform: rpgMode ? "uppercase" : "none",
            }}>{n.label}</button>
          ))}
        </div>

        {/* Toggles */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {rpgMode && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 8px #39ff14", marginRight: 4 }} />}
          <ModeToggle rpgMode={rpgMode} setRpgMode={setRpgMode} lightMode={lightMode} setLightMode={setLightMode} triggerGlitch={triggerGlitch} />
        </div>
      </nav>

      {/* ── CONTENT ─────────────────────────────── */}
      <main style={{ paddingTop: "58px", minHeight: "100vh", position: "relative", zIndex: 10 }}>
        <style>{`
          .sidebar-layout { display: flex; gap: 0; max-width: 1200px; margin: 0 auto; }
          .sidebar-col { width: 240px; flex-shrink: 0; }
          .sidebar-sticky {
            position: sticky;
            top: 58px;
            height: calc(100vh - 58px);
            overflow-y: auto;
            overflow-x: hidden;
            padding: 20px 14px 24px 18px;
          }
          .sidebar-sticky::-webkit-scrollbar { width: 3px; }
          .sidebar-sticky::-webkit-scrollbar-thumb { background: rgba(0,255,229,0.2); border-radius: 2px; }
          .content-col { flex: 1; min-width: 0; padding: 24px 20px 40px 4px; }
          .mobile-banner { display: none; }

          /* Portrait mobile ≤720px: hide sidebar, show banner strip */
          @media (max-width: 720px) and (orientation: portrait) {
            .sidebar-col { display: none; }
            .mobile-banner { display: block !important; }
            .content-col { padding: 12px 14px 40px; }
          }

          /* Landscape mobile: sidebar visible, narrower, full scrollable height */
          @media (max-height: 500px) and (orientation: landscape) {
            .sidebar-col { width: 210px; }
            .sidebar-sticky {
              top: 58px;
              height: calc(100vh - 58px);
              overflow-y: scroll;
              overflow-x: hidden;
              padding: 10px 10px 60px 12px;
            }
            .content-col { padding: 12px 14px 40px 4px; }
            .mobile-banner { display: none !important; }
          }
        `}</style>

        {/* Mobile banner — shown only on small screens */}
        <div className="mobile-banner" style={{ display: "none" }}><MobileBanner /></div>

        <div className="sidebar-layout">
          {/* ── STICKY SIDEBAR ── */}
          <div className="sidebar-col">
            <div className="sidebar-sticky">
              <SidebarPanel />
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="content-col">

        {/* ══ HERO / CHARACTER ══ */}
        {section === "hero" && (
          <div style={sharedContentStyle}>
            {rpgMode ? (
              <div>
                <div style={{ marginBottom: "20px", overflow: "hidden" }}>
                  <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${T.accent},transparent)`, animation: "bootLine 1s ease forwards" }} />
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {[
                    { label: "🇵🇭 Philippines", color: T.accent },
                    { label: "💼 Seeking Quest", color: T.accent2 },
                    { label: "🌐 Realm-Agnostic", color: T.accent2 },
                    { label: "🤝 Guild-Independent", color: T.accent2 },
                    { label: "⚡ Whisper [SOON]", color: T.textMuted, disabled: true },
                  ].map(t => (
                    <span key={t.label} style={{ background: t.disabled ? "transparent" : `${t.color}10`, border: `1px solid ${t.disabled ? (lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)") : `${t.color}30`}`, borderRadius: 2, padding: "3px 10px", fontSize: "0.55rem", color: t.disabled ? T.textMuted : t.color, fontFamily: "'Exo 2',sans-serif", fontWeight: t.disabled ? 400 : 600, letterSpacing: "0.07em", opacity: t.disabled ? 0.5 : 1, fontStyle: t.disabled ? "italic" : "normal" }}>{t.label}</span>
                  ))}
                </div>

                {/* Typewriter subtitle */}
                <div style={{ minHeight: "1em", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.65rem", color: T.accent2, letterSpacing: "0.1em" }}>{subtitle}<span style={{ color: T.accent }}>█</span></span>
                </div>
                <div style={{ fontSize: "0.5rem", letterSpacing: "0.28em", color: T.textMuted, marginBottom: "20px" }}>[ PLAYER PROFILE ]</div>

                {/* Tagline — replaces redundant name heading */}
                <div style={{ marginBottom: "20px", position: "relative", paddingLeft: "14px" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${T.accent}, transparent)`, borderRadius: "2px" }} />
                  <h1 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 900, fontSize: "1.55rem", lineHeight: 1.25, color: T.textStrong, letterSpacing: "0.02em" }}>
                    {DATA.tagline.split(". ").map((line, i) => (
                      <span key={i}>
                        {i === 1
                          ? <><span style={{ color: T.accent, textShadow: lightMode ? "none" : `0 0 16px ${T.accent}88` }}>{line}</span></>
                          : line + (DATA.tagline.includes(". ") && i === 0 ? ". " : "")
                        }
                      </span>
                    ))}
                  </h1>
                </div>

                {/* Lore */}
                <SystemPanel glowColor={T.accent2} lightMode={lightMode} style={{ padding: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: `${T.accent2}88`, marginBottom: "7px" }}>[ LORE ]</div>
                  <p style={{ fontSize: "0.81rem", lineHeight: 1.8, color: T.text, fontWeight: 300 }}>{DATA.rpgSummary}</p>
                </SystemPanel>

                {/* Stat mini-cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "9px", marginBottom: "20px" }}>
                  {[
                    { l: "QUESTS CLEARED", v: "40+", c: T.danger },
                    { l: "SPELLS MASTERED", v: `${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)}`, c: T.gold },
                    { l: "GUILDS SERVED", v: `${DATA.guilds.length}`, c: T.accent },
                  ].map(s => (
                    <SystemPanel key={s.l} glowColor={s.c} lightMode={lightMode} style={{ padding: "11px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 900, fontSize: "1.4rem", color: s.c, textShadow: lightMode ? "none" : `0 0 10px ${s.c}`, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: "0.46rem", color: T.textMuted, letterSpacing: "0.1em", marginTop: "4px" }}>{s.l}</div>
                    </SystemPanel>
                  ))}
                </div>

                {/* Skill accordions */}
                <Accordion label="Class Abilities" sublabel={`${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)} spells · ${DATA.skillCategories.length} disciplines`} accent={T.accent} lightMode={lightMode} rpgMode={rpgMode}>
                  <SkillPills categories={DATA.skillCategories} lightMode={lightMode} T={T} rpgMode={rpgMode} />
                </Accordion>
                <Accordion label="Innate Abilities" sublabel={`${DATA.innateAbilities.reduce((a, c) => a + c.skills.length, 0)} passive traits · ${DATA.innateAbilities.length} areas`} accent={lightMode ? "#8a6800" : T.gold} lightMode={lightMode} rpgMode={rpgMode}>
                  <SkillPills categories={DATA.innateAbilities} lightMode={lightMode} T={T} rpgMode={rpgMode} />
                </Accordion>
              </div>

            ) : (
              <div>
                {/* CV Header */}
                <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "24px", marginBottom: "14px", boxShadow: lightMode ? "0 2px 12px rgba(0,0,0,0.06)" : "none" }}>
                  {/* Tagline — sidebar owns the name */}
                  <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: "12px", marginBottom: "14px" }}>
                    <h1 style={{ fontFamily: T.titleFont, fontWeight: 700, fontSize: "1.2rem", color: T.textStrong, lineHeight: 1.3, marginBottom: "0" }}>
                      {DATA.taglineCV.split(". ").map((part, i, arr) => (
                        <span key={i} style={{ color: i === 1 ? T.accent : T.textStrong }}>{part}{i < arr.length - 1 ? ". " : ""}</span>
                      ))}
                    </h1>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: T.accent, fontWeight: 500, marginBottom: "6px" }}>Senior Developer · {parseFloat(totalYears).toFixed(1)} yrs experience</div>
                  <div style={{ fontSize: "0.73rem", color: T.textMuted, marginBottom: "12px" }}>📍 {DATA.location} · ✉ {DATA.email} · 🔗 {DATA.linkedin}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {[{ label: "🇵🇭 Philippines" }, { label: "💼 Open to Work" }, { label: "🌐 Remote-Ready" }, { label: "🤝 Open to Freelance" }, { label: "⚡ Quick Chat [SOON]", disabled: true }].map(t => (
                      <span key={t.label} style={{ background: t.disabled ? "transparent" : `${T.accent}10`, border: `1px solid ${t.disabled ? (lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)") : `${T.accent}30`}`, borderRadius: 2, padding: "2px 9px", fontSize: "0.62rem", color: t.disabled ? T.textMuted : T.accent, fontWeight: t.disabled ? 400 : 500, opacity: t.disabled ? 0.5 : 1, fontStyle: t.disabled ? "italic" : "normal" }}>{t.label}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: T.text }}>{DATA.summary}</p>
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "14px" }}>
                  {[{ l: "Projects Delivered", v: "40+", c: T.danger }, { l: "Skills", v: `${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)}`, c: T.accent }, { l: "Years Experience", v: `${parseFloat(totalYears).toFixed(1)}`, c: T.accent2 }].map(s => (
                    <div key={s.l} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "14px", textAlign: "center", boxShadow: lightMode ? "0 1px 6px rgba(0,0,0,0.05)" : "none" }}>
                      <div style={{ fontFamily: T.titleFont, fontWeight: 700, fontSize: "1.4rem", color: s.c, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: "0.66rem", color: T.textMuted, marginTop: "4px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <Accordion label="Class Abilities" sublabel={`${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills · ${DATA.skillCategories.length} disciplines`} accent={T.accent} lightMode={lightMode} rpgMode={false}>
                  <SkillPills categories={DATA.skillCategories} lightMode={lightMode} T={T} rpgMode={false} />
                </Accordion>
                <Accordion label="Innate Abilities" sublabel={`${DATA.innateAbilities.reduce((a, c) => a + c.skills.length, 0)} soft skills · ${DATA.innateAbilities.length} areas`} accent={lightMode ? "#2563eb" : T.accent2} lightMode={lightMode} rpgMode={false}>
                  <SkillPills categories={DATA.innateAbilities} lightMode={lightMode} T={T} rpgMode={false} />
                </Accordion>
              </div>
            )}
          </div>
        )}

        {/* ══ GUILDS / EXPERIENCE ══ */}
        {section === "guilds" && (
          <div style={sharedContentStyle}>
            {rpgMode ? (
              <>
                <div style={{ fontSize: "0.5rem", letterSpacing: "0.28em", color: T.textMuted, marginBottom: "4px" }}>[ WORK HISTORY ]</div>
                <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "4px" }}>GUILD <span style={{ color: T.accent }}>AFFILIATIONS</span></h2>
                <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent},transparent)`, marginBottom: "24px", width: 160 }} />
                <GuildSection rpgMode={true} lightMode={lightMode} T={T} />
              </>
            ) : (
              <CVSection title="Work Experience" light={lightMode}>
                <GuildSection rpgMode={false} lightMode={lightMode} T={T} />
              </CVSection>
            )}
          </div>
        )}

        {/* ══ ACHIEVEMENTS / CERTS ══ */}
        {section === "achievements" && (
          <div style={sharedContentStyle}>
            {rpgMode ? (
              <>
                <div style={{ fontSize: "0.54rem", letterSpacing: "0.3em", color: T.textMuted, marginBottom: "5px" }}>[ MILESTONES ]</div>
                <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "5px" }}>ACHIEVEMENT <span style={{ color: T.accent }}>LOG</span></h2>
                <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent},transparent)`, marginBottom: "28px", width: 180 }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "13px" }}>
                  {DATA.achievements.map((a, i) => (
                    <div key={i} style={{ background: lightMode ? "rgba(228,234,240,0.95)" : "rgba(4,12,18,0.93)", border: `1px solid ${a.unlocked ? RARITY_COLOR[a.rarity] + "22" : "rgba(128,128,128,0.1)"}`, borderRadius: 4, padding: "18px", position: "relative", overflow: "hidden", opacity: a.unlocked ? 1 : 0.35, filter: a.unlocked ? "none" : "grayscale(0.8)", transition: "all .25s" }}>
                      {a.unlocked && <div style={{ position: "absolute", top: 9, right: 9, fontSize: "0.5rem", letterSpacing: "0.12em", color: RARITY_COLOR[a.rarity], fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>{a.rarity}</div>}
                      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{a.icon}</div>
                      <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "0.72rem", color: a.unlocked ? RARITY_COLOR[a.rarity] : T.textMuted, letterSpacing: "0.07em", marginBottom: "6px", textShadow: a.unlocked && !lightMode ? `0 0 7px ${RARITY_COLOR[a.rarity]}` : "none" }}>{a.title}</div>
                      <div style={{ fontSize: "0.68rem", color: T.text, lineHeight: 1.5, fontWeight: 300 }}>{a.desc}</div>
                      {a.unlocked && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${RARITY_COLOR[a.rarity]},transparent)` }} />}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <CVSection title="Certifications & Achievements" light={lightMode}>
                {DATA.achievements.filter(a => a.unlocked).map((a, i) => (
                  <div key={i} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "10px", display: "flex", gap: "16px", alignItems: "center", boxShadow: lightMode ? "0 1px 4px rgba(0,0,0,0.04)" : "none" }}>
                    <div style={{ fontSize: "1.6rem", flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: T.titleFont, fontWeight: 600, fontSize: "0.88rem", color: T.textStrong, marginBottom: "3px" }}>{a.cvTitle}</div>
                      <div style={{ fontSize: "0.75rem", color: T.textMuted }}>{a.desc}</div>
                    </div>
                    <span style={{ background: lightMode ? "#f0fdf4" : `${T.accent2}10`, border: `1px solid ${lightMode ? "#86efac" : `${T.accent2}30`}`, borderRadius: "4px", padding: "2px 10px", fontSize: "0.62rem", color: lightMode ? "#16a34a" : T.accent2, fontWeight: 600, whiteSpace: "nowrap" }}>{a.rarity}</span>
                  </div>
                ))}
              </CVSection>
            )}
          </div>
        )}

        {/* ══ MAP / PROJECTS ══ */}
        {section === "map" && (
          <div style={sharedContentStyle}>
            {rpgMode ? (
              <>
                <div style={{ fontSize: "0.54rem", letterSpacing: "0.3em", color: T.textMuted, marginBottom: "5px" }}>[ TERRITORIES ]</div>
                <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "5px" }}>KNOWN <span style={{ color: T.accent }}>REALMS</span></h2>
                <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent},transparent)`, marginBottom: "20px", width: 180 }} />
                <SystemPanel glowColor={T.accent} lightMode={lightMode} style={{ paddingBottom: "54%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: lightMode ? "radial-gradient(ellipse at 50% 50%,rgba(200,215,230,0.5) 0%,rgba(218,226,236,0.97) 80%)" : "radial-gradient(ellipse at 50% 50%,rgba(0,30,40,.6) 0%,rgba(2,8,14,.97) 80%)" }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${T.gridColor} 1px,transparent 1px),linear-gradient(90deg,${T.gridColor} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                    {["M20,32 Q35,26 50,20", "M50,20 Q62,29 74,38", "M20,32 Q26,48 33,65", "M33,65 Q49,66 65,68", "M74,38 Q69,53 65,68"].map((d, i) => <path key={i} d={d} stroke={`${T.accent}22`} strokeWidth="0.22" fill="none" strokeDasharray="1.5,1.5" />)}
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Oxanium',sans-serif", fontWeight: 900, fontSize: "2.8rem", letterSpacing: "0.4em", color: `${T.accent}08`, pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none" }}>THE REALMS</div>
                  <div style={{ position: "absolute", bottom: 14, right: 18, fontFamily: "'Exo 2',sans-serif", fontSize: "0.52rem", color: T.textMuted, textAlign: "center", lineHeight: 1.7, letterSpacing: "0.1em" }}>N<br /><span style={{ fontSize: "0.85rem" }}>✦</span><br />S</div>
                  <div style={{ position: "absolute", top: 11, left: 14, fontFamily: "'Exo 2',sans-serif", fontSize: "0.5rem", color: T.textMuted, letterSpacing: "0.1em" }}>[ MAP v1.0 · 5 REGIONS ]</div>
                  {DATA.regions.map(r => <WorldRegion key={r.id} region={r} onClick={setSelRegion} rpgMode={true} />)}
                </SystemPanel>
                {selRegion ? (
                  <SystemPanel glowColor={T.accent} lightMode={lightMode} style={{ padding: "14px 18px", marginTop: "14px", display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ fontSize: "1.2rem" }}>🗺</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: T.accent, marginBottom: "3px", letterSpacing: "0.07em" }}>{selRegion.name}</div>
                      <div style={{ fontSize: "0.68rem", color: T.textMuted, fontWeight: 300 }}>⚠ This realm has yet to be discovered. Return when the quest is ready, traveler.</div>
                    </div>
                    <button onClick={() => setSelRegion(null)} style={{ background: "none", border: "none", color: T.textMuted, cursor: "pointer", fontSize: "1rem" }}>✕</button>
                  </SystemPanel>
                ) : <div style={{ marginTop: "10px", fontSize: "0.57rem", color: T.textMuted, letterSpacing: "0.14em", textAlign: "center" }}>CLICK A NODE TO INSPECT REGION</div>}
              </>
            ) : (
              <CVSection title="Projects" light={lightMode}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {DATA.regions.map((r, i) => (
                    <div key={i} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "20px", boxShadow: lightMode ? "0 1px 6px rgba(0,0,0,0.05)" : "none", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${T.accent},transparent)` }} />
                      <div style={{ fontFamily: T.titleFont, fontWeight: 600, fontSize: "0.88rem", color: T.textStrong, marginBottom: "6px" }}>{r.cvName}</div>
                      <div style={{ fontSize: "0.75rem", color: T.textMuted, lineHeight: 1.6, marginBottom: "14px" }}>{r.desc}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.gold }} />
                        <span style={{ fontSize: "0.62rem", color: T.textMuted, fontWeight: 500 }}>Coming Soon</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CVSection>
            )}
          </div>
        )}

        {/* ══ CONTACT ══ */}
        {section === "contact" && (
          <div style={{ ...sharedContentStyle, maxWidth: "580px" }}>
            {rpgMode ? (
              <>
                <div style={{ fontSize: "0.54rem", letterSpacing: "0.3em", color: T.textMuted, marginBottom: "5px" }}>[ COMMUNICATION ]</div>
                <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "5px" }}>DISPATCH <span style={{ color: T.accent }}>A RAVEN</span></h2>
                <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent},transparent)`, marginBottom: "28px", width: 180 }} />
                <SystemPanel glowColor={T.accent} lightMode={lightMode} style={{ padding: "26px" }}>
                  {[{ l: "TRAVELER IDENTITY", p: "Enter your name..." }, { l: "RAVEN FREQUENCY", p: "your@email.com" }].map(f => (
                    <div key={f.l} style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.54rem", letterSpacing: "0.18em", color: T.textMuted, marginBottom: "6px" }}>{f.l}</label>
                      <input placeholder={f.p} style={{ background: `${T.accent}06`, border: `1px solid ${T.accent}25`, color: T.text, padding: "10px 13px" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "0.54rem", letterSpacing: "0.18em", color: T.textMuted, marginBottom: "6px" }}>SCROLL CONTENTS</label>
                    <textarea placeholder="Your message..." style={{ minHeight: 120, resize: "vertical", background: `${T.accent}06`, border: `1px solid ${T.accent}25`, color: T.text, padding: "10px 13px" }} />
                  </div>
                  <button style={{ background: `${T.accent}10`, border: `1px solid ${T.accent}44`, borderRadius: 3, padding: "11px 28px", color: T.accent, fontFamily: "'Oxanium',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", cursor: "pointer", transition: "all .22s" }}>▶ DISPATCH RAVEN</button>
                </SystemPanel>
              </>
            ) : (
              <>
                <CVSection title="Contact" light={lightMode}>
                  <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "28px", boxShadow: lightMode ? "0 1px 8px rgba(0,0,0,0.06)" : "none" }}>
                    {[{ l: "Your Name", p: "Full name" }, { l: "Email Address", p: "your@email.com" }].map(f => (
                      <div key={f.l} style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, marginBottom: "6px" }}>{f.l}</label>
                        <input placeholder={f.p} style={{ background: lightMode ? "#f8fafc" : "rgba(255,255,255,0.03)", border: `1px solid ${T.cardBorder}`, color: T.text, padding: "10px 13px", borderRadius: "6px" }} />
                      </div>
                    ))}
                    <div style={{ marginBottom: "22px" }}>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, marginBottom: "6px" }}>Message</label>
                      <textarea placeholder="How can I help you?" style={{ minHeight: 120, resize: "vertical", background: lightMode ? "#f8fafc" : "rgba(255,255,255,0.03)", border: `1px solid ${T.cardBorder}`, color: T.text, padding: "10px 13px", borderRadius: "6px" }} />
                    </div>
                    <button style={{ background: T.accent, border: "none", borderRadius: "6px", padding: "11px 28px", color: "#fff", fontFamily: T.titleFont, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all .22s" }}>Send Message</button>
                  </div>
                </CVSection>
              </>
            )}
          </div>
        )}
        </div>{/* content-col */}
        </div>{/* sidebar-layout */}
      </main>
    </div>
  );
}
