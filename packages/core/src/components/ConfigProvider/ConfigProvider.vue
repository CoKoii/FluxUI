<script setup lang="ts">
import { lightTheme, applyTheme, DEFAULT_PREFIX, DEFAULT_ATTRIBUTE } from '@fluxuijs/theme'
import { watch, onMounted, ref, useTemplateRef } from 'vue'
import type { ConfigProviderProps } from './types'
import { provideThemeContext } from './context'

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () => lightTheme,
  prefix: DEFAULT_PREFIX,
  attribute: DEFAULT_ATTRIBUTE,
})

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
const themeRef = ref(props.theme)

watch(
  () => props.theme,
  (v) => (themeRef.value = v),
)

provideThemeContext(themeRef)

const apply = () => {
  if (!containerRef.value) return
  applyTheme(themeRef.value, containerRef.value, {
    prefix: props.prefix,
    attribute: props.attribute,
  })
}

onMounted(apply)
watch(themeRef, apply)
watch(() => [props.prefix, props.attribute], apply)

defineOptions({ name: 'FlConfigProvider' })
</script>

<template>
  <div ref="containerRef" class="fl-config-provider">
    <slot />
  </div>
</template>

<style>
.fl-config-provider {
  display: block;
}
</style>
