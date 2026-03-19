import mutations from './mutations';
import type { ToastState } from './types';

const makeState = (): ToastState => ({ visible: false, message: null, variant: 'info' });

describe('toast/mutations', () => {
  it('show sets message, variant, and visible=true with default info', () => {
    const state = makeState();
    mutations.show(state, { message: 'Hi' });
    expect(state.visible).toBe(true);
    expect(state.message).toBe('Hi');
    expect(state.variant).toBe('info');
  });

  it('show sets provided variant', () => {
    const state = makeState();
    mutations.show(state, { message: 'Oops', variant: 'error' });
    expect(state.visible).toBe(true);
    expect(state.message).toBe('Oops');
    expect(state.variant).toBe('error');
  });

  it('hide sets visible=false', () => {
    const state = makeState();
    state.visible = true;
    mutations.hide(state);
    expect(state.visible).toBe(false);
  });
});
