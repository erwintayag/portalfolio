# Portfolio Website — Claude Code Handoff Brief
_Last updated: March 2026. Written to onboard Claude Code without repeating the full design session._

---

## 1. Who This Is For

A Filipino Senior Full-Stack Developer (.NET / Blazor / React) building a personal portfolio and résumé website. The site has two personality modes that toggle between each other:

- **IMMERSIVE mode** — a dark-fantasy RPG character select screen aesthetic (Solo Leveling × Dark Fantasy Roguelike)
- **CLASSIC mode** — a clean, professional CV/résumé presentation

Each mode also has a **light/dark theme toggle**, giving four total combinations:
`RPG Dark` | `RPG Light` | `CV Dark` | `CV Light`

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React (single `.jsx` file, no build step for prototyping) |
| Fonts | `Oxanium` (headings/RPG), `Exo 2` (body/RPG), `DM Sans` (CV modes) |
| Styling | Inline React styles + a `<style>` block for keyframes/media queries |
| Future | ASP.NET Core backend, Blazor for admin portals |

**No Tailwind, no TypeScript, no component library** in the current prototype. All styles are inline.

---

## 3. File Inventory

| File | Description |
|---|---|
| `portfolio-v1.jsx` | Active working file — always the latest state |
| `prototype-alpha.jsx` | Frozen early snapshot (~1,390 lines), never modify |
| `prototype-beta.jsx` | Frozen mid-session snapshot (~1,759 lines), never modify |
| `CONTEXT.md` | This file |

---

## 4. Mode & Theme System

### Mode names (decided — do not rename)
- RPG mode → **IMMERSIVE**
- CV mode → **CLASSIC**
- The mode toggle button always shows the **destination**, not the current state
- Icon: `⚔` = going to IMMERSIVE, `💼` = going to CLASSIC

### Four theme tokens (`T`)
Each mode combination resolves to a `T` object with these keys:

```
bg, navBg, navBorder,
text, textMuted, textStrong,
accent, accent2, danger, gold,
cardBg, cardBorder, panelBg, panelGlow,
titleFont, bodyFont,
navItemColor, navActiveColor,
gridColor, particleOpacity,
particleColor, particleColor2,
scanline
```

### Palette — "Void Arcane" design system

| Mode | BG | Primary | Secondary |
|---|---|---|---|
| RPG Dark | `#060c16` | `#00d4ff` electric cyan | `#b06aff` arcane violet |
| RPG Light | `#edeaf4` | `#1565a0` deep blue | `#7c3aed` violet |
| CV Dark | `#0f172a` | `#60a5fa` soft blue | `#34d399` teal |
| CV Light | `#f8fafc` | `#2563eb` brand blue | `#0891b2` sky |

Rarity colours (universal): `LEGENDARY=#f4c542` gold, `EPIC=#b06aff` violet, `RARE=#00d4ff` cyan

### Transition animation (`triggerGlitch`)
```js
triggerGlitch(isDark, toImmersive, cb)
```
- `cb()` fires at **320ms** — while overlay is fully covering the screen (prevents white flash)
- `setGlitching(false)` fires at **750ms** — after overlay closes
- Dark theme transition: `shadowDomainVoid` keyframe, cyan/violet palette, matches RPG Dark bg `#060c16`
- Light theme transition: `parchmentBloom` keyframe, cool blue-white `#f0f4ff`, matches CV/RPG Light palette
- Both variants use **3 centered underlines** (100% / 72% / 44% width) that `scaleX(0→1)` from center via `underlineGrow` keyframe — NOT radial shards

---

## 5. Navigation & Sections

### RPG mode nav labels → Classic mode equivalents
| RPG | Classic |
|---|---|
| CHARACTER | Profile |
| GUILDS | Experience |
| ACHIEVEMENTS | Certifications |
| WORLD MAP | Projects |
| SEND RAVEN | Contact |

### Section completion status
| Section | Status |
|---|---|
| CHARACTER / Profile | ✅ Complete |
| GUILDS / Experience | ✅ Complete |
| ACHIEVEMENTS / Certifications | ⚠️ Implemented, not refined |
| WORLD MAP / Projects | ⚠️ Implemented, not refined |
| SEND RAVEN / Contact | ⚠️ Implemented, not refined |

---

## 6. DATA Schema

```js
DATA = {
  name, title, rpgTitle, location, email, linkedin,
  primaryStack,          // e.g. ".NET · React" — shown in Classic sidebar career snapshot
  tagline,               // RPG mode tagline (hero section)
  taglineCV,             // Classic mode tagline
  rpgSummary, summary,   // mode-specific bio text
  careerStart,           // "2013-09-01" — drives all XP/level calculations dynamically

  skillCategories: [     // 5 entries — technical skills
    { id, label, rpgLabel, color, skills[] }
  ],
  innateAbilities: [     // 6 entries — soft skills
    { id, label, rpgLabel, color, skills[] }
  ],

  guilds: [              // 3 entries — work history
    {
      name, cvName,
      role, rpgRole,
      start, end,        // end: null = current employer
      desc, rpgDesc,
      bullets[], rpgBullets[],   // ⚠️ STILL EMPTY — needs real job responsibilities
      tech[]
    }
  ],

  achievements: [        // 6 entries — certs/milestones
    { title, cvTitle, desc, icon, unlocked, rarity }
  ],

  regions: [             // 5 entries — projects / world map
    { id, name, cvName, desc, x, y }
  ],
}
```

