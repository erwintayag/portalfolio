# CLAUDE.md — Portfolio Project (Portalfolio)

> Read this before every session. For deep design rationale, also read `CONTEXT.md`.

---

## 1. Project Identity

- **Single-file React portfolio**: `working-copy.jsx` (~2,483 lines)
- **Two modes**: IMMERSIVE (dark-fantasy RPG) + CLASSIC (clean CV) × dark/light = **4 themes**
- **Dev server**: `npm run dev` from project root
- **Deployed**: GitHub Pages via `npm run build` → push `dist/`
- **Frozen references** (never edit): `prototype-alpha.jsx`, `prototype-beta.jsx`
- **Design bible**: `CONTEXT.md` — read for deep design rationale, tone, and naming conventions

---

## 2. Critical Rules

- **No Tailwind, no TypeScript, no component library** — all styles are inline React style objects
- **Never rename the modes**: always `IMMERSIVE` / `CLASSIC` (not "RPG" / "CV" in user-facing strings)
- **Never break RPG fourth wall** — no real country names, job titles, or "years of experience" in RPG mode; use lore equivalents
- **Never modify frozen prototype files** (`prototype-alpha.jsx`, `prototype-beta.jsx`)
- **One file rule**: all components, state, data, and styles live in `working-copy.jsx`
- **Static assets belong in `public/`** — `dist/` is wiped on every `npm run build`; never put images/SVGs only in `dist/`

---

## 3. File Layout (line map)

| Lines | Contents |
|---|---|
| 1–1040 | Helper components: `SpiderChart`, `Accordion`, `SkillPills`, `SystemPanel`, `GuildSection`, `CVSection`, `WorldRegion`, `PortalConfirm`, `SplashScreen`, `ScanlineOverlay`, `SystemParticles`, `ModeTransition`, `ModeToggle` |
| ~126 | `DATA.regions[]` — **portal integration point** (see §6) |
| ~1233 | `FORMSPREE_ENDPOINT` constant |
| ~1236–1260 | State declarations (`section`, `rpgMode`, `lightMode`, `glitching`, `selRegion`, `mapScale`, `mapPan`, etc.) |
| ~1271–1300 | Theme (`T`) object — 4 variants; `triggerGlitch`; `handleSelectRegion` |
| ~1303–1310 | Nav arrays: `rpgNav[]` + `classicNav[]`; `skillColor()` helper |
| ~1356–1533 | Sidebar: `SidebarPanel` — avatar, name/badge, XP/snapshot, spider charts, footer (see §12) |
| ~1700–1860 | Desktop + mobile nav rendering + `<style>` block (CSS classes incl. `.realms-layout`) |
| ~1960–2080 | CHARACTER / Profile section |
| ~2085–2175 | GRIMOIRE / Tech Stack section |
| ~2178–2205 | GUILDS / Experience section |
| ~2207–2370 | REALMS / World Map section (`section === "map"`) — **live in nav** |
| ~2370–2483 | SEND RAVEN / Contact section + closing JSX, export |

---

## 4. Theme System

The active theme object `T` is one of 4 variants selected by `[isImmersive, isDark]`.

**Key token names:**

| Token | Purpose |
|---|---|
| `bg` | Page background |
| `navBg` | Sidebar / nav background |
| `accent` | Primary accent (gold in RPG, blue in Classic) |
| `accent2` | Secondary accent |
| `cardBg` | Card / panel background |
| `cardBorder` | Card border color |
| `textMuted` | Subdued text |
| `textStrong` | High-emphasis text |
| `titleFont` | Display / heading font |
| `bodyFont` | Body / UI font |

**Transition helper:**
```js
triggerGlitch(isDark, toImmersive, cb)
// cb fires at 320ms (mid-overlay), NOT at 750ms (end of animation)
// Always put state updates inside cb, not after the call
```

---

## 5. DATA Schema

Top-level `DATA` object keys: `name`, `rpgTitle`, `rpgSchool`, `rpgHonors`, `phone`, `careerStart`, `tagline`, `about`, `rpgAbout`, `skillCategories[]`, `innateAbilities[]`, `guilds[]`, `regions[]`

