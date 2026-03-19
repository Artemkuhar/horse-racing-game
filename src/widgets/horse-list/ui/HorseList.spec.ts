import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import HorseList from './HorseList.vue';
import { createWrapperFactory } from '@/shared/test-utils/factory';
import { Horse } from '@/entities/horse/types';

type HorseListStoreMock = {
  state: {
    horse?: {
      list: Horse[];
      loading: boolean;
    };
  };
  dispatch: jest.Mock;
};

function createStoreMock({
  horses = [],
  loading = false,
}: {
  horses?: Horse[];
  loading?: boolean;
}): HorseListStoreMock {
  return {
    state: { horse: { list: horses, loading } },
    dispatch: jest.fn(),
  };
}

function createRootStoreMockWithoutHorse(): HorseListStoreMock {
  return {
    state: {},
    dispatch: jest.fn(),
  };
}

const sampleHorses: Horse[] = [
  { id: '1', name: 'Thunder', condition: 5, color: '#ff0000' },
  { id: '2', name: 'Storm', condition: 3, color: '#00ff00' },
];

const mountHorseList = createWrapperFactory(HorseList, {
  // default: empty list, not loading
  mocks: { $store: createStoreMock({ horses: [], loading: false }) },
});

describe('HorseList', () => {
  let wrapper: Wrapper<Vue>;

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
    jest.restoreAllMocks();
  });

  it('renders header', () => {
    wrapper = mountHorseList();
    const header = wrapper.find('.horse-list__header');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('Horse List (1-20)');
  });

  it('shows placeholder and dispatches fetch when list is empty', () => {
    const store = createStoreMock({ horses: [], loading: false });
    wrapper = mountHorseList({ mocks: { $store: store } });

    // mounted() should dispatch when no horses
    expect(store.dispatch).toHaveBeenCalledWith('horse/fetchHorses');

    const placeholder = wrapper.find('.horse-list__placeholder');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe('Horse list will appear here');
  });

  it('renders rows for horses and does not dispatch fetch', () => {
    const store = createStoreMock({ horses: sampleHorses, loading: false });
    wrapper = mountHorseList({ mocks: { $store: store } });

    // no fetch on mount when horses exist
    expect(store.dispatch).not.toHaveBeenCalledWith('horse/fetchHorses');

    const rows = wrapper.findAll('tbody tr');
    // no placeholder row expected
    expect(wrapper.find('.horse-list__placeholder').exists()).toBe(false);
    expect(rows.length).toBe(sampleHorses.length);

    // Check first row content and color style
    const firstRowTds = rows.at(0).findAll('td');
    expect(firstRowTds.at(0).text()).toBe(sampleHorses[0].name);
    expect(firstRowTds.at(1).text()).toBe(String(sampleHorses[0].condition));
    const colorEl = firstRowTds.at(2).find('.horse-list__color');
    expect(colorEl.exists()).toBe(true);
    expect(colorEl.attributes('style')).toContain('background-color');
    expect((colorEl.element as HTMLElement).style.backgroundColor).toBeTruthy();
  });

  it('shows loading indicator when loading is true', () => {
    const store = createStoreMock({ horses: sampleHorses, loading: true });
    wrapper = mountHorseList({ mocks: { $store: store } });

    const loader = wrapper.find('.horse-list__loading');
    expect(loader.exists()).toBe(true);
  });

  it('falls back when store.horse is missing', () => {
    const store = createRootStoreMockWithoutHorse();
    wrapper = mountHorseList({ mocks: { $store: store } });

    // mounted() should dispatch when horses fallback to []
    expect(store.dispatch).toHaveBeenCalledWith('horse/fetchHorses');

    // loading fallback to false, so no loader
    expect(wrapper.find('.horse-list__loading').exists()).toBe(false);

    // placeholder should be visible
    const placeholder = wrapper.find('.horse-list__placeholder');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe('Horse list will appear here');
  });
});
