"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioContent, ShowcaseItem } from "@/lib/content";

type ThemeKey = "case" | "night" | "playbook";
type VisualType = NonNullable<ShowcaseItem["visual"]>;

const themes: Array<{ key: ThemeKey; name: string; note: string }> = [
  { key: "case", name: "Case Desk", note: "明亮案例桌" },
  { key: "night", name: "Night Lab", note: "AI 实验室" },
  { key: "playbook", name: "Playbook", note: "策略手册" },
];

const skillLabels: Record<string, string> = {
  aiTools: "AI 工具",
  software: "软件与数据",
  languages: "语言能力",
  certificates: "证书资质",
};

const projectCatAssets = ["/cat.svg", "/cat2.svg", "/cat3.svg"];

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

function MarkdownBlock({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => {
    const lines = markdown.split("\n");
    const nodes: Array<{ type: "h" | "p" | "ul"; text?: string; items?: string[] }> = [];
    let list: string[] = [];

    const flushList = () => {
      if (list.length) {
        nodes.push({ type: "ul", items: list });
        list = [];
      }
    };

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) {
        flushList();
        continue;
      }
      if (line.startsWith("## ")) {
        flushList();
        nodes.push({ type: "h", text: line.replace(/^##\s+/, "") });
      } else if (line.startsWith("- ")) {
        list.push(line.replace(/^-\s+/, ""));
      } else {
        flushList();
        nodes.push({ type: "p", text: line });
      }
    }
    flushList();
    return nodes;
  }, [markdown]);

  return (
    <div className="markdown-block">
      {blocks.map((block, index) => {
        if (block.type === "h") return <h4 key={index}>{block.text}</h4>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
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

function CameraPathSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--coral)" />
          <stop offset="50%" stopColor="var(--mint)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <path
        className="camera-path"
        d="M40 160 Q120 40 200 100 T360 80 T520 120 T680 90 T760 100"
        stroke="url(#cameraGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="6 8"
      />
      <circle className="camera-dot" cx="40" cy="160" r="8" fill="var(--coral)" />
      <circle className="camera-dot" cx="200" cy="100" r="6" fill="var(--mint)" />
      <circle className="camera-dot" cx="360" cy="80" r="6" fill="var(--violet)" />
      <circle className="camera-dot" cx="520" cy="120" r="6" fill="var(--lemon)" />
      <circle className="camera-dot" cx="680" cy="90" r="6" fill="var(--coral)" />
      <circle className="camera-dot" cx="760" cy="100" r="8" fill="var(--mint)" />
    </svg>
  );
}

function ContactStrokeSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--coral)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <path
        className="contact-stroke"
        d="M20 100 Q100 20 200 100 T380 100"
        stroke="url(#contactGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle className="contact-ring" cx="200" cy="100" r="40" stroke="url(#contactGrad)" strokeWidth="3" fill="none" />
      <path
        className="contact-star"
        d="M200 60 L208 85 L235 85 L213 100 L222 125 L200 110 L178 125 L187 100 L165 85 L192 85 Z"
        stroke="url(#contactGrad)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function MiniGridSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="miniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--lemon)" />
          <stop offset="100%" stopColor="var(--mint)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            className="mini-grid-cell"
            x={30 + col * 50}
            y={30 + row * 50}
            width="35"
            height="35"
            rx="8"
            stroke="url(#miniGrad)"
            strokeWidth="2"
            fill="none"
          />
        )),
      )}
      <circle className="mini-path-dot" cx="47.5" cy="47.5" r="6" fill="var(--coral)" />
    </svg>
  );
}

