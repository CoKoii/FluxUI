import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@fluxuijs/core/dist/style.css'
import { applyTheme, darkTheme, lightTheme } from '@fluxuijs/theme'
import './custom.css'

import DocApiTable from '../ui/DocApiTable.vue'
import DocDemo from '../ui/DocDemo.vue'
import DocTypeDefs from '../ui/DocTypeDefs.vue'
import TokenTable from '../ui/TokenTable.vue'

const syncDocsThemeByClass = () => {
  if (typeof document === 'undefined')
    return

  const root = document.documentElement
  applyTheme(root.classList.contains('dark') ? darkTheme : lightTheme)
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  syncDocsThemeByClass()

  const root = document.documentElement
  const observer = new MutationObserver((records) => {
    const classChanged = records.some(
      (record) => record.type === 'attributes' && record.attributeName === 'class',
    )
    if (classChanged)
      syncDocsThemeByClass()
  })

  observer.observe(root, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    syncDocsThemeByClass()
    ctx.app.component('DocDemo', DocDemo)
    ctx.app.component('DocApiTable', DocApiTable)
    ctx.app.component('DocTypeDefs', DocTypeDefs)
    ctx.app.component('TokenTable', TokenTable)
  },
}

export default theme
