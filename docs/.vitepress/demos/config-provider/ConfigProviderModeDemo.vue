<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, ConfigProvider } from '@fluxuijs/core'
import { darkTheme, lightTheme } from '@fluxuijs/theme'

const mode = ref<'light' | 'dark'>('light')
const activeTheme = computed(() => (mode.value === 'dark' ? darkTheme : lightTheme))

const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="doc-example-stack">
    <div class="toolbar">
      <button class="switch-button" type="button" @click="toggleMode">
        切换到{{ mode === 'light' ? '暗色' : '亮色' }}主题
      </button>
      <span class="mode-label">当前模式：{{ mode }}</span>
    </div>

    <ConfigProvider :theme="activeTheme">
      <div class="theme-preview">
        <Alert color="primary" variant="flat">ConfigProvider 已将主题变量注入到当前容器。</Alert>

        <div class="theme-grid">
          <div class="theme-card">
            <p class="key">layout.background</p>
            <p class="value">var(--fl-colors-layout-background)</p>
          </div>
          <div class="theme-card">
            <p class="key">layout.foreground</p>
            <p class="value">var(--fl-colors-layout-foreground)</p>
          </div>
          <div class="theme-card">
            <p class="key">primary.500</p>
            <p class="value">var(--fl-colors-primary-500)</p>
          </div>
          <div class="theme-card">
            <p class="key">radius.10</p>
            <p class="value">var(--fl-radius-10)</p>
          </div>
        </div>
      </div>
    </ConfigProvider>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.switch-button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 6px 14px;
  background: var(--vp-c-bg);
  transition: border-color 0.2s ease;
}

.switch-button:hover {
  border-color: var(--vp-c-brand-1);
}

.mode-label {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.theme-preview {
  border: 1px solid var(--fl-colors-layout-divider);
  border-radius: var(--fl-radius-10);
  padding: var(--fl-padding-12_16);
  background: var(--fl-colors-layout-background);
  color: var(--fl-colors-layout-foreground);
}

.theme-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--fl-gap-12);
}

.theme-card {
  border: var(--fl-border-solid_1) var(--fl-colors-content-content3);
  border-radius: var(--fl-radius-10);
  padding: var(--fl-padding-8_12);
  background: var(--fl-colors-content-content1);
}

.theme-card .key {
  margin: 0;
  font-size: var(--fl-font-size13);
  color: var(--fl-colors-default-700);
}

.theme-card .value {
  margin: 6px 0 0;
  font-size: var(--fl-font-size12);
  color: var(--fl-colors-default-500);
}

@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>
