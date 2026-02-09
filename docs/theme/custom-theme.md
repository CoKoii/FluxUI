# 自定义主题

你可以在 `lightTheme`/`darkTheme` 基础上扩展或覆盖 token，然后通过 `ConfigProvider` 或 `applyTheme` 应用。

## 方式一：配合 ConfigProvider

```vue
<script setup lang="ts">
import { ConfigProvider, Alert } from '@fluxuijs/core'
import { lightTheme, type Theme } from '@fluxuijs/theme'

const customTheme: Theme = {
  ...lightTheme,
  name: 'custom-light',
  tokens: {
    ...lightTheme.tokens,
    colors: {
      ...lightTheme.tokens.colors,
      primary: {
        ...(lightTheme.tokens.colors?.primary ?? {}),
        500: '#1f8a70',
      },
    },
  },
}
</script>

<template>
  <ConfigProvider :theme="customTheme">
    <Alert color="primary" variant="solid">自定义 primary.500 生效</Alert>
  </ConfigProvider>
</template>
```

## 方式二：直接调用 applyTheme

```ts
import { applyTheme, lightTheme, type Theme } from '@fluxuijs/theme'

const myTheme: Theme = {
  ...lightTheme,
  name: 'brand-a',
  tokens: {
    ...lightTheme.tokens,
  },
}

applyTheme(myTheme)
```

## 注意事项

- `theme.name` 会写入主题属性值，建议在项目中保持唯一。
- 若修改 `prefix` / `attribute`，请在 `ConfigProvider` 与手动 `applyTheme` 时保持一致。
