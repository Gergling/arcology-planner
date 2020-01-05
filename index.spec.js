const index = require('./index');

describe('Testing Jest', () => {
  test('test', () => {
    expect(index.doStuff(1)).toEqual(1);
  })
})