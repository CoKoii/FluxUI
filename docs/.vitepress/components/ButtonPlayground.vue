<script setup lang="ts">
import { Button } from '@fluxuijs/core'
import type { ButtonProps } from '@fluxuijs/core'

const colors: NonNullable<ButtonProps['color']>[] = ['primary', 'secondary', 'success', 'warning', 'danger']
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
  <div class="demo-block">
    <p class="demo-warning">
      Button 当前为占位实现：`style.scss` 为空，且组件内部文本固定为 `Default`（不会渲染默认插槽）。
    </p>

    <div class="demo-grid demo-grid-2">
      <section class="demo-panel">
        <h4>颜色枚举</h4>
        <div class="demo-stack">
          <Button v-for="color in colors" :key="`button-color-${color}`" :color="color" />
        </div>
      </section>

      <section class="demo-panel">
        <h4>变体枚举</h4>
        <div class="demo-stack">
          <Button v-for="variant in variants" :key="`button-variant-${variant}`" :variant="variant" />
        </div>
      </section>
    </div>
  </div>
</template>
