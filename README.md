# FluxUI

现代化、工程化的 Vue 3 UI 组件库，专注高质量组件与清晰 API 设计。

## 🚀 快速命令

### 创建新组件

```bash
pnpm new
```

交互式创建组件，自动生成：
- Vue 组件文件 (`.vue`)
- TypeScript 类型定义 (`types.ts`)
- 样式文件 (`style.scss`)
- 组件导出 (`index.ts`)
- 自动更新导出入口

### 发布版本

```bash
pnpm release
```

自动化完整发布流程：
- ✅ 检查 npm 登录状态
- ✅ 验证工作区干净
- ✅ 选择版本类型 (Patch/Minor/Major)
- ✅ 自动更新版本号
- ✅ 清理并构建所有包
- ✅ 发布到 npm 注册表
- ✅ 创建 Git 标签和提交
- ✅ 推送到远程仓库

## 📦 安装使用

### 安装包

```bash
pnpm add @fluxui/core
```

### 全局注册

```typescript
import { createApp } from 'vue'
import FluxUI from '@fluxui/core'
import '@fluxui/core/dist/style.css'

createApp(App)
  .use(FluxUI)
  .mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { Button, Alert } from '@fluxui/core'
import '@fluxui/core/dist/style.css'
</script>

<template>
  <div>
    <Button>点击按钮</Button>
    <Alert type="success">提示信息</Alert>
  </div>
</template>
```

## 📚 项目结构

```
packages/
├── theme/          # UI 主题与设计令牌
│   ├── src/
│   │   ├── tokens/        # 色彩、间距、阴影等
│   │   ├── themes/        # 浅色/深色主题
│   │   └── applyTheme.ts  # 主题应用
│   └── dist/              # 编译产物
│
└── core/           # 核心组件库
    ├── src/
    │   ├── components/    # 可复用组件
    │   ├── index.ts       # 主入口
    │   └── main.ts        # Demo 入口
    └── dist/              # 编译产物
```

## 🔧 开发命令

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 构建所有包
pnpm build

# 清理构建产物
pnpm clean:dist

# 创建新组件 (交互式)
pnpm new

# 发布版本 (完全自动化)
pnpm release
```

## 📄 License

MIT
