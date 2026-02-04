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

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

// 设置 inquirer 输入源
function setupInquirer() {
  process.stdin.setEncoding('utf8')
}

// 检查 Git 状态
function checkGitStatus() {
  const status = exec('git status --porcelain', { silent: true })
  return !(status && status.trim())
}

function checkGitUpstream() {
  const upstream = exec('git rev-parse --abbrev-ref --symbolic-full-name @{u}', {
    silent: true,
    ignoreError: true,
  })
  if (!upstream || !upstream.trim()) return null
  const counts = exec('git rev-list --left-right --count @{u}...HEAD', {
    silent: true,
  })
  const [behind, ahead] = counts.trim().split('\t').map(Number)
  return { behind, ahead }
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
  const pkg = readJson(packagePath)
  return pkg.version
}

function computeNextVersion(currentVersion, versionType) {
  const [major, minor, patch] = currentVersion.split('.').map(Number)
  switch (versionType) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'major':
      return `${major + 1}.0.0`
    default:
      throw new Error(`未知版本类型: ${versionType}`)
  }
}

// 更新版本号
function updateVersion(packageName, versionType) {
  const packagePath = join(projectRoot, `packages/${packageName}/package.json`)
  const pkg = readJson(packagePath)
  const newVersion = computeNextVersion(pkg.version, versionType)
  pkg.version = newVersion
  writeJson(packagePath, pkg)
  
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

// 运行单元测试
function runUnitTests() {
  log.step('运行单元测试...')
  exec('pnpm --filter @fluxuijs/core test')
  log.success('单元测试通过')
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
  log.step(`发布 @fluxuijs/${packageName}...`)
  try {
    const packagePath = join(projectRoot, `packages/${packageName}`)
    exec(`npm publish --access public`, { cwd: packagePath })
    log.success(`@fluxuijs/${packageName} 发布成功`)
  } catch (error) {
    // 如果错误包含 2FA，让用户手动处理
    if (error.message && error.message.includes('Two-factor')) {
      log.warn('需要两步验证，请在 npm CLI 中运行以下命令手动发布:')
      console.log(`\n  cd packages/${packageName} && npm publish --access public\n`)
      throw error
    }
    throw error
  }
}

function ensureTagNotExists(version) {
  const result = exec(`git tag -l v${version}`, { silent: true })
  if (result && result.trim()) throw new Error(`Git tag v${version} 已存在`)
}

function ensureNpmVersionNotPublished(packageName, version) {
  const result = exec(`npm view @fluxuijs/${packageName}@${version} version`, {
    silent: true,
    ignoreError: true,
  })
  if (result && result.trim() === version) throw new Error(`npm 上已存在 @fluxuijs/${packageName}@${version}`)
}

function updateLockfileIfNeeded() {
  if (!existsSync(join(projectRoot, 'pnpm-lock.yaml'))) return
  log.step('更新锁文件...')
  exec('pnpm -w install --lockfile-only')
  log.success('锁文件已更新')
}

// 提交 Git
function commitAndTag(version) {
  log.step('提交版本变更...')
  const filesToAdd = [
    'packages/core/package.json',
    'packages/theme/package.json',
    'pnpm-lock.yaml',
  ].filter((file) => existsSync(join(projectRoot, file)))
  exec(`git add ${filesToAdd.join(' ')}`)
  exec(`git commit -m "chore: release v${version}"`)
  exec(`git tag v${version}`)
  log.success(`创建标签: v${version}`)
}

async function confirmOrExit(message, defaultValue = false) {
  const ok = await confirm({ message, default: defaultValue })
  if (!ok) process.exit(0)
}

async function main() {
  console.log('\n🚀 FluxUI 自动发布工具\n')
  setupInquirer()
  
  // 1. 检查 npm 登录（必须先登录）
  if (!checkNpmLogin()) {
    process.exit(1)
  }
  
  // 2. 检查 Git 状态
  const gitClean = checkGitStatus()
  if (!gitClean) await confirmOrExit('工作区不干净，是否继续？')

  // 2.1 检查 Git 远程同步状态
  const upstream = checkGitUpstream()
  if (!upstream) {
    log.warn('当前分支未设置 upstream，无法检查远程同步状态')
  } else if (upstream.behind > 0 || upstream.ahead > 0) {
    log.warn(`本地与远程不一致：领先 ${upstream.ahead}，落后 ${upstream.behind}`)
    await confirmOrExit('本地与远程不一致，是否继续？')
  }
  
  // 3. 获取当前版本（在选择前）
  const currentThemeVersion = getCurrentVersion('theme')
  const currentCoreVersion = getCurrentVersion('core')
  
  console.log(`${colors.cyan}当前版本:${colors.reset}`)
  console.log(`  @fluxuijs/theme: ${currentThemeVersion}`)
  console.log(`  @fluxuijs/core:  ${currentCoreVersion}\n`)
  
  // 3.1 校验版本一致性
  if (currentThemeVersion !== currentCoreVersion) {
    log.warn('core 和 theme 版本不一致')
    await confirmOrExit('版本不一致，是否继续？')
  }

  // 计算预期的新版本
  const patchVersion = computeNextVersion(currentCoreVersion, 'patch')
  const minorVersion = computeNextVersion(currentCoreVersion, 'minor')
  const majorVersion = computeNextVersion(currentCoreVersion, 'major')
  
  // 4. 选择版本类型
  const versionType = await select({
    message: '请选择版本类型:',
    choices: [
      {
        name: `🐛 Patch - 修复 Bug (${currentCoreVersion} -> ${patchVersion})`,
        value: 'patch',
        description: '向下兼容的问题修正',
      },
      {
        name: `✨ Minor - 新功能 (${currentCoreVersion} -> ${minorVersion})`,
        value: 'minor',
        description: '向下兼容的功能性新增',
      },
      {
        name: `💥 Major - 破坏性变更 (${currentCoreVersion} -> ${majorVersion})`,
        value: 'major',
        description: '不兼容的 API 变更',
      },
    ],
  })
  
  // 5. 计算新版本号（先计算，后写入）
  const newThemeVersion = computeNextVersion(currentThemeVersion, versionType)
  const newCoreVersion = computeNextVersion(currentCoreVersion, versionType)
  
  console.log(`\n新版本:`)
  console.log(`  @fluxuijs/theme: ${colors.green}${newThemeVersion}${colors.reset}`)
  console.log(`  @fluxuijs/core:  ${colors.green}${newCoreVersion}${colors.reset}`)
  
  // 6. 确认发布
  const shouldPublish = await confirm({ message: '\n确认发布？', default: true })
  if (!shouldPublish) process.exit(0)
  
  console.log('')
  
  try {
    // 7. 发布前检查 tag 与 npm 版本
    ensureTagNotExists(newCoreVersion)
    ensureNpmVersionNotPublished('theme', newThemeVersion)
    ensureNpmVersionNotPublished('core', newCoreVersion)

    // 8. 运行单元测试
    runUnitTests()

    // 9. 清理并构建
    cleanAndBuild()
    
    // 10. 验证构建产物
    validateBuild()

    // 11. 更新版本号
    log.step('更新版本号...')
    updateVersion('theme', versionType)
    updateVersion('core', versionType)
    updateLockfileIfNeeded()
    log.success('版本号更新完成')
    
    // 12. 发布包（先 theme，后 core）
    publishPackage('theme')
    publishPackage('core')
    
    // 13. Git 提交和打标签
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
    
    // 14. 完成
    console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
    console.log(`${colors.green}🎉 发布成功！版本: v${newCoreVersion}${colors.reset}`)
    console.log(`\n📦 已发布的包:`)
    console.log(`   - @fluxuijs/theme@${newThemeVersion}`)
    console.log(`   - @fluxuijs/core@${newCoreVersion}`)
    console.log(`\n🔗 查看发布:`)
    console.log(`   npm view @fluxuijs/theme`)
    console.log(`   npm view @fluxuijs/core`)
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
