<template>
  <v-card class="board">
    <v-card-title class="board__header" :class="headerClass">
      {{ title }}
    </v-card-title>
    <v-card-text class="board__body">
      <div v-if="!rounds.length" class="board__placeholder">
        {{ emptyText }}
      </div>
      <div v-else class="board__list">
        <v-card v-for="round in rounds" :key="round.id" class="board__round-card" outlined>
          <v-sheet class="board__round-title" color="orange lighten-3">
            Round {{ round.round }} - {{ round.distance }}m
          </v-sheet>
          <v-simple-table dense class="board__table">
            <thead>
              <tr>
                <th class="board__cell board__cell--position">{{ positionLabel }}</th>
                <th class="board__cell">{{ nameLabel }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in round.rows" :key="row.position">
                <td class="board__cell board__cell--position">{{ row.position }}</td>
                <td class="board__cell">{{ row.name }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { RoundView } from './types';

export default Vue.extend({
  name: 'RoundsBoard',
  props: {
    title: {
      type: String,
      required: true,
    },
    emptyText: {
      type: String,
      required: true,
    },
    rounds: {
      type: Array as () => RoundView[],
      required: true,
    },
    headerClass: {
      type: String,
      default: '',
    },
    positionLabel: {
      type: String,
      default: 'Position',
    },
    nameLabel: {
      type: String,
      default: 'Name',
    },
  },
});
</script>

<style scoped lang="scss" src="./RoundsBoard.scss"></style>
