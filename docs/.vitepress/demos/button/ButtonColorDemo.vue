<script setup lang="ts">
import { Button } from '@fluxuijs/core'
import type { ButtonProps } from '@fluxuijs/core'

const colors: NonNullable<ButtonProps['color']>[] = ['primary', 'secondary', 'success', 'warning', 'danger']
</script>

<template>
  <div class="button-row">
    <Button v-for="color in colors" :key="`button-color-${color}`" :color="color" />
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
