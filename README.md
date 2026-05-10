# /GREEN

Six Claude Code skills for a personal full-stack workflow: bootstrap a project, polish a prompt, tutor through any subject, audit for ship-readiness, finalize designs into real HTML, and surface the skills worth reaching for.

## Skills

| Skill | What it does |
|-------|--------------|
| `/greenfield` | 9-step bootstrap from idea to scaffolded repo with reconciled DESIGN.md + ARCHITECTURE.md |
| `/prompt-engineer` | Rewrites a rough instruction into a Claude Code prompt informed by the actual repo state |
| `/teach` | Tutoring loop with classify → calibrate depth → teach → user-driven follow-ups |
| `/audit` | Final ship-readiness audit. 10 quality gates, three tiers, halts on dealbreakers, ship verdict at the end |
| `/design-html` | Design finalization. Approved mockup, plan, or description → production-quality Pretext-native HTML/CSS (text reflows, heights compute, layouts are dynamic) |
| `/menu` | Curated index of the gstack skills actually worth reaching for + the personal /GREEN ones, organized by when to use them |

## Install

```bash
git clone <repo> ~/Github/Settings
cd ~/Github/Settings && ./install.sh
```

Symlinks every `skills/*/` into `~/.claude/skills/`, syncs `docs/RULES.md` into `~/.claude/CLAUDE.md`, and appends the `/GREEN` snippet. Idempotent.

Requires gstack for `/audit`'s underlying gates and `/greenfield`'s plan-review steps.

## Workflow

Type `/greenfield` in a new project.

1. `/office-hours`
2. Write `DESIGN.md` from the office-hours output (250–450 lines, must include the four required sections — see below)
3. `/plan-ceo-review`
4. `/plan-eng-review`
5. Synthesize `ARCHITECTURE.md` + `public/architecture/index.html` (seven required sections — see below; visual companion renders Mermaid in the browser)
6. `/plan-design-review`
7. `/design-shotgun` — generate 8–10 concrete HTML mockups before reconcile, not "when stuck"
8. Reconcile `DESIGN.md` and `ARCHITECTURE.md` against the office-hours doc
9. Cleanup: inspect dir, rename folder, lock dev port

## Refinement loop (the load-bearing principle)

Greenfield is **not a wizard**. It is a back-and-forth between you and Claude.

Between every step above, Claude must explicitly invite pushback:

> "Here's what we have. What context do you have that I don't? What would you change?"

Every artifact (DESIGN.md draft, each review output, design-shotgun mockups, reconcile delta) gets a refinement checkpoint before moving on. The user is the load-bearing voice — every major decision in Zetamax was shaped by user pushback at a checkpoint (the practice/competitive split, the cinematic direction, the Wordle-gate veto). Skip the loop and you ship the wrong product.

If Claude is silently moving from step to step, you are using the framework wrong. Stop and ask "what would you push back on?"

## DESIGN.md required sections

`DESIGN.md` must include these four sections at the top, before any other content. Each one is short (5–15 lines) but load-bearing:

### 1. Premises (load-bearing invariants)

Numbered list. Every later review must diff against these. Anything that violates a premise must either get justified or vetoed.

> Example (Zetamax):
> 1. The Zetamac feel is non-negotiable: open and play, no auth gate, no daily gate.
> 2. <16ms keystroke-to-paint on the input loop, on a mid-tier phone.
> 3. Friend leaderboards are the wedge. Public leaderboards are out of scope for v1.

### 2. Hot-path budgets

The 1–3 interactions the user does over and over. Set ms ceilings. List techniques you're banning on those paths.

| Action | Budget | What we won't do |
|---|---|---|
| {hot interaction, e.g. keystroke → digit appears} | {ms} | {no React reconciliation, no layout reads, no network, no async} |

The budget is a forcing function for architecture. Without it, you make 100 small decisions that each cost 2ms and you never notice until the product feels off.

### 3. Degradation matrix

What works with no JS, no auth, no network. Forces the question of which surfaces can run without backend. The Zetamax practice/competitive split came from this.

| Surface | No JS? | No auth? | No network? |
|---|---|---|---|
| {route} | yes/no | yes/no | yes/no |

### 4. State map

Every piece of persistent or shared state. Catches the "does this depend on `Date.now()` and break SSR?" class of bugs at design time.

| Name | Lives in | Lifetime | Read by | Written by | Fallback if missing |
|---|---|---|---|---|---|
| {state} | URL / localStorage / cookie / server / in-memory | {duration} | {who} | {who} | {what} |

## ARCHITECTURE.md required sections

