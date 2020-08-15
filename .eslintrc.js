module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'jest',
  ],
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 0,
    'no-continue': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/require-default-props': 0,
  },
};
