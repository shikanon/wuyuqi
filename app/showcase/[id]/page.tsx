import Link from "next/link";
import { notFound } from "next/navigation";
import { loadPortfolio } from "@/lib/content";

export default async function ShowcaseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { profile } = await loadPortfolio();
  const item = profile.showcase.items.find((entry) => entry.id === id);

  if (!item) notFound();

  return (
    <main className="showcase-detail-shell">
      <header className="showcase-detail-header">
        <Link href="/#showcase">返回作品墙</Link>
        <div>
          <p className="eyebrow">{item.type}</p>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
        </div>
        {item.src && (
          <a href={item.src} target="_blank" rel="noreferrer">
            新窗口打开
          </a>
        )}
      </header>

      <section className="showcase-frame-wrap" aria-label={item.title}>
        {item.type === "iframe" && item.src ? (
          <iframe
            title={item.title}
            src={item.src}
            allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <div className="showcase-empty">
            <h2>作品入口已预留</h2>
            <p>后续在后台上传视频、图片或 PRD 链接后，这里会展示完整内容。</p>
          </div>
        )}
      </section>
    </main>
  );
}
