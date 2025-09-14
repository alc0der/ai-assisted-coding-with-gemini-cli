// rollup.config.js
import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
  // ... other config
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "data/*",
          dest: "data",
        },
        {
          src: "assets/frontmatter-images/*.png",
          dest: "assets/frontmatter-images",
        },
        {
          src: "assets/frontmatter-images/*.svg",
          dest: "assets/frontmatter-images",
        },
      ],
    }),
    // ... other plugins
  ],
};
