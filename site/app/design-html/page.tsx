export const metadata = {
  title: 'design-html — /GREEN',
  description:
    'Design finalization. Turns approved mockups, plans, or descriptions into production-quality Pretext-native HTML/CSS — text reflows, heights compute, layouts are dynamic.',
}

export default function DesignHtml() {
  return (
    <main>
      <h1>design-html</h1>
      <p className="lead">
        Design finalization. Type <code>/design-html</code> to turn an
        approved mockup, a plan, or a fresh description into
        production-quality Pretext-native HTML/CSS. Text actually reflows,
        heights are computed, layouts are dynamic. 30KB overhead, zero deps.
      </p>

      <h2>What it does</h2>
      <p>
        Takes a design intent and emits real HTML, not a static screenshot
        export. Picks the right Pretext patterns for the page type, embeds
        the runtime once (<code>vendor/pretext.js</code>, ~30KB), wires the
        layout so it flexes with content, and opens a live-reload preview
        loop so you can iterate.
      </p>
      <p>
        Smart input detection. It looks for the artifacts your other skills
        leave behind and routes accordingly:
      </p>
      <ul>
        <li>
          <strong>Approved mockup</strong> from <code>/design-shotgun</code>{' '}
          (<code>approved.json</code>) — uses the chosen variant verbatim.
        </li>
        <li>
          <strong>CEO plan</strong> from <code>/plan-ceo-review</code> or{' '}
          design context from <code>/plan-design-review</code> — pulls scope
          and IA, asks for any missing visual decisions, then builds.
        </li>
        <li>
          <strong>From scratch</strong> — you describe the page, it asks the
          minimum number of clarifying questions, then builds.
        </li>
      </ul>

      <h2>Why Pretext</h2>
      <p>
        Most AI-generated HTML is stiff: pixel-perfect for the one viewport
        the model imagined, broken everywhere else. Pretext is a tiny
        runtime that handles dynamic layout primitives — flexible columns,
        adaptive type scales, computed heights — so the output behaves like
        a real page instead of a frozen mockup.
      </p>
      <ul>
        <li>30KB overhead, embedded inline. No CDN, no build step.</li>
        <li>Zero dependencies. Pure HTML + CSS + a small JS shim.</li>
        <li>
          Works framework-agnostic. Outputs a static file you can drop into
          Next.js, Astro, plain HTML, or convert into a component.
        </li>
      </ul>

      <h2>The flow</h2>
      <ol>
        <li>
          <strong>Input detection</strong> — checks for{' '}
          <code>approved.json</code>, CEO plan, or design-review context. If
          none found, asks for a description.
        </li>
        <li>
          <strong>Design analysis</strong> — extracts layout type, content
          density, hierarchy, motion intent.
        </li>
        <li>
          <strong>Pretext API routing</strong> — picks the right patterns
          (grid vs. flow, marquee vs. static, fluid type, etc.).
        </li>
        <li>
          <strong>Framework detection</strong> — adapts output if a
          target framework is detected in the cwd.
        </li>
        <li>
          <strong>HTML generation</strong> — emits the file with Pretext
          embedded and patterns wired.
        </li>
        <li>
          <strong>Live reload preview</strong> — opens a local server, takes
          verification screenshots, walks a refinement loop with you.
        </li>
        <li>
          <strong>Save + design tokens</strong> — writes the file, extracts
          tokens (color, spacing, type), records metadata for the next
          skill in the chain.
        </li>
      </ol>

      <h2>When to use it</h2>
      <ul>
        <li>You ran <code>/design-shotgun</code> and approved a variant.</li>
        <li>You finished <code>/plan-ceo-review</code> + <code>/plan-design-review</code> and want a real page.</li>
        <li>
          You have a description in your head and want it real on screen
          before you wire it into the app.
        </li>
        <li>
          You want a starting HTML/CSS that flexes — not something the next
          person has to rewrite the moment content changes.
        </li>
      </ul>

      <h2>When NOT to use it</h2>
      <ul>
        <li>
          You already have a built UI and want a polish pass — use{' '}
          <code>/design-review</code> instead.
        </li>
        <li>
          You don&apos;t know what you want yet — run{' '}
          <code>/design-shotgun</code> first to explore variants.
        </li>
        <li>
          You need an interactive prototype with real data — Pretext is for
          finalizing a page&apos;s shape, not stubbing flows.
        </li>
      </ul>

      <h2>What it produces</h2>
      <ul>
        <li>A single HTML file with Pretext embedded inline.</li>
        <li>Verification screenshots at common breakpoints.</li>
        <li>
          Extracted design tokens (color palette, spacing scale, type ramp)
          saved next to the file.
        </li>
        <li>
          Metadata for the next skill in the chain (so{' '}
          <code>/design-review</code>, brand kit work, or framework
          extraction can pick up where this left off).
        </li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>Claude Code installed</li>
        <li>The /GREEN install (symlinks <code>~/.claude/skills/design-html/</code> to this repo)</li>
        <li>
          <strong>gstack</strong> — design-html ships as part of gstack.
          Install gstack alongside /GREEN; the skill files in this repo
          mirror the gstack copy so the route, install, and docs stay
          in sync.
        </li>
      </ul>

      <h2>Use it</h2>
      <pre>
        <code>{`/design-html                       # auto-detect inputs
/design-html "marketing landing"  # describe from scratch
/design-html "fix the hero, make it shorter and louder"`}</code>
      </pre>
      <p className="muted">
        Voice triggers: &quot;build the design,&quot; &quot;code the
        mockup,&quot; &quot;make it real.&quot; Auto-fires after{' '}
        <code>/design-shotgun</code> approves a variant.
      </p>
    </main>
  )
}
