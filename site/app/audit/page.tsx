export const metadata = {
  title: 'audit — /GREEN',
  description:
    'Final ship-readiness audit. 10 quality gates, three tiers, halts on dealbreakers, ship verdict at the end.',
}

export default function Audit() {
  return (
    <main>
      <h1>audit</h1>
      <p className="lead">
        Final ship-readiness sweep. Type <code>/audit</code> when a project is
        ready (or you think it is); 10 quality gates run sequentially and a
        ship/no-ship verdict comes out the other end.
      </p>

      <h2>What it does</h2>
      <p>
        Runs up to 10 gates against the current project. Halts on
        critical-gate failures (broken tests, broken QA, structural review
        issues) — there&apos;s no point running advisory gates on a typecheck
        failure. Advisory gates produce findings that downgrade the verdict to
        <strong> SHIP WITH CAVEATS</strong> rather than block.
      </p>

      <h2>The 10 gates (in order)</h2>
      <ol>
        <li><code>/health</code> — typecheck, lint, tests, dead code (halt-on-fail)</li>
        <li><code>/qa</code> — real-browser feature testing with bug fixing (halt-on-fail)</li>
        <li><strong>Dogfood</strong> — end-to-end user flow walk; homepage → CTA → auth → main feature</li>
        <li><code>/cso</code> daily — security audit (secrets, deps, OWASP basics)</li>
        <li>
          <strong>Web quality (inline)</strong> — perf (Core Web Vitals: LCP,
          INP, CLS), a11y (WCAG AA), SEO (meta, structured data, robots),
          best-practices (HTTPS, CSP, no console errors)
        </li>
        <li><code>/benchmark</code> — perf regression vs baseline (first run establishes)</li>
        <li><code>/review</code> — diff review for SQL safety, trust boundaries (halt-on-fail)</li>
        <li><code>/codex</code> review — independent adversarial second opinion</li>
        <li><code>/design-review</code> — visual QA, AI-slop detection (full tier only, UI required)</li>
        <li><code>/document-release</code> — sync README, CHANGELOG, docs (full tier only)</li>
      </ol>

      <h2>Tiers</h2>
      <ul>
        <li>
          <strong>Quick (~5 min)</strong> — gates 1, 2, 3, 7. Catches
          dealbreakers and broken user flows.
        </li>
        <li>
          <strong>Standard (default, ~25 min)</strong> — gates 1–8. Adds
          security, web quality, perf, second opinion.
        </li>
        <li>
          <strong>Full (~50 min)</strong> — all 10. Adds visual polish + docs
          sync.
        </li>
      </ul>
      <p>
        Tier picker fires once per invocation. Pass <code>quick</code>,{' '}
        <code>standard</code>, or <code>full</code> in the args to skip the
        question.
      </p>

      <h2>When to use it</h2>
      <ul>
        <li>You think a project is ready to ship and want a final check.</li>
        <li>
          You&apos;re about to deploy and want a 25-minute sweep before
          pushing to prod.
        </li>
        <li>
          You&apos;ve been heads-down and want fresh eyes on the whole codebase
          (security, accessibility, perf — things easy to forget mid-build).
        </li>
        <li>You want a single &quot;ship / don&apos;t ship&quot; verdict, with evidence.</li>
      </ul>

      <h2>When NOT to use it</h2>
      <ul>
        <li>
          Mid-development. Most gates compare against a finished state — running
          them on half-built features just produces noise.
        </li>
        <li>
          Quick sanity check after a tiny change. Use <code>/qa</code> or{' '}
          <code>/review</code> directly instead.
        </li>
        <li>
          Per-PR automation. CI is the right place for that — <code>/audit</code>
          {' '}is interactive and may pause for your input.
        </li>
      </ul>

      <h2>What it produces</h2>
      <p>A single ship-readiness summary at the end:</p>
      <pre>
        <code>{`## Ship readiness — standard pass

| Gate | Status | Findings |
|---|---|---|
| 1. /health           | ✅ Pass | typecheck + lint + tests pass     |
| 2. /qa               | ⚠️ 1   | mobile menu trapped focus (fixed) |
| 3. Dogfood           | ✅ Pass | flow walked clean                  |
| 4. /cso              | ⚠️ 2   | 1 vuln dep, missing CSP header    |
| 5. Web quality       | ⚠️ 5   | 2 a11y, 1 LCP, 2 SEO              |
| 6. /benchmark        | ⚠️ 1   | LCP regressed +180ms vs baseline  |
| 7. /review           | ✅ Pass | diff clean                         |
| 8. /codex review     | ⚠️ 2   | 2 medium-priority suggestions     |

### Verdict
**SHIP WITH CAVEATS**

### Advisory findings (11)
- /cso: lodash 4.17.20 has CVE-2021-... (high)
- web-quality: missing alt on hero image (high)
- ...

### Suggested next step
Fix the 3 high-severity findings, then run /ship.`}</code>
      </pre>

      <h2>Halt-on-fail logic</h2>
      <p>
        Gates 1, 2, and 7 are foundation. If any of them fails, the chain
        halts immediately — no point auditing accessibility on a project that
        won&apos;t typecheck. The summary shows just the failing gate and
        which gates were skipped.
      </p>
      <p>
        Override with <code>--no-halt</code> if you want the full report
        anyway: <code>/audit --no-halt</code>.
      </p>

      <h2>Skip rules</h2>
      <p>
        Gates 3, 5, 6, and 9 require a UI. If pre-flight detects no UI
        (no <code>app/</code>, <code>pages/</code>, or{' '}
        <code>public/index.html</code>), they&apos;re marked &quot;skipped — no
        UI detected&quot; in the summary instead of failing.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Claude Code installed</li>
        <li>The /GREEN install (symlinks <code>~/.claude/skills/audit/</code> to this repo)</li>
        <li>
          <strong>gstack</strong> for gates that delegate to gstack skills
          (<code>/health</code>, <code>/qa</code>, <code>/cso</code>,{' '}
          <code>/benchmark</code>, <code>/review</code>, <code>/codex</code>,{' '}
          <code>/design-review</code>, <code>/document-release</code>). The
          web-quality gate runs inline — no extra dependency.
        </li>
      </ul>

      <h2>Setup (one-time)</h2>
      <pre>
        <code>{`git clone <repo-url> ~/Github/Settings
cd ~/Github/Settings && ./install.sh`}</code>
      </pre>

      <h2>Use it</h2>
      <pre>
        <code>{`/audit                # ask which tier
/audit quick          # 4 gates, ~5 min
/audit standard       # 8 gates, ~25 min (default)
/audit full           # 10 gates, ~50 min
/audit full --no-halt # run all 10 even if early gates fail`}</code>
      </pre>
      <p className="muted">
        Auto-fires on phrases like &quot;is this ready to ship,&quot;
        &quot;final pass,&quot; &quot;preflight check,&quot; or &quot;ship
        audit&quot; — no slash needed.
      </p>
    </main>
  )
}
