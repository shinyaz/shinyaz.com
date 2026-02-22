import type { Locale } from "@/lib/i18n";
import { getProjectName, getProjectDescription } from "@/lib/posts";

interface ProjectCardProps {
  project: {
    name: string;
    slug: string;
    description: string;
    nameJa?: string;
    descriptionJa?: string;
    url?: string;
    github?: string;
    techStack: string[];
  };
  locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const name = getProjectName(project, locale);
  const description = getProjectDescription(project, locale);

  return (
    <div className="rounded-lg border border-border p-5">
      <h2 className="text-lg font-semibold tracking-tight">{name}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {project.techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {(project.url || project.github) && (
        <div className="mt-4 flex gap-3 text-sm">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Website
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      )}
    </div>
  );
}
