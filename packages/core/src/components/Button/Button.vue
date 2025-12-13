<script setup lang="ts">
import type { ButtonProps } from './types'
const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
  variant: 'solid',
})
defineOptions({
  name: 'FLButton',
})
</script>

<template>
  <div
    class="Button"
    :class="{
      ['button_' + props.color + '_' + props.variant]: props.color && props.variant,
    }"
  >
    Default
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
