import { Horse } from '@/entities/horse/types';
import type { HorseState } from '@/entities/horse/model';

const mutations = {
  setLoading(currentState: HorseState, loading: boolean) {
    currentState.loading = loading;
  },
  setHorses(currentState: HorseState, horses: Horse[]) {
    currentState.list = horses;
  },
};

export default mutations;
