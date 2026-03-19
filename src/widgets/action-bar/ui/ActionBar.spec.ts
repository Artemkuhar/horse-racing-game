import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import ActionBar from './ActionBar.vue';
import GenerateProgramButton from '@/features/generate-program/ui/GenerateProgramButton.vue';
import StartPauseButton from '@/features/start-pause/ui/StartPauseButton.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';

const baseOptions = {};
const mountActionBar = createWrapperFactory(ActionBar, baseOptions);

describe('ActionBar', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mountActionBar();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders title "Horse Racing"', () => {
    const titleEl = wrapper.find('.action-bar__title');
    expect(titleEl.exists()).toBe(true);
    expect(titleEl.text()).toBe('Horse Racing');
  });

  it('contains both buttons: GenerateProgram and StartPause', () => {
    const generateBtn = wrapper.findComponent(GenerateProgramButton);
    const startPauseBtn = wrapper.findComponent(StartPauseButton);

    expect(generateBtn.exists()).toBe(true);
    expect(startPauseBtn.exists()).toBe(true);

    const controls = wrapper.find('.action-bar__controls');
    expect(controls.exists()).toBe(true);
    expect(controls.findComponent(GenerateProgramButton).exists()).toBe(true);
    expect(controls.findComponent(StartPauseButton).exists()).toBe(true);
  });

  it('has root toolbar with class .action-bar', () => {
    const toolbar = wrapper.find('.action-bar');
    expect(toolbar.exists()).toBe(true);
  });
});
