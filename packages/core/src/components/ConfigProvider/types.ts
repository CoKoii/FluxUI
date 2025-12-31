import type { Theme, ApplyThemeOptions } from '@fluxuijs/theme'

export interface ConfigProviderProps extends ApplyThemeOptions {
  theme?: Theme
}

export type { ThemeContext } from './context'
