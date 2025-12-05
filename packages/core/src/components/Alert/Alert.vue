<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import type { AlertProps } from './types'

const props = withDefaults(defineProps<AlertProps>(), {
  color: 'default',
  variant: 'flat',
  radius: 'md',
  hiddenIcon: false,
})
defineOptions({
  name: 'FLAlert',
})
</script>

<template>
  <div
    class="Alert"
    :class="{
      ['alert_' + props.color + '_' + props.variant]: props.color && props.variant,
      ['alert_radius_' + props.radius]: props.radius,
      ['alert_icon_hidden']: props.hiddenIcon,
    }"
  >
    <div class="icon">
      <slot name="icon">
        <Bell fill="currentColor" :size="22" />
      </slot>
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
