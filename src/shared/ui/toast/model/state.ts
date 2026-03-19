import type { ToastState } from './types';

const state = (): ToastState => ({
  visible: false,
  message: null,
  variant: 'info',
});

export default state;
