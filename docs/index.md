---
layout: home

hero:
  name: "FluxUI组件库"
  text: "现代化、工程化的 Vue3 UI 组件库"
  tagline: "以清晰 API、主题能力和可维护代码为核心"
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/installation
    - theme: alt
      text: 查看组件
      link: /components/alert

features:
  - title: Vue 3 + TypeScript
    details: 组件与类型定义统一维护，支持插件安装与按需引入。
  - title: Theme Token 驱动
    details: 基于 @fluxuijs/theme 的主题变量体系，支持亮暗主题切换。
  - title: 工程化发布
    details: Monorepo 结构清晰，核心组件、主题包与文档站解耦。
---

## 当前组件覆盖

- `Button`：按钮占位组件（API 已定义，样式待完善）
- `Alert`：可配置颜色/变体/圆角，支持关闭与图标插槽
- `ConfigProvider`：主题注入容器，支持主题切换和上下文访问

## 快速入口

- 安装：[/guide/installation](/guide/installation)
- 快速开始：[/guide/quick-start](/guide/quick-start)
- Alert 文档：[/components/alert](/components/alert)
- 主题系统：[/theme/overview](/theme/overview)

## 说明

文档内容与当前仓库代码保持一致。对于尚未完善的能力（例如 `Button` 样式），文档会明确标注当前状态，避免与真实行为不一致。
