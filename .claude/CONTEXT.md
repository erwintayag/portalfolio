# Portfolio Website — Claude Code Handoff Brief
_Last updated: March 2026, Session 12. Written to onboard Claude Code without repeating the full design session._

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
| `working-copy.jsx` | Active working file — always the latest state (~2,483 lines) |
| `prototype-alpha.jsx` | Frozen early snapshot (~1,390 lines), **never modify** |
| `prototype-beta.jsx` | Frozen mid-session snapshot (~1,759 lines), **never modify** |
| `public/profile.png` | Real photo — used in CLASSIC mode avatar |
| `public/profile_rpg.png` | RPG-style portrait — used in IMMERSIVE mode avatar |
| `.claude/CONTEXT.md` | This file — design rationale and system deep-dives |
| `.claude/CLAUDE.md` | Session quick-reference — line map, component index, rules |

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

### Nav order (both modes)
**IMMERSIVE:** CHARACTER → GRIMOIRE → GUILDS → REALMS → SEND RAVEN
**CLASSIC:** Profile → Tech Stack → Experience → Projects → Contact
(section id `"map"` is shared — same component renders for both)

### RPG mode nav labels → Classic mode equivalents
| RPG | Classic | Section ID |
|---|---|---|
| CHARACTER | Profile | `"hero"` |
| GRIMOIRE | Tech Stack | `"grimoire"` |
| GUILDS | Experience | `"guilds"` |
| REALMS | Projects | `"map"` |
| SEND RAVEN | Contact | `"contact"` |

### Section completion status
| Section | Status |
|---|---|
| CHARACTER / Profile | ✅ Complete |
| GRIMOIRE / Tech Stack | ✅ Complete |
| GUILDS / Experience | ✅ Complete (bullets filled) |
| REALMS / Projects | ✅ Complete — two-column map + portal flow |
| SEND RAVEN / Contact | ✅ Complete — Formspree live |
| Achievements | ⚠️ Implemented in code, not wired to nav |

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

- **Desktop:** **320px** fixed left column, sticky, scrollable
- **Landscape mobile** (`max-height: 500px`): 260px
- **Portrait mobile** (`max-width: 720px`): sidebar hidden, `MobileBanner` strip shown instead

### Overflow chain — do NOT change without reading §11
```
.sidebar-col  (width:320px, flex-shrink:0)
  .sidebar-sticky  (overflow-y:auto, overflow-x:clip  ← NOT hidden)
    SystemPanel  (overflowHidden=true — default)
      [content]
        SpiderChart SVG  (viewBox="-15 -15 230 230", no overflow:visible)
```
`overflow-x:clip` is required because CSS spec silently promotes `overflow-x:hidden` → `auto` whenever `overflow-y` is non-visible. `clip` is a CSS Level 3 value that creates a true geometric clip without this side-effect.

### Sidebar contents (same across all tabs)
1. Avatar (84px circle) — **`profile_rpg.png` in IMMERSIVE, `profile.png` in CLASSIC**; 3 orbiting rings in IMMERSIVE only
2. Class label + name
3. **RPG mode:** `LV.{n}` badge + EXP bar (`xpFill` CSS animation, `1 XP = 3.65 days`)
4. **Classic mode:** 3 Career Snapshot chips (YRS EXP, EMPLOYERS, PRIMARY STACK)
5. Divider
6. Dual spider charts (Technical + Soft skills)
7. **Sidebar footer** — fills blank space on large screens (added Session 12):
   - RPG: `[ active assignment ]` card (rpgRole, no real company name) + `[ dispatch channels ]` (GitHub/LinkedIn) + lore tagline strip
   - Classic: `Current Role` card + `Connect` links + 📍 location strip

### Arcane avatar rings (RPG mode only)
Three concentric border-only circles, each with an orbiting hotspot dot:
| Ring | Diameter | Color (dark) | Color (light) | Speed | Direction |
|---|---|---|---|---|---|
| LEGENDARY (outer) | 112px | `#f4c542` gold | `#b45309` | 3200ms | CW |
| UNIQUE (middle) | 98px | `#a855f7` violet | `#7c22a8` | 4800ms | CCW |
| RARE (inner) | 86px | `#22c55e` green | `#15803d` | 2400ms | CW |

