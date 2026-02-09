import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@fluxuijs/core/dist/style.css'
import './custom.css'

import TokenTable from '../components/TokenTable.vue'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('TokenTable', TokenTable)
  },
}

export default theme
