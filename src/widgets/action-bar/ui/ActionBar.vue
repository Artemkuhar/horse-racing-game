<template>
  <header class="action-bar">
    <div class="action-bar__layout">
      <div class="action-bar__title">Horse Racing</div>
      <div class="action-bar__controls">
        <GenerateProgramButton />
        <StartPauseButton />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import GenerateProgramButton from '@/features/generate-program/ui/GenerateProgramButton.vue';
import StartPauseButton from '@/features/start-pause/ui/StartPauseButton.vue';

export default Vue.extend({
  name: 'ActionBar',
  components: {
    GenerateProgramButton,
    StartPauseButton,
  },
});
</script>

<style scoped lang="scss" src="./ActionBar.scss"></style>