Avatar container has `margin: "8px auto 30px"` — the 8px top and 30px bottom are intentional to clear ring bleed from panel edges.

Avatar `src` is **conditional on `rpgMode`**:
```jsx
src={`${import.meta.env.BASE_URL}${rpgMode ? "profile_rpg.png" : "profile.png"}`}
```
Both files live in `public/` so Vite includes them in every build. Never place static assets only in `dist/` — that folder is wiped on every `npm run build`.

---

## 8. Component Inventory

| Component | Description |
|---|---|
| `useTypewriter(text, speed)` | Typewriter effect, no cursor block |
| `useCountUp(target, duration)` | Animated number counter |
| `useCareerStats()` | Reads `DATA.careerStart`, returns `{level, xp, totalYears}` — all dynamic |
| `useGuildStats(start, end)` | Per-guild XP/level/period hook |
| `calcGuildStats(start, end)` | Pure function version of above (safe in `.map()`) |
| `SpiderChart(...)` | Radar chart. viewBox=`-15 -15 230 230`, maxR=44, labelR=65, 8px font. **No `overflow:visible`** — viewBox expanded to contain labels. Do NOT add overflow:visible back. |
| `DualSpiderChart(...)` | Stacked pair of SpiderCharts (Technical + Soft skills). Both use `size=160`. Wrapped in `overflow:hidden` div inside SidebarPanel. |
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
- Spider chart viewBox is `"-15 -15 230 230"` (expanded 15 units each side from original `"0 0 200 200"`) — labels at `labelR=65` extend ~3–13 VB units past the 200-unit boundary; expanding the viewBox contains them without needing `overflow:visible`. Browser HTML `overflow:hidden` does NOT reliably clip SVG `overflow:visible` content — fix must be at the SVG level.
- `sidebar-sticky` uses `overflow-x: clip` not `overflow-x: hidden` — CSS spec promotes `hidden` to `auto` when `overflow-y` is also set, nullifying it. `clip` creates a true geometric clip independently.
- `SidebarPanel` uses `SystemPanel` with default `overflowHidden=true` — this is the hard boundary that prevents any SVG overflow from escaping into the main content column.
- `calcGuildStats` is a pure function wrapper around `useGuildStats` — hooks can't be called inside `.map()`
- Accordion uses `gridTemplateRows: 0fr→1fr` not `maxHeight` — animates to real content height with no JS measurement
- Accordion requires `bg={T.cardBg}` prop — without it the grid background bleeds through the transparent panel
- Active guild badge is green (`#22c55e` / `#15803d`) with animated `pulseR` dot — deliberate "online" signal, matches RARE ring color
- Classic mode labels: "Technical Skills" and "Soft Skills" (not "Class Abilities" / "Innate Abilities")

---

## 12. Pending Work (priority order)

1. **Guild bullets** — `bullets[]` and `rpgBullets[]` in all 3 guilds are populated but can be refined further
2. **Remaining regions** — ids 1, 2, 3, 5 are locked; set `url` in `DATA.regions` when those projects deploy
3. **Achievements section** — implemented in code, not polished or wired to nav
4. **Whisper feature** — `⚡ Whisper [SOON]` tag exists in CHARACTER; no backend implementation yet
5. **Splash screen timing** — currently hardcoded 3s; could tie to real load performance eventually

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
Read .claude/CLAUDE.md and .claude/CONTEXT.md fully before doing anything.

This is a single-file React portfolio (working-copy.jsx, ~2,483 lines).
It uses inline React styles only — no Tailwind, no CSS modules, no TypeScript.
Two modes (IMMERSIVE / CLASSIC) × two themes (dark / light) = 4 combinations.
All theme values flow through the T token object.
Static assets (images, SVGs) live in public/ — never place them in dist/.

My next task is: [YOUR TASK HERE]
```
