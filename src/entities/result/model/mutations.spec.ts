import mutations from './mutations';
import { ResultState } from './index';
import type { RoundResult } from '@/entities/result/types';

describe('result/mutations', () => {
  it('setResults replaces rounds', () => {
    const state: ResultState = { rounds: [] };
    const rounds: RoundResult[] = [{ roundId: 'r1', placements: ['h1'] }];
    mutations.setResults(state, rounds);
    expect(state.rounds).toEqual(rounds);
  });

  it('addRoundResult appends round', () => {
    const state: ResultState = { rounds: [{ roundId: 'r1', placements: ['h1'] }] };
    const round: RoundResult = { roundId: 'r2', placements: ['h2'] };
    mutations.addRoundResult(state, round);
    expect(state.rounds).toEqual([{ roundId: 'r1', placements: ['h1'] }, round]);
  });
});
