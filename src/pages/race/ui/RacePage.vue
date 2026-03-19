<template>
  <div class="race-page">
    <ActionBar />
    <div class="race-page__content">
      <div class="race-page__row">
        <div class="race-page__col race-page__horse-col">
          <HorseList />
        </div>
        <div class="race-page__col race-page__track-col">
          <RaceTrack />
        </div>
        <div class="race-page__col race-page__side-col">
          <div class="race-page__side">
            <div class="race-page__side-row">
              <div class="race-page__side-col-item">
                <ProgramBoard />
              </div>
              <div class="race-page__side-col-item race-page__results-col">
                <ResultsBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ActionBar from '@/widgets/action-bar/ui/ActionBar.vue';
import HorseList from '@/widgets/horse-list/ui/HorseList.vue';
import RaceTrack from '@/widgets/race-track/ui/RaceTrack.vue';
import ProgramBoard from '@/widgets/program-board/ui/ProgramBoard.vue';
import ResultsBoard from '@/widgets/results-board/ui/ResultsBoard.vue';

export default Vue.extend({
  name: 'RacePage',
  components: {
    ActionBar,
    HorseList,
    RaceTrack,
    ProgramBoard,
    ResultsBoard,
  },
});
</script>

<style scoped lang="scss" src="./RacePage.scss"></style>
