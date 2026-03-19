<template>
  <rounds-board
    title="Results"
    empty-text="Results will appear after each round"
    header-class="board__header--results"
    :rounds="resultsView"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { RoundResult } from '@/entities/result/types';
import { RaceRound } from '@/entities/race/types';
import { Horse } from '@/entities/horse/types';
import RoundsBoard from '@/shared/ui/rounds-board/RoundsBoard.vue';
import { RoundView } from '@/shared/ui/rounds-board/types';

export default Vue.extend({
  name: 'ResultsBoard',
  components: {
    RoundsBoard,
  },
  computed: {
    resultsView(): RoundView[] {
      const results: RoundResult[] = this.$store.state.result?.rounds ?? [];
      const rounds: RaceRound[] = this.$store.state.race?.schedule ?? [];
      const horses: Horse[] = this.$store.state.horse?.list ?? [];

      return results.map((result) => {
        const round = rounds.find((item) => item.id === result.roundId);
        const rows = result.placements.map((horseId, index) => ({
          position: index + 1,
          name: horses.find((horse) => horse.id === horseId)?.name ?? 'Unknown',
        }));
        return {
          id: result.roundId,
          round: round?.round ?? 0,
          distance: round?.distance ?? 0,
          rows,
        };
      });
    },
  },
});
</script>
