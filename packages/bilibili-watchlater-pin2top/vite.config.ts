import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        match: ['https://www.bilibili.com/watchlater**'],
      },
    }),
  ],
  build: {
    outDir: "../../dist"
  }
});
