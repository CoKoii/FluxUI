<script setup lang="ts">
import { Button } from '@fluxuijs/core'
import type { ButtonProps } from '@fluxuijs/core'

const variants: NonNullable<ButtonProps['variant']>[] = [
  'solid',
  'bordered',
  'flat',
  'faded',
  'light',
  'ghost',
  'shadow',
]
</script>

<template>
  <div class="button-row">
    <Button v-for="variant in variants" :key="`button-variant-${variant}`" :variant="variant" />
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
