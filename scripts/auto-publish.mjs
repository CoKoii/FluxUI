#!/usr/bin/env node

import { select, confirm } from '@inquirer/prompts'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
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
  cyan: '\x1b[36m',
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  step: (msg) => console.log(`${colors.cyan}🚀 ${msg}${colors.reset}`),
}

// 执行命令
function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    })
    return result
  } catch (error) {
    if (!options.ignoreError) {
      log.error(`命令执行失败: ${command}`)
      console.error(error.message)
      throw error
    }
    return null
  }
}

// 设置 inquirer 输入源
function setupInquirer() {
  process.stdin.setEncoding('utf8')
}

// 检查 Git 状态
function checkGitStatus() {
  const status = exec('git status --porcelain', { silent: true })
  if (status && status.trim()) {
    log.warn('工作区有未提交的变更')
    return false
  }
  return true
}

// 检查 npm 登录状态
function checkNpmLogin() {
  try {
    const whoami = exec('npm whoami', { silent: true, ignoreError: true })
    if (whoami && whoami.trim()) {
      log.success(`已登录 npm: ${whoami.trim()}`)
      return true
    } else {
      log.error('未登录 npm，请先运行: npm login')
      return false
    }
  } catch (error) {
    log.error('检查 npm 登录状态出错')
    return false
  }
}

// 获取当前版本
function getCurrentVersion(packageName) {
  const packagePath = join(projectRoot, `packages/${packageName}/package.json`)
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
  return pkg.version
}

// 更新版本号
function updateVersion(packageName, versionType) {
  const packagePath = join(projectRoot, `packages/${packageName}/package.json`)
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
  
  const [major, minor, patch] = pkg.version.split('.').map(Number)
  
  let newVersion
  switch (versionType) {
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`
      break
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`
      break
    case 'major':
      newVersion = `${major + 1}.0.0`
      break
  }
  
  pkg.version = newVersion
  writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
  
  return newVersion
}

// 清理并构建
function cleanAndBuild() {
  log.step('清理旧的构建产物...')
  exec('pnpm clean:dist')
  
  log.step('构建所有包...')
  exec('pnpm build')
  
  log.success('构建完成')
}

// 验证构建产物
function validateBuild() {
  log.step('验证构建产物...')
  
  const requiredFiles = [
    'packages/theme/dist/index.js',
    'packages/theme/dist/index.cjs',
    'packages/theme/dist/index.d.ts',
    'packages/core/dist/index.js',
    'packages/core/dist/index.cjs',
    'packages/core/dist/index.d.ts',
    'packages/core/dist/style.css',
  ]
  
  for (const file of requiredFiles) {
    const filePath = join(projectRoot, file)
    if (!existsSync(filePath)) {
      log.error(`缺少文件: ${file}`)
      throw new Error('构建产物不完整')
    }
  }
  
  log.success('构建产物验证通过')
}

// 发布包
function publishPackage(packageName) {
  log.step(`发布 @fluxui/${packageName}...`)
  exec(`pnpm --filter @fluxui/${packageName} publish --access public --no-git-checks`)
  log.success(`@fluxui/${packageName} 发布成功`)
}

// 提交 Git
function commitAndTag(version) {
  log.step('提交版本变更...')
  exec('git add .')
  exec(`git commit -m "chore: release v${version}"`)
  exec(`git tag v${version}`)
  log.success(`创建标签: v${version}`)
}

async function main() {
  console.log('\n🚀 FluxUI 自动发布工具\n')
  
  // 1. 检查 npm 登录（必须先登录）
  if (!checkNpmLogin()) {
    process.exit(1)
  }
  
  // 2. 检查 Git 状态
  const gitClean = checkGitStatus()
  if (!gitClean) {
    const shouldContinue = await confirm({
      message: '工作区不干净，是否继续？',
      default: false,
    })
    if (!shouldContinue) {
      process.exit(0)
    }
  }
  
  // 3. 选择版本类型
  const versionType = await select({
    message: '请选择版本类型:',
    choices: [
      {
        name: '🐛 Patch - 修复 Bug (0.1.0 -> 0.1.1)',
        value: 'patch',
        description: '向下兼容的问题修正',
      },
      {
        name: '✨ Minor - 新功能 (0.1.0 -> 0.2.0)',
        value: 'minor',
        description: '向下兼容的功能性新增',
      },
      {
        name: '💥 Major - 破坏性变更 (0.1.0 -> 1.0.0)',
        value: 'major',
        description: '不兼容的 API 变更',
      },
    ],
  })
  
  // 4. 显示当前版本
  const currentThemeVersion = getCurrentVersion('theme')
  const currentCoreVersion = getCurrentVersion('core')
  
  console.log(`\n当前版本:`)
  console.log(`  @fluxui/theme: ${currentThemeVersion}`)
  console.log(`  @fluxui/core:  ${currentCoreVersion}`)
  
  // 5. 更新版本号
  log.step('更新版本号...')
  const newThemeVersion = updateVersion('theme', versionType)
  const newCoreVersion = updateVersion('core', versionType)
  
  console.log(`\n新版本:`)
  console.log(`  @fluxui/theme: ${colors.green}${newThemeVersion}${colors.reset}`)
  console.log(`  @fluxui/core:  ${colors.green}${newCoreVersion}${colors.reset}`)
  
  // 6. 确认发布
  const shouldPublish = await confirm({
    message: '\n确认发布？',
    default: true,
  })
  
  if (!shouldPublish) {
    log.warn('取消发布')
    process.exit(0)
  }
  
  console.log('')
  
  try {
    // 7. 清理并构建
    cleanAndBuild()
    
    // 8. 验证构建产物
    validateBuild()
    
    // 9. 发布包（先 theme，后 core）
    publishPackage('theme')
    publishPackage('core')
    
    // 10. Git 提交和打标签
    if (gitClean || (await confirm({ message: '是否提交到 Git？', default: true }))) {
      commitAndTag(newCoreVersion)
      
      const shouldPush = await confirm({
        message: '是否推送到远程仓库？',
        default: true,
      })
      
      if (shouldPush) {
        log.step('推送到远程仓库...')
        exec('git push')
        exec('git push --tags')
        log.success('推送完成')
      }
    }
    
    // 11. 完成
    console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
    console.log(`${colors.green}🎉 发布成功！版本: v${newCoreVersion}${colors.reset}`)
    console.log(`\n📦 已发布的包:`)
    console.log(`   - @fluxui/theme@${newThemeVersion}`)
    console.log(`   - @fluxui/core@${newCoreVersion}`)
    console.log(`\n🔗 查看发布:`)
    console.log(`   npm view @fluxui/theme`)
    console.log(`   npm view @fluxui/core`)
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`)
    
  } catch (error) {
    log.error('发布失败！')
    console.error(error)
    process.exit(1)
  }
}

main().catch((error) => {
  log.error(`发生错误: ${error.message}`)
  process.exit(1)
})
