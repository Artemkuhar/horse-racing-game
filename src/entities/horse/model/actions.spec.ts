import actions from './actions';

jest.mock('@/entities/horse/api/horseApi', () => ({
  fetchHorses: jest.fn(async () => [{ id: 'h1', name: 'A', color: '#fff', condition: 1 }]),
}));

const commit = jest.fn();

describe('horse/actions', () => {
  let consoleErrorSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    commit.mockReset();
    jest.resetModules();
  });
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('fetchHorses commits loading, sets list, and returns data', async () => {
    const ctx = { commit };
    const result = await actions.fetchHorses(
      ctx as unknown as Parameters<typeof actions.fetchHorses>[0],
    );
    expect(commit).toHaveBeenNthCalledWith(1, 'setLoading', true);
    expect(commit).toHaveBeenCalledWith('setHorses', expect.any(Array));
    expect(commit).toHaveBeenLastCalledWith('setLoading', false);
    expect(result).toEqual([{ id: 'h1', name: 'A', color: '#fff', condition: 1 }]);
  });

  it('fetchHorses handles error: sets empty list and shows toast', async () => {
    jest.doMock('@/entities/horse/api/horseApi', () => ({
      fetchHorses: jest.fn(async () => {
        throw new Error('network');
      }),
    }));
    const { default: errorActions } = await import('./actions');
    const ctx = { commit };
    const result = await errorActions.fetchHorses(
      ctx as unknown as Parameters<typeof errorActions.fetchHorses>[0],
    );
    expect(commit).toHaveBeenCalledWith('setHorses', []);
    expect(commit).toHaveBeenCalledWith(
      'toast/show',
      { message: expect.stringContaining('Failed to load horse list'), variant: 'error' },
      { root: true },
    );
    expect(commit).toHaveBeenLastCalledWith('setLoading', false);
    expect(result).toEqual([]);
  });
});
