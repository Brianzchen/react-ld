const originalError = console.error;
beforeAll(() => {
  // this is here to silence a warning temporarily
  // we'll fix it in the next exercise
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('a test was not wrapped in act')) {
      return undefined;
    }
    return originalError.call(console, args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});
