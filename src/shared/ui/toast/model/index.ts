import type { Module } from 'vuex';
import type { RootState } from '@/app/providers/store/types';
import type { ToastState } from './types';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const toastModule: Module<ToastState, RootState> = {
  namespaced: true,
  state: state(),
  mutations,
  actions,
};

export * from './types';
export * from './actions';
export * from './mutations';
export default toastModule;
