import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    extends: 'standard',
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // '@typescript-eslint/explicit-function-return-type': 'error',
      // '@typescript-eslint/consistent-type-imports': 'error',
      // '@typescript-eslint/no-unused-vars': 'error',
      // '@typescript-eslint/no-unused-expressions': 'error',
      // '@typescript-eslint/explicit-module-boundary-types': 'error',
      // '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/no-explicit-any': 'off'
      // '@typescript-eslint/strict-boolean-expressions': 'error'
    },
    ignores: ['node_modules/', 'dist/', '*.test.tsx'],
  },
]
