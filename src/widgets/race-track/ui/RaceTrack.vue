<template>
  <v-card class="race-track">
    <v-card-title class="race-track__header">
      <span>Race Track</span>
      <span v-if="round" class="race-track__round">
        Round {{ round.round }} - {{ round.distance }}m
      </span>
    </v-card-title>
    <v-card-text class="race-track__body">
      <p v-if="!round" class="race-track__placeholder">
        Track and horse animation will appear here
      </p>
      <div v-else class="race-track__lanes">
        <div v-for="(horse, index) in horses" :key="horse.id" class="race-track__lane">
          <div class="race-track__lane-label">{{ index + 1 }}</div>
          <div class="race-track__lane-line">
            <div
              class="race-track__horse"
              :style="{
                left: `${displayProgress(progress[horse.id] || 0)}%`,
              }"
            >
              <v-icon :color="horse.color" size="20" class="race-track__horse-icon">
                mdi-horse
              </v-icon>
            </div>
          </div>
        </div>
        <div class="race-track__finish" aria-hidden="true"></div>
      </div>
      <div v-if="round" class="race-track__finish-row">
        <div class="race-track__finish-label">Finish</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { RaceRound } from '@/entities/race/types';
import { Horse } from '@/entities/horse/types';

export default Vue.extend({
  name: 'RaceTrack',
  computed: {
    schedule(): RaceRound[] {
      return this.$store.state.race?.schedule ?? [];
    },
    currentIndex(): number | null {
      const value = this.$store.state.race?.currentRoundIndex;
      return typeof value === 'number' ? value : null;
    },
    progress(): Record<string, number> {
      return this.$store.state.race?.progress ?? {};
    },
    list(): Horse[] {
      return this.$store.state.horse?.list ?? [];
    },
    round(): RaceRound | null {
      if (this.currentIndex === null || !this.schedule[this.currentIndex]) {
        return null;
      }
      return this.schedule[this.currentIndex];
    },
    horses(): Horse[] {
      if (!this.round) {
        return [];
      }
      const horseMap = new Map(this.list.map((horse) => [horse.id, horse]));
      return this.round.horseIds
        .map((id) => horseMap.get(id))
        .filter((horse): horse is Horse => Boolean(horse));
    },
  },
  methods: {
    displayProgress(value: number): number {
      return Math.min(98, Math.max(0, value));
    },
  },
});
</script>

<style scoped lang="scss" src="./RaceTrack.scss"></style>
