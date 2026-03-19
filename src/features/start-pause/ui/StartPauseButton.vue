<template>
  <v-btn
    class="start-pause-button"
    color="primary"
    depressed
    dark
    :disabled="!canStart"
    @click="handleClick"
  >
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { RaceRound } from '@/entities/race/types';
import type { RaceStatus } from '@/entities/race/model';

export default Vue.extend({
  name: 'StartPauseButton',
  computed: {
    schedule(): RaceRound[] {
      return this.$store.state.race?.schedule ?? [];
    },
    status(): RaceStatus {
      return this.$store.state.race?.status ?? 'idle';
    },
    canStart(): boolean {
      return this.schedule.length > 0 && this.status !== 'finished';
    },
    label(): string {
      if (this.status === 'finished') {
        return 'Finished';
      }
      if (this.status === 'running') {
        return 'Pause';
      }
      if (this.status === 'paused') {
        return 'Resume';
      }
      return 'Start';
    },
  },
  methods: {
    pauseRace() {
      return this.$store.dispatch('race/pauseRace');
    },
    resumeRace() {
      return this.$store.dispatch('race/resumeRace');
    },
    startRace() {
      return this.$store.dispatch('race/startRace');
    },
    handleClick() {
      if (this.status === 'running') {
        this.pauseRace();
        return;
      }
      if (this.status === 'paused') {
        this.resumeRace();
        return;
      }
      this.startRace();
    },
  },
});
</script>
