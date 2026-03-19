const js = require('@eslint/js');
const vuePlugin = require('eslint-plugin-vue');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'public',
      'cypress/screenshots',
      'cypress/videos',
    ],
  },
  js.configs.recommended,
  ...vuePlugin.configs['flat/vue2-recommended'],
  prettierConfig,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['tests/**/*.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
  },
];
