# Button 按钮

<script setup lang="ts">
import type { ButtonProps } from '@fluxuijs/core'

const colorTypes = "'primary' | 'secondary' | 'success' | 'danger' | 'warning'"
const variantTypes = "'solid' | 'bordered' | 'flat' | 'faded' | 'light' | 'ghost' | 'shadow'"
</script>

## 示例

<ButtonPlayground />

## API

### Props

<div class="api-table">

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `ButtonProps['color']` | `'primary'` | 颜色语义 |
| `variant` | `ButtonProps['variant']` | `'solid'` | 展示变体 |

</div>

类型展开：

- `color`: `<code>{{ colorTypes }}</code>`
- `variant`: `<code>{{ variantTypes }}</code>`

### Slots

<div class="api-table">

| 名称 | 说明 |
| --- | --- |
| 无 | 当前版本未定义 slots |

</div>

### Events

<div class="api-table">

| 名称 | 说明 |
| --- | --- |
| 无 | 当前版本未定义组件事件 |

</div>

## 当前状态说明

- `packages/core/src/components/Button/style.scss` 当前为空。
- `Button` 组件模板中渲染固定文本 `Default`。
- 即便传入默认插槽，也不会显示在当前实现中。
