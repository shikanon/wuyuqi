import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookies | AI Portfolio",
  description: "AI 场景化应用与落地实践者 Cookies 的个人作品集",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("cookies-theme");if(t&&["case","night","playbook"].includes(t))document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
