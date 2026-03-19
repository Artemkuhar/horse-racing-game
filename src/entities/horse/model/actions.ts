import type { ActionContext } from 'vuex';
import { fetchHorses } from '@/entities/horse/api/horseApi';
import type { HorseState } from '@/entities/horse/model';
import type { RootState } from '@/app/providers/store/types';

type HorseActionContext = ActionContext<HorseState, RootState>;

const actions = {
  async fetchHorses({ commit }: HorseActionContext) {
    commit('setLoading', true);
    try {
      const horses = await fetchHorses();
      commit('setHorses', horses);
      return horses;
    } catch (error) {
      console.error('Failed to fetch horses', error);
      commit('setHorses', []);
      commit(
        'toast/show',
        { message: 'Failed to load horse list. Please try again.', variant: 'error' },
        { root: true },
      );
      return [];
    } finally {
      commit('setLoading', false);
    }
  },
};

export default actions;
