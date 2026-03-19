import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import ProgramBoard from './ProgramBoard.vue';
import RoundsBoard from '@/shared/ui/rounds-board/RoundsBoard.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import { RaceRound } from '@/entities/race/types';
import { Horse } from '@/entities/horse/types';
import { RoundView } from '@/shared/ui/rounds-board/types';

type ProgramBoardStoreMock = {
  state: {
    race: {
      schedule: RaceRound[];
    };
    horse?: {
      list: Horse[];
    };
  };
  dispatch: jest.Mock;
};

function createStoreMock({
  schedule = [],
  horses = [],
}: {
  schedule?: RaceRound[];
  horses?: Horse[];
}): ProgramBoardStoreMock {
  return {
    state: { race: { schedule }, horse: { list: horses } },
    dispatch: jest.fn(),
  };
}

const sampleHorses: Horse[] = [
  { id: 'h1', name: 'Thunder', color: '#ff0000', condition: 5 },
  { id: 'h2', name: 'Storm', color: '#00ff00', condition: 3 },
];

const sampleRounds: RaceRound[] = [
  { id: 'r1', round: 1, distance: 1000, horseIds: ['h1', 'missing', 'h2'] },
];

const mountProgramBoard = createWrapperFactory(ProgramBoard, {
  mocks: { $store: createStoreMock({ schedule: [], horses: [] }) },
});

describe('ProgramBoard', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    jest.restoreAllMocks();
  });

  it('renders RoundsBoard with static props', () => {
    wrapper = mountProgramBoard();
    const board = wrapper.findComponent(RoundsBoard);
    expect(board.exists()).toBe(true);
    expect(board.props('title')).toBe('Program');
    expect(board.props('emptyText')).toBe('Rounds and participants will appear here');
    expect(board.props('headerClass')).toBe('board__header--program');
  });

  it('passes empty rounds when schedule is empty', () => {
    const store = createStoreMock({ schedule: [], horses: sampleHorses });
    wrapper = mountProgramBoard({ mocks: { $store: store } });
    const board = wrapper.findComponent(RoundsBoard);
    expect(board.props('rounds') as RoundView[]).toEqual([]);
  });

  it('computes roundsView with positions and names, filtering missing horses', () => {
    const store = createStoreMock({ schedule: sampleRounds, horses: sampleHorses });
    wrapper = mountProgramBoard({ mocks: { $store: store } });
    const board = wrapper.findComponent(RoundsBoard);
    const roundsProp = board.props('rounds') as RoundView[];

    expect(roundsProp).toHaveLength(1);
    const r0 = roundsProp[0];
    expect(r0.id).toBe('r1');
    expect(r0.round).toBe(1);
    expect(r0.distance).toBe(1000);
    // rows should only include found horses in order, with positions starting at 1
    expect(r0.rows).toEqual([
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Storm' },
    ]);
  });

  it('falls back when store.horse is missing: rows are empty', () => {
    const store: ProgramBoardStoreMock = {
      state: { race: { schedule: sampleRounds } },
      dispatch: jest.fn(),
    };
    wrapper = mountProgramBoard({ mocks: { $store: store } });
    const board = wrapper.findComponent(RoundsBoard);
    const roundsProp = board.props('rounds') as RoundView[];
    expect(roundsProp[0].rows).toEqual([]);
  });
});
