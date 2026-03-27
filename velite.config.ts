import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      description: s.string().max(500).optional(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      categories: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      series: s.string().optional(),
      seriesOrder: s.number().optional(),
      seriesExtra: s.boolean().default(false),
      filePath: s.path(),
      metadata: s.metadata(),
      content: s.markdown(),
      body: s.mdx(),
    })
    .transform((data) => {
      // filePath is like "posts/ja/hello-world"
      const pathSegments = data.filePath.split("/");
      const locale = pathSegments[1] as "ja" | "en";
      const slugName = pathSegments[pathSegments.length - 1];
      const dateObj = new Date(data.date);
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const day = dateObj.getDate().toString().padStart(2, "0");
      return {
        ...data,
        locale,
        slugName,
        year,
        month,
        day,
        permalink: `/${locale}/blog/${year}/${month}/${day}/${slugName}`,
      };
    }),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      description: s.string().max(500).optional(),
      lastUpdated: s.isodate().optional(),
      filePath: s.path(),
      body: s.mdx(),
    })
    .transform((data) => {
      const pathSegments = data.filePath.split("/");
      const locale = pathSegments[1] as "ja" | "en";
      const slugName = pathSegments[pathSegments.length - 1];
      return {
        ...data,
        locale,
        slugName,
        permalink: `/${locale}/${slugName}`,
      };
    }),
});

const categories = defineCollection({
  name: "Category",
  pattern: "categories/**/*.yml",
  schema: s.object({
    name: s.string().max(50),
    slug: s.slug("categories"),
    description: s.string().max(200).optional(),
    nameJa: s.string().max(50).optional(),
    descriptionJa: s.string().max(200).optional(),
  }),
});

const series = defineCollection({
  name: "Series",
  pattern: "series/**/*.yml",
  schema: s.object({
    name: s.string().max(100),
    slug: s.slug("series"),
    nameJa: s.string().max(100).optional(),
  }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.yml",
  schema: s.object({
    name: s.string().max(100),
    slug: s.slug("projects"),
    description: s.string().max(500),
    nameJa: s.string().max(100).optional(),
    descriptionJa: s.string().max(500).optional(),
    url: s.string().optional(),
    github: s.string().optional(),
    techStack: s.array(s.string()).default([]),
    featured: s.boolean().default(false),
    order: s.number().default(0),
  }),
});

const tils = defineCollection({
  name: "TIL",
  pattern: "tils/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      description: s.string().max(500).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      filePath: s.path(),
      metadata: s.metadata(),
      content: s.markdown(),
      body: s.mdx(),
    })
    .transform((data) => {
      // filePath is like "tils/ja/nextjs-use-cache-directive"
      const pathSegments = data.filePath.split("/");
      const locale = pathSegments[1] as "ja" | "en";
      const slugName = pathSegments[pathSegments.length - 1];
      const dateObj = new Date(data.date);
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const day = dateObj.getDate().toString().padStart(2, "0");
      return {
        ...data,
        locale,
        slugName,
        year,
        month,
        day,
        permalink: `/${locale}/til/${year}/${month}/${day}/${slugName}`,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, categories, series, pages, projects, tils },
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});
