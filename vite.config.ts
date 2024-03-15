/// <reference types="vitest" />

import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';
import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  plugins: [million.vite({ auto: true }), react()],
  build: {
    chunkSizeWarningLimit: 1024,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      sourcemap: true,
    },
    exclude: [...configDefaults.exclude],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html'],
      include: ['src/**/*'],
      reportOnFailure: true,
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
