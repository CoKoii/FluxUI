# ConfigProvider 配置提供者

<script setup lang="ts">
import type { ConfigProviderProps } from '@fluxuijs/core'
</script>

`ConfigProvider` 用于在容器级别应用主题变量，并通过上下文向子组件暴露主题控制能力。

## 示例

<ConfigProviderPlayground />

## API

### Props

<div class="api-table">

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `theme` | `ConfigProviderProps['theme']` | `lightTheme` | 当前主题对象 |
| `prefix` | `string` | `DEFAULT_PREFIX` (`--fl`) | CSS 变量名前缀 |
| `attribute` | `string` | `DEFAULT_ATTRIBUTE` (`fl-data-theme`) | 写入目标元素的主题属性名 |

</div>

### Slots

<div class="api-table">

| 名称 | 说明 |
| --- | --- |
| `default` | 主题容器内部内容 |

</div>

### Composable：`useTheme`

`@fluxuijs/core` 暴露 `useTheme()`，返回值类型为 `ThemeContext`：

<div class="api-table">

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | `ComputedRef<Theme>` | 当前主题对象 |
| `mode` | `ComputedRef<'light' \| 'dark'>` | 当前模式 |
| `isDark` | `ComputedRef<boolean>` | 是否暗色模式 |
| `toggle` | `() => void` | 在 light/dark 间切换 |
| `set` | `(theme: Theme) => void` | 设置指定主题 |

</div>

示例：

```vue
<script setup lang="ts">
import { useTheme } from '@fluxuijs/core'

const { mode, toggle } = useTheme()
</script>

<template>
  <button @click="toggle">当前模式：{{ mode }}</button>
</template>
```
