import { defineConfig, globalIgnores } from 'eslint/config'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist/**', 'node_modules/**']),

  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/strict-boolean-expressions': 'error'
    },
  },
])
