import type { ActionContext } from 'vuex';
import type { RootState } from '@/app/providers/store/types';
import type { ResultState } from '@/entities/result/model';

type ResultActionContext = ActionContext<ResultState, RootState>;

const actions = {
  resetResults({ commit }: ResultActionContext) {
    commit('setResults', []);
  },
};

export default actions;