export function PortfolioExperience({ content }: { content: PortfolioContent }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [theme, setTheme] = useState<ThemeKey>("case");
  const { profile, projects } = content;
  const featured = projects.filter((project) => project.featured);
  const showcase = profile.showcase?.items ?? [];

  useEffect(() => {
    const saved = window.localStorage.getItem("cookies-theme") as ThemeKey | null;
    if (saved && themes.some((item) => item.key === saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = true;
    const animations: Array<{ cancel?: () => void; pause?: () => void }> = [];

    import("animejs").then(({ animate, createTimeline, stagger }) => {
      if (!active) return;

      const heroTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      heroTimeline
        .add(root.querySelectorAll("[data-hero-reveal]"), {
          opacity: [0, 1],
          translateY: [22, 0],
          duration: 900,
          delay: stagger(90),
        })
        .add(root.querySelectorAll(".proof-row"), {
          opacity: [0, 1],
          translateX: [18, 0],
          duration: 620,
          delay: stagger(70),
        }, "-=420");
      animations.push(heroTimeline);

      animations.push(
        animate(root.querySelectorAll(".motion-orb"), {
          translateX: () => [0, Math.random() > 0.5 ? 18 : -18],
          translateY: () => [0, Math.random() > 0.5 ? 26 : -26],
          scale: [1, 1.12, 0.96, 1],
          duration: 4200,
          delay: stagger(180),
          direction: "alternate",
          loop: true,
          ease: "inOutSine",
        }),
      );

      const projectsTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      projectsTimeline
        .add(root.querySelectorAll(".feature-card"), {
          opacity: [0, 1],
          translateX: [-40, 0],
          scale: [0.95, 1],
          duration: 900,
          delay: stagger(180),
        })
        .add(root.querySelectorAll(".feature-card .index"), {
          scale: [0.5, 1.15, 1],
          rotate: [-180, 0],
          duration: 800,
          delay: stagger(120),
          ease: "outElastic(1, .6)",
        }, "-=600");
      animations.push(projectsTimeline);

      animations.push(
        animate(root.querySelectorAll(".project-cat"), {
          opacity: [0, 0.26],
          scale: [0.72, 1],
          rotate: [-10, 0],
          duration: 900,
          delay: stagger(160),
          ease: "outExpo",
        }),
      );

      animations.push(
        animate(root.querySelectorAll(".feature-card .index"), {
          scale: [1, 1.08, 0.96],
          rotate: [0, 4, -2],
          duration: 2400,
          delay: stagger(180),
          direction: "alternate",
          loop: true,
          ease: "inOutSine",
        }),
      );
      animations.push(
        animate(root.querySelectorAll(".project-cat"), {
          translateY: [0, -10, 4],
          rotate: [0, 2.5, -2],
          scale: [1, 1.035, 0.985],
          duration: 3600,
          delay: stagger(260),
          direction: "alternate",
          loop: true,
          ease: "inOutSine",
        }),
      );

      const miniTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      miniTimeline
        .add(root.querySelectorAll(".mini-case"), {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.9, 1],
          duration: 700,
          delay: stagger(100),
        })
        .add(root.querySelectorAll(".mini-grid-cell"), {
          scale: [0, 1],
          opacity: [0, 1],
          rotate: [45, 0],
          duration: 600,
          delay: stagger(40, { grid: [5, 5], from: "center" }),
          ease: "outBack",
        }, "-=400")
        .add(root.querySelectorAll(".mini-path-dot"), {
          translateX: [0, 200],
          translateY: [0, 200],
          duration: 2000,
          loop: true,
          direction: "alternate",
          ease: "inOutQuad",
        });
      animations.push(miniTimeline);

      const methodTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      methodTimeline
        .add(root.querySelectorAll(".method-map article"), {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.92, 1],
          duration: 800,
          delay: stagger(200),
        })
        .add(root.querySelectorAll(".camera-path"), {
          strokeDashoffset: [1000, 0],
          duration: 2500,
          ease: "inOutQuad",
        }, "-=400")
        .add(root.querySelectorAll(".camera-dot"), {
          scale: [0, 1.3, 1],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(300),
          ease: "outBack",
        }, "-=1800");
      animations.push(methodTimeline);

      animations.push(
        animate(root.querySelectorAll(".method-map li"), {
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 500,
          delay: stagger(80, { grid: [2, 6], from: "first" }),
          ease: "outQuad",
        }),
      );

      const methodLoop = createTimeline({ loop: true });
      methodLoop
        .add(root.querySelectorAll(".method-map h3::before"), {
          scale: [1, 1.4, 1],
          duration: 1800,
          ease: "inOutSine",
        })
        .add(root.querySelectorAll(".method-map li::before"), {
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          duration: 2200,
          delay: stagger(100),
          ease: "inOutSine",
        }, "-=1800");
      animations.push(methodLoop);

      const contactTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      contactTimeline
        .add(root.querySelectorAll(".contact-section > div"), {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 800,
          delay: stagger(150),
        })
        .add(root.querySelectorAll(".contact-stroke"), {
          strokeDashoffset: [800, 0],
          duration: 2000,
          ease: "inOutQuad",
        }, "-=400")
        .add(root.querySelectorAll(".contact-ring"), {
          strokeDashoffset: [300, 0],
          scale: [0.5, 1],
          opacity: [0, 1],
          duration: 1500,
          ease: "outElastic(1, .5)",
        }, "-=1200")
        .add(root.querySelectorAll(".contact-star"), {
          strokeDashoffset: [200, 0],
          rotate: [-180, 0],
          scale: [0, 1],
          duration: 1200,
          ease: "outBack",
        }, "-=800");
      animations.push(contactTimeline);

      const contactTick = createTimeline({ loop: true });
      contactTick
        .add(root.querySelectorAll(".contact-card span"), {
          color: ["var(--paper)", "var(--lemon)", "var(--paper)"],
          duration: 2000,
          delay: stagger(500),
          ease: "inOutSine",
        })
        .add(root.querySelectorAll(".contact-card strong"), {
          scale: [1, 1.03, 1],
          duration: 1500,
          delay: stagger(300),
          ease: "inOutSine",
        }, "-=3000");
      animations.push(contactTick);

      const skillsTimeline = createTimeline({ defaults: { ease: "outExpo" } });
      skillsTimeline
        .add(root.querySelectorAll(".skills-section div"), {
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.95, 1],
          duration: 600,
          delay: stagger(100),
        });
      animations.push(skillsTimeline);
    });

    return () => {
      active = false;
      animations.forEach((animation) => {
        animation.cancel?.();
        animation.pause?.();
      });
    };
  }, []);

  const changeTheme = (next: ThemeKey) => {
    setTheme(next);
    window.localStorage.setItem("cookies-theme", next);
  };

  return (
    <main ref={rootRef} className={`site-shell theme-${theme}`}>
      <a className="skip-link" href="#projects">跳到项目</a>
      <section className="hero-section" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="主要导航">
          <span className="brand-mark">Cookies.OS</span>
          <div className="nav-links">
            <Link href="/showcase">作品墙</Link>
            <a href="#projects">复盘</a>
            <a href="#method">方法</a>
            <a href="#contact">联系</a>
            <a href="/admin">管理后台</a>
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

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="signal-tape" data-hero-reveal aria-hidden="true">
              <span>0→1</span>
              <span>PRD</span>
              <span>AI Agent</span>
              <span>Growth</span>
            </div>
            <p className="eyebrow" data-hero-reveal>AI Product · Operations · Builder</p>
            <h1 className="hero-title" id="hero-title" data-hero-reveal>{profile.person.name} 把 AI 想法做成可交付结果。</h1>
            <p className="hero-summary" data-hero-reveal>
              {profile.person.headline}，{profile.person.summary}
            </p>
            <div className="role-tags" data-hero-reveal aria-label="核心标签">
              {profile.person.roleTargets.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="hero-actions" data-hero-reveal>
              <Link className="primary-action" href="/showcase">看作品墙</Link>
              <a className="secondary-action" href="#contact">获取联系方式</a>
            </div>
          </div>

          <aside className="proof-board" aria-label="关键证明">
            <div className="anime-stage" aria-hidden="true">
              {profile.hero.proofs.map((proof, index) => (
                <span className={`motion-orb orb-${index + 1}`} key={proof.projectSlug} />
              ))}
            </div>
            <p className="proof-kicker">{profile.hero.promise}</p>
            {profile.hero.proofs.map((proof) => (
              <a className="proof-row" href={`#${proof.projectSlug}`} key={proof.projectSlug}>
                <strong>{proof.value}</strong>
                <span>{proof.label}</span>
              </a>
            ))}
          </aside>
        </div>
      </section>

      <section className="about-strip" aria-label="关于我">
        <div>
          <span>教育背景</span>
          <strong>{profile.about.education}</strong>
        </div>
        <div>
          <span>核心荣誉</span>
          <strong>{profile.about.honors.join(" · ")}</strong>
        </div>
        <div>
          <span>个人特质</span>
          <strong>{profile.about.traits.join(" · ")}</strong>
        </div>
      </section>

      <section className="showcase-entry-section" aria-label="作品墙入口">
        <div className="section-heading relaxed">
          <p className="eyebrow">Work Wall</p>
          <div>
            <h2>先看作品，再看复盘。</h2>
            <p className="section-note">{profile.showcase?.intro}</p>
          </div>
        </div>
        <div className="showcase-entry-grid">
          {showcase.slice(0, 3).map((item, index) => (
            <ShowcaseCard item={item} index={index} key={item.id} />
          ))}
        </div>
        <div className="showcase-entry-cta">
          <Link href="/showcase" className="primary-action">查看全部作品</Link>
        </div>
      </section>

      <section id="projects" className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">3-Minute Proof Path</p>
          <div>
            <h2 id="projects-title">项目复盘</h2>
            <p className="section-note">把作品背后的问题、角色、动作和结果讲清楚。</p>
          </div>
        </div>
        <div className="featured-rail">
          {featured.map((project, index) => (
            <article className="feature-card" id={project.slug} key={project.slug}>
              <span className="index">0{index + 1}</span>
              <span
                className="project-cat"
                style={{ backgroundImage: `url(${projectCatAssets[index % projectCatAssets.length]})` }}
                aria-hidden="true"
              />
              <div className="project-meta">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <strong>{project.metric}</strong>
                <span>{project.role}</span>
              </div>
              <MarkdownBlock markdown={project.markdown} />
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section compact" aria-label="更多项目">
        <div className="section-heading">
          <p className="eyebrow">More Signals</p>
          <div>
            <h2>更多经历</h2>
            <p className="section-note">运营、公益与独立开发作为能力补充，不抢作品墙主线。</p>
          </div>
        </div>
        <div className="compact-grid">
          <div className="mini-grid-svg-wrap" aria-hidden="true">
            <MiniGridSVG className="mini-grid-svg" />
          </div>
          {projects.filter((project) => !project.featured).map((project) => (
            <article className="mini-case" id={project.slug} key={project.slug}>
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <strong>{project.metric}</strong>
              <MarkdownBlock markdown={project.markdown} />
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="method-section" aria-labelledby="method-title">
        <div className="section-heading">
          <p className="eyebrow">Operating System</p>
          <div>
            <h2 id="method-title">工作流</h2>
            <p className="section-note">从需求到交付，再到运营增长和数据复盘。</p>
          </div>
        </div>
        <div className="camera-path-wrap" aria-hidden="true">
          <CameraPathSVG className="camera-path-svg" />
        </div>
        <div className="method-map">
          {profile.methods.map((method) => (
            <article key={method.name}>
              <h3>{method.name}</h3>
              <ol>
                {method.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section" aria-label="技能">
        {Object.entries(profile.skills).map(([group, items]) => (
          <div key={group}>
            <span>{skillLabels[group] ?? group}</span>
            <p>{items.join(" · ")}</p>
          </div>
        ))}
      </section>

      <footer id="contact" className="contact-section">
        <div className="contact-stroke-wrap" aria-hidden="true">
          <ContactStrokeSVG className="contact-stroke-svg" />
        </div>
        <div>
          <p className="eyebrow">Ready for Interview</p>
          <h2>联系我</h2>
          <p className="section-note">如果需要一个能把 AI 想法落到业务里的实习生，可以从这里开始。</p>
        </div>
        <div className="contact-card">
          <span>微信</span>
          <strong>{profile.contact.wechat}</strong>
          <span>简历</span>
          <strong>{profile.contact.resume}</strong>
        </div>
      </footer>
    </main>
  );
}
