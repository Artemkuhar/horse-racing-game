import Vue from 'vue';
import Vuex from 'vuex';
import horse from '@/entities/horse/model';
import race from '@/entities/race/model';
import result from '@/entities/result/model';
import toast from '@/shared/ui/toast/model';
import type { RootState } from './types';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  modules: {
    horse,
    race,
    result,
    toast,
  },
});

export default store;
