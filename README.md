# FluxUI

现代化、工程化的 Vue 3 UI 组件库，专注高质量组件与清晰 API 设计。

## 🚀 快速开始

### 创建组件
```bash
pnpm new
```

### 发布
```bash
pnpm release
```

## 📦 安装

```bash
pnpm add @fluxui/core
```

## 🎯 使用

### 全局注册
```typescript
import { createApp } from 'vue'
import FluxUI from '@fluxui/core'
import '@fluxui/core/dist/style.css'

app.use(FluxUI)
```

### 按需引入
```vue
<script setup lang="ts">
import { Button, Alert } from '@fluxui/core'
import '@fluxui/core/dist/style.css'
</script>

<template>
  <Button>点击</Button>
  <Alert>提示</Alert>
</template>
```

## 📚 开发指南

- [快速开始](START_HERE.md)
- [自动化指南](AUTOMATION_GUIDE.md)

## 📄 License

MIT
