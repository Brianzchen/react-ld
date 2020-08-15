module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules'],
  roots: ['src/'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
