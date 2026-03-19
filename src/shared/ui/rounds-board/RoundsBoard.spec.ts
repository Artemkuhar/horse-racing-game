import { createWrapperFactory } from '@/shared/test-utils/factory';
import RoundsBoard from './RoundsBoard.vue';
import type { RoundView } from './types';

const baseProps = {
  title: 'Rounds',
  emptyText: 'No rounds yet',
  rounds: [] as RoundView[],
};

const factory = createWrapperFactory(RoundsBoard, {
  stubs: {
    'v-card': true,
    'v-card-title': true,
    'v-card-text': true,
    'v-sheet': true,
    'v-simple-table': true,
  },
  propsData: baseProps,
});

describe('RoundsBoard.vue', () => {
  it('renders title and empty placeholder when no rounds', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain('Rounds');
    const placeholder = wrapper.find('.board__placeholder');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toContain('No rounds yet');
    expect(wrapper.find('.board__list').exists()).toBe(false);
  });

  it('applies headerClass to header element', () => {
    const wrapper = factory({ propsData: { headerClass: 'highlight' } });
    const header = wrapper.find('.board__header');
    expect(header.exists()).toBe(true);
    expect(header.classes()).toContain('highlight');
  });

  it('renders rounds list with titles, headers and rows', () => {
    const rounds: RoundView[] = [
      {
        id: 'r1',
        round: 1,
        distance: 1000,
        rows: [
          { position: 1, name: 'Alpha' },
          { position: 2, name: 'Bravo' },
        ],
      },
      {
        id: 'r2',
        round: 2,
        distance: 1200,
        rows: [
          { position: 1, name: 'Charlie' },
          { position: 2, name: 'Delta' },
        ],
      },
    ];
    const wrapper = factory({ propsData: { rounds, positionLabel: 'Place', nameLabel: 'Horse' } });

    // list exists
    expect(wrapper.find('.board__list').exists()).toBe(true);

    // correct number of round cards
    const cards = wrapper.findAll('.board__round-card');
    expect(cards.length).toBe(2);

    // titles contain round number and distance
    const text = wrapper.text();
    expect(text).toContain('Round 1 - 1000m');
    expect(text).toContain('Round 2 - 1200m');

    // table headers use provided labels
    const headers = wrapper.findAll('th.board__cell');
    expect(headers.at(0)!.text()).toBe('Place');
    expect(headers.at(1)!.text()).toBe('Horse');

    // table rows display positions and names
    const rowsText = cards.wrappers.map((w) => w.text());
    expect(rowsText[0]).toContain('1');
    expect(rowsText[0]).toContain('Alpha');
    expect(rowsText[0]).toContain('2');
    expect(rowsText[0]).toContain('Bravo');
    expect(rowsText[1]).toContain('1');
    expect(rowsText[1]).toContain('Charlie');
    expect(rowsText[1]).toContain('2');
    expect(rowsText[1]).toContain('Delta');
  });
});
