#!/usr/bin/env bash
# Install the GREEN framework into ~/.claude/
# Idempotent: safe to run multiple times.
# Symlinks every .md in .claude/commands/ into ~/.claude/commands/.
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
COMMANDS_DIR="$CLAUDE_DIR/commands"
GLOBAL_CLAUDE="$CLAUDE_DIR/CLAUDE.md"
SNIPPET="$REPO_DIR/.claude/CLAUDE.md.snippet"
COMMANDS_SRC_DIR="$REPO_DIR/.claude/commands"
MARKER_BEGIN="<!-- greenfield-framework:begin -->"
MARKER_END="<!-- greenfield-framework:end -->"

echo "Installing GREEN framework from: $REPO_DIR"
echo ""

mkdir -p "$COMMANDS_DIR"

# 1. Symlink every command in .claude/commands/ into ~/.claude/commands/
shopt -s nullglob
for src in "$COMMANDS_SRC_DIR"/*.md; do
  filename=$(basename "$src")
  cmdname="${filename%.md}"
  dst="$COMMANDS_DIR/$filename"

  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
    echo "  /$cmdname: already symlinked"
  else
    if [ -e "$dst" ]; then
      backup="$dst.bak.$(date +%s)"
      mv "$dst" "$backup"
      echo "  /$cmdname: existing file backed up to $backup"
    fi
    ln -sf "$src" "$dst"
    echo "  /$cmdname: symlinked → $src"
  fi
done

# 2. Append snippet to global CLAUDE.md (idempotent via markers)
touch "$GLOBAL_CLAUDE"
if grep -qF "$MARKER_BEGIN" "$GLOBAL_CLAUDE"; then
  echo "  CLAUDE.md: snippet already present (skipping)"
else
  {
    printf '\n%s\n' "$MARKER_BEGIN"
    cat "$SNIPPET"
    printf '%s\n' "$MARKER_END"
  } >> "$GLOBAL_CLAUDE"
  echo "  CLAUDE.md: appended GREEN section to $GLOBAL_CLAUDE"
fi

echo ""
echo "Done."
echo ""
echo "Note: gstack must also be installed for the underlying skills"
echo "(/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review)."
