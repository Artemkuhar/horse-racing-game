<template>
  <rounds-board
    title="Program"
    empty-text="Rounds and participants will appear here"
    header-class="board__header--program"
    :rounds="roundsView"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Horse } from '@/entities/horse/types';
import { RaceRound } from '@/entities/race/types';
import RoundsBoard from '@/shared/ui/rounds-board/RoundsBoard.vue';
import { RoundView } from '@/shared/ui/rounds-board/types';

export default Vue.extend({
  name: 'ProgramBoard',
  components: {
    RoundsBoard,
  },
  computed: {
    roundsView(): RoundView[] {
      const rounds: RaceRound[] = this.$store.state.race?.schedule ?? [];
      const horses: Horse[] = this.$store.state.horse?.list ?? [];
      const horseMap = new Map(horses.map((horse) => [horse.id, horse]));
      return rounds.map((round) => {
        const horsesInRound = round.horseIds
          .map((id) => horseMap.get(id))
          .filter((horse): horse is Horse => Boolean(horse));
        return {
          id: round.id,
          round: round.round,
          distance: round.distance,
          rows: horsesInRound.map((horse, index) => ({
            position: index + 1,
            name: horse.name,
          })),
        };
      });
    },
  },
});
</script>
