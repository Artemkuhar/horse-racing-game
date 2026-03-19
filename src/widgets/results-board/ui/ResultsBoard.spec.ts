import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import ResultsBoard from './ResultsBoard.vue';
import RoundsBoard from '@/shared/ui/rounds-board/RoundsBoard.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import { RoundResult } from '@/entities/result/types';
import { RaceRound } from '@/entities/race/types';
import { Horse } from '@/entities/horse/types';
import { RoundView } from '@/shared/ui/rounds-board/types';

type ResultsBoardStoreMock = {
  state: {
    result: {
      rounds: RoundResult[];
    };
    race: {
      schedule: RaceRound[];
    };
    horse: {
      list: Horse[];
    };
  };
  dispatch: jest.Mock;
};

function createStoreMock({
  results = [],
  schedule = [],
  horses = [],
}: {
  results?: RoundResult[];
  schedule?: RaceRound[];
  horses?: Horse[];
}): ResultsBoardStoreMock {
  return {
    state: { result: { rounds: results }, race: { schedule }, horse: { list: horses } },
    dispatch: jest.fn(),
  };
}

const sampleHorses: Horse[] = [
  { id: 'h1', name: 'Thunder', color: '#ff0000', condition: 5 },
  { id: 'h2', name: 'Storm', color: '#00ff00', condition: 3 },
];

const sampleSchedule: RaceRound[] = [
  { id: 'r1', round: 1, distance: 1000, horseIds: ['h1', 'h2'] },
];

const sampleResults: RoundResult[] = [{ roundId: 'r1', placements: ['h1', 'missing', 'h2'] }];

const mountResultsBoard = createWrapperFactory(ResultsBoard, {
  mocks: { $store: createStoreMock({}) },
});

describe('ResultsBoard', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    jest.restoreAllMocks();
  });

  it('renders RoundsBoard with static props', () => {
    wrapper = mountResultsBoard();
    const board = wrapper.findComponent(RoundsBoard);
    expect(board.exists()).toBe(true);
    expect(board.props('title')).toBe('Results');
    expect(board.props('emptyText')).toBe('Results will appear after each round');
    expect(board.props('headerClass')).toBe('board__header--results');
  });

  it('passes empty rounds when there are no results', () => {
    const store = createStoreMock({ results: [], schedule: sampleSchedule, horses: sampleHorses });
    wrapper = mountResultsBoard({ mocks: { $store: store } });
    const rounds = wrapper.findComponent(RoundsBoard).props('rounds') as RoundView[];
    expect(rounds).toEqual([]);
  });

  it('computes resultsView with round details and names, using Unknown for missing horses', () => {
    const store = createStoreMock({
      results: sampleResults,
      schedule: sampleSchedule,
      horses: sampleHorses,
    });
    wrapper = mountResultsBoard({ mocks: { $store: store } });
    const rounds = wrapper.findComponent(RoundsBoard).props('rounds') as RoundView[];
    expect(rounds).toHaveLength(1);
    const r0 = rounds[0];
    expect(r0.id).toBe('r1');
    expect(r0.round).toBe(1);
    expect(r0.distance).toBe(1000);
    expect(r0.rows).toEqual([
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Unknown' },
      { position: 3, name: 'Storm' },
    ]);
  });
});
