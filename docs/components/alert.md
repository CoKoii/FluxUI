# Alert 警告提示

<script setup lang="ts">
import type { AlertProps } from '@fluxuijs/core'

const colorTypes = "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'"
const variantTypes = "'solid' | 'bordered' | 'flat' | 'faded'"
const radiusTypes = "'none' | 'sm' | 'md' | 'lg' | 'full'"
</script>

## 示例

<AlertPlayground />

## API

### Props

<div class="api-table">

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `AlertProps['color']` | `'default'` | 颜色语义 |
| `variant` | `AlertProps['variant']` | `'flat'` | 展示变体 |
| `radius` | `AlertProps['radius']` | `'md'` | 圆角规格 |
| `hiddenIcon` | `boolean` | `false` | 是否隐藏左侧图标 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |

</div>

类型展开：

- `color`: `<code>{{ colorTypes }}</code>`
- `variant`: `<code>{{ variantTypes }}</code>`
- `radius`: `<code>{{ radiusTypes }}</code>`

### Slots

<div class="api-table">

| 名称 | 说明 |
| --- | --- |
| `default` | 文本内容区域 |
| `icon` | 左侧图标区域，默认是 `Bell` 图标 |

</div>

### Events

<div class="api-table">

| 名称 | 说明 |
| --- | --- |
| 无 | 当前版本未定义 `emits` |

</div>

## 行为说明

- 当 `closable=true` 时，点击关闭按钮后组件从 DOM 移除。
- 关闭动画使用 `Transition`，动画名为 `AlertClose`。
