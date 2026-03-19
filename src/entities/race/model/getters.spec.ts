import getters from './getters';

describe('race/getters', () => {
  it('isRunning returns true only for running', () => {
    expect(getters.isRunning({ status: 'running' })).toBe(true);
    expect(getters.isRunning({ status: 'paused' })).toBe(false);
  });
});
