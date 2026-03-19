import actions from './actions';
import { RaceState } from './index';
import type { RootState } from '@/app/providers/store/types';

type TestRootState = Pick<RootState, 'horse' | 'result'>;
type CommitPayload = RaceState['status'] | number | string | null | Record<string, number>;
type TestRaceContext = {
  commit: jest.Mock;
  rootState: TestRootState;
  state: RaceState;
};

const makeState = (overrides: Partial<RaceState> = {}): RaceState => ({
  schedule: [],
  status: 'idle',
  currentRoundIndex: null,
  activeRoundId: null,
  progress: {},
  ...overrides,
});

const rootState: TestRootState = {
  horse: { list: [{ id: 'h1', name: 'A', color: '#fff', condition: 1 }], loading: false },
  result: { rounds: [] },
};

const makeCtx = (overrides: Partial<RaceState> = {}): TestRaceContext => {
  const state = makeState(overrides);
  const commit = jest.fn((type: string, payload?: CommitPayload) => {
    switch (type) {
      case 'setStatus':
        state.status = payload as RaceState['status'];
        break;
      case 'setCurrentRoundIndex':
        state.currentRoundIndex = payload as number | null;
        break;
      case 'setActiveRoundId':
        state.activeRoundId = payload as string | null;
        break;
      case 'setProgress':
        state.progress = payload as Record<string, number>;
        break;
      default:
        break;
    }
  });
  return { commit, rootState, state };
};

describe('race/actions', () => {
  let randomSpy: jest.SpyInstance;

  beforeEach(() => {
    randomSpy = jest.spyOn(globalThis.Math, 'random').mockReturnValue(0.5);
  });
  afterEach(() => {
    randomSpy.mockRestore();
  });

  it('generateSchedule builds schedule and resets status/index/progress', async () => {
    const ctx = makeCtx();
    await actions.generateSchedule(
      ctx as unknown as Parameters<typeof actions.generateSchedule>[0],
    );
    expect(ctx.commit).toHaveBeenCalledWith('setSchedule', expect.any(Array));
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'idle');
    expect(ctx.commit).toHaveBeenCalledWith('setCurrentRoundIndex', null);
    expect(ctx.commit).toHaveBeenCalledWith('setActiveRoundId', null);
    expect(ctx.commit).toHaveBeenCalledWith('setProgress', {});
  });

  it('startRace returns early when no schedule', async () => {
    const ctx = makeCtx({ schedule: [] });
    await actions.startRace(ctx as unknown as Parameters<typeof actions.startRace>[0]);
    // no commits expected
    expect(ctx.commit).not.toHaveBeenCalled();
  });

  it('startRace processes rounds and finishes when running', async () => {
    const ctx = makeCtx({ schedule: [{ id: 'r1', round: 1, distance: 1000, horseIds: ['h1'] }] });
    await actions.startRace(ctx as unknown as Parameters<typeof actions.startRace>[0]);
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'running');
    expect(ctx.commit).toHaveBeenCalledWith('setCurrentRoundIndex', 0);
    expect(ctx.commit).toHaveBeenCalledWith('setActiveRoundId', 'r1');
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'finished');
  });

  it('pauseRace sets paused only from running', () => {
    const ctx = makeCtx({ status: 'running' });
    actions.pauseRace(ctx as unknown as Parameters<typeof actions.pauseRace>[0]);
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'paused');
  });

  it('resumeRace sets running only from paused', () => {
    const ctx = makeCtx({ status: 'paused' });
    actions.resumeRace(ctx as unknown as Parameters<typeof actions.resumeRace>[0]);
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'running');
  });

  it('stopRace resets status/index/progress', () => {
    const ctx = makeCtx();
    actions.stopRace(ctx as unknown as Parameters<typeof actions.stopRace>[0]);
    expect(ctx.commit).toHaveBeenCalledWith('setStatus', 'idle');
    expect(ctx.commit).toHaveBeenCalledWith('setCurrentRoundIndex', null);
    expect(ctx.commit).toHaveBeenCalledWith('setActiveRoundId', null);
    expect(ctx.commit).toHaveBeenCalledWith('setProgress', {});
  });
});
