# @fluxui/core

现代化、工程化的 Vue 3 UI 组件库

## 安装

```bash
npm install @fluxui/core
# or
pnpm add @fluxui/core
```

## 快速开始

### 全局注册

```typescript
import { createApp } from 'vue'
import FluxUI from '@fluxui/core'
import '@fluxui/core/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(FluxUI)
app.mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { Button, Alert } from '@fluxui/core'
import '@fluxui/core/dist/style.css'
</script>

<template>
  <Button>Click me</Button>
  <Alert>This is an alert</Alert>
</template>
```

## 组件列表

- Button 按钮
- Alert 警告提示
- ConfigProvider 配置提供者

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## License

MIT
