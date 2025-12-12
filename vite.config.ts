/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  test: {
    css: true,
    globals: true,
    testTimeout: 15000,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    exclude: ['node_modules', 'build', 'dist'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/build/**',
        '**/dist/**',
        '**/mocks/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/vite-env.d.ts',
        '**/AppComponents/**',
        '**/interceptor/**',
        '**/routes/**',
        '**/HOC',
        '**/RestrictedAccess',
        // TODO: Remove those from exclude once project starts
        '**/constants/**',
        'src/enums/**',
        '**/features/**',
        'src/services/**',
        '**/hooks/**',
      ],
      // TODO: Remove comments once project starts
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 70,
      //   statements: 80,
      // },
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgr({ include: '**/*.svg?react' })],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
