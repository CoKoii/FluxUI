<script setup lang="ts">
import { Bell, X } from 'lucide-vue-next'
import { ref } from 'vue'
import type { AlertProps } from './types'
const props = withDefaults(defineProps<AlertProps>(), {
  color: 'default',
  variant: 'flat',
  radius: 'md',
  hiddenIcon: false,
})
const show = ref(true)
defineOptions({ name: 'FLAlert' })
</script>
<template>
  <Transition name="AlertClose">
    <div
      v-if="show"
      class="Alert"
      :class="{
        ['alert_' + props.color + '_' + props.variant]: props.color && props.variant,
        ['alert_radius_' + props.radius]: props.radius,
      }"
    >
      <div v-if="!props.hiddenIcon" class="icon">
        <slot name="icon"><Bell fill="currentColor" :size="22" /></slot>
      </div>
      <div class="text"><slot /></div>
      <button
        v-if="props.closable"
        type="button"
        class="close"
        aria-label="Close alert"
        @click="show = false"
      >
        <X fill="currentColor" :size="22" />
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use './style.scss';
.AlertClose-enter-active,
.AlertClose-leave-active {
  transition: all 0.3s;
}
.AlertClose-enter-from,
.AlertClose-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
