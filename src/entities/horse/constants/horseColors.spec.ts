import { horseColors } from './horseColors';

describe('horse/constants/horseColors', () => {
  it('exports a list of 20 hex colors', () => {
    expect(Array.isArray(horseColors)).toBe(true);
    expect(horseColors).toHaveLength(20);
    expect(horseColors.every((c) => /^#([0-9a-fA-F]{6})$/.test(c))).toBe(true);
  });
});
