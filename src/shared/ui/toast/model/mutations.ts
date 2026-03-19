import type { ToastState, ToastVariant } from './types';

export type ToastShowPayload = {
  message: string;
  variant?: ToastVariant;
};

const mutations = {
  show(state: ToastState, payload: ToastShowPayload) {
    state.message = payload.message;
    state.variant = payload.variant ?? 'info';
    state.visible = true;
  },
  hide(state: ToastState) {
    state.visible = false;
  },
};

export default mutations;
