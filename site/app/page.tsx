import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <p className="eyebrow">Claude Code · framework</p>
      <h1 className="hero">
        /GREEN<span className="cursor">_</span>
      </h1>
      <div className="hero-rule" />

      <p className="lead">
        Six Claude Code skills. Bootstrap a new project, upgrade a rough
        prompt, tutor you through anything, audit ship-readiness, finalize
        designs into real HTML, and surface the gstack skills worth reaching
        for.
      </p>
      <p className="subtag">
        For when &quot;figure it out as I go&quot; stops working.
      </p>

      <div className="cards">
        <Link className="card" href="/greenfield">
          <div className="card-head">
            <span className="num">01</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>greenfield</h2>
          <p>
            7-step bootstrap. Idea → diagnostic → plan → reconciled →
            scaffolded. Built around the step you&apos;ll most want to skip.
          </p>
        </Link>
        <Link className="card" href="/prompt-engineer">
          <div className="card-head">
            <span className="num">02</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>prompt-engineer</h2>
          <p>
            Reads your repo before it writes the prompt. No invented file
            paths, no broad refactors, real constraints baked in.
          </p>
        </Link>
        <Link className="card" href="/teach">
          <div className="card-head">
            <span className="num">03</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>teach</h2>
          <p>
            Tutoring loop. Overview → deep dive → follow-ups you drive
            yourself. Files, concepts, libraries — whatever you want to
            understand to a strong degree.
          </p>
        </Link>
        <Link className="card" href="/audit">
          <div className="card-head">
            <span className="num">04</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>audit</h2>
          <p>
            Ship-readiness audit. 10 quality gates run sequentially — health,
            qa, dogfood, security, web quality, perf regression, code review,
            second opinion, visual polish, docs sync. Halts on dealbreakers,
            verdict at the end.
          </p>
        </Link>
        <Link className="card" href="/design-html">
          <div className="card-head">
            <span className="num">05</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>design-html</h2>
          <p>
            Design finalization. Turns approved mockups, CEO plans, or a
            description into production-quality Pretext-native HTML/CSS.
            Text actually reflows, heights compute, layouts are dynamic.
            30KB overhead, zero deps.
          </p>
        </Link>
        <Link className="card" href="/menu">
          <div className="card-head">
            <span className="num">06</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>menu</h2>
          <p>
            Curated index of the gstack skills actually worth reaching for,
            plus the /GREEN custom skills, organized by when to use them.
          </p>
        </Link>
      </div>

      <section className="block">
        <p className="block-label">Install</p>
        <pre>
          <code>{`$ git clone <repo-url> ~/Github/Settings
$ cd ~/Github/Settings && ./install.sh`}</code>
        </pre>
        <p className="muted">
          Symlinks slash commands into <code>~/.claude/commands/</code> and
          skill directories into <code>~/.claude/skills/</code>. Idempotent —
          re-run anytime.
        </p>
      </section>

      <section className="block">
        <p className="block-label">Requires</p>
        <p className="muted">
          <strong>gstack</strong> — the underlying review skills{' '}
          <code>/office-hours</code>, <code>/plan-ceo-review</code>,{' '}
          <code>/plan-eng-review</code>, <code>/plan-design-review</code>,{' '}
          <code>/design-shotgun</code> that greenfield orchestrates, and the
          Pretext runtime that <code>/design-html</code> embeds.
        </p>
      </section>

      <footer className="footer">
        <p>made for future-me · so the workflow doesn&apos;t get re-discovered every time</p>
      </footer>
    </main>
  )
}
