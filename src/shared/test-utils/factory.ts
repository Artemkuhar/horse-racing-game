import { shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import type { Store as VuexStore } from 'vuex';

type MountComponent = Parameters<typeof shallowMount>[0];
type MockStoreHandler = (type: string) => unknown;
type MockStoreState = Record<string, unknown>;
type MockStore = {
  state: MockStoreState;
  dispatch?: MockStoreHandler;
  commit?: MockStoreHandler;
};
type TestMountOptions = ThisTypedShallowMountOptions<Vue> & {
  mocks?: Record<string, unknown> & {
    $store?: MockStore;
  };
  store?: VuexStore<unknown>;
};
type StoreModule = {
  namespaced: true;
  state: unknown;
  actions?: Record<string, () => Promise<void>>;
  mutations?: Record<string, () => void>;
};

export function createWrapperFactory(
  component: MountComponent,
  baseOptions: ThisTypedShallowMountOptions<Vue> = {},
) {
  return function factory(overrides: ThisTypedShallowMountOptions<Vue> = {}): Wrapper<Vue> {
    const base = baseOptions as TestMountOptions;
    const next = overrides as TestMountOptions;
    const options: TestMountOptions = {
      ...baseOptions,
      stubs: { ...(baseOptions.stubs || {}), ...(overrides.stubs || {}) },
      propsData: { ...(baseOptions.propsData || {}), ...(overrides.propsData || {}) },
      slots: { ...(baseOptions.slots || {}), ...(overrides.slots || {}) },
      mocks: { ...(base.mocks || {}), ...(next.mocks || {}) },
    };

    // If tests provided a plain $store mock, wrap it into a real Vuex Store
    const mocks = options.mocks || {};
    const mockStore = mocks.$store;
    if (mockStore && mockStore.state) {
      Vue.use(Vuex);
      const modules: Record<string, StoreModule> = {};
      Object.keys(mockStore.state).forEach((ns) => {
        const moduleDef: StoreModule = {
          namespaced: true,
          state: mockStore.state[ns],
        };

        // Provide stubbed actions so mapActions works in tests
        const known: Record<string, string[]> = {
          horse: ['fetchHorses'],
          race: ['startRace', 'pauseRace', 'resumeRace', 'stopRace', 'generateSchedule'],
          result: ['resetResults'],
        };
        const actionsList = known[ns] || [];
        if (actionsList.length > 0) {
          moduleDef.actions = actionsList.reduce<Record<string, () => Promise<void>>>(
            (acc, actionName) => {
              acc[actionName] = () => {
                if (typeof mockStore.dispatch === 'function') {
                  // Call jest mock with only the namespaced type to match expectations
                  mockStore.dispatch(`${ns}/${actionName}`);
                }
                return Promise.resolve();
              };
              return acc;
            },
            {},
          );
        }

        // Provide stubbed mutations for toast module so mapMutations doesn't warn
        if (ns === 'toast') {
          moduleDef.mutations = {
            hide: () => {
              if (typeof mockStore.commit === 'function') {
                mockStore.commit('toast/hide');
              }
            },
          };
        }

        modules[ns] = moduleDef;
      });

      // Ensure known modules exist even if not provided in mock state
      const ensure = (ns: string) => {
        if (!modules[ns]) {
          const knownActions: Record<string, string[]> = {
            horse: ['fetchHorses'],
            race: ['startRace', 'pauseRace', 'resumeRace', 'stopRace', 'generateSchedule'],
            result: ['resetResults'],
          };
          const actionsList = knownActions[ns] || [];

          const module: StoreModule = {
            namespaced: true,
            state: {},
            actions: actionsList.reduce<Record<string, () => Promise<void>>>((acc, actionName) => {
              acc[actionName] = () => {
                if (typeof mockStore.dispatch === 'function') {
                  mockStore.dispatch(`${ns}/${actionName}`);
                }
                return Promise.resolve();
              };
              return acc;
            }, {}),
          };

          if (ns === 'toast') {
            module.mutations = {
              hide: () => {
                if (typeof mockStore.commit === 'function') {
                  mockStore.commit('toast/hide');
                }
              },
            };
          }

          modules[ns] = module;
        }
      };
      ['horse', 'race', 'result'].forEach(ensure);

      const store = new Vuex.Store({ modules });
      if (typeof mockStore.dispatch === 'function') {
        // Use provided mock directly to allow jest spies
        (store as unknown as { dispatch: MockStoreHandler }).dispatch = mockStore.dispatch;
      }
      if (typeof mockStore.commit === 'function') {
        (store as unknown as { commit: MockStoreHandler }).commit = mockStore.commit;
      }

      // Inject real store and remove $store mock
      options.store = store;
      delete options.mocks?.$store;
    }
    return shallowMount<Vue>(component, options);
  };
}
