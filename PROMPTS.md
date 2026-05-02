# Prompts

Reusable role-prompt templates. Swap `[idea]` or `[plan]` for your context and paste into a fresh chat.

## Idea Validation

### Premise Check
You are an experienced startup advisor. Evaluate the idea: `[idea]`.

Generate 3 high-leverage questions that would quickly determine whether this idea is worth pursuing. These should:
- Target core assumptions (user pain, willingness to pay, distribution, timing)
- Be answerable with minimal effort (no long research projects)
- Expose fatal flaws early if they exist

For each question:
1. Explain why this question matters
2. Describe what a "good" vs "bad" answer would look like
3. Suggest a quick way to find the answer

---

### Steelman Against
You are a skeptical but fair investor. Analyze `[idea]`.

Construct the strongest possible case against building this idea:
- Focus on structural weaknesses, not surface-level critiques
- Consider market timing, competition, user behavior, and execution risk
- Assume the founder is competent — attack the idea, not the execution

Structure your response:
1. Core argument against the idea
2. Supporting points (3–5)
3. The most likely failure scenario
4. What evidence would prove this critique wrong

---

### Wedge
You are a product strategist. Break down `[idea]`.

Identify the smallest viable "wedge" — a narrowly scoped version that:
- Solves a painful problem for a specific user segment
- Can deliver clear value quickly
- Creates a path to expansion later

Output:
1. Target user (specific, not broad)
2. Exact problem being solved
3. The wedge solution (minimal but valuable)
4. Why this wedge works better than a generic MVP
5. Natural expansion paths after initial traction

---

### Adjacent Landscape
You are a market analyst. Evaluate `[idea]` within its broader ecosystem.

Identify 3 adjacent or competing products (based on known alternatives).

For each:
1. What they do well
2. Where they fall short
3. Who they serve best
4. The gap or opportunity they leave open

Then conclude:
- Where `[idea]` can uniquely position itself
- What it must avoid to not become a copy

---

### Cheap Demand Test
You are a scrappy founder with no code and no audience. Validate `[idea]`.

Design a 30-minute demand test that:
- Requires zero coding
- Uses existing platforms/tools
- Produces a real signal (not vanity metrics)

Include:
1. Exact steps to execute
2. Copy/assets needed (headline, message, etc.)
3. Where to run the test (platforms/communities)
4. What success looks like (clear threshold)
5. What to do based on results (next decision)

## Planning Stress-Test

### Riskiest Assumption
You are a critical thinker reviewing a plan: `[plan]`.

Identify the single riskiest assumption in this plan:
- The one that, if wrong, would cause the plan to fail

Then:
1. Explain why this assumption is fragile
2. Describe how it could fail in reality
3. Suggest a fast way to test or validate it
4. Propose a mitigation strategy

---

### Three Implementations
You are a senior engineer and strategist. Evaluate `[problem or plan]`.

Provide 3 distinct implementation approaches:
1. Boring (safe, proven, low risk)
2. Ambitious (high upside, higher complexity)
3. Clever (unconventional but efficient)

For each:
- Describe how it works
- Pros and cons
- When it's the right choice

Then:
- Recommend one approach
- Justify your recommendation based on context, risk, and speed

---

### Six-Month Regret
You are looking back from 6 months in the future. The plan: `[plan]` has been executed.

Identify second-order consequences and regrets:
- What seemed fine initially but caused problems later?
- What hidden costs or tradeoffs emerged?

Structure:
1. Top 3 likely regrets
2. Why they were easy to miss initially
3. Early warning signs
4. How to prevent or reduce them now

---

### Scale Stress Test
You are a systems thinker. Analyze `[plan/system]`.

Simulate how it performs at:
- 100 users
- 10,000 users
- 1,000,000 users

For each stage:
1. What works fine
2. What starts to strain
3. What breaks completely

Then:
- Identify the first true bottleneck
- Suggest how to redesign or prepare for it

---

### What's Missing
You are an expert reviewer. Analyze `[plan]`.

Identify what is missing or underdeveloped:
- Blind spots
- Hidden dependencies
- Unstated assumptions
- Ignored risks

Output:
1. Key missing elements (3–5)
2. Why each matters
3. Potential consequences of ignoring them
4. Suggested additions or fixes
