<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
import type { AlertProps } from '@fluxuijs/core'

const colors: NonNullable<AlertProps['color']>[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
]

const variants: NonNullable<AlertProps['variant']>[] = ['solid', 'bordered', 'flat', 'faded']
const radii: NonNullable<AlertProps['radius']>[] = ['none', 'sm', 'md', 'lg', 'full']
</script>

<template>
  <div class="demo-block">
    <p class="demo-tip">以下示例均为当前组件真实行为，包括可关闭动画与 icon 插槽覆盖。</p>

    <div class="demo-grid demo-grid-2">
      <section class="demo-panel">
        <h4>颜色（flat）</h4>
        <div class="demo-stack">
          <Alert v-for="color in colors" :key="`color-${color}`" :color="color"> {{ color }} / flat </Alert>
        </div>
      </section>

      <section class="demo-panel">
        <h4>变体（primary）</h4>
        <div class="demo-stack">
          <Alert v-for="variant in variants" :key="`variant-${variant}`" color="primary" :variant="variant">
            primary / {{ variant }}
          </Alert>
        </div>
      </section>

      <section class="demo-panel">
        <h4>圆角（default + flat）</h4>
        <div class="demo-stack">
          <Alert v-for="radius in radii" :key="`radius-${radius}`" :radius="radius"> radius={{ radius }} </Alert>
        </div>
      </section>

      <section class="demo-panel">
        <h4>可关闭 + 自定义图标</h4>
        <div class="demo-stack">
          <Alert color="success" variant="flat" closable>
            点击右侧关闭按钮后组件会移除。
          </Alert>
          <Alert color="warning" variant="bordered" closable>
            <template #icon>
              <span style="font-size: 18px">⚡</span>
            </template>
            自定义 icon 插槽示例。
          </Alert>
          <Alert color="danger" variant="faded" hiddenIcon>hiddenIcon=true 时图标隐藏。</Alert>
        </div>
      </section>
    </div>
  </div>
</template>