`ARCHITECTURE.md` lives at the repo root next to `DESIGN.md`. **DESIGN.md = product (what to build). ARCHITECTURE.md = system (how it's wired).** Different rot rates, different readers — keep them separate. Templates: [`templates/architecture/`](./templates/architecture/).

The visual companion at `public/architecture/index.html` is **not optional**. It uses Mermaid via CDN (no toolchain) and gives you a browser-native view of the same diagrams. The `.md` is canonical; the `.html` mirrors it.

### 1. System overview

One paragraph + a Mermaid `graph TD` showing top-level components and arrows (browser → edge → DB → external). Color-code by trust boundary if useful.

### 2. Components

| Component | Purpose | Owns | Depends on | Lives in |
|---|---|---|---|---|
| {name} | {one line} | {state/data} | {what it calls} | `{file path or service name}` |

Be specific about file paths. This is the table future-Claude opens first when extending the system.

### 3. Request lifecycles

One Mermaid `sequenceDiagram` per hot-path from DESIGN.md, with the ms budget in the heading. End-to-end through real components.

### 4. State topology

Extends DESIGN.md's state map with the **physical** home and failure mode.

| Name | Logical (DESIGN) | Physical | TTL | Failure mode |
|---|---|---|---|---|
| {state} | {URL/localStorage/server} | `{table.column}` or `{ls key}` | {duration} | {what breaks if missing} |

### 5. Deployment topology

Mermaid `graph LR` with subgraphs per environment (browser / edge / Supabase / external). Note trust boundaries and where secrets live.

### 6. Decision log

The load-bearing architectural calls and the *why*. Future-Claude reads this **first** to avoid relitigating settled debates.

- **{decision}** — {one-line rationale}. Alternatives considered: {what else was on the table}. ({YYYY-MM-DD})

### 7. Out of scope

What this system intentionally does NOT do, with the reason. Prevents scope drift on every future feature ask.

## Prompts

```
/effort

/office-hours
# output: ~/.gstack/projects/{slug}/*.md

# design doc — REQUIRES the four sections at top
make a design doc based on the /office-hours output at <path>.
DESIGN.md MUST start with these four sections in this order:
1. Premises (numbered, load-bearing invariants)
2. Hot-path budgets (table: action / budget / what we won't do)
3. Degradation matrix (table: surface / no JS / no auth / no network)
4. State map (table: name / lives in / lifetime / read / written / fallback)
[paste thesis: one-liner, gap, audience, primitives, modes, voice, MVP]

# refinement checkpoint — run after every artifact
Pause. Summarize the current plan in 5 bullets. Ask me what I'd push back on,
what context you don't have, what's wrong. Don't proceed until I respond.

# reviews — each one ends with a refinement checkpoint
/plan-ceo-review
Run /plan-eng-review now

# architecture synthesis — REQUIRES the seven sections, both files mirror them
Synthesize ARCHITECTURE.md at the repo root and public/architecture/index.html
from the eng review's output. Copy the template from
~/Github/Settings/templates/architecture/ and fill it in.
Required sections (in order):
1. System overview (paragraph + Mermaid graph TD)
2. Components (table: name / purpose / owns / depends on / lives in)
3. Request lifecycles (one Mermaid sequenceDiagram per hot-path)
4. State topology (table: name / logical / physical / TTL / failure mode)
5. Deployment topology (Mermaid graph LR with subgraphs per env)
6. Decision log (decision / why / alternatives / date)
7. Out of scope (what / why not)

Run /plan-design-review now

# concrete visuals before reconcile
/design-shotgun
# output: 8-10 HTML mockups under public/design/ — pick a direction here

# reconcile
Compare DESIGN.md and ARCHITECTURE.md against the /office-hours doc.
Surface anything missing.
Fold all [N] items into DESIGN.md / ARCHITECTURE.md

# pre-build
what gstack stuff should i use now
Name tentatively is X. friends already in.
localhost only, port {port}

# scaffold
get started with scaffolding
```

When scaffolding, Claude inspects the directory first. If a scaffold already exists, pick option C (rename folder to product name, move contents up, single git).

## Reusable prompts

Idea validation and planning stress-test prompts (role-prompt format) live in [`docs/PROMPTS.md`](./docs/PROMPTS.md).

## Decision defaults

| Skill | Default |
|-------|---------|
| `/plan-ceo-review` mode | SELECTIVE EXPANSION (greenfield), HOLD (refactors), REDUCTION (>15-file plans) |
| `/plan-ceo-review` audience | Broader first if niche is saturated |
| `/plan-ceo-review` cherry-picks | Hours not days, load-bearing only |
| `/plan-eng-review` scope reduction | Snap back to /office-hours |
| `/plan-eng-review` alternatives | Boring approach unless there's a real reason |
| `/plan-design-review` mockups | Wedge screens only |

## Gotchas

- Run `/office-hours` before any review skill.
- Reconcile (step 8) is easy to forget; the review chain drifts.
- The **four required DESIGN.md sections** (Premises / Hot-path budgets / Degradation matrix / State map) are non-negotiable. If Claude tries to skip them, push back.
- The **seven required ARCHITECTURE.md sections** (System overview / Components / Lifecycles / State topology / Deployment topology / Decision log / Out of scope) are non-negotiable. Both `.md` and `public/architecture/index.html` get filled in — the visual companion is not optional.
- DESIGN.md and ARCHITECTURE.md are **separate on purpose.** Product vs. system. Different rot rates, different readers. Resist conflating them.
- The **refinement loop** is the framework. If Claude moves between steps without inviting pushback, stop and ask for it.
- Run `/design-shotgun` before reconcile. Visual mockups beat adjectives.
- `ls -la` before scaffolding (a scaffold might already exist).
- Rename folder to product name before the first commit.
- Lock the dev port at scaffold time.

## Files

- `README.md` — this file
- `docs/PLAYBOOK.md` — lessons, anti-patterns
- `docs/PROMPTS.md` — verbatim prompts from a real session
- `docs/RULES.md` — global rules synced into `~/.claude/CLAUDE.md` by `install.sh`
- `skills/` — personal skills (audit, design-html, greenfield, menu, prompt-engineer, teach) plus brand-kit
- `templates/architecture/` — `ARCHITECTURE.md` and `index.html` skeletons (copied per project)
- `site/` — Next.js landing page
