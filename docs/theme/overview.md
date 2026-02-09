# 主题系统概览

`FluxUI` 的主题能力由 `@fluxuijs/theme` 提供，`@fluxuijs/core` 的 `ConfigProvider` 负责将主题变量应用到容器。

## 主要导出

- `lightTheme`：亮色主题
- `darkTheme`：暗色主题
- `applyTheme(theme, target?, options?)`：将主题写入目标元素
- `tokens`：设计令牌集合（颜色、圆角、间距等）

## 推荐使用方式

1. 在根组件或页面区域放置 `ConfigProvider`。
2. 使用 `lightTheme` / `darkTheme` 作为输入。
3. 子组件内通过 `useTheme` 读取模式并切换。

## 最小示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider, Alert } from '@fluxuijs/core'
import { lightTheme, darkTheme } from '@fluxuijs/theme'

const isDark = ref(false)
</script>

<template>
  <ConfigProvider :theme="isDark ? darkTheme : lightTheme">
    <Alert color="primary" variant="flat">主题变量已生效</Alert>
  </ConfigProvider>
</template>
```
