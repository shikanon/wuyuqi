import { promises as fs } from "fs";
import path from "path";

export type ProjectMeta = {
  slug: string;
  title: string;
  category: string;
  role: string;
  featured: boolean;
  metric: string;
};

export type ShowcaseItem = {
  id: string;
  type: "iframe" | "video" | "image" | "prd";
  title: string;
  summary: string;
  src?: string;
  href?: string;
  projectSlug?: string;
  accent?: string;
  visual?: "cat-paw" | "girl-line" | "dog-head" | "star" | "heart" | "cloud";
};

export type ProfileData = {
  person: {
    name: string;
    headline: string;
    summary: string;
    roleTargets: string[];
    location: string;
  };
  hero: {
    promise: string;
    proofs: Array<{ value: string; label: string; projectSlug: string }>;
  };
  about: {
    education: string;
    honors: string[];
    traits: string[];
  };
  methods: Array<{ name: string; steps: string[] }>;
  showcase: {
    intro: string;
    items: ShowcaseItem[];
  };
  projects: ProjectMeta[];
  skills: Record<string, string[]>;
  contact: {
    wechat: string;
    resume: string;
  };
};

export type ProjectContent = ProjectMeta & { markdown: string };
export type PortfolioContent = { profile: ProfileData; projects: ProjectContent[] };

export const contentRoot = process.cwd();
export const profilePath = path.join(contentRoot, "data", "profile.json");
export const projectsDir = path.join(contentRoot, "content", "projects");

export async function loadPortfolio(): Promise<PortfolioContent> {
  const profile = JSON.parse(await fs.readFile(profilePath, "utf8")) as ProfileData;
  const projects = await Promise.all(
    profile.projects.map(async (project) => ({
      ...project,
      markdown: await fs.readFile(path.join(projectsDir, `${project.slug}.md`), "utf8"),
    })),
  );

  return { profile, projects };
}

export async function savePortfolio(content: PortfolioContent) {
  await fs.mkdir(path.dirname(profilePath), { recursive: true });
  await fs.mkdir(projectsDir, { recursive: true });
  const profileForFile: ProfileData = {
    ...content.profile,
    projects: content.projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      category: project.category,
      role: project.role,
      featured: project.featured,
      metric: project.metric,
    })),
  };
  await fs.writeFile(profilePath, `${JSON.stringify(profileForFile, null, 2)}\n`, "utf8");
  await Promise.all(
    content.projects.map((project) =>
      fs.writeFile(path.join(projectsDir, `${project.slug}.md`), project.markdown.trimEnd() + "\n", "utf8"),
    ),
  );
}
