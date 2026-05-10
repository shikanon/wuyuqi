# Design

## Visual Theme

The site feels like a kinetic AI case desk: fast to scan, tactile, and slightly playful. It should avoid corporate SaaS polish. The physical scene is an interviewer opening the link between meetings on a bright laptop screen, needing a memorable signal immediately while still trusting the candidate's rigor.

Default visual direction: light, paper-tinted surfaces with saturated candy-tech accents and dark plum ink. Motion is energetic but controlled, like project cards snapping into a storyboard timeline. The hero must feel breathable: the title is a clear identity statement, not a full-screen poster.

## Color

Use OKLCH color values only.

### Palette

- `--ink`: `oklch(21% 0.045 315)` for primary text.
- `--muted-ink`: `oklch(43% 0.055 315)` for secondary copy.
- `--paper`: `oklch(97% 0.018 84)` for base surfaces.
- `--paper-2`: `oklch(92% 0.035 84)` for warm panels.
- `--coral`: `oklch(70% 0.19 25)` for action and heat.
- `--mint`: `oklch(78% 0.16 160)` for AI workflow signals.
- `--violet`: `oklch(62% 0.2 305)` for project depth and identity.
- `--lemon`: `oklch(88% 0.15 100)` for badges and highlights.

### Theme Variants

- Case Desk: warm light, coral and mint, designed for fast hiring scans.
- Night Lab: deep plum, violet and mint, designed for AI experimentation energy.
- Playbook: cream, ink, lemon and coral, designed like a bold strategy notebook.

## Typography

Use a distinctive but readable sans-led system. Prefer `Noto Sans SC` for Chinese body text and `Archivo` for compact Latin labels if available. Fall back to `PingFang SC`, `Hiragino Sans GB`, `Arial`, and system sans.

Use confident but restrained display headings with fluid `clamp()` sizing. The hero title should share attention with proof points, tags, and actions instead of filling the viewport. Body copy should stay within 65 to 75 Chinese characters where possible. Short labels may use uppercase Latin, but Chinese content should remain natural and readable.

## Layout

Use asymmetric sections and varied rhythm rather than repeated card grids. The first viewport should combine a breathable identity block, role tags, proof chips, and direct anchors to the top three projects. It should not rely on one oversized headline for impact. Project detail sections should read like case-film strips: problem, role, actions, result, reflection.

Admin UI should be quieter than the public portfolio. It should prioritize safe editing, clear save states, and separated JSON/Markdown content areas.

## Components

- Hero proof board: identity, positioning, role tags, strongest proof, and resume/contact actions.
- Theme switcher: three named styles with immediate visual feedback.
- Project rail: strongest projects first, each with problem, role, actions, metrics, and reflection.
- Method map: product flow and operations flow shown as two connected paths.
- Skill stack: AI tools, software skills, languages, and certificates grouped by hiring relevance.
- Admin editor: form fields for structured JSON plus markdown text areas for longer project narratives.

## Motion

Use page-load choreography, staggered section reveals, hover lift, and timeline progress. Animate `transform` and `opacity`, not layout properties. Respect `prefers-reduced-motion`.

## Accessibility

Maintain readable contrast in all three themes. Provide keyboard focus styles, semantic landmarks, descriptive button labels, and skip links. Theme choices should persist and remain usable without relying on color alone.
