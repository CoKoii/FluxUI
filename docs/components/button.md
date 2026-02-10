<script setup lang="ts">
import ButtonColorDemo from '../.vitepress/examples/components/button/ButtonColorDemo.vue'
import ButtonVariantDemo from '../.vitepress/examples/components/button/ButtonVariantDemo.vue'

const propColumns = [
  { key: 'name', label: '名称', code: true },
  { key: 'type', label: '类型', code: true },
  { key: 'default', label: '默认值', code: true },
  { key: 'description', label: '说明' },
]

const propRows = [
  { name: 'color', type: "ButtonProps['color']", default: "'primary'", description: '颜色语义' },
  { name: 'variant', type: "ButtonProps['variant']", default: "'solid'", description: '展示变体' },
]

const slotColumns = [
  { key: 'name', label: '名称' },
  { key: 'description', label: '说明' },
]

const slotRows = [{ name: '无', description: '当前版本未定义 slots' }]

const eventColumns = [
  { key: 'name', label: '名称' },
  { key: 'description', label: '说明' },
]

const eventRows = [{ name: '无', description: '当前版本未定义组件事件' }]

const typeRows = [
  { name: 'ButtonColor', value: "'primary' | 'secondary' | 'success' | 'danger' | 'warning'" },
  { name: 'ButtonVariant', value: "'solid' | 'bordered' | 'flat' | 'faded' | 'light' | 'ghost' | 'shadow'" },
]
</script>

# Button 按钮

## 示例

::: warning 当前状态
当前为占位实现，组件固定渲染文本 `Default`。
:::

### 颜色

<DocDemo>
  <ButtonColorDemo />
</DocDemo>

<<< ../.vitepress/examples/components/button/ButtonColorDemo.vue

### 变体

<DocDemo>
  <ButtonVariantDemo />
</DocDemo>

<<< ../.vitepress/examples/components/button/ButtonVariantDemo.vue

## API

### Props

<DocApiTable :columns="propColumns" :rows="propRows" />

### 类型定义

<DocTypeDefs :rows="typeRows" />

### Slots

<DocApiTable :columns="slotColumns" :rows="slotRows" />

### Events

<DocApiTable :columns="eventColumns" :rows="eventRows" />
