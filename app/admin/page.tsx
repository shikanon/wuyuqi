"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioContent } from "@/lib/content";

type LoadState = "loading" | "ready" | "saving" | "saved" | "error";

export default function AdminPage() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [profileText, setProfileText] = useState("");
  const [markdowns, setMarkdowns] = useState<Record<string, string>>({});
  const [state, setState] = useState<LoadState>("loading");
  const [message, setMessage] = useState("正在读取内容文件...");

  useEffect(() => {
    fetch("/api/content")
      .then((response) => {
        if (!response.ok) throw new Error("读取内容失败");
        return response.json() as Promise<PortfolioContent>;
      })
      .then((data) => {
        setContent(data);
        setProfileText(JSON.stringify(data.profile, null, 2));
        setMarkdowns(Object.fromEntries(data.projects.map((project) => [project.slug, project.markdown])));
        setState("ready");
        setMessage("内容已载入，可以编辑");
      })
      .catch((error: Error) => {
        setState("error");
        setMessage(error.message);
      });
  }, []);

  const projects = useMemo(() => content?.projects ?? [], [content]);

  const updateMarkdown = (slug: string, value: string) => {
    setMarkdowns((current) => ({ ...current, [slug]: value }));
    setState("ready");
    setMessage("有未保存修改");
  };

  const save = async () => {
    if (!content) return;
    setState("saving");
    setMessage("正在写入 JSON 和 Markdown...");

    try {
      const profile = JSON.parse(profileText) as PortfolioContent["profile"];
      const payload: PortfolioContent = {
        profile,
        projects: profile.projects.map((project) => ({
          ...project,
          markdown: markdowns[project.slug] ?? "",
        })),
      };
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "保存失败");
      setContent(payload);
      setMarkdowns(Object.fromEntries(payload.projects.map((project) => [project.slug, project.markdown])));
      setState("saved");
      setMessage("已保存到 data/profile.json 和 content/projects/*.md");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "保存失败");
    }
  };

  return (
    <main className="admin-shell">
      <header>
        <div>
          <p className="eyebrow">Local CMS</p>
          <h1>作品集内容后台</h1>
          <p>编辑结构化档案、作品墙、iframe 链接、视频/图片/PRD 入口和项目 Markdown，保存后前台会读取最新文件。</p>
        </div>
        <div className="admin-actions">
          <Link href="/">返回前台</Link>
          <button type="button" onClick={save} disabled={!content || state === "saving"}>
            {state === "saving" ? "保存中" : "保存文件"}
          </button>
          <span className={state === "error" ? "error-text" : "status-text"}>{message}</span>
        </div>
      </header>

      <section className="editor-grid" aria-label="内容编辑器">
        <article className="json-panel">
          <h2>profile.json</h2>
          <p>用于姓名、标签、证明指标、作品墙、方法论、技能和联系方式。后续上传资源时，把 URL 写入 showcase.items。</p>
          <textarea
            value={profileText}
            onChange={(event) => {
              setProfileText(event.target.value);
              setState("ready");
              setMessage("有未保存修改");
            }}
            spellCheck={false}
            aria-label="编辑 profile.json"
          />
        </article>

        <div>
          {projects.map((project) => (
            <article className="admin-project" key={project.slug}>
              <h2>{project.title}</h2>
              <p>{project.slug}.md</p>
              <textarea
                value={markdowns[project.slug] ?? ""}
                onChange={(event) => updateMarkdown(project.slug, event.target.value)}
                spellCheck={false}
                aria-label={`编辑 ${project.title} Markdown`}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
