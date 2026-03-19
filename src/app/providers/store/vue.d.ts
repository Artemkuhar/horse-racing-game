import type { Store } from 'vuex';
import type { RootState } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<RootState>;
  }
}

export {};
