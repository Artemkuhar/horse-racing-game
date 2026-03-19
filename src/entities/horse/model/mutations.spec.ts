import mutations from './mutations';
import { Horse } from '@/entities/horse/types';
import { HorseState } from './index';

describe('horse/mutations', () => {
  it('setLoading updates loading flag', () => {
    const state: HorseState = { list: [], loading: false };
    mutations.setLoading(state, true);
    expect(state.loading).toBe(true);
  });

  it('setHorses replaces list', () => {
    const state: HorseState = { list: [], loading: false };
    const horses: Horse[] = [{ id: 'h1', name: 'A', color: '#fff', condition: 1 }];
    mutations.setHorses(state, horses);
    expect(state.list).toEqual(horses);
  });
});
