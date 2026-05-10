# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a creative personal portfolio website where interviewers understand Cookies in 10 seconds and review top projects in 3 minutes.

**Architecture:** Use Next.js App Router with file-backed content. Structured data lives in `data/profile.json`; long project narratives live in `content/projects/*.md`; `/admin` edits both through local API routes that write to disk.

**Tech Stack:** Next.js, React, TypeScript, CSS modules via global CSS, Node filesystem APIs.

---

### Task 1: Scaffold App

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

**Steps:**
- Add Next.js scripts and dependencies.
- Configure TypeScript and App Router.
- Add metadata and global styles.
- Run `npm install`.

### Task 2: Content Model

**Files:**
- Create: `data/profile.json`
- Create: `content/projects/ai-comic.md`
- Create: `content/projects/ad-creative.md`
- Create: `content/projects/sex-education.md`
- Create: `content/projects/ecommerce-growth.md`
- Create: `content/projects/meowmind.md`
- Create: `lib/content.ts`

**Steps:**
- Convert `person.md` into structured profile data.
- Store project details in Markdown files.
- Implement server-side readers for JSON and Markdown.

### Task 3: Public Portfolio

**Files:**
- Create: `app/page.tsx`
- Modify: `app/globals.css`

**Steps:**
- Build hero proof board, theme switcher, project rail, method map, skills, and contact sections.
- Implement three visual themes: Case Desk, Night Lab, and Playbook.
- Persist theme choice in local storage.

### Task 4: Admin Editor

**Files:**
- Create: `app/admin/page.tsx`
- Create: `app/api/content/route.ts`

**Steps:**
- Load profile and project Markdown into editable fields.
- Save JSON and Markdown through a local API route.
- Show save, error, and dirty states.

### Task 5: Verification

**Files:**
- Modify only files with diagnostics or build failures.

**Steps:**
- Run `npm run lint`.
- Run `npm run build`.
- Use diagnostics on edited files.
- Fix issues without changing the confirmed design direction.
