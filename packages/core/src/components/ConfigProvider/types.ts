import type { Theme, ApplyThemeOptions } from '../../../../theme/src'

export interface ConfigProviderProps extends ApplyThemeOptions {
  theme?: Theme
}

export type { ThemeContext } from './context'
