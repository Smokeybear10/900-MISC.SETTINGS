#!/usr/bin/env bash
# Install the GREEN framework into ~/.claude/
# Idempotent: safe to run multiple times.
# Symlinks every .md in .claude/commands/ into ~/.claude/commands/.
# Symlinks every subdirectory of skills/ into ~/.claude/skills/.
# Syncs RULES.md content into ~/.claude/CLAUDE.md (between markers).
# Appends the /GREEN snippet to ~/.claude/CLAUDE.md (between markers).
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
COMMANDS_DIR="$CLAUDE_DIR/commands"
SKILLS_DIR="$CLAUDE_DIR/skills"
GLOBAL_CLAUDE="$CLAUDE_DIR/CLAUDE.md"
CONFIG_SRC_DIR="$REPO_DIR/config"
SNIPPET="$CONFIG_SRC_DIR/CLAUDE.md.snippet"
RULES_SRC="$CONFIG_SRC_DIR/RULES.md"
COMMANDS_SRC_DIR="$REPO_DIR/commands"
SKILLS_SRC_DIR="$REPO_DIR/skills"
MEMORY_SRC_DIR="$REPO_DIR/memory"
MEMORY_DST_DIR="$CLAUDE_DIR/projects/-Users-$(whoami)-Github-Settings/memory"
GREEN_BEGIN="<!-- greenfield-framework:begin -->"
GREEN_END="<!-- greenfield-framework:end -->"
RULES_BEGIN="<!-- rules:begin -->"
RULES_END="<!-- rules:end -->"

echo "Installing GREEN framework from: $REPO_DIR"
echo ""

mkdir -p "$COMMANDS_DIR" "$SKILLS_DIR"

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

# 2. Symlink every skill subdirectory in skills/ into ~/.claude/skills/
for src in "$SKILLS_SRC_DIR"/*/; do
  src="${src%/}"
  skillname=$(basename "$src")
  dst="$SKILLS_DIR/$skillname"

  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
    echo "  skill/$skillname: already symlinked"
  else
    if [ -e "$dst" ]; then
      backup="$dst.bak.$(date +%s)"
      mv "$dst" "$backup"
      echo "  skill/$skillname: existing path backed up to $backup"
    fi
    ln -sf "$src" "$dst"
    echo "  skill/$skillname: symlinked → $src"
  fi
done

touch "$GLOBAL_CLAUDE"

# 3. Sync RULES.md content into ~/.claude/CLAUDE.md (between rules markers)
if [ -f "$RULES_SRC" ]; then
  if grep -qF "$RULES_BEGIN" "$GLOBAL_CLAUDE"; then
    awk -v rfile="$RULES_SRC" -v begin="$RULES_BEGIN" -v end="$RULES_END" '
      $0 == begin {
        print
        while ((getline line < rfile) > 0) print line
        close(rfile)
        skip = 1
        next
      }
      $0 == end { skip = 0; print; next }
      !skip { print }
    ' "$GLOBAL_CLAUDE" > "$GLOBAL_CLAUDE.tmp" && mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: rules section synced from RULES.md"
  else
    {
      printf '%s\n' "$RULES_BEGIN"
      cat "$RULES_SRC"
      printf '%s\n\n' "$RULES_END"
      cat "$GLOBAL_CLAUDE"
    } > "$GLOBAL_CLAUDE.tmp"
    mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: rules section added (prepended)"
  fi
fi

# 4. Sync /GREEN snippet into ~/.claude/CLAUDE.md (between greenfield-framework markers)
if [ -f "$SNIPPET" ]; then
  if grep -qF "$GREEN_BEGIN" "$GLOBAL_CLAUDE"; then
    awk -v rfile="$SNIPPET" -v begin="$GREEN_BEGIN" -v end="$GREEN_END" '
      $0 == begin {
        print
        while ((getline line < rfile) > 0) print line
        close(rfile)
        skip = 1
        next
      }
      $0 == end { skip = 0; print; next }
      !skip { print }
    ' "$GLOBAL_CLAUDE" > "$GLOBAL_CLAUDE.tmp" && mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: /GREEN section synced from snippet"
  else
    {
      printf '\n%s\n' "$GREEN_BEGIN"
      cat "$SNIPPET"
      printf '%s\n' "$GREEN_END"
    } >> "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: /GREEN section appended"
  fi
fi

# 5. Symlink settings.json and keybindings.json from config/ into ~/.claude/
if [ -d "$CONFIG_SRC_DIR" ]; then
  for fname in settings.json keybindings.json; do
    src="$CONFIG_SRC_DIR/$fname"
    dst="$CLAUDE_DIR/$fname"
    [ -f "$src" ] || continue
    if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
      echo "  $fname: already symlinked"
    else
      if [ -e "$dst" ]; then
        backup="$dst.bak.$(date +%s)"
        mv "$dst" "$backup"
        echo "  $fname: existing file backed up to $backup"
      fi
      ln -sf "$src" "$dst"
      echo "  $fname: symlinked → $src"
    fi
  done
fi

# 6. Symlink memory/ contents into the project-scoped memory dir
if [ -d "$MEMORY_SRC_DIR" ]; then
  mkdir -p "$MEMORY_DST_DIR"
  for src in "$MEMORY_SRC_DIR"/*.md; do
    [ -f "$src" ] || continue
    fname=$(basename "$src")
    dst="$MEMORY_DST_DIR/$fname"
    if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
      echo "  memory/$fname: already symlinked"
    else
      if [ -e "$dst" ]; then
        backup="$dst.bak.$(date +%s)"
        mv "$dst" "$backup"
        echo "  memory/$fname: existing file backed up to $backup"
      fi
      ln -sf "$src" "$dst"
      echo "  memory/$fname: symlinked → $src"
    fi
  done
fi

echo ""
echo "Done."
echo ""
echo "Note: gstack must also be installed for the underlying skills"
echo "(/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review)."
