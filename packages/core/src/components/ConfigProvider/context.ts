import { inject, provide, computed, type Ref, type ComputedRef, type InjectionKey } from 'vue'
import type { Theme, ThemeMode } from '@fluxui/theme'
import { lightTheme, darkTheme } from '@fluxui/theme'

export interface ThemeContext {
  theme: ComputedRef<Theme>
  mode: ComputedRef<ThemeMode>
  isDark: ComputedRef<boolean>
  toggle: () => void
  set: (theme: Theme) => void
}

export const THEME_INJECTION_KEY: InjectionKey<ThemeContext> = Symbol('FluxTheme')

const createFallbackContext = (): ThemeContext => ({
  theme: computed(() => lightTheme),
  mode: computed(() => 'light'),
  isDark: computed(() => false),
  toggle: () => {},
  set: () => {},
})

export function provideThemeContext(themeRef: Ref<Theme>): ThemeContext {
  const context: ThemeContext = {
    theme: computed(() => themeRef.value),
    mode: computed(() => (themeRef.value.name === 'dark' ? 'dark' : 'light')),
    isDark: computed(() => themeRef.value.name === 'dark'),
    toggle: () => {
      themeRef.value = themeRef.value.name === 'dark' ? lightTheme : darkTheme
    },
    set: (theme: Theme) => {
      themeRef.value = theme
    },
  }
  provide(THEME_INJECTION_KEY, context)
  return context
}

export function useTheme(): ThemeContext {
  return inject(THEME_INJECTION_KEY) ?? createFallbackContext()
}
