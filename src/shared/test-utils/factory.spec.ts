import Vue, { CreateElement, VNode } from 'vue';
import type { ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createWrapperFactory } from './factory';

type TestVm = Vue & {
  foo: string;
  bar: number;
  dispatchType: string;
  $m1?: string;
  $m2?: string;
};
type FactoryOptions = ThisTypedShallowMountOptions<Vue> & {
  mocks?: Record<string, unknown>;
};
type MockStore = {
  state: Record<string, unknown>;
  dispatch?: jest.Mock;
  commit?: jest.Mock;
};

const TestComp = Vue.extend({
  name: 'TestComp',
  props: {
    foo: { type: String, default: '' },
    bar: { type: Number, default: 0 },
    dispatchType: { type: String, default: '' },
  },
  created() {
    const vm = this as TestVm;
    // Optionally dispatch an action to exercise store wiring
    const { dispatchType } = vm;
    if (dispatchType && vm.$store) {
      vm.$store.dispatch(dispatchType);
    }
  },
  render(h: CreateElement) {
    const vm = this as TestVm;
    const slot = this.$slots.default ? this.$slots.default : [];
    const children: Array<VNode | string> = [...slot, `${vm.foo}-${vm.bar}`];
    return h('div', children);
  },
});

describe('shared/test-utils/factory', () => {
  it('merges base and override options (props, slots, mocks)', () => {
    const baseOptions: FactoryOptions = {
      propsData: { foo: 'X' },
      slots: { default: '<span>BASE</span>' },
      mocks: { $m1: 'M1' },
      stubs: { 'v-card': true },
    };
    const factory = createWrapperFactory(TestComp, baseOptions);
    const wrapper = factory({
      propsData: { bar: 42 },
      slots: { default: '<span>OVERRIDE</span>' },
      mocks: { $m2: 'M2' },
      stubs: { 'v-btn': true },
    });
    const vm = wrapper.vm as TestVm;

    expect(wrapper.text()).toContain('OVERRIDE');
    expect(wrapper.text()).toContain('X-42');
    expect(vm.$m1).toBe('M1');
    expect(vm.$m2).toBe('M2');
  });

  it('wraps plain $store into Vuex and ensures modules exist when not provided', async () => {
    const mockStore: MockStore = {
      state: {},
    };
    const factory = createWrapperFactory(TestComp, {
      propsData: { dispatchType: 'horse/fetchHorses' },
      mocks: { $store: mockStore },
    });

    const wrapper = factory();
    // Dispatch should resolve via stubbed action (no mock dispatch provided)
    await wrapper.vm.$store.dispatch('horse/fetchHorses');
    expect(mockStore.dispatch).toBeUndefined();
  });

  it('uses provided commit mock for toast/hide when toast state is present', () => {
    const mockStore: MockStore = {
      state: { toast: { visible: true, message: '', variant: 'info' } },
      commit: jest.fn(),
    };
    const factory = createWrapperFactory(TestComp, {
      mocks: { $store: mockStore },
    });
    const wrapper = factory();

    wrapper.vm.$store.commit('toast/hide');
    expect(mockStore.commit).toHaveBeenCalled();
    const commit = mockStore.commit as jest.Mock;
    expect(commit.mock.calls[0][0]).toBe('toast/hide');
  });

  it('uses provided dispatch mock when calling a known race action', () => {
    const mockStore: MockStore = {
      state: {},
      dispatch: jest.fn(),
    };
    const factory = createWrapperFactory(TestComp, {
      propsData: { dispatchType: 'race/startRace' },
      mocks: { $store: mockStore },
    });
    factory();

    // Created hook dispatches; ensure our mock received namespaced type
    expect(mockStore.dispatch).toHaveBeenCalled();
    const dispatch = mockStore.dispatch as jest.Mock;
    expect(dispatch.mock.calls[0][0]).toBe('race/startRace');
  });
});
