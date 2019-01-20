import { configureStore } from '..';

describe('entry point test suit', () => {
  test('configureStore is a function', () => {
    expect(configureStore).toBeInstanceOf(Function);
  });
});
