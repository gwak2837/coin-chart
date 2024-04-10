module.exports = {
  env: {
    browser: true,
    node: true,
    es2023: true,
    jest: true,
  },
  extends: ['standard-with-typescript', 'next/core-web-vitals', 'prettier'],
  root: true,
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    'react/display-name': 'off',
    'react/jsx-sort-props': ['warn', { callbacksLast: true, reservedFirst: true }],

    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // "@typescript-eslint/": "off",

    'react-hooks/exhaustive-deps': 'off',
  },
}
