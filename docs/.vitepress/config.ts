import { defineConfig } from "vitepress";

export default defineConfig({
  title: "react-hooks-kit",
  description: "Reusable React hooks with full TypeScript support.",
  base: "/react-hooks-kit/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/getting-started" },
      { text: "API", link: "/hooks/" },
      { text: "GitHub", link: "https://github.com/Kunle-didunyemi/react-hooks-kit" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Getting Started", link: "/getting-started" }]
      },
      {
        text: "API",
        items: [{ text: "Hooks Index", link: "/hooks/" }]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Kunle-didunyemi/react-hooks-kit" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright (c) Kunle Didunyemi"
    }
  }
});
