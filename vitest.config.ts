import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

function resolvePath(folder: string) {
  return resolve(__dirname, 'src', folder);
}

export default defineConfig({
  resolve: {
    alias: [
      { find: '@domain', replacement: resolvePath('domain') },
      { find: '@application', replacement: resolvePath('application') },
      { find: '@infra', replacement: resolvePath('infra') },
      { find: '@presentation', replacement: resolvePath('presentation') },
      { find: '@main', replacement: resolvePath('main') },
    ],
  },
  test: {
    clearMocks: true,
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'src/**/*.ts',
        // '<rootDir>/src/application/usecases/**/*.ts',
        // '<rootDir>/src/presentation/controllers/**/*.ts',
        // '<rootDir>/src/presentation/middlewares/**/*.ts',
        // '<rootDir>/src/presentation/validations/validators/**/*.ts',
        // '!<rootDir>/src/presentation/validations/validators/**/index.ts',
        // '<rootDir>/src/main/decorators/**/*.ts',
      ],
    },
  },
});
