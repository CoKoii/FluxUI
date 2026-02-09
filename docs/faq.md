# FAQ

## 为什么 Button 看起来没有样式？

当前仓库中的 `Button` 仍处于占位阶段，`style.scss` 为空，组件模板固定渲染 `Default`。文档已按真实状态说明。

## 为什么需要 ConfigProvider？

`ConfigProvider` 会把主题 token 写到容器元素，组件样式通过 CSS 变量读取这些 token。没有容器时会回落到全局默认主题行为。

## 能只用主题包，不用 core 组件吗？

可以。`@fluxuijs/theme` 可独立使用，你可以只调用 `applyTheme` 和 `tokens`。

## 默认主题属性和前缀是什么？

- `DEFAULT_PREFIX`: `--fl`
- `DEFAULT_ATTRIBUTE`: `fl-data-theme`

## useTheme 在没有 ConfigProvider 时会怎样？

会返回 fallback context：

- `theme` 为 `lightTheme`
- `mode` 为 `'light'`
- `isDark` 为 `false`
- `toggle` / `set` 是空函数
