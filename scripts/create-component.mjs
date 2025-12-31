#!/usr/bin/env node

import { input, select } from '@inquirer/prompts'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
}

// 首字母大写
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 生成组件模板
function generateComponentTemplate(name) {
  return `<script setup lang="ts">
import type { ${name}Props } from './types'

const props = withDefaults(defineProps<${name}Props>(), {
  // 设置默认值
})

defineOptions({
  name: 'FL${name}',
})
</script>

<template>
  <div class="${name}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
`
}

// 生成类型定义
function generateTypesTemplate(name) {
  return `export interface ${name}Props {
  // 在这里添加组件的 props 类型
}
`
}

// 生成样式文件
function generateStyleTemplate(name) {
  return `.${name} {
  // 在这里添加组件样式
}
`
}

// 生成 index.ts
function generateIndexTemplate(name) {
  return `import ${name} from './${name}.vue'
export { ${name} }
export * from './types'
export default ${name}
`
}

// 更新组件统一导出
function updateComponentsIndex(name) {
  const componentsIndexPath = join(projectRoot, 'packages/core/src/components/index.ts')
  let content = readFileSync(componentsIndexPath, 'utf-8')
  
  // 添加新的导出
  const newExport = `export * from './${name}'`
  if (!content.includes(newExport)) {
    content += `${newExport}\n`
    writeFileSync(componentsIndexPath, content)
    log.success('更新 components/index.ts')
  }
}

// 更新主入口文件
function updateMainIndex(name) {
  const mainIndexPath = join(projectRoot, 'packages/core/src/index.ts')
  let content = readFileSync(mainIndexPath, 'utf-8')
  
  // 更新导入
  const importLine = `import { Alert, Button, ConfigProvider } from './components'`
  const componentsArray = content.match(/const components = \[(.*?)\]/s)
  
  if (componentsArray) {
    // 添加到导入
    if (!content.includes(name)) {
      content = content.replace(
        importLine,
        `import { Alert, Button, ConfigProvider, ${name} } from './components'`
      )
      
      // 添加到组件列表
      content = content.replace(
        /const components = \[(.*?)\]/s,
        (match, components) => {
          const cleanComponents = components.trim()
          return `const components = [${cleanComponents}, ${name}]`
        }
      )
      
      // 添加到导出
      content = content.replace(
        'export { Alert, Button, ConfigProvider }',
        `export { Alert, Button, ConfigProvider, ${name} }`
      )
      
      writeFileSync(mainIndexPath, content)
      log.success('更新 src/index.ts')
    }
  }
}

async function main() {
  console.log('\n🎨 FluxUI 组件创建工具\n')
  
  // 询问组件名
  const componentName = await input({
    message: '请输入组件名称 (PascalCase，如: Button):',
    validate: (value) => {
      if (!value) return '组件名不能为空'
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return '组件名必须是 PascalCase 格式 (如: Button, DatePicker)'
      }
      return true
    },
  })
  
  const componentDir = join(projectRoot, 'packages/core/src/components', componentName)
  
  // 检查组件是否已存在
  if (existsSync(componentDir)) {
    log.error(`组件 ${componentName} 已存在！`)
    process.exit(1)
  }
  
  // 创建组件目录
  mkdirSync(componentDir, { recursive: true })
  log.success(`创建目录: components/${componentName}/`)
  
  // 生成文件
  const files = [
    { name: `${componentName}.vue`, content: generateComponentTemplate(componentName) },
    { name: 'types.ts', content: generateTypesTemplate(componentName) },
    { name: 'style.scss', content: generateStyleTemplate(componentName) },
    { name: 'index.ts', content: generateIndexTemplate(componentName) },
  ]
  
  files.forEach(({ name, content }) => {
    writeFileSync(join(componentDir, name), content)
    log.success(`创建文件: ${name}`)
  })
  
  // 更新导出
  updateComponentsIndex(componentName)
  updateMainIndex(componentName)
  
  console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
  console.log(`${colors.green}✨ 组件 ${componentName} 创建成功！${colors.reset}\n`)
  console.log('📝 下一步：')
  console.log(`   1. 编辑 packages/core/src/components/${componentName}/${componentName}.vue`)
  console.log(`   2. 定义 types.ts 中的 props 类型`)
  console.log(`   3. 编写 style.scss 样式`)
  console.log(`   4. 运行 pnpm dev:core 预览组件`)
  console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
}

main().catch((error) => {
  log.error(`创建失败: ${error.message}`)
  process.exit(1)
})
