---
name: Visual companions for /GREEN artifacts
description: User wants framework outputs to include browser-rendered visuals, not text-only markdown
type: feedback
originSessionId: 8b7e6f2d-95f6-411c-b55b-691a2ab35190
---
When adding new artifacts to the /GREEN framework (the greenfield project bootstrap at `~/Github/Settings/`), default to **text source of truth + HTML visual companion**. The HTML uses Mermaid via CDN (no build step) and lives in `public/<artifact>/index.html`, mirroring the existing `/design-shotgun` → `public/design/` pattern.

**Why:** the user explicitly pushed back on a text-only ARCHITECTURE.md proposal (2026-05-03) with "I also want some form of visual not just something living in terminal." Mermaid in a terminal is unreadable for system maps and sequence diagrams; the browser-rendered version is what they actually use to validate the artifact.

**How to apply:**
- For any new /GREEN artifact that contains diagrams, tables, or any visual structure, propose both an `.md` and a companion `.html` from the start — don't make them ask.
- Use Mermaid CDN (`https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js`), not a build step. Zero dependencies in the project.
- The `.md` is canonical — Mermaid blocks live there too, so GitHub renders them inline. The `.html` is a nicer view of the same source.
- Style: dark theme, neutral palette, monospace for technical bits, no emojis. Matches the framework's overall aesthetic.
- Templates go in `~/Github/Settings/templates/<artifact>/` and the `/greenfield` command copies them at the right step.
