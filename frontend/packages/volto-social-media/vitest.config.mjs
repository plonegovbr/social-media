import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    ...voltoVitestConfig.resolve,
    alias: {
      ...(voltoVitestConfig.resolve?.alias ?? {}),
      '@plone/volto': path.resolve(__dirname, '../../core/packages/volto/src'),
    },
  },
});
