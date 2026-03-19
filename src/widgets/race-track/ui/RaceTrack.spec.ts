import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import RaceTrack from './RaceTrack.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import { RaceRound } from '@/entities/race/types';
import { Horse } from '@/entities/horse/types';

type RaceTrackStoreMock = {
  state: {
    race: {
      schedule: RaceRound[];
      currentRoundIndex: number | null;
      progress: Record<string, number>;
    };
    horse: {
      list: Horse[];
    };
  };
  dispatch: jest.Mock;
};

function createStoreMock({
  schedule = [],
  currentIndex = null,
  horses = [],
  progress = {},
}: {
  schedule?: RaceRound[];
  currentIndex?: number | null;
  horses?: Horse[];
  progress?: Record<string, number>;
}): RaceTrackStoreMock {
  return {
    state: {
      race: { schedule, currentRoundIndex: currentIndex, progress },
      horse: { list: horses },
    },
    dispatch: jest.fn(),
  };
}

const sampleHorses: Horse[] = [
  { id: 'h1', name: 'Thunder', color: '#ff0000', condition: 5 },
  { id: 'h2', name: 'Storm', color: '#00ff00', condition: 3 },
];

const sampleRound: RaceRound = { id: 'r1', round: 1, distance: 1000, horseIds: ['h1', 'h2'] };

const mountRaceTrack = createWrapperFactory(RaceTrack, {
  mocks: { $store: createStoreMock({}) },
});

describe('RaceTrack', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    jest.restoreAllMocks();
  });

  it('shows placeholder when there is no current round', () => {
    const store = createStoreMock({ schedule: [], currentIndex: null });
    wrapper = mountRaceTrack({ mocks: { $store: store } });
    expect(wrapper.find('.race-track__placeholder').exists()).toBe(true);
    expect(wrapper.find('.race-track__lanes').exists()).toBe(false);
  });

  it('renders header with round info when round exists', () => {
    const store = createStoreMock({ schedule: [sampleRound], currentIndex: 0 });
    wrapper = mountRaceTrack({ mocks: { $store: store } });
    const header = wrapper.find('.race-track__header');
    expect(header.exists()).toBe(true);
    const roundText = wrapper.find('.race-track__round').text();
    expect(roundText).toContain('Round 1');
    expect(roundText).toContain('1000m');
  });

  it('renders lanes for horses in the current round and finish elements', () => {
    const store = createStoreMock({
      schedule: [sampleRound],
      currentIndex: 0,
      horses: sampleHorses,
    });
    wrapper = mountRaceTrack({ mocks: { $store: store } });

    const lanes = wrapper.findAll('.race-track__lane');
    expect(lanes.length).toBe(2);

    expect(wrapper.find('.race-track__finish').exists()).toBe(true);
    expect(wrapper.find('.race-track__finish-row').exists()).toBe(true);
  });

  it('applies progress clamping to horse positions', () => {
    const store = createStoreMock({
      schedule: [sampleRound],
      currentIndex: 0,
      horses: sampleHorses,
      progress: { h1: -10, h2: 150 },
    });
    wrapper = mountRaceTrack({ mocks: { $store: store } });

    const lanes = wrapper.findAll('.race-track__lane');
    const horse1 = lanes.at(0).find('.race-track__horse');
    const horse2 = lanes.at(1).find('.race-track__horse');

    expect(horse1.attributes('style')).toContain('left: 0%');
    expect(horse2.attributes('style')).toContain('left: 98%');
  });
});
