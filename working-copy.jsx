import { useState, useEffect, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────
const DATA = {
  name: "ERWIN TAYAG",
  title: "Software Developer (.NET / C#)",
  rpgTitle: "RELIC ARCHMAGE",
  location: "Capas, Tarlac, Philippines",
  phone: "+63 92# 541 ####",
  linkedin: "https://www.linkedin.com/in/tayag-erwin-macale/",
  github: "https://github.com/erwintayag",
  primaryStack: ".NET · C#",   // shown in Classic sidebar career snapshot
  tagline: "They said the stack was legacy. I made it legend.",
  taglineCV: "Enterprise-forged. Delivered at scale. Still shipping.",
  rpgSummary: "Eleven years forged in the trenches of enterprise .NET — where legacy systems don't retire, they get rewritten. A seasoned arcanist who has bent SQL Server to his will, conjured stability from WebForms chaos, and automated the workflows that once consumed entire teams. Every dungeon cleared with C# in hand and production logs ablaze.",
  skillCategories: [
    {
      id: "backend", label: "Backend", rpgLabel: "Arcane Arts",
      color: "#00d4ff",
      skills: ["C#", ".NET Framework", "ASP.NET WebForms", "ASP.NET MVC", "OWIN", "RESTful API Development", "Swagger / OpenAPI"],
    },
    {
      id: "frontend", label: "Frontend", rpgLabel: "Illusion Craft",
      color: "#b06aff",
      skills: ["HTML5", "CSS3", "JavaScript"],
    },
    {
      id: "database", label: "Database", rpgLabel: "Rune Storage",
      color: "#f4c542",
      skills: ["SQL Server", "PostgreSQL", "Oracle", "Stored Procedures", "Query Optimization", "Data Modeling"],
    },
    {
      id: "tools", label: "Tools & Platforms", rpgLabel: "Relics & Artifacts",
      color: "#ff3356",
      skills: ["Git", "GitHub", "Postman", "Power BI", "Jasper Reports", "amCharts"],
    },
    {
      id: "practices", label: "Dev Practices", rpgLabel: "Ancient Disciplines",
      color: "#5eead4",
      skills: ["Legacy System Modernization", "Business Process Automation", "SDLC / Agile Collaboration", "Production Support & Debugging"],
    },
  ],
  innateAbilities: [
    { id: "solver", label: "Problem Solver", rpgLabel: "Dungeon Breaker", color: "#00d4ff", skills: ["Root Cause Analysis", "Debugging", "Architecture Decisions", "Workaround Design", "Trade-off Evaluation", "Incident Response"] },
    { id: "pragmatist", label: "Pragmatist", rpgLabel: "Iron Realist", color: "#f4c542", skills: ["Scope Management", "MVP Thinking", "Technical Debt Awareness", "Delivery-Focused", "Risk Assessment", "Done > Perfect"] },
    { id: "learner", label: "Fast Learner", rpgLabel: "Lore Seeker", color: "#b06aff", skills: ["Self-Taught Stack Transitions", "Cross-domain Projects", "Rapid Prototyping", "Tech Stack Transitions", "Picks Up Docs Fast"] },
    { id: "communicator", label: "Communicator", rpgLabel: "Runic Tongue", color: "#ff3356", skills: ["Stakeholder Reporting", "Technical Writing", "Cross-team Collaboration", "Client Demos", "Non-tech Explanations"] },
    { id: "ownership", label: "Ownership Mindset", rpgLabel: "Solo Carry", color: "#5eead4", skills: ["End-to-end Delivery", "Proactive Issue Flagging", "Beyond Job Scope", "Post-launch Support", "Accountability"] },
    { id: "pressure", label: "Pressure-Tested", rpgLabel: "Last Stand", color: "#ff8c00", skills: ["Tight Deadline Delivery", "Production Incident Handling", "Multi-project Juggling", "High-stakes Deployments"] },
  ],
  summary: "Software Developer with 11+ years of experience building and maintaining enterprise web and desktop applications using C#, ASP.NET WebForms / MVC, and SQL Server. Most of my work involves supporting and improving legacy systems, optimizing databases, and automating everyday business processes. I'm comfortable working independently or with remote teams and focus on delivering practical, reliable solutions.",
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "Tarlac State University",
    honors: ["Cum Laude", "Best in Thesis Awardee"],
    rpgSchool: "Amplus Citadel of Arcane Learning",
    rpgHonors: "Arcane Laureate · Scroll Sovereign",
  },
  careerStart: "2013-09-01",
  guilds: [
    {
      name: "MVP Asia Pacific, Inc.", cvName: "MVP Asia Pacific, Inc.",
      role: ".NET Developer", rpgRole: "Siege Arcanist",
      start: "2022-05-01", end: null,
      desc: "Maintains and enhances enterprise web applications built on C#, ASP.NET WebForms, and MVC. Handles L2/L3 production support and collaborates with remote cross-functional teams to deliver reliable solutions.",
      rpgDesc: "Stationed at the citadel's core, keeping its most critical arcane constructs alive and battle-ready. Called upon when production crumbles — root causes hunted, stability restored, WebForms relics preserved against all odds.",
      bullets: [
        "Maintains, enhances, and debugs enterprise web applications built on C#, ASP.NET WebForms, and MVC — including long-standing legacy codebases",
        "Designs and implements new system features to meet evolving business requirements",
        "Handles L2/L3 production support — diagnosing issues under pressure and keeping systems reliable",
        "Collaborates with remote cross-functional teams to deliver solutions on schedule",
        "Refactors and stabilizes existing code to reduce recurring defects and chip away at technical debt",
      ],
      rpgBullets: [
        "Maintains and purges corruption from ancient WebForms relics and MVC constructs — the kind other conjurers dread to touch",
        "Shapes new arcane constructs from raw business intent, translating guild mandates into working enchantments",
        "Answers the L2/L3 distress signal when production crumbles — calm under siege, root causes identified fast",
        "Coordinates with scattered war parties across remote outposts, delivering on time despite the distance",
        "Reforges brittle spellwork — closing loops, reducing instability, and trimming the debt that haunts every old dungeon",
      ],
      tech: ["C#", "ASP.NET WebForms", "ASP.NET MVC", "SQL Server", "OWIN", "Swagger / OpenAPI"],
    },
    {
      name: "Yokohama Tire Philippines, Inc.", cvName: "Yokohama Tire Philippines, Inc.",
      role: "Software Developer", rpgRole: "Guild Artificer",
      start: "2017-07-01", end: "2022-05-01",
      desc: "Built and maintained internal web and desktop applications using .NET technologies. Standardized databases, automated manual workflows, and worked closely with stakeholders to turn business needs into working software.",
      rpgDesc: "Served the guild's inner machinery — forging .NET constructs for the web and desktop, cleansing chaotic data vaults, and replacing tedious manual rituals with automated spells that ran while others slept.",
      bullets: [
        "Built and maintained internal web and desktop applications using .NET technologies across multiple departments",
        "Standardized and optimized company databases, improving data consistency and reporting accuracy",
        "Automated manual workflows, cutting processing time and reducing human error",
        "Supported system upgrades and continuous improvement initiatives across the organization",
        "Worked closely with stakeholders to translate business requirements into technical solutions",
      ],
      rpgBullets: [
        "Forged and maintained internal web and desktop constructs that kept the guild's daily operations running",
        "Cleansed and standardized the data vaults — bringing order to chaotic records and making reports trustworthy again",
        "Replaced tedious manual rituals with automated spells — hours of toil condensed into seconds",
        "Guided system upgrades through treacherous version migrations without breaking what was already working",
        "Bridged the gap between guild elders and the arcane — translating business decrees into functional enchantments",
      ],
      tech: ["C#", ".NET Framework", "ASP.NET WebForms", "Power BI", "ASP.NET MVC", "Oracle"],
    },
    {
      name: "ZGetcare Systems, Inc.", cvName: "ZGetcare Systems, Inc.",
      role: "Database Administrator", rpgRole: "Rune Carver",
      start: "2013-09-01", end: "2017-07-01",
      desc: "Designed and optimized SQL queries and stored procedures for production systems. Built client-facing reports and kept databases performant and scalable while supporting application teams with data issues.",
      rpgDesc: "First steps into the arcane taken here — carving runes into data vaults, shaping the scrolls clients relied on, and learning that a slow query is just a dungeon waiting to be cleared.",
      bullets: [
        "Designed, wrote, and optimized SQL queries and stored procedures for production systems",
        "Built and improved client-facing reports, ensuring data accuracy and clear presentation",
        "Maintained database performance and scalability as data volumes grew over time",
        "Supported application teams with data-related issues, from query debugging to schema questions",
      ],
      rpgBullets: [
        "Carved runes deep into the data vaults — crafting queries and stored procedures that ran fast and true",
        "Built the scrolls clients read to understand their world — reports shaped with precision and care",
        "Kept the ancient data stones stable and scalable as the guild's records grew heavier each season",
        "Served as oracle for application squads — answering their data riddles and untangling schema knots",
      ],
      tech: ["Java", "PostgreSQL", "PL/SQL", "Jasper Reports"],
    },
  ],
  regions: [
    { id: 1, name: "The Arcane Forge", cvName: "Tools & Utilities", desc: "A crafting & developer tools project", x: 20, y: 32 },
    { id: 2, name: "The Iron Guild", cvName: "Enterprise Portal", desc: "Enterprise solutions portal", x: 50, y: 20 },
    { id: 3, name: "The Ember Sanctum", cvName: "Creative Lab", desc: "Creative experiments and prototypes", x: 74, y: 38 },
    { id: 4, name: "The Shadow Market", cvName: "SaaS Project", desc: "SaaS project — coming soon", x: 33, y: 65 },
    { id: 5, name: "The Crystal Spire", cvName: "Open Source", desc: "Open source contributions", x: 65, y: 68 },
  ],
};

