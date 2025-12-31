import type { App, Plugin } from 'vue'
import { Alert, Button, ConfigProvider } from './components'

// 所有组件列表
const components = [Alert, Button, ConfigProvider]

// 全局安装函数
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || '', component)
  })
}

// 导出 Vue 插件
const FluxUI: Plugin = {
  install,
}

// 组件单独导出
export { Alert, Button, ConfigProvider }

// 导出所有类型
export * from './components'

// 默认导出插件
export default FluxUI
