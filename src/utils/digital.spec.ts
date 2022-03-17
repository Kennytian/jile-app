import { getSkip, getTake } from './digital';

describe('getTake tests', () => {
  test('test 1 should be number', () => {
    expect(getTake(1)).toBe(1);
  });

  test('test "1" number should be number', () => {
    expect(getTake('1')).toBe(1);
  });

  test('test "a" number should be number', () => {
    expect(getTake('a')).toBe(10);
  });

  test('test "a1" number should be number', () => {
    expect(getTake('a1')).toBe(10);
  });

  test('test "3a" number should be number', () => {
    expect(getTake('3a')).toBe(10);
  });

  test('test "" number should be number', () => {
    expect(getTake('')).toBe(10);
  });

  test('test "" number should be number', () => {
    expect(getTake('', 5)).toBe(5);
  });
});

describe('getSkip tests', () => {
  test('test 1 should be number', () => {
    expect(getSkip(1, 3)).toBe(0);
  });

  test('test 3 should be number', () => {
    expect(getSkip(3, 3)).toBe(6);
  });

  test('test "1" number should be number', () => {
    expect(getSkip('1', 3)).toBe(0);
  });

  test('test "a" number should be number', () => {
    expect(getSkip('a', 3)).toBe(27);
  });

  test('test "a1" number should be number', () => {
    expect(getSkip('a1', 3)).toBe(27);
  });

  test('test "" number should be number', () => {
    expect(getSkip('', 3)).toBe(27);
  });
});
