"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioContent, ShowcaseItem } from "@/lib/content";

type ThemeKey = "case" | "night" | "playbook";
type VisualType = NonNullable<ShowcaseItem["visual"]>;

const themes: Array<{ key: ThemeKey; name: string; note: string }> = [
  { key: "case", name: "Case Desk", note: "明亮案例桌" },
  { key: "night", name: "Night Lab", note: "AI 实验室" },
  { key: "playbook", name: "Playbook", note: "策略手册" },
];

function CatPawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="32" cy="44" rx="16" ry="12" fill="currentColor" opacity="0.9" />
      <ellipse cx="16" cy="28" rx="6" ry="7" fill="currentColor" opacity="0.85" />
      <ellipse cx="28" cy="22" rx="5" ry="6" fill="currentColor" opacity="0.85" />
      <ellipse cx="36" cy="22" rx="5" ry="6" fill="currentColor" opacity="0.85" />
      <ellipse cx="48" cy="28" rx="6" ry="7" fill="currentColor" opacity="0.85" />
      <ellipse cx="32" cy="46" rx="8" ry="6" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function GirlLineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 20 Q20 14 28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M42 20 Q44 14 36 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M22 24 Q18 32 20 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M42 24 Q46 32 44 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M26 22 Q29 24 32 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M38 22 Q35 24 32 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M28 28 Q32 31 36 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M32 32 L32 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 38 L20 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 38 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 52 L24 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 52 L40 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DogHeadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="14" cy="20" rx="8" ry="12" fill="currentColor" opacity="0.85" transform="rotate(-20 14 20)" />
      <ellipse cx="50" cy="20" rx="8" ry="12" fill="currentColor" opacity="0.85" transform="rotate(20 50 20)" />
      <ellipse cx="32" cy="34" rx="18" ry="16" fill="currentColor" opacity="0.9" />
      <ellipse cx="25" cy="30" rx="3" ry="3.5" fill="currentColor" opacity="0.25" />
      <ellipse cx="39" cy="30" rx="3" ry="3.5" fill="currentColor" opacity="0.25" />
      <ellipse cx="32" cy="38" rx="4" ry="3" fill="currentColor" opacity="0.4" />
      <path d="M28 42 Q32 46 36 42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M20 36 L16 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M20 38 L15 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M20 40 L16 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M44 36 L48 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M44 38 L49 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M44 40 L48 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 8 L37.5 24.5 L55 26.5 L42 38 L45.5 56 L32 47 L18.5 56 L22 38 L9 26.5 L26.5 24.5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M32 14 L35.5 25 L47 26.5 L38 34 L40.5 46 L32 40 L23.5 46 L26 34 L17 26.5 L28.5 25 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 54 C32 54 10 40 10 24 C10 15 17 8 25 8 C29 8 32 11 32 11 C32 11 35 8 39 8 C47 8 54 15 54 24 C54 40 32 54 32 54 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <ellipse cx="22" cy="22" rx="4" ry="3" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="22" cy="38" rx="14" ry="10" fill="currentColor" opacity="0.85" />
      <ellipse cx="42" cy="40" rx="12" ry="9" fill="currentColor" opacity="0.85" />
      <ellipse cx="32" cy="30" rx="16" ry="12" fill="currentColor" opacity="0.9" />
      <ellipse cx="26" cy="28" rx="5" ry="4" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function CuteIcon({ visual, className }: { visual: VisualType; className?: string }) {
  const props = { className };
  switch (visual) {
    case "cat-paw":
      return <CatPawIcon {...props} />;
    case "girl-line":
      return <GirlLineIcon {...props} />;
    case "dog-head":
      return <DogHeadIcon {...props} />;
    case "star":
      return <StarIcon {...props} />;
    case "heart":
      return <HeartIcon {...props} />;
    case "cloud":
      return <CloudIcon {...props} />;
    default:
      return <CatPawIcon {...props} />;
  }
}

function ShowcaseCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const label = {
    iframe: "可交互嵌入",
    video: "视频集",
    image: "图片集",
    prd: "PRD 文章",
  }[item.type];
  const className = `showcase-card accent-${item.accent ?? "mint"} ${index === 0 ? "is-large" : ""}`;
  const visual = item.visual ?? "cat-paw";

  return (
    <article className={className} data-showcase-card>
      <div className="showcase-media">
        <div className="cute-stage" aria-hidden="true">
          <CuteIcon visual={visual} className="cute-main" />
          <CuteIcon visual={visual} className="cute-mini cute-mini-1" />
          <CuteIcon visual={visual} className="cute-mini cute-mini-2" />
          <CuteIcon visual={visual} className="cute-mini cute-mini-3" />
        </div>
      </div>
      <div className="showcase-copy">
        <span>{label}</span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {item.type === "iframe" ? (
          <Link href={`/showcase/${item.id}`}>进入互动作品</Link>
        ) : (
          <a href={item.href ?? `#${item.projectSlug}`}>查看相关内容</a>
        )}
      </div>
    </article>
  );
}

export default function ShowcasePage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [theme, setTheme] = useState<ThemeKey>("case");
  const [content, setContent] = useState<PortfolioContent | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("cookies-theme") as ThemeKey | null;
    if (saved && themes.some((item) => item.key === saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = true;
    const animations: Array<{ cancel?: () => void; pause?: () => void }> = [];

    import("animejs").then(({ animate, stagger }) => {
      if (!active) return;
      animations.push(
        animate(root.querySelectorAll(".showcase-card"), {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 720,
          delay: stagger(90),
          ease: "outExpo",
        }),
      );
      animations.push(
        animate(root.querySelectorAll(".cute-main"), {
          scale: [0.88, 1.08, 0.94],
          rotate: [0, 6, -3],
          translateY: [0, -8, 4],
          duration: 2600,
          delay: stagger(120),
          direction: "alternate",
          loop: true,
          ease: "inOutSine",
        }),
      );
      animations.push(
        animate(root.querySelectorAll(".cute-mini"), {
          scale: [0.7, 1.1, 0.85],
          opacity: [0.5, 1, 0.65],
          translateX: () => [0, Math.random() > 0.5 ? 12 : -12],
          translateY: () => [0, Math.random() > 0.5 ? -10 : 10],
          rotate: [0, 12, -8],
          duration: 3200,
          delay: stagger(80),
          direction: "alternate",
          loop: true,
          ease: "inOutQuad",
        }),
      );
    });

    return () => {
      active = false;
      animations.forEach((animation) => {
        animation.cancel?.();
        animation.pause?.();
      });
    };
  }, [content]);

  const changeTheme = (next: ThemeKey) => {
    setTheme(next);
    window.localStorage.setItem("cookies-theme", next);
  };

  const showcase = content?.profile.showcase?.items ?? [];

  return (
    <main ref={rootRef} className={`site-shell theme-${theme}`}>
      <a className="skip-link" href="#showcase">跳到作品墙</a>

      <nav className="topbar" aria-label="主要导航">
        <Link href="/" className="brand-mark">Cookies.OS</Link>
        <div className="nav-links">
          <Link href="/">首页</Link>
          <Link href="/#projects">复盘</Link>
          <Link href="/#method">方法</Link>
          <Link href="/#contact">联系</Link>
          <Link href="/admin">管理后台</Link>
        </div>
      </nav>

      <div className="theme-switcher" aria-label="页面风格切换">
        {themes.map((item) => (
          <button
            key={item.key}
            type="button"
            className={theme === item.key ? "active" : ""}
            onClick={() => changeTheme(item.key)}
            aria-pressed={theme === item.key}
          >
            <span>{item.name}</span>
            <small>{item.note}</small>
          </button>
        ))}
      </div>

      <section id="showcase" className="showcase-page-section" aria-labelledby="showcase-title">
        <div className="showcase-page-header">
          <p className="eyebrow">Work Wall</p>
          <h1 id="showcase-title">作品墙</h1>
          <p className="section-note">{content?.profile.showcase?.intro}</p>
        </div>
        <div className="showcase-wall">
          {showcase.map((item, index) => (
            <ShowcaseCard item={item} index={index} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
