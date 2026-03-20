import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "@shinyaz",
    short_name: "@shinyaz",
    description: "shinyazの個人技術ブログ",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
