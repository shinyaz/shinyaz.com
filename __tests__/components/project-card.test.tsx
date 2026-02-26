import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/project-card";

const sampleProject = {
  name: "Test Project",
  slug: "test-project",
  description: "A test project",
  nameJa: "テストプロジェクト",
  descriptionJa: "テストプロジェクトの説明",
  url: "https://example.com",
  github: "https://github.com/test/test",
  techStack: ["TypeScript", "React"],
};

describe("ProjectCard", () => {
  it("renders project name in English", () => {
    render(<ProjectCard project={sampleProject} locale="en" />);
    expect(screen.getByText("Test Project")).toBeDefined();
  });

  it("renders project name in Japanese", () => {
    render(<ProjectCard project={sampleProject} locale="ja" />);
    expect(screen.getByText("テストプロジェクト")).toBeDefined();
  });

  it("renders description in English", () => {
    render(<ProjectCard project={sampleProject} locale="en" />);
    expect(screen.getByText("A test project")).toBeDefined();
  });

  it("renders description in Japanese", () => {
    render(<ProjectCard project={sampleProject} locale="ja" />);
    expect(screen.getByText("テストプロジェクトの説明")).toBeDefined();
  });

  it("renders tech stack badges", () => {
    render(<ProjectCard project={sampleProject} locale="en" />);
    expect(screen.getByText("TypeScript")).toBeDefined();
    expect(screen.getByText("React")).toBeDefined();
  });

  it("renders website link when url is present", () => {
    render(<ProjectCard project={sampleProject} locale="en" />);
    const websiteLink = screen.getByText("Website");
    expect(websiteLink).toBeDefined();
    expect(websiteLink.getAttribute("href")).toBe("https://example.com");
  });

  it("renders GitHub link when github is present", () => {
    render(<ProjectCard project={sampleProject} locale="en" />);
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/test/test");
  });

  it("does not render links section when neither url nor github is present", () => {
    const { container } = render(
      <ProjectCard
        project={{ ...sampleProject, url: undefined, github: undefined }}
        locale="en"
      />
    );
    expect(container.querySelector("a")).toBeNull();
  });
});