### `regions[]` — the portal integration point

```js
regions: [
  {
    id: 1,
    name: "The Arcane Forge",   // RPG display name
    cvName: "Tools & Utilities", // Classic display name
    desc: "...",                 // RPG flavour text
    cvDesc: "...",               // Classic description
    x: 42, y: 38,               // World Map node position (% of map image)
    url: undefined              // Set this when the project is deployed (see §6)
  },
  // ...
]
```

When `url` is populated, the UI automatically unlocks:
- **RPG WorldRegion node**: golden diamond + spinning selection ring; tooltip shows no status text (only locked nodes show "⚠ UNDISCOVERED"); detail panel shows "↗ ENTER THE REALM" button
- **Classic Projects card**: "Coming Soon" badge → "Visit Project →" link button (styled with `T.accent`)

### Current regions

| id | RPG name | Classic name | URL status |
|---|---|---|---|
| 1 | The Arcane Forge | Tools & Utilities | — locked |
| 2 | The Iron Guild | Enterprise Portal | — locked |
| 3 | The Ember Sanctum | Creative Lab | — locked |
| 4 | The Shadow Market | Personal Finance Tracker | ✅ `https://perfintrackerwin.netlify.app` |
| 5 | The Crystal Spire | Open Source | — locked |

---

## 6. Adding a New Project Portal (integration point)

When a new project repo is **deployed and has a live URL**:

1. Get the deployed URL (GitHub Pages, Vercel, Netlify, etc.)
2. Open `working-copy.jsx` and find `DATA.regions` (~line 126)
3. Pick the region whose `name`/`cvName` best fits the new project (see table above)
4. Set `url: "https://your-deployed-project.com"` on that region object
5. Test both modes: RPG map node turns gold + spinning ring; Classic card shows "Visit Project →"

No extra code changes needed — the URL unlock pattern is already fully implemented.

---

## 7. REALMS Section Architecture (implemented)

The REALMS section (`section === "map"`) uses a two-column layout:

```
.realms-layout (flex row, gap 16px)
  .realms-map-col (min(440px, 50%) — map)
    SystemPanel [aspectRatio: 210/297]
      inner div [transform: translate+scale, ref=mapInnerRef]
        ocean bg, SVG mask, WorldRegion nodes
      zoom controls [position:absolute, bottom-right]
      scale indicator [position:absolute, bottom-left]
  .realms-info-col (flex:1 — index / detail)
    {selRegion ? <detail panel> : <index list>}
```

**Mobile** (≤768px): `.realms-layout` stacks vertically via media query in `<style>` block.

### `handleSelectRegion(region)` — key function (~line 1279)
Called by both map node clicks and index item clicks. Sets `selRegion`, zooms map to `TARGET_SCALE=1.2`, and centers pan on the node. Clamped to valid pan bounds.

### `WorldRegion` props
```jsx
function WorldRegion({ region, onClick, rpgMode, accent, gold, isSelected, mapScale = 1 })
```
- `isSelected` — shows spinning dashed ring + pulsing inner ring
- `mapScale` — tooltip applies `scale(1/mapScale)` with `transformOrigin:"center bottom"` to counter-scale at any zoom level

### Portal flow (RPG mode)
1. Click node or index item → `handleSelectRegion` → sets `selRegion`
2. Index detail panel shows "↗ ENTER THE REALM" button (unlocked regions only)
3. Button → `setPortalTarget(selRegion)` → `PortalConfirm` overlay
4. `PortalConfirm` buttons: `[ I DARE ]` (confirm) / `[ RETREAT ]` (cancel)

---

## 8. Nav Order

**RPG (IMMERSIVE):** CHARACTER → GRIMOIRE → GUILDS → REALMS → SEND RAVEN

**Classic (CLASSIC):** Profile → Tech Stack → Experience → REALMS → Contact

**REALMS** (`section === "map"`): now live in both nav arrays.

---

## 9. Key Components (quick reference)

