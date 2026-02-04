# @fluxuijs/theme

FluxUI 主题系统和设计令牌

## 安装

```bash
npm install @fluxuijs/theme
# or
pnpm add @fluxuijs/theme
```

## 使用

```typescript
import { applyTheme, lightTheme, darkTheme } from "@fluxuijs/theme";
import { tokens } from "@fluxuijs/theme";

applyTheme(lightTheme);

console.log(tokens.colors);
```

## License

MIT
