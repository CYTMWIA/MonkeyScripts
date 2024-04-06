import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        match: [
          'https://dmhy.org',
          'https://dmhy.org/',
          'https://dmhy.org/topics/list*',
        ],
      },
    }),
  ],
  build: {
    outDir: "../../dist"
  }
});
