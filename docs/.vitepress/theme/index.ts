import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@fluxuijs/core/dist/style.css'
import './custom.css'

import AlertPlayground from '../components/AlertPlayground.vue'
import ButtonPlayground from '../components/ButtonPlayground.vue'
import ConfigProviderPlayground from '../components/ConfigProviderPlayground.vue'
import TokenTable from '../components/TokenTable.vue'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('AlertPlayground', AlertPlayground)
    ctx.app.component('ButtonPlayground', ButtonPlayground)
    ctx.app.component('ConfigProviderPlayground', ConfigProviderPlayground)
    ctx.app.component('TokenTable', TokenTable)
  },
}

export default theme
