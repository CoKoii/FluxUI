<script setup lang="ts">
import DocDemo from '../.vitepress/components/DocDemo.vue'
import DocApiTable from '../.vitepress/components/DocApiTable.vue'
import ConfigProviderModeDemo from '../.vitepress/demos/config-provider/ConfigProviderModeDemo.vue'

const propColumns = [
  { key: 'name', label: '名称', code: true },
  { key: 'type', label: '类型', code: true },
  { key: 'default', label: '默认值', code: true },
  { key: 'description', label: '说明' },
]

const propRows = [
  { name: 'theme', type: "ConfigProviderProps['theme']", default: 'lightTheme', description: '当前主题对象' },
  {
    name: 'prefix',
    type: 'string',
    default: 'DEFAULT_PREFIX (--fl)',
    description: 'CSS 变量名前缀',
  },
  {
    name: 'attribute',
    type: 'string',
    default: 'DEFAULT_ATTRIBUTE (fl-data-theme)',
    description: '写入目标元素的主题属性名',
  },
]

const slotColumns = [
  { key: 'name', label: '名称', code: true },
  { key: 'description', label: '说明' },
]

const slotRows = [{ name: 'default', description: '主题容器内部内容' }]

const composableColumns = [
  { key: 'name', label: '字段', code: true },
  { key: 'type', label: '类型', code: true },
  { key: 'description', label: '说明' },
]

const composableRows = [
  { name: 'theme', type: 'ComputedRef<Theme>', description: '当前主题对象' },
  { name: 'mode', type: "ComputedRef<'light' | 'dark'>", description: '当前模式' },
  { name: 'isDark', type: 'ComputedRef<boolean>', description: '是否暗色模式' },
  { name: 'toggle', type: '() => void', description: '在 light/dark 间切换' },
  { name: 'set', type: '(theme: Theme) => void', description: '设置指定主题' },
]
</script>

# ConfigProvider 配置提供者

## 示例

### 主题切换

<DocDemo>
  <ConfigProviderModeDemo />
</DocDemo>

<<< ../.vitepress/demos/config-provider/ConfigProviderModeDemo.vue

## API

### Props

<DocApiTable :columns="propColumns" :rows="propRows" />

### Slots

<DocApiTable :columns="slotColumns" :rows="slotRows" />

### Composable: useTheme

<DocApiTable :columns="composableColumns" :rows="composableRows" />

```ts
import { useTheme } from '@fluxuijs/core'

const { theme, mode, isDark, toggle, set } = useTheme()
```
