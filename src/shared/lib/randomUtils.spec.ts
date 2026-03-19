import { randomInt, sample, shuffle } from './randomUtils';

describe('randomUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('randomInt returns a value within the inclusive range', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const value = randomInt(2, 6);
    expect(value).toBeGreaterThanOrEqual(2);
    expect(value).toBeLessThanOrEqual(6);
  });

  it('sample returns the requested number of items from the source array', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    const items = ['a', 'b', 'c', 'd'];
    const result = sample(items, 2);
    expect(result).toHaveLength(2);
    result.forEach((item) => {
      expect(items).toContain(item);
    });
  });

  it('shuffle returns a new array with the same items', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.2);
    const items = [1, 2, 3, 4];
    const result = shuffle(items);
    expect(result).toHaveLength(items.length);
    expect(result).not.toBe(items);
    expect(result.slice().sort()).toEqual(items.slice().sort());
  });
});
