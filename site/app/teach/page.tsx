export const metadata = {
  title: 'teach — /GREEN',
  description:
    'Structured tutoring loop for understanding any subject to a strong degree — files, concepts, libraries, anything.',
}

export default function Teach() {
  return (
    <main>
      <h1>teach</h1>
      <p className="lead">
        Tutoring loop. Type <code>/teach &lt;subject&gt;</code>; get an overview,
        a deep dive, and a menu of follow-ups you can drive yourself. Recurses
        until you exit.
      </p>

      <h2>What it does</h2>
      <p>
        Five steps every invocation: <strong>classify</strong> the subject
        (file, concept, or library), <strong>calibrate depth</strong> (gloss /
        standard / deep dive — defaults to deep), <strong>teach</strong> using
        a fixed structure, then <strong>offer follow-ups</strong> — three
        subtopics a curious learner would naturally ask next, plus a free-text
        field where you type whatever else you want clarified, plus a silent
        exit. Picking any non-exit option restarts the loop on the new
        subject.
      </p>
      <p>
        Every response follows the same shape: a one-sentence{' '}
        <strong>TL;DR</strong>, a <strong>mental model</strong> (with concrete
        decomposition for abstract subjects), <strong>how it works</strong>,{' '}
        <strong>two examples</strong> (one minimal, one realistic), a{' '}
        <strong>visual</strong> when it would replace 3+ sentences of prose,
        and at Deep dive depth, a <strong>connections</strong> closer that
        links to adjacent concepts. Depth changes density, not which sections
        appear.
      </p>

      <h2>When to use it</h2>
      <ul>
        <li>
          You want to actually understand something — not skim a Wikipedia
          paragraph.
        </li>
        <li>
          The thing you&apos;re learning has natural sub-questions, and you
          don&apos;t want to keep retyping <code>/explain X</code> every time
          one comes up.
        </li>
        <li>
          You want to drive the deep-dive — pick what to clarify, type
          arbitrary follow-ups, exit when you&apos;re satisfied.
        </li>
        <li>
          The subject is anything: code in your repo, a programming concept, a
          library, a financial concept, a system internal.
        </li>
      </ul>

      <h2>When NOT to use it</h2>
      <ul>
        <li>
          You just want a one-shot file walkthrough — use <code>/explain</code>
          {' '}instead, no menu, no loop.
        </li>
        <li>
          You&apos;re trying to <em>build</em> something. <code>/teach</code>{' '}
          will refuse to write or edit code in your repo.
        </li>
        <li>
          You want a quick fact lookup — overkill. Just ask Claude directly.
        </li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>Claude Code installed</li>
        <li>
          The /GREEN install (symlinks <code>~/.claude/skills/teach/</code> to
          this repo)
        </li>
      </ul>

      <h2>Setup (one-time)</h2>
      <pre>
        <code>{`git clone <repo-url> ~/Github/Settings
cd ~/Github/Settings && ./install.sh`}</code>
      </pre>
      <p className="muted">
        <code>install.sh</code> now symlinks both{' '}
        <code>.claude/commands/*.md</code> (slash commands) <em>and</em>{' '}
        <code>skills/*/</code> (skill directories) into{' '}
        <code>~/.claude/</code>. Idempotent — re-run anytime.
      </p>

      <h2>How it works (step by step)</h2>

      <h3>Step 1 — classify the subject</h3>
      <p>Looks at <code>$ARGUMENTS</code> and decides what kind of thing it is:</p>
      <ul>
        <li>
          <strong>File path or function name</strong> (e.g. <code>auth.ts</code>,{' '}
          <code>useReducer</code>) — Reads the file, walks through it. If the
          path doesn&apos;t exist, falls through to &quot;concept.&quot;
        </li>
        <li>
          <strong>Programming concept</strong> (e.g. <code>closures</code>,{' '}
          <code>hydration</code>) — pure pedagogy, no repo access.
        </li>
        <li>
          <strong>Library / tool / system</strong> (e.g.{' '}
          <code>Postgres MVCC</code>, <code>Tailwind v4</code>) — may use
          WebSearch when training-cutoff knowledge feels stale.
        </li>
        <li>
          <strong>Ambiguous</strong> — asks once which kind of thing it is.
        </li>
      </ul>
      <p>
        If <code>$ARGUMENTS</code> is empty, asks once: &quot;What do you want
        to learn?&quot; Doesn&apos;t invent a topic.
      </p>

      <h3>Step 2 — calibrate depth</h3>
      <p>
        Depth controls <em>density</em>, not which sections appear. All three
        depths produce the same structural elements; what changes is how much
        each is unpacked.
      </p>
      <ul>
        <li>
          <strong>Quick gloss</strong> — sections compressed; minimal example
          only, no pitfalls section
        </li>
        <li>
          <strong>Standard</strong> — full sections with normal elaboration
        </li>
        <li>
          <strong>Deep dive (default)</strong> — full sections, extended
          elaboration, common pitfalls, the &quot;connections&quot; closer
        </li>
      </ul>

      <h3>Step 3 — teach</h3>
      <p>
        Every response is structurally the same, in this order:
      </p>
      <ol>
        <li>
          <strong>TL;DR</strong> — one bolded sentence a smart 12-year-old
          could grasp. If you can&apos;t compress the subject to one sentence,
          you don&apos;t understand it well enough to teach it.
        </li>
        <li>
          <strong>Mental model</strong> — the picture in the user&apos;s head
          after reading. For abstract subjects, decomposes into something
          concrete the user already knows (e.g. &quot;you&apos;ve used
          <code>Promise.then</code>; that&apos;s a monad — here&apos;s what
          generalizes&quot;). Reductions over fresh metaphors.
        </li>
        <li>
          <strong>How it works</strong> — the mechanics. At Deep dive depth,
          common pitfalls and edge cases.
        </li>
        <li>
          <strong>Two examples</strong> — both required at Standard and Deep
          dive:
          <ul>
            <li>
              <strong>Minimal</strong> — smallest possible illustration.
            </li>
            <li>
              <strong>Realistic</strong> — what it actually looks like in
              production. Real values, real complications.
            </li>
          </ul>
        </li>
        <li>
          <strong>Visual</strong> — when prose alone would take ≥3 sentences
          to convey what a table or diagram conveys instantly. See visual
          policy below.
        </li>
        <li>
          <strong>Connections</strong> (Deep dive only) — one short paragraph
          linking to adjacent concepts the user has likely encountered.
        </li>
      </ol>
      <p>
        No filler. No &quot;great question.&quot; No &quot;hope that
        helped.&quot; No closing recap.
      </p>

      <h4>Visual policy</h4>
      <p>
        Use a visual when it would replace ≥3 sentences of prose. Match the
        format to the subject:
      </p>
      <ul>
        <li>
          <strong>Markdown tables</strong> — for comparisons (X vs Y,
          side-by-side trade-offs). The single most under-used format.
        </li>
        <li>
          <strong>ASCII / box diagrams</strong> — for system flows, data
          movement, state transitions. Always renders in any terminal.
        </li>
        <li>
          <strong>Code blocks</strong> — for code, syntax, configuration.
        </li>
        <li>
          <strong>Math equations</strong> — plain-text math, not LaTeX:
          {' '}<code>P&L = max(S - K, 0) - premium</code>.
        </li>
        <li>
          <strong>Mermaid syntax</strong> — for sequence diagrams, state
          machines. Rendering depends on the surface; prefer ASCII in the
          terminal.
        </li>
      </ul>
      <p>
        Skip the visual if it would be smaller than the prose it replaces.
      </p>

      <h3>Step 4 — offer follow-ups</h3>
      <p>Four options:</p>
      <ul>
        <li>Three natural subtopics a curious learner would ask next</li>
        <li>
          <strong>Free-text clarification</strong> (the &quot;Other&quot; field)
          — type whatever you want clarified next
        </li>
        <li>&quot;I&apos;m good — I understand this&quot; — exits silently</li>
      </ul>
      <p>
        The free-text field is the point of the skill — the user, not the
        model, drives the conversation.
      </p>

      <h3>Step 5 — recurse or exit</h3>
      <ul>
        <li>
          <strong>Subtopic pick</strong> → re-enter Step 2 with the chosen
          subtopic as the new subject (depth re-asked, default still deep)
        </li>
        <li>
          <strong>Free-text clarification</strong> → re-enter Step 2 with the
          typed input as the new subject
        </li>
        <li>
          <strong>&quot;I&apos;m good&quot;</strong> → stop immediately. No
          recap.
        </li>
      </ul>
      <p>
        No recursion limit. The user controls when it ends.
      </p>

      <h2>Examples</h2>

      <h3>Example 1: a concept</h3>
      <pre>
        <code>/teach futures vs options</code>
      </pre>
      <p>
        Asks once whether you mean financial derivatives or programming
        abstractions (<code>Future&lt;T&gt;</code> vs <code>Option&lt;T&gt;</code>).
        Asks depth. Walks through the chosen topic. Then offers: &quot;the
        Greeks,&quot; &quot;options strategies,&quot; &quot;margin
        mechanics,&quot; or your own clarification.
      </p>

      <h3>Example 2: a file in your repo</h3>
      <pre>
        <code>/teach lib/auth.ts</code>
      </pre>
      <p>
        Reads the file, walks through what it does, calls out the
        non-obvious bits (race conditions, closures, hidden side effects).
        Offers follow-ups based on what&apos;s actually in the file — a
        function the explanation glossed, a config import, an external API
        call.
      </p>

      <h3>Example 3: a library</h3>
      <pre>
        <code>/teach how Postgres MVCC works</code>
      </pre>
      <p>
        Uses WebSearch for current details. Explains the mental model
        (snapshots, transaction IDs, vacuum). Offers follow-ups: &quot;what
        causes bloat,&quot; &quot;serializable isolation,&quot; &quot;how this
        differs from SQL Server,&quot; or your own.
      </p>

      <h3>Example 4: empty input</h3>
      <pre>
        <code>/teach</code>
      </pre>
      <p>
        Asks once: &quot;What do you want to learn?&quot; — free-text via the
        Other field. Doesn&apos;t guess.
      </p>

      <h2>Hard rules baked in</h2>
      <ul>
        <li>
          <strong>Teaching only.</strong> Will not edit, write, or run code in
          your repo.
        </li>
        <li>
          <strong>Ephemeral.</strong> Saves nothing to disk. No notes, no
          history, no learning log.
        </li>
        <li>
          <strong>TL;DR is mandatory.</strong> Every response opens with one
          bolded sentence. No exceptions, regardless of depth.
        </li>
        <li>
          <strong>Two examples are mandatory</strong> at Standard and Deep
          dive depth: minimal + realistic. Quick gloss may use the minimal
          only.
        </li>
        <li>
          <strong>Visual when applicable.</strong> If 3+ sentences could be
          replaced by a table or diagram, the table or diagram appears.
        </li>
        <li>
          <strong>Abstract subjects must decompose into something concrete.</strong>{' '}
          Lead with the concrete instance, derive the abstraction from it. No
          fresh metaphors when a structural reduction works.
        </li>
        <li>
          <strong>Always offers exit.</strong> Step 4 always includes
          &quot;I&apos;m good.&quot;
        </li>
        <li>
          <strong>Default depth = deep dive.</strong> If you wanted a quick
          gloss you&apos;d ask Claude directly.
        </li>
        <li>
          <strong>No recap on exit.</strong> When you say you&apos;re good, the
          skill stops. No closing summary.
        </li>
      </ul>

      <h2>Why a skill, not a slash command</h2>
      <p>
        <code>/teach</code> lives at <code>~/.claude/skills/teach/SKILL.md</code>{' '}
        (symlinked from <code>Settings/skills/teach/</code>) — a Claude Code
        skill, not a one-file slash command. The format is overkill for a
        100-line prompt, but it puts <code>/teach</code> in the same namespace
        as the gstack skills you see in <code>/menu</code> — discoverable in
        one place.
      </p>
      <p className="muted">
        Frontmatter only — no gstack preamble, no telemetry, no auto-update
        check. If you ever want full gstack integration, easy to bolt on later.
      </p>

      <h2>Use it</h2>
      <pre>
        <code>/teach [subject]</code>
      </pre>
      <p className="muted">
        Works in any project, any directory. Reads files in your repo if you
        name a path; explains anything else from training-cutoff knowledge or
        WebSearch.
      </p>
    </main>
  )
}
