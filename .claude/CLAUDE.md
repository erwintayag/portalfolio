# CLAUDE.md — Portfolio Project (Portalfolio)

> Read this before every session. For deep design rationale, also read `CONTEXT.md`.

---

## 1. Project Identity

- **Single-file React portfolio**: `working-copy.jsx` (~2,150 lines)
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

---

## 3. File Layout (line map)

| Lines | Contents |
|---|---|
| 1–1138 | Helper components: `SpiderChart`, `Accordion`, `SkillPills`, `SystemPanel`, `GuildSection`, `CVSection`, `WorldRegion`, `ScanlineOverlay`, `SystemParticles`, `ModeTransition`, `ModeToggle`, `SplashScreen` |
| ~126 | `DATA.regions[]` — **portal integration point** (see §6) |
| 1135 | `FORMSPREE_ENDPOINT` constant |
| 1139–1157 | State declarations (`section`, `isDark`, `isImmersive`, `glitching`, etc.) |
| 1165–1213 | Theme (`T`) object — 4 variants |
| 1216–1217 | Nav arrays: `rpgNav[]` + `classicNav[]` |
| 1220–1222 | `skillColor()` helper |
| 1225–1435 | Sidebar: avatar + name/badge area |
| 1552–1643 | Desktop + mobile nav rendering |
| 1701–1819 | CHARACTER / Profile section |
| 1821–1893 | GRIMOIRE / Tech Stack section |
| 1897–1911 | GUILDS / Experience section |
| 1915–1962 | World Map / Projects section (`section === "map"`) |
| 1965–2139 | SEND RAVEN / Contact section |
| 2140+ | Closing JSX, export |

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

When `url` is populated, the UI should automatically unlock:
- **RPG WorldRegion node**: tooltip changes from "⚠ UNDISCOVERED" → "↗ ENTER REALM"; click opens `url` in new tab
- **Classic Projects card**: "Coming Soon" badge → "Visit Project →" link button (styled with `T.accent`)

### Current region placeholders

| id | RPG name | Classic name | Intended use |
|---|---|---|---|
| 1 | The Arcane Forge | Tools & Utilities | Dev tools / utilities |
| 2 | The Iron Guild | Enterprise Portal | Enterprise / B2B project |
| 3 | The Ember Sanctum | Creative Lab | Creative / experimental |
| 4 | The Shadow Market | SaaS Project | SaaS / product |
| 5 | The Crystal Spire | Open Source | Open source work |

---

## 6. Adding a New Project Portal (integration point)

When a new project repo is **deployed and has a live URL**:

1. Get the deployed URL (GitHub Pages, Vercel, Netlify, etc.)
2. Open `working-copy.jsx` and find `DATA.regions` (~line 126)
3. Pick the region whose `name`/`cvName` best fits the new project (see table above)
4. Set `url: "https://your-deployed-project.com"` on that region object
5. Apply the **URL Upgrade Pattern** to `WorldRegion` and the Classic Projects card (see §7)
6. Test both modes: RPG map node should now say "↗ ENTER REALM"; Classic card should show "Visit Project →"

---

## 7. WorldRegion + Classic Card — URL Upgrade Pattern

These changes are **not yet implemented** — apply them when adding the first real URL.

### WorldRegion component (~line 1001)

```jsx
// Before (current)
function WorldRegion({ region, T, onClick }) {
  // ...
  // tooltip hardcoded to "⚠ UNDISCOVERED"
  // onClick always calls onClick(region)
}

// After (with URL support)
function WorldRegion({ region, T, onClick }) {
  const { url } = region;
  // In onClick handler:
  //   if (url) window.open(url, '_blank');
  //   else onClick(region);  // existing modal/detail behaviour
  // In tooltip:
  //   url ? "↗ ENTER REALM" : "⚠ UNDISCOVERED"
}
```

### Classic Projects card (~line 1985)

```jsx
// Before (current)
<div style={{ color: T.accent }}>● Coming Soon</div>

// After (with URL support)
{r.url
  ? <a href={r.url} target="_blank" rel="noopener noreferrer"
       style={{ color: T.accent, textDecoration: "none", fontWeight: 600 }}>
      Visit Project →
    </a>
  : <div style={{ color: T.accent }}>● Coming Soon</div>
}
```

---

## 8. Nav Order

**RPG (IMMERSIVE):** CHARACTER → GRIMOIRE → GUILDS → SEND RAVEN

**Classic (CLASSIC):** Profile → Tech Stack → Experience → Contact

**World Map** (`section === "map"`):
- Code is preserved at lines ~1915–1962
- **Hidden from nav arrays** — not in `rpgNav[]` or `classicNav[]`
- Re-add to both nav arrays when projects are ready to go live
- Can be accessed programmatically: `setSection("map")`

---

## 9. Key Components (quick reference)

| Component | Location | Purpose |
|---|---|---|
| `SplashScreen` | ~line 950 | Full-screen intro animation; controls `showSplash` state |
| `ModeToggle` | ~line 880 | IMMERSIVE ↔ CLASSIC toggle button; triggers `triggerGlitch` |
| `SystemPanel` | ~line 320 | Styled RPG card container with scanline border |
| `GuildSection` | ~line 410 | RPG experience entry (guild name, rank, dates, bullets) |
| `CVSection` | ~line 460 | Classic experience entry (company, title, dates, bullets) |
| `WorldRegion` | ~line 1001 | SVG/div node on World Map; handles click + tooltip |
| `SkillPills` | ~line 260 | Renders `skillCategories[]` as coloured pill tags |
| `SpiderChart` | ~line 40 | SVG radar chart for innate abilities |
| `Accordion` | ~line 180 | Expandable section used in skill lists |
| `ScanlineOverlay` | ~line 520 | Full-page CRT scanline overlay (RPG dark mode only) |

---

## 10. Pending Work (priority order)

1. **World Map / Projects** — hidden from nav; needs real project URLs before re-enabling (see §6)
2. **Guild bullets** — `bullets[]` and `rpgBullets[]` in all 3 guilds are empty arrays; add real content
3. **Achievements section** — implemented in code, not polished or wired to nav
4. **Whisper feature** — `⚡ Whisper [SOON]` tag exists in CHARACTER tag row; no backend implementation yet

---

## 11. Owner & Deployment

- **GitHub**: `erwintayag` (SSH auth confirmed)
- **Repo**: `github.com/erwintayag/portalfolio`
- **Deploy**: `npm run build` → commit + push `dist/` (or configure GitHub Actions)
- **Formspree**: `https://formspree.io/f/xjgawygo` (live, real endpoint)
- **Profile image**: `public/profile.png` (real photo, used in sidebar avatar + mobile nav)
