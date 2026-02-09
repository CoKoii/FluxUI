<script setup lang="ts">
import DocDemo from '../.vitepress/components/DocDemo.vue'
import DocApiTable from '../.vitepress/components/DocApiTable.vue'
import DocTypeDefs from '../.vitepress/components/DocTypeDefs.vue'
import AlertColorDemo from '../.vitepress/demos/alert/AlertColorDemo.vue'
import AlertVariantDemo from '../.vitepress/demos/alert/AlertVariantDemo.vue'
import AlertRadiusDemo from '../.vitepress/demos/alert/AlertRadiusDemo.vue'
import AlertClosableDemo from '../.vitepress/demos/alert/AlertClosableDemo.vue'
import AlertCustomIconDemo from '../.vitepress/demos/alert/AlertCustomIconDemo.vue'
import AlertHiddenIconDemo from '../.vitepress/demos/alert/AlertHiddenIconDemo.vue'

const propColumns = [
  { key: 'name', label: '名称', code: true },
  { key: 'type', label: '类型', code: true },
  { key: 'default', label: '默认值', code: true },
  { key: 'description', label: '说明' },
]

const propRows = [
  { name: 'color', type: "AlertProps['color']", default: "'default'", description: '颜色语义' },
  { name: 'variant', type: "AlertProps['variant']", default: "'flat'", description: '展示变体' },
  { name: 'radius', type: "AlertProps['radius']", default: "'md'", description: '圆角规格' },
  { name: 'hiddenIcon', type: 'boolean', default: 'false', description: '是否隐藏左侧图标' },
  { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮' },
]

const slotColumns = [
  { key: 'name', label: '名称', code: true },
  { key: 'description', label: '说明' },
]

const slotRows = [
  { name: 'default', description: '文本内容区域' },
  { name: 'icon', description: '左侧图标区域，默认是 Bell 图标' },
]

const eventColumns = [
  { key: 'name', label: '名称' },
  { key: 'description', label: '说明' },
]

const eventRows = [{ name: '无', description: '当前版本未定义 emits' }]

const typeRows = [
  { name: 'AlertColor', value: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'" },
  { name: 'AlertVariant', value: "'solid' | 'bordered' | 'flat' | 'faded'" },
  { name: 'AlertRadius', value: "'none' | 'sm' | 'md' | 'lg' | 'full'" },
]
</script>

# Alert 警告提示

## 示例

### 颜色

<DocDemo>
  <AlertColorDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertColorDemo.vue

### 变体

<DocDemo>
  <AlertVariantDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertVariantDemo.vue

### 圆角

<DocDemo>
  <AlertRadiusDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertRadiusDemo.vue

### 可关闭

<DocDemo>
  <AlertClosableDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertClosableDemo.vue

### 自定义图标

<DocDemo>
  <AlertCustomIconDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertCustomIconDemo.vue

### 隐藏左侧图标

<DocDemo>
  <AlertHiddenIconDemo />
</DocDemo>

<<< ../.vitepress/demos/alert/AlertHiddenIconDemo.vue

## API

### Props

<DocApiTable :columns="propColumns" :rows="propRows" />

### 类型定义

<DocTypeDefs :rows="typeRows" />

### Slots

<DocApiTable :columns="slotColumns" :rows="slotRows" />

### Events

<DocApiTable :columns="eventColumns" :rows="eventRows" />
