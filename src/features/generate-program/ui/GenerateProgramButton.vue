<template>
  <div>
    <v-btn
      class="generate-program-button"
      color="primary"
      depressed
      dark
      :loading="isGenerating"
      :disabled="!hasHorses || isGenerating"
      @click="handleGenerate"
    >
      Generate
    </v-btn>
    <v-dialog v-model="isConfirmOpen" max-width="420">
      <v-card>
        <v-card-title>Regenerate schedule?</v-card-title>
        <v-card-text> Regenerating will stop the current race and clear results. </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="handleCancel">Cancel</v-btn>
          <v-btn color="primary" text @click="handleConfirm">Regenerate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import type { Horse } from '@/entities/horse/types';
import type { RaceStatus } from '@/entities/race/model';

export default Vue.extend({
  name: 'GenerateProgramButton',
  data() {
    return {
      isGenerating: false,
      isConfirmOpen: false,
    };
  },
  computed: {
    horses(): Horse[] {
      return this.$store.state.horse?.list ?? [];
    },
    status(): RaceStatus {
      return this.$store.state.race?.status ?? 'idle';
    },
    hasHorses(): boolean {
      return this.horses.length > 0;
    },
    isRaceActive(): boolean {
      return this.status === 'running' || this.status === 'paused';
    },
  },
  methods: {
    generateSchedule() {
      return this.$store.dispatch('race/generateSchedule');
    },
    stopRace() {
      return this.$store.dispatch('race/stopRace');
    },
    resetResults() {
      return this.$store.dispatch('result/resetResults');
    },
    async handleGenerate(): Promise<void> {
      if (this.isGenerating) {
        return;
      }
      if (this.isRaceActive) {
        this.isConfirmOpen = true;
        return;
      }

      await this.runGenerate();
    },
    async handleConfirm(): Promise<void> {
      if (this.isGenerating) {
        return;
      }
      this.isConfirmOpen = false;
      await this.stopRace();
      await this.runGenerate();
    },
    handleCancel(): void {
      this.isConfirmOpen = false;
    },
    async runGenerate(): Promise<void> {
      this.isGenerating = true;
      try {
        await this.generateSchedule();
        await this.resetResults();
        await this.$nextTick();
      } finally {
        this.isGenerating = false;
      }
    },
  },
});
</script>
