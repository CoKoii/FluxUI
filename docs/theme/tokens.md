# Design Tokens

<script setup lang="ts">
import { tokens, lightTheme, darkTheme } from '@fluxuijs/theme'
</script>

以下内容直接读取当前包导出的 token 数据，确保与代码一致。

## `tokens` 导出

<TokenTable title="tokens.colors（亮色基准）" :tokens="tokens.baseColors" />
<TokenTable title="tokens.darkColors" :tokens="tokens.darkColors" />
<TokenTable title="tokens.radius" :tokens="tokens.radius" />
<TokenTable title="tokens.padding" :tokens="tokens.padding" />
<TokenTable title="tokens.gap" :tokens="tokens.gap" />
<TokenTable title="tokens.font" :tokens="tokens.font" />
<TokenTable title="tokens.motion" :tokens="tokens.motion" />
<TokenTable title="tokens.border" :tokens="tokens.border" />
<TokenTable title="tokens.shadows" :tokens="tokens.shadows" />

## 主题对象结构

<TokenTable title="lightTheme.tokens" :tokens="lightTheme.tokens" />
<TokenTable title="darkTheme.tokens" :tokens="darkTheme.tokens" />
