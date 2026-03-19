<template>
  <v-snackbar v-model="visible" :color="color" timeout="4000" top right>
    {{ message }}
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" text @click="handleClose"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import type { ToastVariant } from '@/shared/ui/toast/model';
import { COLOR_BY_VARIANT } from '@/shared/ui/toast/constants';
import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'GlobalToast',
  computed: {
    visible: {
      get(): boolean {
        return Boolean(this.$store.state.toast?.visible);
      },
      set(value: boolean) {
        if (!value) {
          this.hide();
        }
      },
    },
    message(): string {
      return this.$store.state.toast?.message ?? '';
    },
    variant(): ToastVariant {
      return this.$store.state.toast?.variant ?? 'info';
    },
    color(): string {
      return COLOR_BY_VARIANT[this.variant] ?? COLOR_BY_VARIANT.info;
    },
  },
  methods: {
    ...mapMutations('toast', ['hide']),
    handleClose() {
      this.hide();
    },
  },
});
</script>