const RARITY_COLOR = { LEGENDARY: "#f4c542", EPIC: "#b06aff", RARE: "#00d4ff" };

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
  // Expanded logical canvas with overflow:visible lets labels breathe outside the polygon area
  const VB = 200;
  const cx = 100;
  const cy = 100;
  const maxR = 44;       // slightly tighter polygon leaves more label room
  const labelR = 65;     // anchor radius — labels rarely exceed VB when anchored here
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", overflow: "visible" }}>
      {title && (
        <div style={{ fontSize: "0.44rem", letterSpacing: "0.14em", color: accent, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "3px", textTransform: "uppercase", opacity: 0.75, textAlign: "center" }}>
          {title}
        </div>
      )}
      {/* overflow:visible lets text labels render outside the SVG bounding box */}
      <div style={{ padding: "0 16px", overflow: "visible", width: "100%", display: "flex", justifyContent: "center" }}>
        <svg width={renderSize} height={renderSize} viewBox={`0 0 ${VB} ${VB}`} style={{ display: "block", overflow: "visible" }}>
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
          {/* Axis labels — overflow:visible means these render outside SVG box safely */}
          {categories.map((cat, i) => {
            const lp = point(i, labelR);
            const anchor = lp.x < cx - 6 ? "end" : lp.x > cx + 6 ? "start" : "middle";
            const label = rpgMode ? cat.rpgLabel : cat.label;
            const words = label.split(" ");
            const mid = Math.ceil(words.length / 2);
            const l1 = words.slice(0, mid).join(" ");
            const l2 = words.slice(mid).join(" ");
            const lineH = 10;
            const baseY = l2 ? lp.y - lineH * 0.45 : lp.y + 3;
            return (
              <g key={i}>
                <text x={lp.x} y={baseY} textAnchor={anchor}
                  style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "8px", fontWeight: 700, fill: labelColor, letterSpacing: "0.01em" }}>
                  {l1}
                </text>
                {l2 && (
                  <text x={lp.x} y={baseY + lineH} textAnchor={anchor}
                    style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "8px", fontWeight: 700, fill: labelColor, letterSpacing: "0.01em" }}>
                    {l2}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── DUAL SPIDER CHART (responsive) ──────────────────────────────────────
function DualSpiderChart({ skillCategories, innateAbilities, lightMode, accent, rpgMode }) {
  const innateAccent = lightMode ? "#8a6800" : "#ffd700";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0px", alignItems: "center", width: "100%" }}>
      <div style={{ fontSize: "0.42rem", letterSpacing: "0.14em", color: `${accent}88`, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "2px", textTransform: "uppercase", textAlign: "center" }}>
        {rpgMode ? "· Arcane Disciplines ·" : "· Technical ·"}
      </div>
      <SpiderChart
        categories={skillCategories} lightMode={lightMode} accent={accent}
        rpgMode={rpgMode} title=""
        maxSkills={Math.max(...skillCategories.map(c => c.skills.length))}
        size={160}
      />
      <div style={{ height: "1px", background: `${accent}14`, width: "55%", alignSelf: "center", margin: "4px 0" }} />
      <div style={{ fontSize: "0.42rem", letterSpacing: "0.14em", color: `${innateAccent}88`, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "2px", textTransform: "uppercase", textAlign: "center" }}>
        {rpgMode ? "· Passive Enchantments ·" : "· Soft Skills ·"}
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
function Accordion({ label, sublabel, accent, lightMode, rpgMode, children, defaultOpen = false, bg }) {
  const [open, setOpen] = useState(defaultOpen);
  const borderColor = lightMode ? `${accent}30` : `${accent}22`;
  const headerBg = open ? (lightMode ? `${accent}0d` : `${accent}08`) : "transparent";
  const panelBg = bg || (lightMode ? "rgba(232,228,242,0.97)" : "rgba(6,14,26,0.97)");
  return (
    <div style={{ border: `1px solid ${borderColor}`, borderRadius: "4px", marginBottom: "10px", overflow: "hidden", background: panelBg }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", cursor: "pointer", background: headerBg, transition: "background 0.22s", userSelect: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: rpgMode ? "0.14em" : "0.04em", color: accent, textTransform: rpgMode ? "uppercase" : "none" }}>
            {label}
          </span>
          {sublabel && <span style={{ fontSize: "0.55rem", color: lightMode ? "#6b8090" : "rgba(160,200,210,0.4)", letterSpacing: "0.06em" }}>{sublabel}</span>}
        </div>
        <span style={{ fontSize: "0.65rem", color: accent, display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)" }}>▾</span>
      </div>
      {/*
        CSS grid trick: 0fr→1fr transitions to the REAL content height — no stutter.
        cubic-bezier(0.16,1,0.3,1): aggressive ease-in, long silky ease-out — premium feel.
      */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.44s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            padding: "14px 16px 16px",
            borderTop: `1px solid ${borderColor}`,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transitionDelay: open ? "0.08s" : "0s",
          }}>
            {children}
          </div>
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
          ? (cat.color === "#00d4ff" ? "#0e5e7a"
            : cat.color === "#b06aff" ? "#6b21d0"
              : cat.color === "#f4c542" ? "#8a6800"
                : cat.color === "#ff3356" ? "#b01030"
                  : cat.color === "#5eead4" ? "#0d7a6a"
                    : cat.color === "#ff8c00" ? "#8a4a00"
                      : cat.color)
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


// ─── MODE TRANSITION ─────────────────────────────────────────────────────
function ModeTransition({ active, isDark, toImmersive }) {
  if (!active) return null;

  const mainText = toImmersive ? "ENTERING IMMERSIVE MODE" : "ENTERING CLASSIC MODE";
  const subText = isDark
    ? (toImmersive ? "[ SHADOW DOMAIN INITIALIZING ]" : "[ PROFESSIONAL VIEW LOADING ]")
    : (toImmersive ? "[ DIMENSIONAL SHIFT INITIALIZING ]" : "[ PROFESSIONAL VIEW LOADING ]");

  const rings = [...Array(5)].map((_, i) => ({
    delay: 0.1 + i * 0.07, size: 80 + i * 120,
  }));

  if (isDark) {
    // ── SHADOW DOMAIN — dark theme ── matches RPG Dark: #060c16 bg, #00d4ff cyan, #b06aff violet
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}>
        {/* Background — same dark blue-black as RPG Dark site bg */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%, #040e1c 0%, #060c16 40%, rgba(4,8,20,0.99) 100%)", animation: "shadowDomainVoid 0.75s cubic-bezier(0.7,0,0.3,1) both" }} />
        {/* Cyan glow layer */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,212,255,0.1) 0%, transparent 70%)", animation: "shadowDomainVoid 0.75s cubic-bezier(0.7,0,0.3,1) both", animationDelay: "0.03s" }} />
        {rings.map((r, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: r.size, height: r.size, marginTop: -r.size / 2, marginLeft: -r.size / 2, borderRadius: "50%", border: `1px solid rgba(0,212,255,${0.15 - i * 0.025})`, animation: "smokeRing 0.75s ease-out both", animationDelay: `${r.delay}s` }} />
        ))}
        {/* Center orb — cyan to violet, matches brand accent → accent2 */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 80, height: 80, marginTop: -40, marginLeft: -40, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.7) 0%, rgba(176,106,255,0.4) 50%, transparent 100%)", animation: "centerOrb 0.75s ease both", filter: "blur(6px)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
          {/* Text — #00d4ff electric cyan, matching T.accent in RPG Dark */}
          <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 900, fontSize: "0.72rem", letterSpacing: "0.45em", color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.95), 0 0 50px rgba(0,212,255,0.4)", animation: "monarchText 0.75s ease both", textTransform: "uppercase" }}>{mainText}</div>
          {/* Underlines — 322px container (+15%), cyan primary / violet secondary / faint cyan tertiary */}
          <div style={{ width: "322px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ width: "100%", height: "1.5px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.05s", boxShadow: "0 0 10px rgba(0,212,255,0.7)" }} />
            <div style={{ width: "72%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(176,106,255,0.7), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.10s" }} />
            <div style={{ width: "44%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.14s" }} />
          </div>
          <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.45rem", letterSpacing: "0.3em", color: "rgba(0,212,255,0.5)", animation: "monarchText 0.75s ease both", animationDelay: "0.08s" }}>{subText}</div>
        </div>
      </div>
    );
  }

  // ── LIGHT REVEAL — light theme ── matches RPG Light (#edeaf4 / #1565a0) and CV Light (#f8fafc / #2563eb)
  const pageRings = [...Array(4)].map((_, i) => ({
    delay: 0.08 + i * 0.08, size: 100 + i * 130,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}>
      {/* Background — cool blue-white, neutral between edeaf4 and f8fafc */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 75% 75% at 50% 50%, #f0f4ff 0%, #eceef8 40%, rgba(240,244,255,0.97) 100%)", animation: "parchmentBloom 0.75s cubic-bezier(0.7,0,0.3,1) both" }} />
      {/* Blue inner glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(37,99,235,0.10) 0%, transparent 70%)", animation: "parchmentBloom 0.75s cubic-bezier(0.7,0,0.3,1) both", animationDelay: "0.02s" }} />
      {pageRings.map((r, i) => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: r.size, height: r.size, marginTop: -r.size / 2, marginLeft: -r.size / 2, borderRadius: "50%", border: `1px solid rgba(37,99,235,${0.12 - i * 0.025})`, animation: "smokeRing 0.75s ease-out both", animationDelay: `${r.delay}s` }} />
      ))}
      {/* Center orb — brand blue to violet, mirrors light accent colors */}
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 90, height: 90, marginTop: -45, marginLeft: -45, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(124,58,237,0.25) 50%, transparent 100%)", animation: "centerOrb 0.75s ease both", filter: "blur(8px)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
        {/* Text — deep brand blue, works for both RPG Light and CV Light */}
        <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 900, fontSize: "0.72rem", letterSpacing: "0.45em", color: "#1e40af", textShadow: "0 0 16px rgba(37,99,235,0.5), 0 1px 0 rgba(255,255,255,0.9)", animation: "monarchText 0.75s ease both", textTransform: "uppercase" }}>{mainText}</div>
        {/* Underlines — 322px container (+15%), blue primary / violet secondary / faint blue tertiary */}
        <div style={{ width: "322px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
          <div style={{ width: "100%", height: "1.5px", background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.9), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.05s", boxShadow: "0 0 8px rgba(37,99,235,0.4)" }} />
          <div style={{ width: "72%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.65), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.10s" }} />
          <div style={{ width: "44%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)", transformOrigin: "center", animation: "underlineGrow 0.75s ease both", animationDelay: "0.14s" }} />
        </div>
        <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.45rem", letterSpacing: "0.3em", color: "rgba(30,64,175,0.6)", animation: "monarchText 0.75s ease both", animationDelay: "0.08s" }}>{subText}</div>
      </div>
    </div>
  );
}


// ─── RPG COMPONENTS ───────────────────────────────────────────────────────
function ScanlineOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 500, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.006) 2px, rgba(0,212,255,0.006) 4px)" }} />;
}

function SystemParticles({ opacity = 0.4, color = "#00d4ff", color2 = "#b06aff" }) {
  // ── ZONE 1: Bottom strip (y 80–97%) — densest, full drift upward ──
  // These feel like embers rising from the floor. 14 motes spread full width.
  const bottomMotes = [
    { left: "3%", top: "94%", size: 2, dur: 8, delay: 0, col: color, pOp: "0.70" },
    { left: "11%", top: "88%", size: 1.5, dur: 10.5, delay: 1.2, col: color2, pOp: "0.60" },
    { left: "19%", top: "93%", size: 1, dur: 7.5, delay: 2.6, col: color, pOp: "0.65" },
    { left: "27%", top: "86%", size: 2.5, dur: 9, delay: 0.8, col: color2, pOp: "0.55" },
    { left: "35%", top: "91%", size: 1.5, dur: 11, delay: 3.1, col: color, pOp: "0.70" },
    { left: "44%", top: "95%", size: 1, dur: 8.5, delay: 1.7, col: color2, pOp: "0.60" },
    { left: "52%", top: "83%", size: 2, dur: 9.5, delay: 0.3, col: color, pOp: "0.65" },
    { left: "61%", top: "90%", size: 1.5, dur: 10, delay: 2.2, col: color2, pOp: "0.55" },
    { left: "69%", top: "96%", size: 1, dur: 7.8, delay: 3.8, col: color, pOp: "0.70" },
    { left: "77%", top: "84%", size: 2, dur: 9.2, delay: 1.4, col: color2, pOp: "0.60" },
    { left: "85%", top: "92%", size: 1.5, dur: 8.2, delay: 0.6, col: color, pOp: "0.65" },
    { left: "92%", top: "87%", size: 1, dur: 10.8, delay: 2.9, col: color2, pOp: "0.55" },
    { left: "7%", top: "82%", size: 2, dur: 9.8, delay: 4.2, col: color, pOp: "0.60" },
    { left: "96%", top: "81%", size: 1.5, dur: 8.8, delay: 1.9, col: color2, pOp: "0.50" },
  ];

  // ── ZONE 2: Side edges (x 0–9% and x 91–100%, y 18–78%) — medium, anchored glimmers ──
  const edgeSparks = [
    { left: "2%", top: "22%", size: 1.5, dur: 5.5, delay: 0.5, col: color, pOp: "0.40" },
    { left: "5%", top: "40%", size: 1, dur: 7, delay: 2.1, col: color2, pOp: "0.35" },
    { left: "1%", top: "58%", size: 2, dur: 4.8, delay: 1.3, col: color, pOp: "0.42" },
    { left: "8%", top: "72%", size: 1, dur: 6.2, delay: 3.4, col: color2, pOp: "0.30" },
    { left: "93%", top: "28%", size: 1.5, dur: 5.8, delay: 0.9, col: color, pOp: "0.40" },
    { left: "97%", top: "46%", size: 1, dur: 7.2, delay: 2.7, col: color2, pOp: "0.35" },
    { left: "91%", top: "63%", size: 2, dur: 4.5, delay: 1.8, col: color, pOp: "0.42" },
    { left: "95%", top: "75%", size: 1, dur: 6.5, delay: 3.9, col: color2, pOp: "0.28" },
  ];

  // ── ZONE 3: Mid band (y 52–76%, x 10–90%) — sparse, soft transition layer ──
  const midGlimmers = [
    { left: "14%", top: "55%", size: 1, dur: 6.8, delay: 1.1, col: color, pOp: "0.22" },
    { left: "30%", top: "68%", size: 1.5, dur: 8, delay: 2.8, col: color2, pOp: "0.18" },
    { left: "48%", top: "74%", size: 1, dur: 5.5, delay: 0.7, col: color, pOp: "0.20" },
    { left: "66%", top: "60%", size: 1.5, dur: 7.5, delay: 3.3, col: color2, pOp: "0.18" },
    { left: "82%", top: "71%", size: 1, dur: 6.2, delay: 1.6, col: color, pOp: "0.22" },
    { left: "22%", top: "76%", size: 1, dur: 9, delay: 4.5, col: color2, pOp: "0.16" },
    { left: "73%", top: "53%", size: 1, dur: 5.8, delay: 0.4, col: color, pOp: "0.20" },
  ];

  // ── ZONE 4: Center (y 22–50%, x 22–78%) — faintest, just enough to feel alive ──
  const centerGlimmers = [
    { left: "28%", top: "28%", size: 1, dur: 7, delay: 1.5, col: color, pOp: "0.11" },
    { left: "45%", top: "38%", size: 1, dur: 9.5, delay: 3.2, col: color2, pOp: "0.09" },
    { left: "62%", top: "25%", size: 1, dur: 6.5, delay: 0.9, col: color, pOp: "0.10" },
    { left: "38%", top: "48%", size: 1, dur: 8.2, delay: 4.1, col: color2, pOp: "0.08" },
    { left: "55%", top: "44%", size: 1, dur: 7.8, delay: 2.4, col: color, pOp: "0.11" },
    { left: "72%", top: "35%", size: 1, dur: 10, delay: 1.1, col: color2, pOp: "0.08" },
  ];

  const renderDrift = (p, k) => (
    <div key={k} style={{
      position: "absolute", left: p.left, top: p.top,
      width: p.size, height: p.size, borderRadius: "50%",
      background: p.col,
      boxShadow: `0 0 ${p.size * 3}px ${p.col}, 0 0 ${p.size * 6}px ${p.col}55`,
      animation: `driftUp ${p.dur}s ease-in-out infinite`,
      animationDelay: `${p.delay}s`,
      "--p-op": p.pOp,
      opacity: 0,
    }} />
  );

  const renderGlimmer = (p, k) => (
    <div key={k} style={{
      position: "absolute", left: p.left, top: p.top,
      width: p.size, height: p.size, borderRadius: "50%",
      background: p.col,
      boxShadow: `0 0 ${p.size * 4}px ${p.col}`,
      animation: `glimmer ${p.dur}s ease-in-out infinite`,
      animationDelay: `${p.delay}s`,
      "--p-op": p.pOp,
      opacity: parseFloat(p.pOp) * 0.3,
    }} />
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {/* Zone 1 — bottom strip: drift upward, most visible */}
      {bottomMotes.map((p, i) => renderDrift(p, `b${i}`))}
      {/* Zone 2 — side edges: stationary glimmer, medium opacity */}
      {edgeSparks.map((p, i) => renderGlimmer(p, `e${i}`))}
      {/* Zone 3 — mid band: faint glimmer, transition layer */}
      {midGlimmers.map((p, i) => renderGlimmer(p, `m${i}`))}
      {/* Zone 4 — center: barely-there, just enough to feel alive */}
      {centerGlimmers.map((p, i) => renderGlimmer(p, `c${i}`))}
    </div>
  );
}

function SystemPanel({ children, style = {}, glowColor = "#00d4ff", lightMode = false, overflowHidden = true }) {
  const corners = ["tl", "tr", "bl", "br"];
  const inkColor = lightMode ? `${glowColor}cc` : glowColor;
  const panelBg = lightMode ? "rgba(232,228,242,0.96)" : "rgba(6,14,26,0.95)";
  const shadow = lightMode
    ? `0 2px 12px ${glowColor}18, inset 0 0 12px rgba(0,0,0,0.03)`
    : `0 0 18px ${glowColor}10, inset 0 0 24px rgba(0,0,0,0.5)`;
  return (
    <div style={{ background: panelBg, border: `1px solid ${glowColor}${lightMode ? "33" : "22"}`, borderRadius: "4px", position: "relative", overflow: overflowHidden ? "hidden" : "visible", boxShadow: shadow, ...style }}>
      {corners.map(c => <div key={c} style={{ position: "absolute", top: c[0] === "t" ? 0 : "auto", bottom: c[0] === "b" ? 0 : "auto", left: c[1] === "l" ? 0 : "auto", right: c[1] === "r" ? 0 : "auto", width: 9, height: 9, borderTop: c[0] === "t" ? `1px solid ${inkColor}` : "none", borderBottom: c[0] === "b" ? `1px solid ${inkColor}` : "none", borderLeft: c[1] === "l" ? `1px solid ${inkColor}` : "none", borderRight: c[1] === "r" ? `1px solid ${inkColor}` : "none" }} />)}
      {children}
    </div>
  );
}


// ─── GUILD TIMELINE + CARD FLING ──────────────────────────────────────────
function GuildSection({ rpgMode, lightMode, T }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);       // bumped to retrigger animation
  const [direction, setDirection] = useState(1);   // 1 = forward, -1 = backward

  const accentFor = (i) => {
    const isAct = !DATA.guilds[i].end;
    const base = isAct ? T.accent : (i === 1 ? T.gold : T.accent2);
    if (!lightMode) return base;
    // Correct light-mode dark variants for visibility
    return isAct ? "#1565a0" : i === 1 ? "#92660a" : "#6d28d9";
  };

  const select = (i) => {
    if (i === activeIdx) return;
    setDirection(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
    setAnimKey(k => k + 1);
  };

  const guild = DATA.guilds[activeIdx];
  const stats = useGuildStats(guild.start, guild.end);
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
          background: linear-gradient(90deg, transparent, var(--scan-color, #00d4ff), transparent);
          animation: sysScan 0.38s linear both;
          pointer-events: none;
          z-index: 10;
        }
        @keyframes xpFill {
          from { width: 0%; }
          to   { width: var(--xp-target, 0%); }
        }
        .timeline-node { transition: all 0.22s; cursor: pointer; }
        .timeline-node:hover .node-ring { opacity: 0.7 !important; transform: scale(1.18); }
      `}</style>

      {/* ── TIMELINE ── */}
      <div style={{ marginBottom: "28px" }}>
        {/* Circles row — spine runs only through this row */}
        <div style={{ position: "relative", height: "32px", marginBottom: "10px" }}>
          {/* Spine — absolutely fills the circles row, truly pierces nodes */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: "1px",
            background: rpgMode
              ? `linear-gradient(90deg, ${T.accent}55, ${T.gold}55, ${T.accent2}55)`
              : `linear-gradient(90deg, ${T.accent}40, ${T.accent}20, transparent)`,
            transform: "translateY(-50%)", zIndex: 0
          }} />

          {/* Nodes row — same flex, z-index above the spine */}
          <div style={{
            display: "flex", justifyContent: "space-between", height: "100%",
            position: "relative", zIndex: 2
          }}>
            {DATA.guilds.map((g, i) => {
              const ac = accentFor(i);
              const isSelected = i === activeIdx;
              return (
                <div key={i} className="timeline-node" onClick={() => select(i)}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Pulse ring */}
                  <div className="node-ring" style={{
                    position: "absolute", width: isSelected ? 36 : 24,
                    height: isSelected ? 36 : 24, borderRadius: "50%",
                    border: `1px solid ${ac}`, opacity: isSelected ? 0.45 : 0.12,
                    boxShadow: isSelected ? `0 0 14px ${ac}55` : "none",
                    transition: "all 0.28s"
                  }} />
                  {/* Core dot */}
                  <div style={{
                    width: isSelected ? 20 : 12, height: isSelected ? 20 : 12,
                    borderRadius: "50%", zIndex: 3, position: "relative",
                    background: isSelected
                      ? ac
                      : (lightMode ? `${ac}33` : `${ac}28`),
                    border: `2px solid ${ac}`,
                    boxShadow: isSelected
                      ? `0 0 12px ${ac}, 0 0 24px ${ac}44, inset 0 0 6px ${ac}66`
                      : "none",
                    transition: "all 0.28s"
                  }} />
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
                style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center", padding: "0 4px"
                }}>
                <div style={{
                  fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
                  fontWeight: isSelected ? 700 : 400, fontSize: "0.58rem",
                  color: isSelected ? ac : T.textMuted,
                  letterSpacing: rpgMode ? "0.05em" : "0.01em",
                  lineHeight: 1.3, marginBottom: "2px", transition: "color 0.22s"
                }}>
                  {rpgMode ? g.name : g.cvName}
                </div>
                <div style={{ fontSize: "0.44rem", color: T.textMuted, letterSpacing: "0.04em", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                  {gStats.period}
                </div>
                {rpgMode && (
                  <div style={{
                    fontFamily: "'Oxanium',sans-serif", fontWeight: 700,
                    fontSize: "0.48rem", color: `${ac}77`, letterSpacing: "0.1em", marginTop: "2px"
                  }}>
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
            style={{ '--glow': `${accent}44`, animation: isActive ? "panelPulse 5s ease-in-out infinite" : "none" }}>
            <div style={{ padding: "20px 22px" }}>
              {/* Card header — single clean row, no duplication */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 4,
                    background: lightMode ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.5)",
                    border: `1px solid ${accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", boxShadow: `0 0 10px ${accent}22`
                  }}>
                    {isActive ? "⚔" : "⚜"}
                  </div>
                  <div style={{
                    fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.56rem",
                    color: accent, letterSpacing: "0.1em",
                    textShadow: lightMode ? "none" : `0 0 6px ${accent}`
                  }}>
                    LV.{stats.level}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "3px" }}>
                    <span style={{
                      fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "0.88rem",
                      color: T.textStrong, letterSpacing: "0.05em"
                    }}>
                      {guild.rpgRole}
                    </span>
                    {isActive && (
                      <span style={{
                        fontFamily: "'Exo 2',sans-serif", fontSize: "0.48rem",
                        letterSpacing: "0.14em", color: lightMode ? "#15803d" : "#22c55e",
                        border: `1px solid ${lightMode ? "#15803d" : "#22c55e"}44`, borderRadius: 2, padding: "1px 6px",
                        display: "inline-flex", alignItems: "center", gap: "4px"
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: lightMode ? "#15803d" : "#22c55e", boxShadow: `0 0 6px ${lightMode ? "#15803d" : "#22c55e"}`, display: "inline-block", animation: "pulseR 1.8s ease-in-out infinite" }} />
                        ACTIVE GUILD
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.62rem", color: `${accent}cc`, letterSpacing: "0.04em", marginBottom: "8px" }}>
                    {guild.name} · {stats.period} · {stats.totalYears} yrs
                  </div>
                  {/* XP bar — CSS animation, no JS stutter */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", fontSize: "0.44rem",
                    color: T.textMuted, letterSpacing: "0.08em", marginBottom: "2px"
                  }}>
                    <span>GUILD EXP</span><span>{stats.xp.toFixed(0)} / 100</span>
                  </div>
                  <div style={{ height: 3, background: `${accent}14`, borderRadius: 2, overflow: "hidden" }}>
                    <div key={`xp-${animKey}`} style={{
                      height: "100%",
                      "--xp-target": `${stats.xp}%`,
                      background: `linear-gradient(90deg,${accent}55,${accent})`,
                      boxShadow: lightMode ? "none" : `0 0 6px ${accent}88`,
                      animation: "xpFill 1.2s cubic-bezier(0.4,0,0.2,1) both",
                    }} />
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
                    <li key={bi} style={{ fontSize: "0.78rem", color: T.text, lineHeight: 1.7, fontWeight: 300, listStyleType: "none", }}>
                      <span style={{ color: accent, marginRight: "6px" }}>▸</span>{b}
                    </li>
                  ))}
                </ul>
              )}
              {/* Tech pills */}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {guild.tech.map(t => (
                  <span key={t} style={{
                    background: `${accent}10`, border: `1px solid ${accent}28`,
                    borderRadius: 2, padding: "2px 8px", fontSize: "0.56rem",
                    color: accent, fontFamily: "'Exo 2',sans-serif", fontWeight: 500
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </SystemPanel>
        ) : (
          /* ── CV CARD ── */
          <div style={{
            background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px",
            boxShadow: lightMode ? "0 2px 12px rgba(0,0,0,0.06)" : "none", overflow: "hidden"
          }}>
            <div style={{ height: "3px", background: `linear-gradient(90deg,${accent},transparent)` }} />
            <div style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "6px",
                    background: lightMode ? `${accent}12` : `${accent}10`,
                    border: `1px solid ${accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem"
                  }}>
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
                      <span style={{
                        fontSize: "0.6rem", color: lightMode ? "#15803d" : "#22c55e",
                        background: lightMode ? "#15803d12" : "#22c55e12",
                        border: `1px solid ${lightMode ? "#15803d" : "#22c55e"}33`, borderRadius: 3, padding: "1px 7px", fontWeight: 600,
                        display: "inline-flex", alignItems: "center", gap: "4px"
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: lightMode ? "#15803d" : "#22c55e", boxShadow: `0 0 5px ${lightMode ? "#15803d" : "#22c55e"}`, display: "inline-block", animation: "pulseR 1.8s ease-in-out infinite" }} />
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: accent, fontWeight: 500, marginBottom: "6px" }}>
                    {guild.cvName} · {stats.period}
                  </div>
                  {/* CV XP / duration bar — CSS animation, no stutter */}
                  <div style={{ height: 2, background: `${accent}14`, borderRadius: 2, overflow: "hidden", maxWidth: "180px" }}>
                    <div key={`cv-xp-${animKey}`} style={{
                      height: "100%",
                      "--xp-target": `${stats.xp}%`,
                      background: `linear-gradient(90deg,${accent}55,${accent})`,
                      animation: "xpFill 1.2s cubic-bezier(0.4,0,0.2,1) both",
                    }} />
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
                  <span key={t} style={{
                    background: lightMode ? `${accent}0e` : `${accent}10`,
                    border: `1px solid ${accent}28`, borderRadius: "4px", padding: "2px 9px",
                    fontSize: "0.68rem", color: accent, fontWeight: 500
                  }}>{t}</span>
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
          style={{
            background: "none", border: `1px solid ${accent}44`,
            borderRadius: 3, padding: "6px 14px",
            cursor: activeIdx === 0 ? "not-allowed" : "pointer",
            fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
            fontSize: "0.58rem", letterSpacing: "0.1em", color: accent,
            opacity: activeIdx === 0 ? 0.28 : 1,
            transition: "opacity 0.2s, border-color 0.2s",
            filter: activeIdx === 0 ? "grayscale(0.6)" : "none"
          }}>
          {rpgMode ? "◀ PREV GUILD" : "← Previous"}
        </button>
        <div style={{ fontSize: "0.5rem", color: T.textMuted, letterSpacing: "0.1em" }}>
          {activeIdx + 1} / {DATA.guilds.length}
        </div>
        <button onClick={() => select(Math.min(DATA.guilds.length - 1, activeIdx + 1))}
          disabled={activeIdx === DATA.guilds.length - 1}
          style={{
            background: "none", border: `1px solid ${accent}44`,
            borderRadius: 3, padding: "6px 14px",
            cursor: activeIdx === DATA.guilds.length - 1 ? "not-allowed" : "pointer",
            fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont,
            fontSize: "0.58rem", letterSpacing: "0.1em", color: accent,
            opacity: activeIdx === DATA.guilds.length - 1 ? 0.28 : 1,
            transition: "opacity 0.2s, border-color 0.2s",
            filter: activeIdx === DATA.guilds.length - 1 ? "grayscale(0.6)" : "none"
          }}>
          {rpgMode ? "NEXT GUILD ▶" : "Next →"}
        </button>
      </div>
    </>
  );
}


function CVSection({ title, children, light, accent }) {
  const titleColor = light ? "#1a2a4a" : "#e2eaf2";
  const lineColor = accent || (light ? "#2563eb" : "#60a5fa");
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


// ─── TOGGLE BUTTON ────────────────────────────────────────────────────────
function ModeToggle({ rpgMode, setRpgMode, lightMode, setLightMode, triggerGlitch, T }) {
  // Button shows what mode you'll SWITCH TO (not current mode)
  const nextIsImmersive = !rpgMode;
  const label = nextIsImmersive ? "IMMERSIVE" : "CLASSIC";
  const icon = nextIsImmersive ? "⚔" : "💼";

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <div
        onClick={() => triggerGlitch(!lightMode, !rpgMode, () => setRpgMode(m => !m))}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: `${T.accent}0d`, border: `1px solid ${T.accent}44`,
          borderRadius: "3px", padding: "5px 10px", cursor: "pointer",
          fontFamily: rpgMode ? "'Oxanium',sans-serif" : "'DM Sans',sans-serif",
          fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: nextIsImmersive ? "0.15em" : "0.08em",
          color: T.accent, transition: "all 0.25s", userSelect: "none",
        }}
        title={`Switch to ${label} mode`}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div
        onClick={() => setLightMode(m => !m)}
        style={{
          width: "32px", height: "32px", borderRadius: "3px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem",
          background: `${T.accent}0a`, border: `1px solid ${T.accent}33`,
          transition: "all 0.25s", userSelect: "none",
        }}
        title="Toggle light/dark mode"
      >
        {lightMode ? "☀️" : "🌙"}
      </div>
    </div>
  );
}


// ─── WORLD MAP REGION ─────────────────────────────────────────────────────
function WorldRegion({ region, onClick, rpgMode, accent }) {
  const [hov, setHov] = useState(false);
  const c = accent || "#00d4ff";
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

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: "> OPENING  DIMENSIONAL  PORTAL...", delay: 0.3, color: "#00d4ff" },
  { text: "> LORE  UNFOLDING...", delay: 0.85, color: "#b0c8e8" },
  { text: "> INVOKING  ARCANE  DISCIPLINES...", delay: 1.4, color: "#b0c8e8" },
  { text: "> CALIBRATING  THE  GRIMOIRE...", delay: 1.95, color: "#b0c8e8" },
  { text: "> PORTAL  READY  ·  STEP  THROUGH", delay: 2.7, color: "#00d4ff" },
];

function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2800);
    const t2 = setTimeout(() => onDone(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#04060e",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Oxanium',sans-serif",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.4s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Oxanium:wght@400;600;700;800;900&display=swap');
        @keyframes splashLogoIn{from{opacity:0;transform:translateY(-12px);}to{opacity:1;transform:translateY(0);}}
        @keyframes bootLineIn{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
        @keyframes splashBar{from{width:0%;}to{width:100%;}}
        @keyframes splashScan{0%{top:-2px;}100%{top:100%;}}
      `}</style>
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.006) 2px, rgba(0,212,255,0.006) 4px)", pointerEvents: "none" }} />
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,30,60,0.8) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
        marginBottom: "8px",
        animation: "splashLogoIn 0.6s ease both",
      }}>
        <img
          src={`${import.meta.env.BASE_URL}emt-logo.svg`}
          alt="EMT"
          style={{
            height: "1.8rem",
            width: "auto",
            filter: "drop-shadow(0 0 20px rgba(0,212,255,0.8)) drop-shadow(0 0 40px rgba(0,212,255,0.3))",
          }}
        />
        <span style={{
          fontSize: "2rem",
          letterSpacing: "0.5em",
          color: "#00d4ff",
          textShadow: "0 0 30px rgba(0,212,255,0.7), 0 0 60px rgba(0,212,255,0.3)",
        }}>PORTALFOLIO</span>
      </div>
      <div style={{
        fontSize: "0.42rem", letterSpacing: "0.3em", color: "rgba(0,212,255,0.55)",
        marginBottom: "40px",
        fontStyle: "italic",
        animation: "splashLogoIn 0.6s ease 0.15s both",
      }}>crafted by&nbsp;&nbsp;Erwin Tayag</div>

      {/* Boot lines */}
      <div style={{ width: "min(480px, 90vw)", marginBottom: "28px" }}>
        {BOOT_LINES.map((line, i) => (
          <div key={i} style={{
            fontFamily: "'Exo 2',sans-serif",
            fontSize: "0.68rem",
            color: line.color,
            letterSpacing: "0.05em",
            lineHeight: 1.9,
            opacity: 0,
            animation: `bootLineIn 0.3s ease ${line.delay}s both`,
          }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(480px, 90vw)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "0.42rem", letterSpacing: "0.2em", color: "rgba(0,212,255,0.4)" }}>LOADING</span>
          <span style={{ fontSize: "0.42rem", letterSpacing: "0.2em", color: "rgba(0,212,255,0.4)" }}>100%</span>
        </div>
        <div style={{ height: 3, background: "rgba(0,212,255,0.1)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "linear-gradient(90deg, #00d4ff55, #b06aff, #00d4ff)",
            boxShadow: "0 0 12px rgba(0,212,255,0.6)",
            animation: "splashBar 2.7s cubic-bezier(0.4,0,0.2,1) 0.3s both",
          }} />
        </div>
        {/* Bracket corners */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontSize: "0.38rem", color: "rgba(0,212,255,0.25)", letterSpacing: "0.1em" }}>[ HERO_DATA_LOADED ]</span>
          <span style={{ fontSize: "0.38rem", color: "rgba(176,106,255,0.25)", letterSpacing: "0.1em" }}>GUILD_COUNT: {DATA.guilds.length}</span>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
// Replace this placeholder with your real Formspree endpoint URL.
// Steps: sign up at formspree.io → New Form → copy the URL → paste below.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgawygo";

// ─── MAIN ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [rpgMode, setRpgMode] = useState(true);
  const [lightMode, setLightMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [transitionIsDark, setTransitionIsDark] = useState(true);
  const [transitionToImmersive, setTransitionToImmersive] = useState(true);
  const [section, setSection] = useState("hero");
  const [selRegion, setSelRegion] = useState(null);
  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success | error
  const [focusedField, setFocusedField] = useState(null);
  const [hovSubmit, setHovSubmit] = useState(false);
  const { level, xp, totalYears } = useCareerStats();
  const xpAnimated = useCountUp(xp, 1800);
  const subtitle = useTypewriter(DATA.rpgTitle, 46);

  const triggerGlitch = useCallback((isDark, toImmersive, cb) => {
    setTransitionIsDark(isDark);
    setTransitionToImmersive(toImmersive);
    setGlitching(true);
    // Swap content at ~320ms — while overlay is fully expanded and covering the screen.
    // This lets the new theme render behind the overlay so it never flashes through.
    setTimeout(() => { cb(); }, 320);
    // Remove overlay component only after its closing animation completes at 750ms.
    setTimeout(() => { setGlitching(false); }, 750);
  }, []);

  const T = rpgMode && !lightMode ? {
    // ── RPG DARK — "Void Arcane" ──
    bg: "#060c16", navBg: "rgba(6,12,22,0.95)", navBorder: "rgba(0,212,255,0.1)",
    text: "#b8d4ec", textMuted: "rgba(130,175,210,0.5)", textStrong: "#e8f4ff",
    accent: "#00d4ff", accent2: "#b06aff", danger: "#ff3356", gold: "#f4c542",
    cardBg: "rgba(6,14,26,0.95)", cardBorder: "rgba(0,212,255,0.14)",
    panelBg: "rgba(6,14,26,0.95)", panelGlow: true,
    titleFont: "'Oxanium',sans-serif", bodyFont: "'Exo 2',sans-serif",
    navItemColor: "rgba(130,175,210,0.45)", navActiveColor: "#00d4ff",
    gridColor: "rgba(255,255,255,0.042)", particleOpacity: 0.55,
    particleColor: "#00d4ff", particleColor2: "#b06aff",
    scanline: true,
  } : rpgMode && lightMode ? {
    // ── RPG LIGHT — "Arcane Codex" ──
    bg: "#edeaf4", navBg: "rgba(237,234,244,0.97)", navBorder: "rgba(21,101,160,0.16)",
    text: "#1e1a2e", textMuted: "#6a7288", textStrong: "#0d0a1c",
    accent: "#1565a0", accent2: "#7c3aed", danger: "#b91c1c", gold: "#92660a",
    cardBg: "rgba(232,228,242,0.96)", cardBorder: "rgba(21,101,160,0.18)",
    panelBg: "rgba(232,228,242,0.96)", panelGlow: true,
    titleFont: "'Oxanium',sans-serif", bodyFont: "'Exo 2',sans-serif",
    navItemColor: "#6a7288", navActiveColor: "#1565a0",
    gridColor: "rgba(0,0,0,0.048)", particleOpacity: 0.35,
    particleColor: "#1565a0", particleColor2: "#7c3aed",
    scanline: false,
  } : !rpgMode && lightMode ? {
    // ── CV LIGHT — "Clean Slate" ──
    bg: "#f8fafc", navBg: "rgba(255,255,255,0.97)", navBorder: "rgba(37,99,235,0.12)",
    text: "#334155", textMuted: "#94a3b8", textStrong: "#0f172a",
    accent: "#2563eb", accent2: "#0891b2", danger: "#dc2626", gold: "#d97706",
    cardBg: "#ffffff", cardBorder: "#e2e8f0",
    panelBg: "#ffffff", panelGlow: false,
    titleFont: "'DM Sans',sans-serif", bodyFont: "'DM Sans',sans-serif",
    navItemColor: "#64748b", navActiveColor: "#2563eb",
    gridColor: "rgba(0,0,0,0.042)", particleOpacity: 0.2,
    particleColor: "#2563eb", particleColor2: "#0891b2",
    scanline: false,
  } : {
    // ── CV DARK — "Midnight Slate" ──
    bg: "#0f172a", navBg: "rgba(15,23,42,0.96)", navBorder: "rgba(96,165,250,0.1)",
    text: "#94a3b8", textMuted: "rgba(100,130,165,0.6)", textStrong: "#e2eaf4",
    accent: "#60a5fa", accent2: "#34d399", danger: "#f87171", gold: "#fbbf24",
    cardBg: "rgba(15,23,42,0.97)", cardBorder: "rgba(96,165,250,0.12)",
    panelBg: "rgba(15,23,42,0.97)", panelGlow: false,
    titleFont: "'DM Sans',sans-serif", bodyFont: "'DM Sans',sans-serif",
    navItemColor: "rgba(130,160,195,0.5)", navActiveColor: "#60a5fa",
    gridColor: "rgba(255,255,255,0.033)", particleOpacity: 0.3,
    particleColor: "#60a5fa", particleColor2: "#34d399",
    scanline: false,
  };

  const nav = rpgMode
    ? [{ id: "hero", label: "CHARACTER" }, { id: "grimoire", label: "GRIMOIRE" }, { id: "guilds", label: "GUILDS" }, { id: "contact", label: "SEND RAVEN" }]
    : [{ id: "hero", label: "Profile" }, { id: "grimoire", label: "Tech Stack" }, { id: "guilds", label: "Experience" }, { id: "contact", label: "Contact" }];

  const sharedContentStyle = { padding: "24px", animation: "sectionIn 0.4s ease both" };
  const skillColor = (hex) => lightMode
    ? ({ "#00d4ff": "#0e5e7a", "#b06aff": "#6b21d0", "#f4c542": "#8a6800", "#ff3356": "#b01030", "#5eead4": "#0d7a6a", "#ff8c00": "#8a4a00" }[hex] ?? hex)
    : hex;

  // Sticky sidebar content — shown on all tabs
  const SidebarPanel = () => (
    <SystemPanel glowColor={T.accent} lightMode={lightMode} overflowHidden={false}
      style={{ padding: "20px 16px", '--glow': `${T.accent}44`, animation: "panelPulse 4s ease-in-out infinite", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${T.accent}44,transparent)`, animation: "scanDown 3s linear infinite" }} />
      {/* Avatar — circle with 3 arcane rings */}
      <div style={{ position: "relative", width: 84, height: 84, margin: "8px auto 30px" }}>
        {rpgMode && (() => {
          // Ring definitions: [size, color (dark), color (light), breath-anim, orbit-speed, orbit-dir, hotspot-color]
          const rareC = lightMode ? "#15803d" : "#22c55e";
          const uniqueC = lightMode ? "#7c22a8" : "#a855f7";
          const legendC = lightMode ? "#b45309" : "#f4c542";
          const rings = [
            { d: 112, color: legendC, breath: "ringBreathLegend", orbitMs: 3200, dir: "orbitCW", dotSize: 7 },
            { d: 98, color: uniqueC, breath: "ringBreathUnique", orbitMs: 4800, dir: "orbitCCW", dotSize: 5 },
            { d: 86, color: rareC, breath: "ringBreathRare", orbitMs: 2400, dir: "orbitCW", dotSize: 4 },
          ];
          return rings.map((r, i) => {
            const off = -(r.d - 84) / 2;  // center ring around 84px avatar
            const radius = r.d / 2;
            return (
              <div key={i} style={{
                position: "absolute",
                top: off, left: off,
                width: r.d, height: r.d,
                borderRadius: "50%",
                border: `${i === 0 ? 1.5 : 1}px solid ${r.color}`,
                animation: `${r.breath} ${2.5 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.6}s`,
                zIndex: i,
                pointerEvents: "none",
              }}>
                {/* Orbiting hotspot */}
                <div style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: 0, height: 0,
                  animation: `${r.dir} ${r.orbitMs}ms linear infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}>
                  <div style={{
                    position: "absolute",
                    width: r.dotSize, height: r.dotSize,
                    borderRadius: "50%",
                    background: r.color,
                    boxShadow: `0 0 ${r.dotSize * 2}px ${r.color}, 0 0 ${r.dotSize * 4}px ${r.color}66`,
                    marginTop: -(r.dotSize / 2),
                    marginLeft: radius - (r.dotSize / 2),
                  }} />
                </div>
              </div>
            );
          });
        })()}
        {/* Avatar face — circle */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 84, height: 84, borderRadius: "50%",
          overflow: "hidden",
          zIndex: 4,
          animation: rpgMode ? "avatarPulse 4s ease-in-out infinite" : "none",
        }}>
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Erwin Tayag"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      {/* Class + badge */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginBottom: "3px" }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.55rem", color: `${T.accent}99`, letterSpacing: "0.16em" }}>
            {rpgMode ? "FULL-STACK MAGE" : DATA.title.toUpperCase()}
          </span>
          {rpgMode && (
            <span style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.62rem", color: T.accent, background: `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "1px 5px" }}>LV.{level}</span>
          )}
        </div>
        <div style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.82rem", color: T.textStrong, letterSpacing: "0.08em" }}>{DATA.name}
          &nbsp;
          {!rpgMode && (
            <sup style={{
              fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.62rem", color: T.accent, background:
                `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "1px 5px"
            }}>🇵🇭</sup>
          )}
        </div>
      </div>

      {/* RPG: XP bar  ─  Classic: Career Snapshot chips */}
      {rpgMode ? (
        <>
          <div style={{ marginBottom: "3px", display: "flex", justifyContent: "space-between", fontSize: "0.46rem", color: T.textMuted, letterSpacing: "0.07em" }}>
            <span>EXP</span><span>{xpAnimated.toFixed(0)} / 100</span>
          </div>
          <div style={{ height: 4, background: `${T.accent}14`, borderRadius: 2, overflow: "hidden", marginBottom: "3px" }}>
            <div style={{ height: "100%", width: `${xpAnimated}%`, background: `linear-gradient(90deg,${T.accent}55,${T.accent})`, boxShadow: `0 0 8px ${T.accent}88`, transition: "width 0.1s" }} />
          </div>
          <div style={{ fontSize: "0.42rem", color: T.textMuted, letterSpacing: "0.05em", marginBottom: "14px", textAlign: "right" }}>1 XP = 3.65 days</div>
        </>
      ) : (
        <>
          {/* Career Snapshot — 3 factual stat chips */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px", justifyContent: "center" }}>
            {[
              { val: `${Math.floor(parseFloat(totalYears))}+`, lbl: "YRS EXP" },
              { val: `${DATA.guilds.length}`, lbl: "EMPLOYERS" },
              { val: DATA.primaryStack, lbl: "PRIMARY STACK" },
            ].map(({ val, lbl }) => (
              <div key={lbl} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: "2px", padding: "7px 4px",
                background: `${T.accent}08`,
                border: `1px solid ${T.accent}22`,
                borderRadius: "4px",
              }}>
                <span style={{ fontFamily: T.titleFont, fontWeight: 800, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.02em", lineHeight: 1 }}>{val}</span>
                <span style={{ fontFamily: T.bodyFont, fontSize: "0.36rem", color: T.textMuted, letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.2 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </>
      )}
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
        <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
          {rpgMode && (
            <div style={{ position: "absolute", top: -5, left: -5, width: 46, height: 46, borderRadius: "50%", border: `1px solid ${lightMode ? "#15803d" : "#22c55e"}`, animation: "ringBreathRare 2.4s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, animation: "orbitCW 2400ms linear infinite" }}>
                <div style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: lightMode ? "#15803d" : "#22c55e", boxShadow: `0 0 6px ${lightMode ? "#15803d" : "#22c55e"}`, marginTop: -2, marginLeft: 21 }} />
              </div>
            </div>
          )}
          <div style={{ position: "relative", zIndex: 1, width: 36, height: 36, borderRadius: "50%", overflow: "hidden" }}>
            <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Erwin Tayag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
            <span style={{ fontFamily: rpgMode ? "'Oxanium',sans-serif" : T.titleFont, fontWeight: 700, fontSize: "0.75rem", color: T.textStrong }}>{DATA.name}</span>
            {rpgMode && (
              <span style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.56rem", color: T.accent, background: `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "0px 4px" }}>LV.{level}</span>
            )}
            {!rpgMode && (
              <span style={{
                fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "0.62rem", color: T.accent, background: `${T.accent}12`, border: `1px solid ${T.accent}33`, borderRadius: "2px", padding: "1px 5px"
              }}>🇵🇭</span>
            )}
          </div>
          <div style={{ fontSize: "0.6rem", color: `${T.accent}88`, letterSpacing: "0.12em", marginBottom: "3px" }}>{rpgMode ? "FULL-STACK MAGE" : DATA.title.toUpperCase()}</div>
          {rpgMode ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ flex: 1, height: 3, background: `${T.accent}14`, borderRadius: 2, overflow: "hidden", maxWidth: "160px" }}>
                <div style={{ height: "100%", width: `${xpAnimated}%`, background: `linear-gradient(90deg,${T.accent}55,${T.accent})`, boxShadow: `0 0 5px ${T.accent}66`, transition: "width 0.1s" }} />
              </div>
              <span style={{ fontSize: "0.52rem", color: `${T.textMuted}`, opacity: 0.55, letterSpacing: "0.04em" }}>{xpAnimated.toFixed(0)} / 100</span>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "5px" }}>
              {[
                { val: `${Math.floor(parseFloat(totalYears))}+`, lbl: "YRS" },
                { val: `${DATA.guilds.length}`, lbl: "EMP" },
                { val: DATA.primaryStack, lbl: "STACK" },
              ].map(({ val, lbl }) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: "3px", padding: "2px 6px", background: `${T.accent}08`, border: `1px solid ${T.accent}22`, borderRadius: "3px" }}>
                  <span style={{ fontFamily: T.titleFont, fontWeight: 700, fontSize: "0.56rem", color: T.accent }}>{val}</span>
                  <span style={{ fontSize: "0.38rem", color: T.textMuted, letterSpacing: "0.05em" }}>{lbl}</span>
                </div>
              ))}
            </div>
          )}
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
            <div style={{ fontSize: "0.48rem", color: `${T.accent}99`, letterSpacing: "0.14em", marginBottom: "2px", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>{rpgMode ? "· Arcane Disciplines ·" : "· TECHNICAL SKILLS ·"}</div>
            <SpiderChart categories={DATA.skillCategories} lightMode={lightMode} accent={T.accent} rpgMode={rpgMode} title="" maxSkills={Math.max(...DATA.skillCategories.map(c => c.skills.length))} size={180} />
          </div>
          <div style={{ height: "1px", background: `${T.accent}14`, width: "70%", margin: "4px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: "0.48rem", color: `${T.gold}99`, letterSpacing: "0.14em", marginBottom: "2px", fontFamily: "'Exo 2',sans-serif", fontWeight: 700 }}>{rpgMode ? "· Passive Enchantments ·" : "· SOFT SKILLS ·"}</div>
            <SpiderChart categories={DATA.innateAbilities} lightMode={lightMode} accent={lightMode ? "#8a6800" : T.gold} rpgMode={rpgMode} title="" maxSkills={6} size={180} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading && <SplashScreen onDone={() => setLoading(false)} />}
      <div style={{
        minHeight: "100vh", background: rpgMode && !lightMode
          ? "radial-gradient(ellipse 110% 80% at 50% 20%, #0a1428 0%, #060c18 35%, #04060e 70%)"
          : T.bg,
        color: T.text, fontFamily: T.bodyFont, position: "relative", overflow: "hidden", transition: "background 0.3s, color 0.3s"
      }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Oxanium:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(0,212,255,0.2);color:#fff;}
        @keyframes floatP{0%,100%{transform:translateY(0) scale(1);opacity:.4;}50%{transform:translateY(-22px) scale(1.3);opacity:.75;}}
        @keyframes pulseR{0%,100%{transform:scale(1);opacity:.3;}50%{transform:scale(1.4);opacity:0;}}
        /* Particle animations */
        @keyframes driftUp{
          0%  { transform: translateY(0)     scale(1);   opacity: 0; }
          12% { opacity: var(--p-op, 0.55); }
          80% { opacity: var(--p-op, 0.45); }
          100%{ transform: translateY(-52px) scale(0.6); opacity: 0; }
        }
        @keyframes glimmer{
          0%,100%{ opacity: 0.15; transform: scale(1);   }
          50%    { opacity: var(--p-op, 0.7); transform: scale(1.6); }
        }
        @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(5px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
        @keyframes sectionIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes scanDown{0%{top:0;opacity:.7;}100%{top:100%;opacity:0;}}
        @keyframes bootLine{from{width:0;}to{width:100%;}}
        @keyframes panelPulse{0%,100%{box-shadow:0 0 10px var(--glow,rgba(0,212,255,.12));}50%{box-shadow:0 0 28px var(--glow,rgba(0,212,255,.4)),0 0 50px var(--glow,rgba(0,212,255,.18));}}

        /* ── Shadow Domain Transition ── */
        @keyframes shadowDomainVoid{
          0%{clip-path:circle(0% at 50% 50%);opacity:1;}
          30%{clip-path:circle(80% at 50% 50%);opacity:1;}
          65%{clip-path:circle(80% at 50% 50%);opacity:1;}
          100%{clip-path:circle(0% at 50% 50%);opacity:0;}
        }
        @keyframes parchmentBloom{
          0%{clip-path:circle(0% at 50% 50%);opacity:1;}
          30%{clip-path:circle(85% at 50% 50%);opacity:1;}
          65%{clip-path:circle(85% at 50% 50%);opacity:1;}
          100%{clip-path:circle(0% at 50% 50%);opacity:0;}
        }
        @keyframes underlineGrow{
          0%   { transform: scaleX(0); opacity: 0; }
          20%  { opacity: 1; }
          55%  { transform: scaleX(1); opacity: 1; }
          80%  { transform: scaleX(1); opacity: 0.6; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes smokeRing{
          0%{transform:scale(0);opacity:0.25;}
          40%{transform:scale(1);opacity:0.18;}
          100%{transform:scale(1.6);opacity:0;}
        }
        @keyframes centerOrb{
          0%{transform:scale(0);opacity:0;}
          25%{transform:scale(1.4);opacity:1;}
          65%{transform:scale(1);opacity:0.8;}
          100%{transform:scale(0);opacity:0;}
        }
        @keyframes monarchText{
          0%,25%{opacity:0;transform:scale(1.15);letter-spacing:0.55em;}
          38%,62%{opacity:1;transform:scale(1);letter-spacing:0.45em;}
          80%{opacity:0;transform:scale(0.95);}
          100%{opacity:0;}
        }

        /* ── Splash Screen ── */
        @keyframes splashLogoIn{from{opacity:0;transform:translateY(-12px);}to{opacity:1;transform:translateY(0);}}
        @keyframes bootLineIn{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
        @keyframes splashBar{from{width:0%;}to{width:100%;}}

        /* ── Arcane Avatar Rings ── */
        @keyframes orbitCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes ringBreathRare    { 0%,100%{opacity:0.55;box-shadow:0 0 4px #22c55e44,0 0 8px #22c55e22;}  50%{opacity:1;box-shadow:0 0 10px #22c55eaa,0 0 22px #22c55e44;} }
        @keyframes ringBreathUnique  { 0%,100%{opacity:0.5; box-shadow:0 0 4px #a855f744,0 0 8px #a855f722;}  50%{opacity:1;box-shadow:0 0 10px #a855f7aa,0 0 22px #a855f744;} }
        @keyframes ringBreathLegend  { 0%,100%{opacity:0.45;box-shadow:0 0 4px #f4c54244,0 0 8px #f4c54222;}  50%{opacity:1;box-shadow:0 0 12px #f4c542aa,0 0 28px #f4c54255;} }
        @keyframes avatarPulse { 0%,100%{box-shadow:0 0 14px rgba(34,197,94,0.2);} 50%{box-shadow:0 0 24px rgba(168,85,247,0.4),0 0 44px rgba(34,197,94,0.15);} }

        .nav-btn{background:none;border:none;cursor:pointer;transition:all .22s;border-bottom:1px solid transparent;}
        .nav-btn:hover{opacity:1 !important;}
        input,textarea{width:100%;border-radius:4px;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit;}
        input::placeholder,textarea::placeholder{opacity:.4;}
        .raven-cols{display:flex;gap:20px;align-items:flex-start;}
        @media(max-width:720px){.raven-cols{flex-direction:column;}}
      `}</style>

        <ModeTransition active={glitching} isDark={transitionIsDark} toImmersive={transitionToImmersive} />
        {T.scanline && <ScanlineOverlay />}
        {T.particleOpacity > 0 && <SystemParticles opacity={T.particleOpacity} color={T.particleColor} color2={T.particleColor2} />}

        {/* Grid bg — tight 24px cells, radial fade-edge mask so center is crisp and edges dissolve into bg */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${T.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${T.gridColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 20%, transparent 75%)",
        }} />

        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: "58px", background: T.navBg, borderBottom: `1px solid ${T.navBorder}`, backdropFilter: "blur(16px)", transition: "all 0.3s" }}>
          {/* Logo */}
          <img
            src={`${import.meta.env.BASE_URL}emt-logo.svg`}
            alt="EMT"
            style={{
              height: "28px",
              width: "auto",
              filter: lightMode
                ? "brightness(0)"
                : `drop-shadow(0 0 5px ${T.accent}66)`,
              transition: "filter 0.3s",
            }}
          />

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
            <ModeToggle rpgMode={rpgMode} setRpgMode={setRpgMode} lightMode={lightMode} setLightMode={setLightMode} triggerGlitch={triggerGlitch} T={T} />
          </div>
        </nav>

        {/* ── CONTENT ─────────────────────────────── */}
        <main style={{ paddingTop: "58px", minHeight: "100vh", position: "relative", zIndex: 10 }}>
          <style>{`
          .sidebar-layout { display: flex; gap: 0; max-width: 1240px; margin: 0 auto; }
          .sidebar-col { width: 300px; flex-shrink: 0; }
          .sidebar-sticky {
            position: sticky;
            top: 58px;
            height: calc(100vh - 58px);
            overflow-y: auto;
            overflow-x: hidden;
            padding: 24px 18px 32px 22px;
          }
          .sidebar-sticky::-webkit-scrollbar { width: 3px; }
          .sidebar-sticky::-webkit-scrollbar-thumb { background: rgba(120,160,200,0.25); border-radius: 2px; }
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
            .sidebar-col { width: 240px; }
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
                          { label: "💼 Seeking Quest", color: T.accent2 },
                          { label: "🌐 Realm-Agnostic", color: T.accent2 },
                          { label: "🤝 Guild-Independent", color: T.accent2 },
                          { label: "✚ Add to Party", color: lightMode ? "#15803d" : "#22c55e", href: DATA.linkedin },
                          { label: "⚡ Whisper", color: T.textMuted, disabled: true },
                        ].map(t => {
                          const tagStyle = { background: t.disabled ? "transparent" : `${t.color}10`, border: `1px solid ${t.disabled ? (lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)") : `${t.color}30`}`, borderRadius: 2, padding: "3px 10px", fontSize: "0.55rem", color: t.disabled ? T.textMuted : t.color, fontFamily: "'Exo 2',sans-serif", fontWeight: t.disabled ? 400 : 600, letterSpacing: "0.07em", opacity: t.disabled ? 0.5 : 1, fontStyle: t.disabled ? "italic" : "normal", textDecoration: "none", cursor: t.href ? "pointer" : "default" };
                          return t.href
                            ? <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer" style={tagStyle}>{t.label}</a>
                            : <span key={t.label} style={tagStyle}>{t.label}</span>;
                        })}
                      </div>

                      {/* Typewriter subtitle */}
                      <div style={{ minHeight: "1em", marginBottom: "4px" }}>
                        <span style={{ fontSize: "0.65rem", color: T.accent2, letterSpacing: "0.1em" }}>{subtitle}</span>
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
                        <p style={{ fontSize: "0.81rem", lineHeight: 1.8, color: T.text, fontWeight: 300, marginBottom: "12px" }}>{DATA.rpgSummary}</p>
                        <div style={{ borderTop: `1px solid ${T.accent2}18`, paddingTop: "9px" }}>
                          <div style={{ fontSize: "0.44rem", letterSpacing: "0.18em", color: `${T.accent2}44`, marginBottom: "5px" }}>[ THE ARCANE CRADLE ]</div>
                          <div style={{ fontSize: "0.6rem", color: T.textMuted, opacity: 0.6, lineHeight: 1.7 }}>
                            Arcane Scholar · {DATA.education.rpgSchool}
                            <span style={{ display: "block", color: `${T.gold}77`, fontSize: "0.55rem", marginTop: "2px" }}>{DATA.education.rpgHonors}</span>
                          </div>
                        </div>
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
                      {/* These sections are currently commented out as they are redundant with the new GRIMOIRE page */}
                      {/* <Accordion label="Arcane Disciplines" sublabel={`${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)} spells · ${DATA.skillCategories.length} disciplines`} accent={T.accent} lightMode={lightMode} rpgMode={rpgMode} bg={T.cardBg}>
                        <SkillPills categories={DATA.skillCategories} lightMode={lightMode} T={T} rpgMode={rpgMode} />
                      </Accordion>
                      <Accordion label="Passive Enchantments" sublabel={`${DATA.innateAbilities.reduce((a, c) => a + c.skills.length, 0)} passive traits · ${DATA.innateAbilities.length} areas`} accent={lightMode ? "#8a6800" : T.gold} lightMode={lightMode} rpgMode={rpgMode} bg={T.cardBg}>
                        <SkillPills categories={DATA.innateAbilities} lightMode={lightMode} T={T} rpgMode={rpgMode} />
                      </Accordion> */}
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
                        <div style={{ fontSize: "0.82rem", color: T.accent, fontWeight: 500, marginBottom: "14px" }}>Senior Developer · {parseFloat(totalYears).toFixed(1)} yrs experience</div>
                        <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: T.text, marginBottom: "8px" }}>{DATA.summary}</p>
                        <div style={{ fontSize: "0.7rem", color: T.textMuted, opacity: 0.65 }}>🎓 {DATA.education.degree} · {DATA.education.school} — {DATA.education.honors.join(", ")}</div>
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

                      <Accordion label="Technical Skills" sublabel={`${DATA.skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills · ${DATA.skillCategories.length} disciplines`} accent={T.accent} lightMode={lightMode} rpgMode={false} bg={T.cardBg}>
                        <SkillPills categories={DATA.skillCategories} lightMode={lightMode} T={T} rpgMode={false} />
                      </Accordion>
                      <Accordion label="Soft Skills" sublabel={`${DATA.innateAbilities.reduce((a, c) => a + c.skills.length, 0)} soft skills · ${DATA.innateAbilities.length} areas`} accent={lightMode ? "#2563eb" : T.accent2} lightMode={lightMode} rpgMode={false} bg={T.cardBg}>
                        <SkillPills categories={DATA.innateAbilities} lightMode={lightMode} T={T} rpgMode={false} />
                      </Accordion>
                    </div>
                  )}
                </div>
              )}

              {/* ══ GRIMOIRE / TECH STACK ══ */}
              {section === "grimoire" && (
                <div style={sharedContentStyle}>
                  {rpgMode ? (
                    <>
                      <div style={{ fontSize: "0.54rem", letterSpacing: "0.3em", color: T.textMuted, marginBottom: "5px" }}>[ TOME OF MASTERY ]</div>
                      <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "5px" }}>GRIMOIRE</h2>
                      <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent2},transparent)`, marginBottom: "20px", width: 160 }} />

                      <div style={{ fontSize: "0.44rem", letterSpacing: "0.2em", color: T.textMuted, marginBottom: "8px" }}>[ ARCANE DISCIPLINES ]</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                        {DATA.skillCategories.map((cat, i) => {
                          const c = skillColor(cat.color);
                          return (
                            <SystemPanel key={cat.id} glowColor={c} lightMode={lightMode} style={{ padding: "12px 14px", animation: "sectionIn 0.38s ease both", animationDelay: `${i * 0.08}s`, gridColumn: i === DATA.skillCategories.length - 1 && DATA.skillCategories.length % 2 !== 0 ? "1 / -1" : undefined }}>
                              <div style={{ fontSize: "0.44rem", letterSpacing: "0.18em", color: c, fontFamily: "'Exo 2',sans-serif", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>
                                {cat.rpgLabel} <span style={{ color: T.textMuted, fontWeight: 400 }}>· {cat.skills.length}</span>
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                {cat.skills.map(s => (
                                  <span key={s} style={{ background: `${c}10`, border: `1px solid ${c}30`, borderRadius: "3px", padding: "2px 8px", fontSize: "0.58rem", color: lightMode ? T.textStrong : "#c8d8e0", fontFamily: "'Exo 2',sans-serif", fontWeight: 500 }}>{s}</span>
                                ))}
                              </div>
                            </SystemPanel>
                          );
                        })}
                      </div>

                      <div style={{ fontSize: "0.44rem", letterSpacing: "0.2em", color: T.textMuted, marginBottom: "8px" }}>[ PASSIVE ENCHANTMENTS ]</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {DATA.innateAbilities.map((ab, i) => {
                          const c = skillColor(ab.color);
                          return (
                            <div key={ab.id} style={{ background: `${c}08`, border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px 12px", animation: "sectionIn 0.38s ease both", animationDelay: `${i * 0.08}s`, gridColumn: i === DATA.innateAbilities.length - 1 && DATA.innateAbilities.length % 2 !== 0 ? "1 / -1" : undefined }}>
                              <div style={{ fontSize: "0.52rem", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, color: c, letterSpacing: "0.1em", marginBottom: "6px", textTransform: "uppercase" }}>{ab.rpgLabel}</div>
                              <div style={{ fontSize: "0.56rem", color: T.textMuted, lineHeight: 1.8 }}>{ab.skills.slice(0, 3).join(" · ")}{ab.skills.length > 3 ? ` +${ab.skills.length - 3}` : ""}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <CVSection title="Tech Stack" light={lightMode} accent={T.accent}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                        {DATA.skillCategories.map((cat, i) => (
                          <div key={cat.id} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "8px", padding: "16px", boxShadow: lightMode ? "0 1px 6px rgba(0,0,0,0.05)" : "none", position: "relative", overflow: "hidden", animation: "sectionIn 0.38s ease both", animationDelay: `${i * 0.08}s`, gridColumn: i === DATA.skillCategories.length - 1 && DATA.skillCategories.length % 2 !== 0 ? "1 / -1" : undefined }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${cat.color},transparent)` }} />
                            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>{cat.label}</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                              {cat.skills.map(s => (
                                <span key={s} style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}30`, borderRadius: "3px", padding: "3px 9px", fontSize: "0.65rem", color: T.textStrong, fontWeight: 500 }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: T.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Core Strengths</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {DATA.innateAbilities.map((ab, i) => {
                          const c = skillColor(ab.color);
                          return (
                            <div key={ab.id} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "6px", padding: "12px 14px", position: "relative", overflow: "hidden", animation: "sectionIn 0.38s ease both", animationDelay: `${i * 0.08}s`, gridColumn: i === DATA.innateAbilities.length - 1 && DATA.innateAbilities.length % 2 !== 0 ? "1 / -1" : undefined }}>
                              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${ab.color},transparent)` }} />
                              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: c, marginBottom: "5px" }}>{ab.label}</div>
                              <div style={{ fontSize: "0.62rem", color: T.textMuted, lineHeight: 1.7 }}>{ab.skills.join(" · ")}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CVSection>
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
                    <CVSection title="Work Experience" light={lightMode} accent={T.accent}>
                      <GuildSection rpgMode={false} lightMode={lightMode} T={T} />
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
                        {DATA.regions.map(r => <WorldRegion key={r.id} region={r} onClick={setSelRegion} rpgMode={true} accent={T.accent} />)}
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
                    <CVSection title="Projects" light={lightMode} accent={T.accent}>
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
                <div style={{ ...sharedContentStyle, maxWidth: "760px" }}>
                  {rpgMode ? (
                    <>
                      <div style={{ fontSize: "0.54rem", letterSpacing: "0.3em", color: T.textMuted, marginBottom: "5px" }}>[ COMMUNICATION ]</div>
                      <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.textStrong, letterSpacing: "0.1em", marginBottom: "5px" }}>DISPATCH <span style={{ color: T.accent }}>A RAVEN</span></h2>
                      <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent},transparent)`, marginBottom: "12px", width: 180 }} />
                      <div style={{ fontSize: "0.72rem", color: T.textMuted, fontStyle: "italic", marginBottom: "24px" }}>Send your scroll through the arcane currents. A response shall arrive within one sun cycle.</div>
                      <SystemPanel glowColor={T.accent} lightMode={lightMode} style={{ padding: "26px" }}>
                        {formStatus === "success" ? (
                          <div style={{ textAlign: "center", padding: "32px 0" }}>
                            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🪶</div>
                            <div style={{ fontFamily: "'Oxanium',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: T.accent, fontWeight: 700 }}>RAVEN DISPATCHED</div>
                            <div style={{ fontSize: "0.76rem", color: T.textMuted, marginTop: "8px", marginBottom: "20px" }}>Your scroll rides the arcane winds. Expect a reply within a sun cycle.</div>
                            <div style={{ borderTop: `1px solid ${T.accent}18`, paddingTop: "14px", marginBottom: "18px" }}>
                              {[
                                { label: "⟨ GUILD HALL ⟩", href: DATA.linkedin },
                                { label: "⟨ FORGE RUNES ⟩", href: DATA.github },
                              ].map(l => (
                                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                                  style={{ display: "block", color: T.accent2, fontSize: "0.65rem", letterSpacing: "0.1em", margin: "6px 0", textDecoration: "none" }}>{l.label}</a>
                              ))}
                            </div>
                            <button onClick={() => setFormStatus("idle")} style={{ background: "transparent", border: `1px solid ${T.accent}44`, borderRadius: 3, padding: "8px 20px", color: T.textMuted, fontSize: "0.6rem", letterSpacing: "0.12em", cursor: "pointer" }}>▶ SEND ANOTHER SCROLL</button>
                          </div>
                        ) : (
                          <>
                            {/* Letterhead header */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 10px", background: "rgba(34,197,94,0.08)", borderRadius: 3 }}>
                                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                                  <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", color: "#22c55e" }}>AVAILABLE FOR QUESTS</span>
                                </div>
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>

                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                                  {[
                                    { label: "⟨ GUILD HALL ⟩", href: DATA.linkedin },
                                    { label: "⟨ FORGE RUNES ⟩", href: DATA.github },
                                  ].map(l => (
                                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                                      style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: T.accent2, border: `1px solid ${T.accent2}44`, borderRadius: 3, padding: "4px 9px", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent2; e.currentTarget.style.color = T.accent2; }}
                                      onMouseLeave={e => { e.currentTarget.style.borderColor = `${T.accent2}44`; e.currentTarget.style.color = T.accent2; }}>
                                      {l.label} ›
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* Divider */}
                            <div style={{ height: 1, background: `linear-gradient(90deg,${T.accent} 35%,transparent)`, marginBottom: "22px" }} />
                            {/* Form */}
                            <form onSubmit={async e => {
                              e.preventDefault();
                              setFormStatus("submitting");
                              const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } });
                              setFormStatus(res.ok ? "success" : "error");
                            }}>
                              <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", fontSize: "0.54rem", letterSpacing: "0.18em", color: T.textMuted, marginBottom: "6px" }}>TRAVELER IDENTITY</label>
                                <input name="name" required placeholder="Enter your name..." className="raven-input"
                                  style={{ background: `${T.accent}06`, border: `1px solid ${focusedField === "rpg-name" ? T.accent : `${T.accent}25`}`, color: T.text, padding: "10px 13px", boxShadow: focusedField === "rpg-name" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                  onFocus={() => setFocusedField("rpg-name")} onBlur={() => setFocusedField(null)} />
                              </div>
                              <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", fontSize: "0.54rem", letterSpacing: "0.18em", color: T.textMuted, marginBottom: "6px" }}>RAVEN FREQUENCY</label>
                                <input name="email" type="email" required placeholder="your@email.com" className="raven-input"
                                  style={{ background: `${T.accent}06`, border: `1px solid ${focusedField === "rpg-email" ? T.accent : `${T.accent}25`}`, color: T.text, padding: "10px 13px", boxShadow: focusedField === "rpg-email" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                  onFocus={() => setFocusedField("rpg-email")} onBlur={() => setFocusedField(null)} />
                              </div>
                              <div style={{ marginBottom: "22px" }}>
                                <label style={{ display: "block", fontSize: "0.54rem", letterSpacing: "0.18em", color: T.textMuted, marginBottom: "6px" }}>SCROLL CONTENTS</label>
                                <textarea name="message" required placeholder="Your message..." className="raven-input"
                                  style={{ minHeight: 140, resize: "vertical", background: `${T.accent}06`, border: `1px solid ${focusedField === "rpg-msg" ? T.accent : `${T.accent}25`}`, color: T.text, padding: "10px 13px", boxShadow: focusedField === "rpg-msg" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                  onFocus={() => setFocusedField("rpg-msg")} onBlur={() => setFocusedField(null)} />
                              </div>
                              {formStatus === "error" && <div style={{ fontSize: "0.68rem", color: T.danger, marginBottom: "12px" }}>Something went wrong. Please try again.</div>}
                              <button type="submit" disabled={formStatus === "submitting"}
                                style={{ background: `${T.accent}10`, border: `1px solid ${hovSubmit ? T.accent : `${T.accent}44`}`, borderRadius: 3, padding: "11px 28px", color: hovSubmit ? T.accent : `${T.accent}bb`, fontFamily: "'Oxanium',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", cursor: "pointer", transition: "all .22s", opacity: formStatus === "submitting" ? 0.5 : 1, textShadow: hovSubmit ? `0 0 8px ${T.accent}88` : "none" }}
                                onMouseEnter={() => setHovSubmit(true)} onMouseLeave={() => setHovSubmit(false)}>
                                {formStatus === "submitting" ? "DISPATCHING..." : "▶ DISPATCH RAVEN"}
                              </button>
                            </form>
                          </>
                        )}
                      </SystemPanel>
                    </>
                  ) : (
                    <>
                      <CVSection title="Contact" light={lightMode} accent={T.accent}>
                        <div style={{ fontSize: "0.86rem", color: T.textMuted, marginBottom: "20px" }}>Open to freelance, contract, and full-time opportunities.</div>
                        <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: "10px", padding: "28px", boxShadow: lightMode ? "0 1px 8px rgba(0,0,0,0.06)" : "none" }}>
                          {formStatus === "success" ? (
                            <div style={{ textAlign: "center", padding: "24px 0" }}>
                              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>✉️</div>
                              <div style={{ fontWeight: 600, color: T.textStrong, marginBottom: "8px" }}>Message sent!</div>
                              <div style={{ fontSize: "0.82rem", color: T.textMuted, marginBottom: "18px" }}>Thanks for reaching out. I'll get back to you within 1–2 business days.</div>
                              <div style={{ borderTop: `1px solid ${T.cardBorder}`, paddingTop: "14px", marginBottom: "14px" }}>
                                {[
                                  { label: "LinkedIn", href: DATA.linkedin },
                                  { label: "GitHub", href: DATA.github },
                                ].map(l => (
                                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "inline-block", color: T.accent, fontSize: "0.78rem", margin: "4px 10px", textDecoration: "none" }}>{l.label}</a>
                                ))}
                              </div>
                              <button onClick={() => setFormStatus("idle")} style={{ background: "transparent", border: `1px solid ${T.cardBorder}`, borderRadius: "6px", padding: "8px 20px", color: T.textMuted, fontSize: "0.78rem", cursor: "pointer" }}>Send another message</button>
                            </div>
                          ) : (
                            <>
                              {/* Letterhead header */}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                                <div>
                                  <div style={{ fontFamily: T.titleFont, fontWeight: 700, fontSize: "1rem", color: T.textStrong, marginBottom: "3px" }}>{DATA.name}</div>
                                  <div style={{ fontSize: "0.76rem", color: T.textMuted }}>{DATA.title}</div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 10px", background: "rgba(34,197,94,0.08)", borderRadius: 5 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                                    <span style={{ fontSize: "0.72rem", color: "#22c55e" }}>Open to opportunities</span>
                                  </div>
                                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                                    {[
                                      { icon: "💼", label: "LinkedIn", href: DATA.linkedin },
                                      { icon: "🐙", label: "GitHub", href: DATA.github },
                                    ].map(l => (
                                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                                        style={{ fontSize: "0.76rem", color: T.accent, border: `1px solid ${T.cardBorder}`, borderRadius: "5px", padding: "4px 10px", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = `${T.accent}10`; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.background = "transparent"; }}>
                                        {l.icon} {l.label}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {/* Divider */}
                              <div style={{ height: 1, background: lightMode ? "#e2e8f0" : "rgba(96,165,250,0.12)", marginBottom: "22px" }} />
                              {/* Form */}
                              <form onSubmit={async e => {
                                e.preventDefault();
                                setFormStatus("submitting");
                                const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } });
                                setFormStatus(res.ok ? "success" : "error");
                              }}>
                                <div style={{ marginBottom: "16px" }}>
                                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, marginBottom: "6px" }}>Your Name</label>
                                  <input name="name" required placeholder="Full name" className="raven-input"
                                    style={{ background: lightMode ? "#f8fafc" : "rgba(255,255,255,0.03)", border: `1px solid ${focusedField === "cv-name" ? T.accent : T.cardBorder}`, color: T.text, padding: "10px 13px", borderRadius: "6px", boxShadow: focusedField === "cv-name" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                    onFocus={() => setFocusedField("cv-name")} onBlur={() => setFocusedField(null)} />
                                </div>
                                <div style={{ marginBottom: "16px" }}>
                                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, marginBottom: "6px" }}>Email Address</label>
                                  <input name="email" type="email" required placeholder="your@email.com" className="raven-input"
                                    style={{ background: lightMode ? "#f8fafc" : "rgba(255,255,255,0.03)", border: `1px solid ${focusedField === "cv-email" ? T.accent : T.cardBorder}`, color: T.text, padding: "10px 13px", borderRadius: "6px", boxShadow: focusedField === "cv-email" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                    onFocus={() => setFocusedField("cv-email")} onBlur={() => setFocusedField(null)} />
                                </div>
                                <div style={{ marginBottom: "22px" }}>
                                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, marginBottom: "6px" }}>Message</label>
                                  <textarea name="message" required placeholder="How can I help you?" className="raven-input"
                                    style={{ minHeight: 140, resize: "vertical", background: lightMode ? "#f8fafc" : "rgba(255,255,255,0.03)", border: `1px solid ${focusedField === "cv-msg" ? T.accent : T.cardBorder}`, color: T.text, padding: "10px 13px", borderRadius: "6px", boxShadow: focusedField === "cv-msg" ? `0 0 0 3px ${T.accent}15` : "none" }}
                                    onFocus={() => setFocusedField("cv-msg")} onBlur={() => setFocusedField(null)} />
                                </div>
                                {formStatus === "error" && <div style={{ fontSize: "0.78rem", color: T.danger, marginBottom: "12px" }}>Something went wrong. Please try again.</div>}
                                <button type="submit" disabled={formStatus === "submitting"} style={{ background: T.accent, border: "none", borderRadius: "6px", padding: "11px 28px", color: "#fff", fontFamily: T.titleFont, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all .22s", opacity: formStatus === "submitting" ? 0.5 : 1 }}>
                                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                                </button>
                              </form>
                            </>
                          )}
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
    </>
  );
}
