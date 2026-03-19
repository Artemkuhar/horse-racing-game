import { RoundResult } from '@/entities/result/types';
import type { ResultState } from '@/entities/result/model';

const mutations = {
  setResults(currentState: ResultState, rounds: RoundResult[]) {
    currentState.rounds = rounds;
  },
  addRoundResult(currentState: ResultState, round: RoundResult) {
    currentState.rounds = [...currentState.rounds, round];
  },
};

export default mutations;
