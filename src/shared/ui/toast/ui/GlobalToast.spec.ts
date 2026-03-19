import Vue from 'vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import GlobalToast from './GlobalToast.vue';
import type { ToastState } from '@/shared/ui/toast/model';

type ToastStoreMock = {
  state: {
    toast: ToastState;
  };
  commit: jest.Mock;
};
type ToastStoreOverrides = Partial<ToastState>;
type GlobalToastVm = Vue & {
  visible: boolean;
  color: string;
  handleClose: () => void;
  $store: ToastStoreMock;
};

const makeStore = (overrides: ToastStoreOverrides = {}): ToastStoreMock => ({
  state: {
    toast: {
      visible: false,
      message: '',
      variant: 'info',
      ...overrides,
    },
  },
  commit: jest.fn(),
});

const factory = (storeOverrides: ToastStoreOverrides = {}) => {
  const $store = makeStore(storeOverrides);
  return createWrapperFactory(GlobalToast, {
    stubs: {
      'v-snackbar': true,
      'v-btn': true,
    },
    mocks: { $store },
  })();
};

describe('GlobalToast.vue', () => {
  it('renders message and binds visibility', () => {
    const wrapper = factory({ visible: true, message: 'Hello', variant: 'success' });
    const vm = wrapper.vm as GlobalToastVm;
    expect(wrapper.text()).toContain('Hello');
    // v-model uses computed visible; assert computed prop value
    expect(vm.visible).toBe(true);
  });

  it('computes color from variant mapping', () => {
    const wrapper = factory({ variant: 'error' });
    const vm = wrapper.vm as GlobalToastVm;
    expect(vm.color).toBe('error');
  });

  it('handleClose commits toast/hide', () => {
    const wrapper = factory({ visible: true });
    const vm = wrapper.vm as GlobalToastVm;
    const { $store } = vm;
    vm.handleClose();
    // Assert mutation type only; ignore optional args
    expect($store.commit).toHaveBeenCalled();
    expect($store.commit.mock.calls[0][0]).toBe('toast/hide');
  });

  it('setting visible=false triggers hide commit via setter', () => {
    const wrapper = factory({ visible: true });
    const vm = wrapper.vm as GlobalToastVm;
    const { $store } = vm;
    vm.visible = false;
    // Assert mutation type only; ignore optional args
    expect($store.commit).toHaveBeenCalled();
    expect($store.commit.mock.calls[0][0]).toBe('toast/hide');
  });
});
