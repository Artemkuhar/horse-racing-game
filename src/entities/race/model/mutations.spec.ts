import mutations from './mutations';
import { RaceState } from './index';
import type { RaceRound } from '@/entities/race/types';

const makeState = (): RaceState => ({
  schedule: [],
  status: 'idle',
  currentRoundIndex: null,
  activeRoundId: null,
  progress: {},
});

describe('race/mutations', () => {
  it('setSchedule sets schedule', () => {
    const state = makeState();
    const schedule: RaceRound[] = [{ id: 'r1', round: 1, distance: 1000, horseIds: ['h1'] }];
    mutations.setSchedule(state, schedule);
    expect(state.schedule).toEqual(schedule);
  });
  it('setStatus updates status', () => {
    const state = makeState();
    mutations.setStatus(state, 'running');
    expect(state.status).toBe('running');
  });
  it('setCurrentRoundIndex sets index', () => {
    const state = makeState();
    mutations.setCurrentRoundIndex(state, 2);
    expect(state.currentRoundIndex).toBe(2);
  });
  it('setActiveRoundId sets id', () => {
    const state = makeState();
    mutations.setActiveRoundId(state, 'r2');
    expect(state.activeRoundId).toBe('r2');
  });
  it('setProgress replaces progress', () => {
    const state = makeState();
    const progress = { h1: 10 };
    mutations.setProgress(state, progress);
    expect(state.progress).toEqual(progress);
  });
  it('updateProgress merges per-horse progress', () => {
    const state = makeState();
    state.progress = { h1: 10, h2: 20 };
    mutations.updateProgress(state, { h1: 15, h3: 5 });
    expect(state.progress).toEqual({ h1: 15, h2: 20, h3: 5 });
  });
});
