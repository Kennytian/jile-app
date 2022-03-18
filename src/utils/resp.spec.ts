import { getTake } from './digital';

describe('getTake tests', () => {
  test('test 1 should be number', () => {
    expect(getTake(1)).toBe(1);
  });
});
