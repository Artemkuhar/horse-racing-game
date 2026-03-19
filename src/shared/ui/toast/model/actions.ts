import type { ActionContext } from 'vuex';
import type { RootState } from '@/app/providers/store/types';
import type { ToastState, ToastVariant } from './types';

export type ToastTriggerPayload = {
  message: string;
  variant?: ToastVariant;
};

type ToastActionContext = ActionContext<ToastState, RootState>;

const actions = {
  trigger({ commit }: ToastActionContext, payload: ToastTriggerPayload) {
    commit('show', payload);
  },
  clear({ commit }: ToastActionContext) {
    commit('hide');
  },
};

export default actions;
