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
      ],
    }),
    // ... other plugins
  ],
};
