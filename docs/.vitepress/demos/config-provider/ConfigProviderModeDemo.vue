<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, ConfigProvider } from '@fluxuijs/core'
import { darkTheme, lightTheme } from '@fluxuijs/theme'

const mode = ref<'light' | 'dark'>('light')
const activeTheme = computed(() => (mode.value === 'dark' ? darkTheme : lightTheme))
const tokenValues = computed(() => {
  const colors = activeTheme.value.tokens.colors
  return {
    layoutBackground: colors?.layout?.background ?? '-',
    layoutForeground: colors?.layout?.foreground ?? '-',
    primary500: colors?.primary?.[500] ?? '-',
  }
})

const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="doc-example-stack">
    <div class="demo-toolbar">
      <button class="demo-button" type="button" @click="toggleMode">
        切换到{{ mode === 'light' ? '暗色' : '亮色' }}主题
      </button>
      <span class="demo-tip">当前模式：{{ mode }}</span>
    </div>

    <ConfigProvider :theme="activeTheme">
      <div class="doc-example-stack">
        <Alert color="default">layout.background: {{ tokenValues.layoutBackground }}</Alert>
        <Alert color="primary">primary.500: {{ tokenValues.primary500 }}</Alert>
        <Alert color="success">layout.foreground: {{ tokenValues.layoutForeground }}</Alert>
      </div>
    </ConfigProvider>
  </div>
</template>
