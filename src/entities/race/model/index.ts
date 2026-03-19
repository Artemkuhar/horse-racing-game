import { Module } from 'vuex';
import { RaceRound } from '@/entities/race/types';
import actions from '@/entities/race/model/actions';
import mutations from '@/entities/race/model/mutations';
import getters from '@/entities/race/model/getters';
import type { RootState } from '@/app/providers/store/types';

export type RaceStatus = 'idle' | 'running' | 'paused' | 'finished';

export type RaceState = {
  schedule: RaceRound[];
  status: RaceStatus;
  currentRoundIndex: number | null;
  activeRoundId: string | null;
  progress: Record<string, number>;
};

const state = (): RaceState => ({
  schedule: [],
  status: 'idle',
  currentRoundIndex: null,
  activeRoundId: null,
  progress: {},
});

const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state: state(),
  mutations,
  actions,
  getters,
};

export default raceModule;
