module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Keep component naming flexible for this project
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    // Common TS relaxations for incremental adoption
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.spec.ts', '**/*.spec.js'],
      env: { jest: true },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
