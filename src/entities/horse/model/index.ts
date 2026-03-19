import { Module } from 'vuex';
import { Horse } from '@/entities/horse/types';
import actions from '@/entities/horse/model/actions';
import mutations from '@/entities/horse/model/mutations';
import getters from '@/entities/horse/model/getters';
import type { RootState } from '@/app/providers/store/types';

export type HorseState = {
  list: Horse[];
  loading: boolean;
};

const state = (): HorseState => ({
  list: [],
  loading: false,
});

const horseModule: Module<HorseState, RootState> = {
  namespaced: true,
  state: state(),
  mutations,
  actions,
  getters,
};

export default horseModule;