**Important:** `bullets[]` and `rpgBullets[]` in all 3 guilds are currently empty arrays. Filling these with real job responsibilities is a high-priority pending task.

---

## 7. Sidebar Layout

- **Desktop:** 270px fixed left column, sticky, scrollable
- **Landscape mobile** (`max-height: 500px`): 220px
- **Portrait mobile** (`max-width: 720px`): sidebar hidden, `MobileBanner` strip shown instead

### Sidebar contents (same across all tabs)
1. Arcane avatar (84px circle) with 3 orbiting rings (RPG mode only)
2. Class label + name
3. **RPG mode:** `LV.{n}` badge + EXP bar (`xpFill` CSS animation, `1 XP = 3.65 days`)
4. **Classic mode:** `{n}Y` badge + 3 Career Snapshot chips (YRS EXP, EMPLOYERS, PRIMARY STACK)
5. Divider
6. Dual spider charts (Technical + Soft skills)

### Arcane avatar rings (RPG mode only)
Three concentric border-only circles, each with an orbiting hotspot dot:
| Ring | Diameter | Color (dark) | Color (light) | Speed | Direction |
|---|---|---|---|---|---|
| LEGENDARY (outer) | 112px | `#f4c542` gold | `#b45309` | 3200ms | CW |
| UNIQUE (middle) | 98px | `#a855f7` violet | `#7c22a8` | 4800ms | CCW |
| RARE (inner) | 86px | `#22c55e` green | `#15803d` | 2400ms | CW |

Avatar container has `margin: "8px auto 30px"` — the 8px top and 30px bottom are intentional to clear ring bleed from panel edges.

---

## 8. Component Inventory

| Component | Description |
|---|---|
| `useTypewriter(text, speed)` | Typewriter effect, no cursor block |
| `useCountUp(target, duration)` | Animated number counter |
| `useCareerStats()` | Reads `DATA.careerStart`, returns `{level, xp, totalYears}` — all dynamic |
| `useGuildStats(start, end)` | Per-guild XP/level/period hook |
| `calcGuildStats(start, end)` | Pure function version of above (safe in `.map()`) |
| `SpiderChart(...)` | Radar chart. VB=200, maxR=44, labelR=65, 8px font, `overflow:visible` |
| `DualSpiderChart(...)` | Stacked pair: sidebar size=160, drawer size=180 |
| `SplashScreen({ onDone })` | 3s boot sequence on load, self-dismissing |
| `ModeTransition({ active, isDark, toImmersive })` | Cinematic overlay during mode switch |
| `ScanlineOverlay` | Fixed CRT scanlines (RPG Dark only) |
| `SystemParticles({ opacity, color, color2 })` | 4-zone particle system (see §10) |
| `SystemPanel({ children, style, glowColor, lightMode, overflowHidden })` | Sci-fi panel with corner brackets |
| `GuildSection({ rpgMode, lightMode, T })` | Timeline + animated system card |
| `Accordion({ label, sublabel, accent, lightMode, rpgMode, children, defaultOpen, bg })` | Grid 0fr/1fr animation, `bg` prop required to prevent grid bleed-through |
| `SkillPills({ categories, lightMode, T, rpgMode })` | Pill groups per skill category |
| `SidebarPanel()` | Sticky left column |
| `MobileBanner()` | Portrait mobile strip + expandable drawer |
| `ModeToggle(...)` | Mode + light/dark toggle buttons |
| `CVSection({ title, children, light, accent })` | Classic mode content wrapper |
| `WorldRegion({ region, onClick, rpgMode, accent })` | World map node |

---

## 9. CSS Keyframe Inventory

```
floatP           — old float (kept, unused by particles now)
pulseR           — scale+opacity pulse (used by active guild green dot)
fadeUp           — translateY fade in
sectionIn        — section entrance animation
scanDown         — scanline sweep
bootLine         — horizontal line grow
panelPulse       — SystemPanel glow heartbeat
shadowDomainVoid — dark transition overlay clip-path
parchmentBloom   — light transition overlay clip-path
smokeRing        — expanding ring in transition
centerOrb        — orb in transition
monarchText      — transition text reveal
underlineGrow    — transition underlines scaleX from center
splashLogoIn     — splash screen logo entrance
bootLineIn       — splash boot line entrance
splashBar        — splash progress bar
orbitCW          — clockwise ring orbit
orbitCCW         — counter-clockwise ring orbit
ringBreathRare   — green ring glow pulse
ringBreathUnique — violet ring glow pulse
ringBreathLegend — gold ring glow pulse
avatarPulse      — avatar background pulse
sysInit          — guild card system-initialize entrance
sysScan          — guild card pseudo-element sweep
sysBorderFlash   — guild card border flash
xpFill           — XP bar fill animation (uses --xp-target CSS var)
driftUp          — particle upward drift (uses --p-op CSS var)
glimmer          — particle opacity/scale pulse (uses --p-op CSS var)
```

