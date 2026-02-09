# 安装

## 环境要求

- Node.js: `^20.19.0 || >=22.12.0`
- 包管理器：推荐 `pnpm`

## 安装核心组件库

```bash
pnpm add @fluxuijs/core
```

或：

```bash
npm install @fluxuijs/core
```

## 样式引入

`@fluxuijs/core` 的组件样式在 `@fluxuijs/core/dist/style.css` 中。

```ts
import '@fluxuijs/core/dist/style.css'
```

## 可选：安装主题包

若你需要独立使用主题对象或 tokens：

```bash
pnpm add @fluxuijs/theme
```
