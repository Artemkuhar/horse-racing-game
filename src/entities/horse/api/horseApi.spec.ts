import { fetchHorses } from './horseApi';
import { horseColors } from '@/entities/horse/constants/horseColors';
import { horseNames } from '@/entities/horse/constants/horseNames';
import { GAME_CONFIG } from '@/app/config/gameConfig';

jest.mock('@/shared/lib/randomUtils', () => ({
  randomInt: jest.fn(() => 42),
  shuffle: jest.fn((items: string[]) => [...items].reverse()),
}));

describe('horse/api/fetchHorses', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('returns a list of horses with deterministic data', async () => {
    const promise = fetchHorses();
    jest.advanceTimersByTime(GAME_CONFIG.fetchHorsesDelayMs);
    const horses = await promise;

    expect(horses).toHaveLength(horseNames.length);
    // First horse
    expect(horses[0]).toMatchObject({
      id: 'horse-1',
      name: horseNames[0],
      color: [...horseColors].reverse()[0],
      condition: 42,
    });
    // Last horse
    const lastIndex = horseNames.length - 1;
    expect(horses[lastIndex]).toMatchObject({
      id: `horse-${horseNames.length}`,
      name: horseNames[lastIndex],
      color: [...horseColors].reverse()[lastIndex],
      condition: 42,
    });
    // All IDs unique and sequential
    const ids = horses.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBe('horse-1');
    expect(ids[ids.length - 1]).toBe(`horse-${ids.length}`);
  });
});
