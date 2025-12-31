#!/bin/bash

# 发布前自检脚本
set -e

echo "🔍 FluxUI 发布前自检..."
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查函数
check_step() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ $1${NC}"
  else
    echo -e "${RED}❌ $1 失败${NC}"
    exit 1
  fi
}

# 1. 检查 Git 状态
echo "📝 检查 Git 状态..."
if [[ -n $(git status -s) ]]; then
  echo -e "${YELLOW}⚠️  工作区有未提交的变更${NC}"
  git status -s
else
  check_step "Git 工作区干净"
fi
echo ""

# 2. 检查当前分支
echo "🌿 检查 Git 分支..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}⚠️  当前不在 main 分支 (当前: $CURRENT_BRANCH)${NC}"
else
  check_step "在 main 分支"
fi
echo ""

# 3. 清理旧的构建产物
echo "🧹 清理旧的构建产物..."
pnpm clean:dist > /dev/null 2>&1
check_step "清理完成"
echo ""

# 4. 运行构建
echo "📦 构建所有包..."
pnpm build
check_step "构建完成"
echo ""

# 5. 检查 theme 包构建产物
echo "🎨 检查 @fluxui/theme 构建产物..."

if [ ! -f "packages/theme/dist/index.js" ]; then
  echo -e "${RED}❌ index.js 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/theme/dist/index.cjs" ]; then
  echo -e "${RED}❌ index.cjs 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/theme/dist/index.d.ts" ]; then
  echo -e "${RED}❌ index.d.ts 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/theme/dist/tokens/index.js" ]; then
  echo -e "${RED}❌ tokens/index.js 不存在${NC}"
  exit 1
fi

check_step "@fluxui/theme 构建产物完整"
echo ""

# 6. 检查 core 包构建产物
echo "🎯 检查 @fluxui/core 构建产物..."

if [ ! -f "packages/core/dist/index.js" ]; then
  echo -e "${RED}❌ index.js 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/core/dist/index.cjs" ]; then
  echo -e "${RED}❌ index.cjs 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/core/dist/index.d.ts" ]; then
  echo -e "${RED}❌ index.d.ts 不存在${NC}"
  exit 1
fi

if [ ! -f "packages/core/dist/style.css" ]; then
  echo -e "${RED}❌ style.css 不存在${NC}"
  exit 1
fi

check_step "@fluxui/core 构建产物完整"
echo ""

# 7. 检查类型定义
echo "📘 检查类型定义..."

# 检查 theme 类型
if grep -q "export.*from.*types" packages/theme/dist/index.d.ts; then
  check_step "@fluxui/theme 类型定义导出正确"
else
  echo -e "${RED}❌ @fluxui/theme 类型定义可能有问题${NC}"
fi

# 检查 core 类型
if grep -q "export.*Alert.*Button.*ConfigProvider" packages/core/dist/index.d.ts; then
  check_step "@fluxui/core 类型定义导出正确"
else
  echo -e "${RED}❌ @fluxui/core 类型定义可能有问题${NC}"
fi
echo ""

# 8. 检查 package.json 配置
echo "📄 检查 package.json 配置..."

# 检查 theme package.json
if ! grep -q '"access": "public"' packages/theme/package.json; then
  echo -e "${RED}❌ @fluxui/theme 缺少 publishConfig.access${NC}"
  exit 1
fi

# 检查 core package.json
if ! grep -q '"access": "public"' packages/core/package.json; then
  echo -e "${RED}❌ @fluxui/core 缺少 publishConfig.access${NC}"
  exit 1
fi

check_step "package.json 配置正确"
echo ""

# 9. 显示包信息
echo "📊 包信息..."
echo ""
echo "📦 @fluxui/theme"
THEME_VERSION=$(grep '"version"' packages/theme/package.json | head -1 | sed 's/.*: "\(.*\)".*/\1/')
echo "   版本: $THEME_VERSION"
echo "   文件大小:"
ls -lh packages/theme/dist/index.js | awk '{print "   - index.js:", $5}'
ls -lh packages/theme/dist/index.cjs | awk '{print "   - index.cjs:", $5}'
echo ""

echo "📦 @fluxui/core"
CORE_VERSION=$(grep '"version"' packages/core/package.json | head -1 | sed 's/.*: "\(.*\)".*/\1/')
echo "   版本: $CORE_VERSION"
echo "   文件大小:"
ls -lh packages/core/dist/index.js | awk '{print "   - index.js:", $5}'
ls -lh packages/core/dist/index.cjs | awk '{print "   - index.cjs:", $5}'
ls -lh packages/core/dist/style.css | awk '{print "   - style.css:", $5}'
echo ""

# 10. 最终结果
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✨ 所有检查通过！${NC}"
echo ""
echo "📝 下一步操作："
echo "   1. 运行 'pnpm version:patch' 更新版本号"
echo "   2. 提交并推送代码"
echo "   3. 运行 'pnpm publish:all' 发布到 npm"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
