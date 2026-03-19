import { horseNames } from './horseNames';

describe('horse/constants/horseNames', () => {
  it('exports a list of 20 names', () => {
    expect(Array.isArray(horseNames)).toBe(true);
    expect(horseNames).toHaveLength(20);
  });

  it('contains notable computer scientists', () => {
    expect(horseNames).toEqual(
      expect.arrayContaining([
        'Ada Lovelace',
        'Alan Turing',
        'Edsger Dijkstra',
        'Donald Knuth',
        'Grace Hopper',
      ]),
    );
  });
});
