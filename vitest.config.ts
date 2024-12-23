import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['./tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['app/**/*.{js,jsx,ts,tsx}'],
      exclude: ['app/entry.client.tsx', 'app/entry.server.tsx', 'app/root.tsx', 'app/**/*.d.ts']
    }
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
      tests: resolve(__dirname, './tests')
    }
  }
})
