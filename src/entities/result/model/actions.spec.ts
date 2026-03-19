import actions from './actions';

const commit = jest.fn();

describe('result/actions', () => {
  afterEach(() => {
    commit.mockReset();
  });

  it('resetResults commits empty list', () => {
    const ctx = { commit };
    actions.resetResults(ctx as unknown as Parameters<typeof actions.resetResults>[0]);
    expect(commit).toHaveBeenCalledWith('setResults', []);
  });
});
