import { createWrapperFactory } from '@/shared/test-utils/factory';
import App from './App.vue';

const factory = createWrapperFactory(App, {
  stubs: {
    'router-view': true,
    GlobalToast: true,
    'v-app': true,
    'v-main': true,
  },
});

describe('App.vue', () => {
  it('renders shell with router-view and GlobalToast', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('router-view-stub').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'GlobalToast' }).exists()).toBe(true);
  });

  it('has proper component name', () => {
    const wrapper = factory();
    expect(wrapper.vm.$options.name).toBe('AppRoot');
  });
});
