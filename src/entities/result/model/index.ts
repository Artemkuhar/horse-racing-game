import { Module } from 'vuex';
import { RoundResult } from '@/entities/result/types';
import actions from '@/entities/result/model/actions';
import mutations from '@/entities/result/model/mutations';
import type { RootState } from '@/app/providers/store/types';

export type ResultState = {
  rounds: RoundResult[];
};

const state = (): ResultState => ({
  rounds: [],
});

const resultModule: Module<ResultState, RootState> = {
  namespaced: true,
  state: state(),
  mutations,
  actions,
};

export default resultModule;
