# Tia Bajaj Aerospace Portfolio (Vite + React + TypeScript)

Single-page aerospace portfolio with:
- Dark near-space visual system
- Animated starfield and SVG drone
- Cinematic hero title and rotating role line
- Mission philosophy/capabilities sections
- Auto-rotating, draggable-looking project card carousel
- Reduced-motion support

## Stack
- Vite
- React
- TypeScript
- Plain CSS (no UI libraries)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel / Netlify
- Connect repo and use default Vite build settings:
  - Build command: `npm run build`
  - Output directory: `dist`

### GitHub Pages
1. Build and deploy `dist` with your preferred GH Pages action.
2. If deploying under a repo subpath, set `base` in `vite.config.ts` to `/<repo-name>/`.

## Editing content
All editable data is centralized in `src/App.tsx`:
- `ROLE_PHRASES`
- `MISSION_PROJECTS`
