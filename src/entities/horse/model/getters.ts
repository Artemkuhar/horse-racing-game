import { Horse } from '@/entities/horse/types';
import type { HorseState } from '@/entities/horse/model';

const getters = {
  horseById: (currentState: HorseState) => (id: string) =>
    currentState.list.find((horse: Horse) => horse.id === id),
};

export default getters;
