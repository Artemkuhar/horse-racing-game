import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import RacePage from './RacePage.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import ActionBar from '@/widgets/action-bar/ui/ActionBar.vue';
import HorseList from '@/widgets/horse-list/ui/HorseList.vue';
import RaceTrack from '@/widgets/race-track/ui/RaceTrack.vue';
import ProgramBoard from '@/widgets/program-board/ui/ProgramBoard.vue';
import ResultsBoard from '@/widgets/results-board/ui/ResultsBoard.vue';

const mountRacePage = createWrapperFactory(RacePage, {});

describe('RacePage', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('renders root container', () => {
    wrapper = mountRacePage();
    expect(wrapper.find('.race-page').exists()).toBe(true);
    expect(wrapper.find('.race-page__content').exists()).toBe(true);
  });

  it('contains all child widgets', () => {
    wrapper = mountRacePage();
    expect(wrapper.findComponent(ActionBar).exists()).toBe(true);
    expect(wrapper.findComponent(HorseList).exists()).toBe(true);
    expect(wrapper.findComponent(RaceTrack).exists()).toBe(true);
    expect(wrapper.findComponent(ProgramBoard).exists()).toBe(true);
    expect(wrapper.findComponent(ResultsBoard).exists()).toBe(true);
  });

  it('has layout columns for horse list, track, and side panels', () => {
    wrapper = mountRacePage();
    expect(wrapper.find('.race-page__row').exists()).toBe(true);
    expect(wrapper.find('.race-page__horse-col').exists()).toBe(true);
    expect(wrapper.find('.race-page__track-col').exists()).toBe(true);
    expect(wrapper.find('.race-page__side-col').exists()).toBe(true);
  });
});
