import { NextRequest, NextResponse } from "next/server";
import { loadPortfolio, savePortfolio, type PortfolioContent } from "@/lib/content";

export async function GET() {
  const content = await loadPortfolio();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  try {
    const content = (await request.json()) as PortfolioContent;
    if (!content.profile || !Array.isArray(content.projects)) {
      return NextResponse.json({ message: "内容结构不完整" }, { status: 400 });
    }
    await savePortfolio(content);
    return NextResponse.json({ message: "已保存" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存失败";
    return NextResponse.json({ message }, { status: 500 });
  }
}
