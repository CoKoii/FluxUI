# FluxUI 自动化开发指南

## 🎯 核心理念

**开发者只需关注组件开发，其他一切自动化处理。**

## 🚀 两个命令搞定一切

### 1. 创建组件
```bash
pnpm new
```

### 2. 发布
```bash
pnpm release
```

就这么简单！🎉

---

## 📖 详细说明

### 创建组件：`pnpm new`

**使用方法：**
```bash
$ pnpm new

🎨 FluxUI 组件创建工具

? 请输入组件名称 (PascalCase，如: Button): DatePicker

✅ 创建目录: components/DatePicker/
✅ 创建文件: DatePicker.vue
✅ 创建文件: types.ts
✅ 创建文件: style.scss
✅ 创建文件: index.ts
✅ 更新 components/index.ts
✅ 更新 src/index.ts

✨ 组件 DatePicker 创建成功！
```

**自动生成的文件：**
```
packages/core/src/components/DatePicker/
├── DatePicker.vue    # 组件主文件（带模板代码）
├── types.ts          # TypeScript 类型定义
├── style.scss        # 样式文件
└── index.ts          # 导出配置（自动生成）
```

**你需要做什么：**
1. ✅ 运行 `pnpm new`
2. ✅ 输入组件名
3. ✅ 编辑生成的三个文件（Vue/TS/SCSS）

**你不需要做什么：**
- ❌ 创建目录
- ❌ 创建文件
- ❌ 编写导出配置
- ❌ 更新组件索引
- ❌ 更新主入口

---

### 发布：`pnpm release`

**使用方法：**
```bash
$ pnpm release

🚀 FluxUI 自动发布工具

✅ 已登录 npm: yourname

? 请选择版本类型:
❯ 🐛 Patch - 修复 Bug (0.1.0 -> 0.1.1)
  ✨ Minor - 新功能 (0.1.0 -> 0.2.0)
  💥 Major - 破坏性变更 (0.1.0 -> 1.0.0)

当前版本:
  @fluxui/theme: 0.1.0
  @fluxui/core:  0.1.0

新版本:
  @fluxui/theme: 0.1.1
  @fluxui/core:  0.1.1

? 确认发布？ Yes

🚀 清理旧的构建产物...
🚀 构建所有包...
🚀 验证构建产物...
✅ 构建产物验证通过
🚀 发布 @fluxui/theme...
✅ @fluxui/theme 发布成功
🚀 发布 @fluxui/core...
✅ @fluxui/core 发布成功
🚀 提交版本变更...
✅ 创建标签: v0.1.1

🎉 发布成功！版本: v0.1.1
```

**版本类型说明：**
- **Patch (🐛)**: Bug 修复 → 0.1.0 → 0.1.1
- **Minor (✨)**: 新功能 → 0.1.0 → 0.2.0
- **Major (💥)**: 破坏性变更 → 0.1.0 → 1.0.0

**你需要做什么：**
1. ✅ 运行 `pnpm release`
2. ✅ 选择版本类型
3. ✅ 确认发布

**你不需要做什么：**
- ❌ 手动更新版本号
- ❌ 清理构建产物
- ❌ 运行构建命令
- ❌ 验证构建结果
- ❌ 发布到 npm
- ❌ Git 提交和打标签
- ❌ 推送到远程

---

## 💡 完整开发流程示例

### 场景：创建一个新的 DatePicker 组件

```bash
# 1️⃣ 创建组件
$ pnpm new
? 请输入组件名称: DatePicker
✨ 组件 DatePicker 创建成功！

# 2️⃣ 编辑组件
# 编辑 packages/core/src/components/DatePicker/DatePicker.vue
# 编辑 packages/core/src/components/DatePicker/types.ts
# 编辑 packages/core/src/components/DatePicker/style.scss

# 3️⃣ 开发调试
$ pnpm dev:core

# 4️⃣ 完成后发布
$ pnpm release
? 请选择版本类型: ✨ Minor - 新功能
? 确认发布？ Yes
🎉 发布成功！
```

**总共需要的命令：**
- `pnpm new` - 创建
- `pnpm dev:core` - 开发
- `pnpm release` - 发布

就这么简单！✨

---

## 🎨 生成的组件模板

### DatePicker.vue
```vue
<script setup lang="ts">
import type { DatePickerProps } from './types'

const props = withDefaults(defineProps<DatePickerProps>(), {
  // 设置默认值
})

defineOptions({
  name: 'FLDatePicker',
})
</script>

<template>
  <div class="DatePicker">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
```

### types.ts
```typescript
export interface DatePickerProps {
  // 在这里添加组件的 props 类型
}
```

### style.scss
```scss
.DatePicker {
  // 在这里添加组件样式
}
```

---

## 🤔 常见问题

### Q: 如何修改生成的组件模板？
A: 编辑 `scripts/create-component.mjs` 中的模板函数。

### Q: 发布前需要测试吗？
A: 建议先运行 `pnpm dev:core` 本地测试，确认无误后再 `pnpm release`。

### Q: 可以取消发布吗？
A: 在确认发布前选择 `No` 即可取消。

### Q: 发布失败怎么办？
A: 脚本会自动回滚，不会影响 npm 上的包。检查错误信息后重新运行。

### Q: 需要手动 git commit 吗？
A: 不需要，`pnpm release` 会自动提交、打标签并推送。

---

## 📊 对比：之前 vs 现在

### 创建组件

**之前（10+ 步骤）：**
```bash
mkdir packages/core/src/components/DatePicker
cd packages/core/src/components/DatePicker
touch DatePicker.vue types.ts style.scss index.ts
# 编写每个文件的模板代码
# 手动更新 components/index.ts
# 手动更新 src/index.ts
```

**现在（1 个命令）：**
```bash
pnpm new
```

### 发布

**之前（15+ 步骤）：**
```bash
# 更新版本号（手动编辑 package.json）
pnpm clean:dist
pnpm build
# 检查构建产物
pnpm publish:theme
pnpm publish:core
git add .
git commit -m "chore: release v0.2.0"
git tag v0.2.0
git push
git push --tags
```

**现在（1 个命令）：**
```bash
pnpm release
```

---

## 🎉 总结

FluxUI 提供了完全自动化的开发体验：

✨ **创建组件** → `pnpm new`  
🛠️ **开发调试** → `pnpm dev:core`  
🚀 **发布上线** → `pnpm release`

**开发者只需专注于编写组件代码，其他一切交给自动化！**
