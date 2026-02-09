# 快速开始

## 全局注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import FluxUI from '@fluxuijs/core'
import '@fluxuijs/core/dist/style.css'

createApp(App).use(FluxUI).mount('#app')
```

## 按需引入

```vue
<script setup lang="ts">
import { Alert, ConfigProvider } from '@fluxuijs/core'
import { lightTheme } from '@fluxuijs/theme'
import '@fluxuijs/core/dist/style.css'
</script>

<template>
  <ConfigProvider :theme="lightTheme">
    <Alert color="primary" variant="flat">Hello FluxUI</Alert>
  </ConfigProvider>
</template>
```

## 组件列表

- `Alert`
- `Button`
- `ConfigProvider`

## 下一步

- 查看 `Alert`：[/components/alert](/components/alert)
- 查看 `Button`：[/components/button](/components/button)
- 查看主题系统：[/theme/overview](/theme/overview)