| Component | Location | Purpose |
|---|---|---|
| `SplashScreen` | ~line 950 | Full-screen intro animation; controls `showSplash` state |
| `ModeToggle` | ~line 880 | IMMERSIVE ↔ CLASSIC toggle button; triggers `triggerGlitch` |
| `SystemPanel` | ~line 320 | Styled RPG card container with scanline border |
| `GuildSection` | ~line 410 | RPG experience entry (guild name, rank, dates, bullets) |
| `CVSection` | ~line 460 | Classic experience entry (company, title, dates, bullets) |
| `WorldRegion` | ~line 1001 | Map node; props: `isSelected`, `mapScale`; tooltip counter-scales at zoom |
| `PortalConfirm` | ~line 1034 | Full-screen portal overlay; RPG buttons: `[ I DARE ]` / `[ RETREAT ]` |
| `SkillPills` | ~line 260 | Renders `skillCategories[]` as coloured pill tags |
| `SpiderChart` | ~line 40 | SVG radar chart; **viewBox is `-15 -15 230 230`** (expanded to contain axis labels — do NOT add `overflow: visible` back or labels will bleed) |
| `Accordion` | ~line 180 | Expandable section used in skill lists |
| `ScanlineOverlay` | ~line 520 | Full-page CRT scanline overlay (RPG dark mode only) |

---

## 10. Sidebar Architecture & Overflow Rules

The sticky sidebar panel has specific overflow constraints that were hard-won — do not change them without understanding the chain:

```
.sidebar-col  (width: 320px, flex-shrink: 0)
  .sidebar-sticky  (overflow-y: auto, overflow-x: clip  ← NOT hidden; "hidden" gets overridden to "auto" by CSS spec when overflow-y≠visible)
    SystemPanel  (overflowHidden=true  ← default; provides the hard clip boundary for SVG content)
      [avatar + rings]       ← rings max 112px diameter, centered in ~248px content — safely within panel
      [DualSpiderChart]      ← wrapped in overflow:hidden div as belt-and-suspenders
        SpiderChart (SVG)    ← viewBox="-15 -15 230 230", NO overflow:visible on SVG or containers
      [Sidebar Footer]       ← see below
```

### Sidebar Footer content (~line 1487)
Added below the dual spider charts to fill blank space on large screens. Two blocks:

**RPG mode:**
- `[ active assignment ]` — green status dot + `DATA.guilds[0].rpgRole` + "ON QUEST" (no real company name)
- `[ dispatch channels ]` — "Arcane Repository" → `DATA.github`, "Guild Registry" → `DATA.linkedin`
- Lore tagline strip — `DATA.tagline` in italic

**Classic mode:**
- `Current Role` — `DATA.guilds[0].role` + `DATA.guilds[0].cvName`
- `Connect` — "GitHub" → `DATA.github`, "LinkedIn" → `DATA.linkedin`
- 📍 Location strip — `DATA.location`

---

## 11. Pending Work (priority order)

1. **Guild bullets** — `bullets[]` and `rpgBullets[]` in all 3 guilds are empty arrays; add real content
2. **Remaining regions** — ids 1, 2, 3, 5 are locked; set `url` when those projects deploy (see §6)
3. **Achievements section** — implemented in code, not polished or wired to nav
4. **Whisper feature** — `⚡ Whisper [SOON]` tag exists in CHARACTER tag row; no backend implementation yet

---

## 12. Owner & Deployment

- **GitHub**: `erwintayag` (SSH auth confirmed)
- **Repo**: `github.com/erwintayag/portalfolio`
- **Deploy**: `npm run build` → commit + push `dist/` (or configure GitHub Actions)
- **Formspree**: `https://formspree.io/f/xjgawygo` (live, real endpoint)
- **Profile images**: `public/profile.png` (Classic mode) + `public/profile_rpg.png` (IMMERSIVE mode); `src` is conditional on `rpgMode` at both avatar spots (~lines 1419, 1578)

---

## 13. Applied Learning
When something fails repeatedly, when Erwin has to re-explain, or when a workaround is found for a platform/tool limitation, add a one-line bullet here. Keep each bullet under 15 words. No explanations. Only add things that will save time in future sessions.