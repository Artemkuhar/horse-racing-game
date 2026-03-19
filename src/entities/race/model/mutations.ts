import { RaceRound } from '@/entities/race/types';
import type { RaceState } from '@/entities/race/model';

const mutations = {
  setSchedule(currentState: RaceState, schedule: RaceRound[]) {
    currentState.schedule = schedule;
  },
  setStatus(currentState: RaceState, status: RaceState['status']) {
    currentState.status = status;
  },
  setCurrentRoundIndex(currentState: RaceState, index: number | null) {
    currentState.currentRoundIndex = index;
  },
  setActiveRoundId(currentState: RaceState, roundId: string | null) {
    currentState.activeRoundId = roundId;
  },
  setProgress(currentState: RaceState, progress: Record<string, number>) {
    currentState.progress = progress;
  },
  updateProgress(currentState: RaceState, changes: Record<string, number>) {
    Object.keys(changes).forEach((horseId) => {
      currentState.progress[horseId] = changes[horseId];
    });
  },
};

export default mutations;
