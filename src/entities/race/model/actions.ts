import type { ActionContext } from 'vuex';
import { Horse } from '@/entities/horse/types';
import { GAME_CONFIG } from '@/app/config/gameConfig';
import type { RootState } from '@/app/providers/store/types';
import { sample } from '@/shared/lib/randomUtils';
import type { RaceState } from '@/entities/race/model';

type RaceActionContext = ActionContext<RaceState, RootState>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildSchedule = (horses: Horse[]) => {
  return GAME_CONFIG.raceDistances.map((distance, index) => {
    const picks = sample(horses, GAME_CONFIG.horsesPerRound).map((horse) => horse.id);
    return {
      id: `round-${index + 1}`,
      round: index + 1,
      distance,
      horseIds: picks,
    };
  });
};

const buildProgress = (horseIds: string[]) =>
  horseIds.reduce<Record<string, number>>((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {});

const buildSpeeds = (horseIds: string[], horses: Horse[], distance: number) => {
  const horseMap = new Map(horses.map((horse) => [horse.id, horse]));
  const distanceFactor = GAME_CONFIG.baseDistanceForSpeed / distance;
  return horseIds.reduce<Record<string, number>>((acc, id) => {
    const horse = horseMap.get(id);
    const conditionFactor = horse ? horse.condition / 100 : 0.5;
    const variance = 0.75 + Math.random() * 0.5;
    const baseSpeed = 0.9 + conditionFactor * 0.9;
    acc[id] = baseSpeed * variance * distanceFactor * GAME_CONFIG.speedMultiplier;
    return acc;
  }, {});
};

const runRound = async (
  horseIds: string[],
  horses: Horse[],
  distance: number,
  getStatus: () => RaceState['status'],
  commit: RaceActionContext['commit'],
) => {
  const progress = buildProgress(horseIds);
  const speeds = buildSpeeds(horseIds, horses, distance);
  const placements: string[] = [];
  const tickMs = GAME_CONFIG.raceTickMs;

  commit('setProgress', { ...progress });

  while (placements.length < horseIds.length) {
    const changes: Record<string, number> = {};
    const status = getStatus();
    if (status === 'paused') {
      await delay(GAME_CONFIG.racePausePollMs);
      continue;
    }
    if (status !== 'running') {
      return placements;
    }

    horseIds.forEach((id) => {
      if (progress[id] >= 100) {
        return;
      }
      const nextValue = Math.min(100, progress[id] + speeds[id]);
      if (nextValue !== progress[id]) {
        progress[id] = nextValue;
        changes[id] = nextValue;
      }
      if (progress[id] >= 100 && !placements.includes(id)) {
        placements.push(id);
      }
    });

    if (Object.keys(changes).length > 0) {
      commit('updateProgress', changes);
    }
    await delay(tickMs);
  }

  return placements;
};

const actions = {
  async generateSchedule({ commit, rootState }: RaceActionContext) {
    try {
      const horses: Horse[] = rootState.horse?.list ?? [];
      await delay(GAME_CONFIG.generateScheduleDelayMs);
      const schedule = buildSchedule(horses);
      commit('setSchedule', schedule);
      commit('setStatus', 'idle');
      commit('setCurrentRoundIndex', null);
      commit('setActiveRoundId', null);
      commit('setProgress', {});
    } catch (error) {
      console.error('Failed to generate schedule', error);
      commit(
        'toast/show',
        { message: 'Failed to generate race schedule. Please try again.', variant: 'error' },
        { root: true },
      );
    }
  },
  async startRace({ commit, rootState, state }: RaceActionContext) {
    if (!state.schedule.length || state.status === 'running' || state.status === 'finished') {
      return;
    }

    try {
      const horses: Horse[] = rootState.horse?.list ?? [];
      const getStatus = (): RaceState['status'] => state.status;
      commit('setStatus', 'running');
      commit('setCurrentRoundIndex', 0);

      for (let index = 0; index < state.schedule.length; index += 1) {
        if (getStatus() !== 'running') {
          break;
        }
        const round = state.schedule[index];
        commit('setCurrentRoundIndex', index);
        commit('setActiveRoundId', round.id);
        commit('setProgress', buildProgress(round.horseIds));

        const placements = await runRound(
          round.horseIds,
          horses,
          round.distance,
          getStatus,
          commit,
        );
        if (getStatus() !== 'running') {
          break;
        }
        rootState.result &&
          commit('result/addRoundResult', { roundId: round.id, placements }, { root: true });
      }

      if (getStatus() === 'running') {
        commit('setActiveRoundId', null);
        commit('setStatus', 'finished');
      }
    } catch (error) {
      console.error('Failed to run race', error);
      commit(
        'toast/show',
        { message: 'Unexpected error during race. Please try again.', variant: 'error' },
        { root: true },
      );
      commit('setStatus', 'idle');
      commit('setCurrentRoundIndex', null);
      commit('setActiveRoundId', null);
      commit('setProgress', {});
    }
  },
  stopRace({ commit }: RaceActionContext) {
    commit('setStatus', 'idle');
    commit('setCurrentRoundIndex', null);
    commit('setActiveRoundId', null);
    commit('setProgress', {});
  },
  pauseRace({ commit, state }: RaceActionContext) {
    if (state.status === 'running') {
      commit('setStatus', 'paused');
    }
  },
  resumeRace({ commit, state }: RaceActionContext) {
    if (state.status === 'paused') {
      commit('setStatus', 'running');
    }
  },
};

export default actions;
