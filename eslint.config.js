import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'dist',
      'node_modules',
      'vite.config.ts',
      'eslint.config.js',
      'src/setupTests.ts',
      'src/serviceWorker.ts',
      'src/context/AuthContext/index.tsx',
      // TODO: Remove from ignore list and fix linting issues
      'src/routes/index.tsx',
      'src/views/Home/index.tsx',
      'src/shared/hooks/useNetwork.tsx',
      'src/interceptor/axiosInstance.ts',
      'src/shared/utils/createReducer.ts',
      'src/shared/components/HOC/requireAuth.tsx',
      'src/shared/components/HOC/requireNetwork.tsx',
      'src/shared/components/Offline/offline.test.tsx',
    ],

    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
      },
    },

    settings: {
      react: { version: 'detect' },
    },

    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      'no-console': 'error',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        vi: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        afterEach: 'readonly',
        beforeEach: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-console': 'off',
    },
  },
];
