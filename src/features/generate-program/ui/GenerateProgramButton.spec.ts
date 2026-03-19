import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import GenerateProgramButton from './GenerateProgramButton.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import type { Horse } from '@/entities/horse/types';
import type { RaceStatus } from '@/entities/race/model';

type GenerateProgramStoreMock = {
  state: {
    horse: {
      list: Horse[];
    };
    race: {
      status: RaceStatus;
    };
  };
  dispatch: jest.Mock;
};
type GenerateProgramButtonVm = Vue & {
  isConfirmOpen: boolean;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
};
const sampleHorse: Horse = { id: 'h1', name: 'Thunder', color: '#ff0000', condition: 5 };

function createStoreMock({
  horses = [],
  status = 'idle',
}: {
  horses?: Horse[];
  status?: RaceStatus;
}): GenerateProgramStoreMock {
  return {
    state: { horse: { list: horses }, race: { status } },
    dispatch: jest.fn(),
  };
}

const mountButton = createWrapperFactory(GenerateProgramButton, {
  mocks: { $store: createStoreMock({}) },
});

describe('GenerateProgramButton', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    jest.restoreAllMocks();
  });

  it('is disabled when there are no horses', () => {
    const store = createStoreMock({ horses: [], status: 'idle' });
    wrapper = mountButton({ mocks: { $store: store } });
    const btn = wrapper.find('.generate-program-button');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes('disabled')).toBe('true');
  });

  it('generates immediately when race is idle', async () => {
    const store = createStoreMock({ horses: [sampleHorse], status: 'idle' });
    wrapper = mountButton({ mocks: { $store: store } });
    const vm = wrapper.vm as GenerateProgramButtonVm;
    const btn = wrapper.find('.generate-program-button');
    await btn.trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('race/generateSchedule');
    expect(store.dispatch).toHaveBeenCalledWith('result/resetResults');
    // dialog should not open
    expect(vm.isConfirmOpen).toBe(false);
  });

  it('opens confirm dialog when race is active (running)', async () => {
    const store = createStoreMock({ horses: [sampleHorse], status: 'running' });
    wrapper = mountButton({ mocks: { $store: store } });
    const vm = wrapper.vm as GenerateProgramButtonVm;
    const btn = wrapper.find('.generate-program-button');
    await btn.trigger('click');
    expect(vm.isConfirmOpen).toBe(true);
  });

  it('confirm regenerates: stops race, generates, resets results', async () => {
    const store = createStoreMock({ horses: [sampleHorse], status: 'running' });
    wrapper = mountButton({ mocks: { $store: store } });
    const vm = wrapper.vm as GenerateProgramButtonVm;
    // open confirm dialog
    await wrapper.find('.generate-program-button').trigger('click');
    // confirm
    await vm.handleConfirm();
    expect(store.dispatch).toHaveBeenCalledWith('race/stopRace');
    expect(store.dispatch).toHaveBeenCalledWith('race/generateSchedule');
    expect(store.dispatch).toHaveBeenCalledWith('result/resetResults');
    expect(vm.isConfirmOpen).toBe(false);
  });

  it('cancel closes dialog without dispatching', async () => {
    const store = createStoreMock({ horses: [sampleHorse], status: 'paused' });
    wrapper = mountButton({ mocks: { $store: store } });
    const vm = wrapper.vm as GenerateProgramButtonVm;
    await wrapper.find('.generate-program-button').trigger('click');
    expect(vm.isConfirmOpen).toBe(true);
    vm.handleCancel();
    expect(vm.isConfirmOpen).toBe(false);
    expect(store.dispatch).not.toHaveBeenCalledWith('race/stopRace');
  });
});
