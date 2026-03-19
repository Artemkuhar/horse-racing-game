import actions from './actions';
import type { ToastTriggerPayload } from './actions';
import type { ToastState } from './types';

describe('toast/actions', () => {
  const commit = jest.fn();
  const ctx = { commit, state: {} as ToastState };

  afterEach(() => {
    commit.mockReset();
  });

  it('trigger commits show with payload', () => {
    const payload: ToastTriggerPayload = { message: 'Hello', variant: 'success' };
    actions.trigger(ctx as unknown as Parameters<typeof actions.trigger>[0], payload);
    expect(commit).toHaveBeenCalledWith('show', payload);
  });

  it('clear commits hide', () => {
    actions.clear(ctx as unknown as Parameters<typeof actions.clear>[0]);
    expect(commit).toHaveBeenCalledWith('hide');
  });
});
