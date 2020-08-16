module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules'],
  roots: ['src/'],
  setupFilesAfterEnv: ['./configureTests.js'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
