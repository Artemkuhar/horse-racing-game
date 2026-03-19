module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Ensure coverage includes Vue components and TS/JS files
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/main.ts',
  ],
  // Print a readable coverage table in the console
  coverageReporters: ['text', 'text-summary', 'lcov'],
  // Discover tests colocated with source files only
  testMatch: ['<rootDir>/src/**/*.spec.(js|ts)'],
  // Global test setup (e.g., ignored custom elements)
  setupFilesAfterEnv: ['<rootDir>/src/shared/test-utils/setup.ts'],
};
