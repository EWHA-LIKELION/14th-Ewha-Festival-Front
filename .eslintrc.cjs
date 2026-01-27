module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier', // ⭐ Prettier 충돌 제거
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React 17+ JSX 자동 import 대응
    'react/react-in-jsx-scope': 'off',

    // 개발 중 console 허용
    'no-console': 'off',

    // 사용 안 하는 변수 (단 _로 시작하면 허용)
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // import 정렬
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
};
