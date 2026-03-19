import { Horse } from '@/entities/horse/types';
import { horseColors } from '@/entities/horse/constants/horseColors';
import { horseNames } from '@/entities/horse/constants/horseNames';
import { randomInt, shuffle } from '@/shared/lib/randomUtils';
import { GAME_CONFIG } from '@/app/config/gameConfig';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHorses = async (): Promise<Horse[]> => {
  await delay(GAME_CONFIG.fetchHorsesDelayMs);
  const colors = shuffle(horseColors);
  return horseNames.map((name, index) => ({
    id: `horse-${index + 1}`,
    name,
    color: colors[index],
    condition: randomInt(1, 100),
  }));
};