---

## 10. Background & Particle System

### Grid background
- **24px cells**, 1px lines
- Dark themes: `rgba(255,255,255,…)` white lines
- Light themes: `rgba(0,0,0,…)` dark lines
- **Radial mask** fades edges to nothing: `radial-gradient(ellipse 80% 85% at 50% 50%, black 20%, transparent 75%)`
- Both `maskImage` and `WebkitMaskImage` set for cross-browser support
- Opacity values: RPG Dark `0.042`, RPG Light `0.048`, CV Light `0.042`, CV Dark `0.033`

### SystemParticles — 4 zone design
Particles are bottom-heavy and fade toward center:

| Zone | Y range | X range | Count | Max opacity | Animation |
|---|---|---|---|---|---|
| Bottom strip | 80–97% | 0–100% | 14 | 0.70 | `driftUp` (rises) |
| Side edges | 18–78% | 0–9%, 91–100% | 8 | 0.42 | `glimmer` (pulse) |
| Mid band | 52–76% | 10–90% | 7 | 0.22 | `glimmer` |
| Center | 22–50% | 22–78% | 6 | 0.11 | `glimmer` |

Each theme passes `particleColor` and `particleColor2` from `T` tokens — particles are always on-brand.

---

## 11. Key Design Decisions & The Reasoning Behind Them

### Things that were tried and removed
- `CVSkillBar`, `RPGSkillBar`, `RankBadge` — removed as dead code
- Status dot (6px purple indicator) — removed
- Typewriter `█` cursor — removed
- `maxHeight: 0→2000px` accordion — caused stutter, replaced with CSS grid trick
- `useCountUp` for XP bar width — caused 60 re-renders/sec stutter, replaced with `xpFill` keyframe + `--xp-target` CSS var
- Radial shard lightning lines in transition — replaced with centered underlines (shards extended too far across viewport)
- Warm parchment transition (amber/gold) — replaced with cool blue to match actual brand palette
- RPG Light vignette blobs — replaced by the grid background system
- Philippines pill in IMMERSIVE mode — removed (breaks fantasy fourth wall)
- Classic mode pills entirely — removed (redundant with address line)
- Seniority ladder widget — rejected (years ≠ seniority, replaced with Career Snapshot chips)

### Things that are deliberately the way they are
- `triggerGlitch` fires `cb()` at 320ms, not 750ms — prevents white flash by swapping content while overlay covers screen
- Avatar container `margin: "8px auto 30px"` — the 8px clears the top ring bleed (outer ring is 112px on 84px container = 14px bleed), 30px clears the bottom bleed
- Spider chart `overflow: "visible"` + container `padding: "0 16px"` — prevents label clipping
- `calcGuildStats` is a pure function wrapper around `useGuildStats` — hooks can't be called inside `.map()`
- Accordion uses `gridTemplateRows: 0fr→1fr` not `maxHeight` — animates to real content height with no JS measurement
- Accordion requires `bg={T.cardBg}` prop — without it the grid background bleeds through the transparent panel
- Active guild badge is green (`#22c55e` / `#15803d`) with animated `pulseR` dot — deliberate "online" signal, matches RARE ring color
- Classic mode labels: "Technical Skills" and "Soft Skills" (not "Class Abilities" / "Innate Abilities")

---

## 12. Pending Work (priority order)

1. **Fill real job data** — `bullets[]` and `rpgBullets[]` in all 3 guilds are empty
2. **Refine Achievements section** — implemented but not polished
3. **Refine World Map section** — all regions show "Undiscovered", needs real project links
4. **Refine Send Raven / Contact section** — implemented but not polished
5. **Whisper feature** — placeholder tag exists (`⚡ Whisper [SOON]`), no implementation
6. **Real project portals** — World Map regions need actual URLs when projects go live
7. **Splash screen timing** — currently hardcoded 3s, should eventually tie to real load performance

---

## 13. Tone & Language Guide

When writing copy for this site, keep these in mind:

| Context | Tone |
|---|---|
| RPG mode headings | Arcane, dramatic, first-person legend ("forged", "ascended", "conjurer") |
| RPG mode descriptions | Fantasy framing of real tech ("Azure cloud realm", "reactive illusion arts") |
| Classic mode | Confident, direct, no fluff ("Enterprise-forged. Delivered at scale.") |
| Pill labels (RPG) | In-universe only — "Seeking Quest", "Realm-Agnostic", "Guild-Independent" |
| Guild names (RPG) | Fantasy renames of real employers |

**Never break the fourth wall in RPG mode** — no real country names, no literal job titles, no "years of experience" counters.

---

## 14. Recommended First Prompt for Claude Code

```
Read CONTEXT.md fully before doing anything.

This is a single-file React portfolio (portfolio-v1.jsx) with no build step.
It uses inline styles only — no Tailwind, no CSS modules.
There are two modes (IMMERSIVE/RPG and CLASSIC/CV) and two themes (dark/light) = 4 combinations.
All theme values flow through the T token object.

My next task is: [YOUR TASK HERE]
```
