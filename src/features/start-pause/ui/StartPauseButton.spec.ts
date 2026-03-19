import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import StartPauseButton from './StartPauseButton.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import type { RaceStatus } from '@/entities/race/model';

type StartPauseStoreMock = {
  state: {
    race: {
      schedule: unknown[];
      status: RaceStatus;
    };
  };
  dispatch: jest.Mock;
};

function createStoreMock({
  scheduleLen = 0,
  status = 'idle',
}: {
  scheduleLen?: number;
  status?: RaceStatus;
}): StartPauseStoreMock {
  return {
    state: { race: { schedule: Array.from({ length: scheduleLen }), status } },
    dispatch: jest.fn(),
  };
}

const mountButton = createWrapperFactory(StartPauseButton, {
  mocks: { $store: createStoreMock({}) },
});

describe('StartPauseButton', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    jest.restoreAllMocks();
  });

  it('disabled when no schedule and shows Start', () => {
    const store = createStoreMock({ scheduleLen: 0, status: 'idle' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.start-pause-button');
    expect(btn.attributes('disabled')).toBe('true');
    expect(btn.text()).toBe('Start');
  });

  it('enabled with schedule and shows Start on idle', () => {
    const store = createStoreMock({ scheduleLen: 1, status: 'idle' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.start-pause-button');
    expect(btn.attributes('disabled')).toBeUndefined();
    expect(btn.text()).toBe('Start');
  });

  it('shows Pause and dispatches pause when running', async () => {
    const store = createStoreMock({ scheduleLen: 1, status: 'running' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.start-pause-button');
    expect(btn.text()).toBe('Pause');
    await btn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('race/pauseRace');
  });

  it('shows Resume and dispatches resume when paused', async () => {
    const store = createStoreMock({ scheduleLen: 1, status: 'paused' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.start-pause-button');
    expect(btn.text()).toBe('Resume');
    await btn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('race/resumeRace');
  });

  it('shows Finished and is disabled when finished', () => {
    const store = createStoreMock({ scheduleLen: 2, status: 'finished' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.start-pause-button');
    expect(btn.text()).toBe('Finished');
    expect(btn.attributes('disabled')).toBe('true');
  });
});
