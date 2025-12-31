# @fluxui/theme

FluxUI 主题系统和设计令牌

## 安装

```bash
npm install @fluxui/theme
# or
pnpm add @fluxui/theme
```

## 使用

```typescript
import { applyTheme, lightTheme, darkTheme } from '@fluxui/theme'
import { tokens } from '@fluxui/theme'

// 应用主题
applyTheme(lightTheme)

// 使用设计令牌
console.log(tokens.colors)
```

## License

MIT
