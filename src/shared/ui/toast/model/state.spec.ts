import state from './state';

describe('toast/state', () => {
  it('provides initial state defaults', () => {
    const s = state();
    expect(s.visible).toBe(false);
    expect(s.message).toBeNull();
    expect(s.variant).toBe('info');
  });
});
