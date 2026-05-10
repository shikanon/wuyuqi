import { loadPortfolio } from "@/lib/content";
import { PortfolioExperience } from "@/components/PortfolioExperience";

export default async function Home() {
  const content = await loadPortfolio();
  return <PortfolioExperience content={content} />;
}
