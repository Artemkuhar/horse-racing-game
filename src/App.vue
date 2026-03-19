<template>
  <v-app>
    <v-main class="app-shell">
      <router-view />
    </v-main>
    <GlobalToast />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import GlobalToast from '@/shared/ui/toast/ui/GlobalToast.vue';

export default Vue.extend({
  name: 'AppRoot',
  components: {
    GlobalToast,
  },
});
</script>

<style lang="scss" src="./App.scss"></style>
