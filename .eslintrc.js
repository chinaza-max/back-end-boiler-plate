module.exports = {
    env: {
      node: true,
      es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  };