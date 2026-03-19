<template>
  <v-card class="horse-list">
    <v-card-title class="horse-list__header">Horse List (1-20)</v-card-title>
    <v-card-text class="horse-list__body">
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="amber darken-2"
        class="horse-list__loading"
      />
      <v-simple-table dense>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!horses.length">
            <td colspan="3" class="horse-list__placeholder">Horse list will appear here</td>
          </tr>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td>
              <span class="horse-list__color" :style="{ backgroundColor: horse.color }"></span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Horse } from '@/entities/horse/types';

export default Vue.extend({
  name: 'HorseList',
  computed: {
    horses(): Horse[] {
      return this.$store.state.horse?.list ?? [];
    },
    loading(): boolean {
      return Boolean(this.$store.state.horse?.loading);
    },
  },
  mounted() {
    if (!this.horses.length) {
      this.fetchHorses();
    }
  },
  methods: {
    fetchHorses() {
      return this.$store.dispatch('horse/fetchHorses');
    },
  },
});
</script>

<style scoped lang="scss" src="./HorseList.scss"></style>
