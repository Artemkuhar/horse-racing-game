import getters from './getters';
import { HorseState } from './index';

describe('horse/getters', () => {
  it('horseById returns matching horse', () => {
    const state: HorseState = {
      list: [
        { id: 'h1', name: 'A', color: '#fff', condition: 1 },
        { id: 'h2', name: 'B', color: '#000', condition: 2 },
      ],
      loading: false,
    };
    const getById = getters.horseById(state);
    expect(getById('h2')).toEqual(state.list[1]);
    expect(getById('missing')).toBeUndefined();
  });
});
